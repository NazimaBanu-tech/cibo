import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

// User Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RestaurantPage from './pages/RestaurantPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ReceiptPage from './pages/ReceiptPage';
import AccountPage from './pages/AccountPage';

// Admin Pages
import AdminLoginPage from './admin/AdminLoginPage';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './admin/DashboardPage';
import RestaurantsPage from './admin/RestaurantsPage';
import MenuItemsPage from './admin/MenuItemsPage';
import OrdersPage from './admin/OrdersPage';
import UsersPage from './admin/UsersPage';
import AdminProfilePage from './admin/AdminProfilePage';
import ReportsPage from './admin/ReportsPage';

// Layouts
import UserLayout from './layouts/UserLayout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              {/* ---- User Side ---- */}
              <Route path="/" element={<UserLayout />}>
                <Route index element={<HomePage />} />
                <Route path="restaurant/:slug" element={<RestaurantPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="order-success" element={<OrderSuccessPage />} />
                <Route path="track-order" element={<TrackOrderPage />} />
                <Route path="track-order/:id" element={<TrackOrderPage />} />
                <Route path="receipt" element={<ReceiptPage />} />
                <Route path="account" element={<AccountPage />} />
              </Route>

              {/* ---- Auth Pages (no layout) ---- */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* ---- Admin Side ---- */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="restaurants" element={<RestaurantsPage />} />
                <Route path="menu-items" element={<MenuItemsPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
                <Route path="reports" element={<ReportsPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
