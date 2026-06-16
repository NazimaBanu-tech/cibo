import { createContext, useContext, useState, useEffect } from 'react';
import { USE_SUPABASE } from '../config';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { supabase } from '../lib/supabaseClient';

// =============================================
// Auth Context — Phase 1 uses localStorage mock
// Phase 2: swap functions with Supabase auth calls
// =============================================

const AuthContext = createContext(null);

const MOCK_ADMIN = {
  email: 'admin@cibo.local',
  password: 'cibo123',
  name: 'Nazima Banu',
  role: 'Administrator',
  joinedDate: '29 Dec 2025',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);           // Regular user
  const [adminUser, setAdminUser] = useState(null); // Admin
  const [loading, setLoading] = useState(true);

  // Helper to synchronize Supabase session with the user and admin state formats
  const handleSessionSync = async (session) => {
    if (session?.user) {
      const userId = session.user.id;
      let profile = null;
      try {
        profile = await userService.getUserProfile(userId);
      } catch (err) {
        console.error('Error fetching user profile from Supabase:', err);
      }

      // Map Supabase user and profile to the existing user schema
      const mappedUser = {
        id: userId,
        email: session.user.email,
        name: profile?.name || session.user.user_metadata?.name || 'New Customer',
        phone: profile?.phone || session.user.user_metadata?.phone || '',
        joinedDate: profile?.joined_date
          ? new Date(profile.joined_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        addresses: [], // Initial state for addresses
      };

      setUser(mappedUser);
      localStorage.setItem('cibo2_user', JSON.stringify(mappedUser));

      // Check if user is in admin table
      try {
        const { data: adminRow } = await supabase
          .from('admins')
          .select('role, created_at')
          .eq('id', userId)
          .single();

        if (adminRow) {
          const admin = {
            email: session.user.email,
            name: profile?.name || 'Administrator',
            role: adminRow.role === 'admin' ? 'Administrator' : adminRow.role === 'staff' ? 'Staff' : adminRow.role === 'manager' ? 'Manager' : adminRow.role,
            joinedDate: new Date(adminRow.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          };
          setAdminUser(admin);
          localStorage.setItem('cibo2_admin', JSON.stringify(admin));
        } else {
          setAdminUser(null);
          localStorage.removeItem('cibo2_admin');
        }
      } catch (err) {
        // Not an admin or lookup failed
        setAdminUser(null);
        localStorage.removeItem('cibo2_admin');
      }
    } else {
      setUser(null);
      setAdminUser(null);
      localStorage.removeItem('cibo2_user');
      localStorage.removeItem('cibo2_admin');
    }
  };

  useEffect(() => {
    let authListener = null;

    const initSession = async () => {
      if (USE_SUPABASE) {
        try {
          const session = await authService.getSession();
          await handleSessionSync(session);

          // Subscribe to session changes
          if (supabase) {
            const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
              if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                await handleSessionSync(newSession);
              } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setAdminUser(null);
                localStorage.removeItem('cibo2_user');
                localStorage.removeItem('cibo2_admin');
              }
            });
            authListener = subscription;
          }
        } catch (error) {
          console.error('Session init error:', error);
        }
      } else {
        // Restore session from localStorage
        try {
          const savedUser = localStorage.getItem('cibo2_user');
          const savedAdmin = localStorage.getItem('cibo2_admin');
          if (savedUser) setUser(JSON.parse(savedUser));
          if (savedAdmin) setAdminUser(JSON.parse(savedAdmin));
        } catch {
          // ignore parse errors
        }
      }
      setLoading(false);
    };

    initSession();

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);

  // ---------- User Auth ----------

  const signUp = async ({ name, email, phone, password }) => {
    if (USE_SUPABASE) {
      const signUpResult = await authService.signUp({ email, password, name, phone });
      const authUser = signUpResult.user;
      if (!authUser) {
        throw new Error('Sign up failed: User object not returned.');
      }

      let profile = null;
      try {
        profile = await userService.createUserProfile(authUser.id, { name, phone });
      } catch (err) {
        console.error('Error creating profile entry in database:', err);
      }

      const mappedUser = {
        id: authUser.id,
        email: authUser.email,
        name: profile?.name || name || authUser.user_metadata?.name || 'New Customer',
        phone: profile?.phone || phone || authUser.user_metadata?.phone || '',
        joinedDate: profile?.joined_date
          ? new Date(profile.joined_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        addresses: [],
      };

      setUser(mappedUser);
      localStorage.setItem('cibo2_user', JSON.stringify(mappedUser));
      return mappedUser;
    } else {
      const existing = JSON.parse(localStorage.getItem('cibo2_users') || '[]');
      if (existing.find((u) => u.email === email)) {
        throw new Error('An account with this email already exists.');
      }
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password,
        joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        addresses: [],
      };
      existing.push(newUser);
      localStorage.setItem('cibo2_users', JSON.stringify(existing));
      const { password: _pw, ...safeUser } = newUser;
      setUser(safeUser);
      localStorage.setItem('cibo2_user', JSON.stringify(safeUser));
      return safeUser;
    }
  };

  const signIn = async ({ email, password }) => {
    if (USE_SUPABASE) {
      const signInResult = await authService.signIn({ email, password });
      const authUser = signInResult.user;
      if (!authUser) {
        throw new Error('Login failed: User object not returned.');
      }

      let profile = null;
      try {
        profile = await userService.getUserProfile(authUser.id);
      } catch (err) {
        console.error('Error fetching user profile from database:', err);
      }

      const mappedUser = {
        id: authUser.id,
        email: authUser.email,
        name: profile?.name || authUser.user_metadata?.name || 'New Customer',
        phone: profile?.phone || authUser.user_metadata?.phone || '',
        joinedDate: profile?.joined_date
          ? new Date(profile.joined_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        addresses: [],
      };

      setUser(mappedUser);
      localStorage.setItem('cibo2_user', JSON.stringify(mappedUser));
      return mappedUser;
    } else {
      const existing = JSON.parse(localStorage.getItem('cibo2_users') || '[]');
      const found = existing.find((u) => u.email === email && u.password === password);
      if (!found) throw new Error('Invalid email or password. Please try again.');
      const { password: _pw, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('cibo2_user', JSON.stringify(safeUser));
      return safeUser;
    }
  };

  const signOut = () => {
    if (USE_SUPABASE) {
      authService.signOut().catch((err) => {
        console.error('Error during Supabase signout:', err);
      });
    }
    setUser(null);
    localStorage.removeItem('cibo2_user');
  };

  const updateUser = async (updates) => {
    if (USE_SUPABASE) {
      if (!user) return;
      try {
        const dbUpdates = {};
        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.phone !== undefined) dbUpdates.phone = updates.phone;

        if (Object.keys(dbUpdates).length > 0) {
          await userService.updateUserProfile(user.id, dbUpdates);
        }
      } catch (err) {
        console.error('Error updating user profile in Supabase:', err);
      }
    }

    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('cibo2_user', JSON.stringify(updated));

    if (!USE_SUPABASE) {
      const existing = JSON.parse(localStorage.getItem('cibo2_users') || '[]');
      const idx = existing.findIndex((u) => u.id === updated.id);
      if (idx !== -1) {
        existing[idx] = { ...existing[idx], ...updates };
        localStorage.setItem('cibo2_users', JSON.stringify(existing));
      }
    }
  };

  // ---------- Admin Auth ----------

  const adminSignIn = async ({ email, password }) => {
    if (USE_SUPABASE) {
      const signInResult = await authService.signIn({ email, password });
      const authUser = signInResult.user;
      if (!authUser) {
        throw new Error('Admin login failed: User object not returned.');
      }

      // Verify that this user exists in public.admins
      const { data: adminRow, error: adminErr } = await supabase
        .from('admins')
        .select('role, created_at')
        .eq('id', authUser.id)
        .single();

      if (adminErr || !adminRow) {
        // If not in admins table, sign them out of Supabase and throw error
        await authService.signOut();
        throw new Error('Invalid admin credentials.');
      }

      let profile = null;
      try {
        profile = await userService.getUserProfile(authUser.id);
      } catch (err) {
        console.error('Error fetching admin profile:', err);
      }

      const admin = {
        email: authUser.email,
        name: profile?.name || 'Administrator',
        role: adminRow.role === 'admin' ? 'Administrator' : adminRow.role === 'staff' ? 'Staff' : adminRow.role === 'manager' ? 'Manager' : adminRow.role,
        joinedDate: new Date(adminRow.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      };

      setAdminUser(admin);
      localStorage.setItem('cibo2_admin', JSON.stringify(admin));
      return admin;
    } else {
      if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
        const admin = { email: MOCK_ADMIN.email, name: MOCK_ADMIN.name, role: MOCK_ADMIN.role, joinedDate: MOCK_ADMIN.joinedDate };
        setAdminUser(admin);
        localStorage.setItem('cibo2_admin', JSON.stringify(admin));
        return admin;
      }
      throw new Error('Invalid admin credentials.');
    }
  };

  const adminSignOut = () => {
    if (USE_SUPABASE) {
      authService.signOut().catch((err) => {
        console.error('Error during Supabase admin signout:', err);
      });
    }
    setAdminUser(null);
    localStorage.removeItem('cibo2_admin');
  };

  const value = {
    user,
    adminUser,
    loading,
    signUp,
    signIn,
    signOut,
    updateUser,
    adminSignIn,
    adminSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
