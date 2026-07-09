# Cibo - Online Food Ordering Web Application

Cibo is a highly polished, responsive, and production-ready online food ordering frontend application built using **React**, **Vite**, and **Vanilla CSS**. It connects to a cloud-hosted backend database using **Supabase** (PostgreSQL) or automatically runs in a local-first **Mock Mode** using `localStorage` if database credentials are not configured.

This project is optimized as a professional portfolio showpiece for recruiters, friends, and resumes.

---

## 🚀 Live Demo Setup

You can deploy the client directly on **Vercel** with fully handled client-side routing redirects on page refresh.

### Features
- 🍔 **Restaurant Listings & Categories**: Browse top local restaurants, cuisines, and offers.
- 🍕 **Interactive Menus**: Filter items by categories (e.g. Veg / Non-Veg badge controls).
- 🛒 **Dynamic Shopping Cart**: Fully featured cart manager with item limits.
- 💳 **Demo Checkout & Receipt**: Secure simulation checkout experience with cash/card/UPI flows.
- 🔐 **Authentication & Sessions**: Built-in User Profiles, Account, and admin workspace.
- ☁️ **Cloud Database & Live Updates**: Connects via secure environment variables.

---

## 🛠️ Installation & Local Setup

1. **Clone repository & Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure your Database (Optional)**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Supabase URL and Anon Key. If omitted, the application runs seamlessly in **Mock Mode** using seed mock data and local storage.

3. **Run the Development Server**:
   Double click `run_cibo.bat` or run:
   ```bash
   npm run dev
   ```

---

## 📦 Deployment Instructions

### Deploy to Vercel
1. Log in to [Vercel](https://vercel.com) and import the repository.
2. Configure environment variables in Vercel settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Click **Deploy**. Vercel will automatically read `vercel.json` and ensure client-side routing redirects work perfectly on page reload.
