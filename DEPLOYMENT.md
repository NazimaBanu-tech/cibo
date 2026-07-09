# Cibo - Production Deployment Guide

This guide details steps to deploy the Cibo Food Ordering frontend web application to production.

---

## Deployment Target

- **Frontend Hosting**: Vercel
- **Database & Auth Backend**: Supabase (configured via frontend environment variables)

---

## Step 1: Set Up Environment Variables

Vite uses variables prefixed with `VITE_` to expose them to client code. When deploying on Vercel, configure the following keys in your project **Environment Variables** dashboard:

| Variable Name | Description | Example / Value |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase Project API URL | `https://xyzabc.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public Anon Key for API authorization | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

> [!NOTE]
> If these variables are not configured or are set to placeholder values, Cibo will fall back automatically to standard **localStorage Mock Mode**, making it fully runnable locally or for preview without any database setups.

---

## Step 2: Deploying to Vercel

1. Push your repository to GitHub.
2. Log into your [Vercel Dashboard](https://vercel.com) and click **Add New** > **Project**.
3. Select your `cibo` repository.
4. Configure the Build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (Project root)
   - **Build Command**: `npm run build` or `vite build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, paste the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` keys.
6. Click **Deploy**.

---

## Step 3: Database & CORS Setup in Supabase

1. Go to your **Supabase Dashboard** > **API Settings**.
2. Add your Vercel deployment URL (e.g., `https://cibo-app.vercel.app`) to the **Allowed Web Redirect URLs** list under authentication settings to secure user registration, password resets, and session callbacks.
3. Ensure that your database table schemas (`profiles`, `restaurants`, `menu_items`, `orders`, `order_items`, `admins`) match the structure in `seed.sql`.
