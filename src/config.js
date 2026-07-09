// =============================================
// Cibo – Application Configuration & Flags
// Toggle USE_SUPABASE to connect to the database
// =============================================

const hasSupabaseCreds = 
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_URL !== 'https://your-supabase-project-url.supabase.co' &&
  import.meta.env.VITE_SUPABASE_ANON_KEY;

export const USE_SUPABASE = !!hasSupabaseCreds;

