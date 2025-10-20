# 🌿 GreenTop — Eco E-Commerce Platform

**GreenTop** is a modern e-commerce platform built with **Next.js 14**, **TypeScript**, **Sanity CMS**, and **MongoDB**, designed for people who love nature.  
It allows users to **buy and sell trees, plants, seeds, and gardening essentials** — combining sustainability with modern technology.  

---

## 🌱 Overview

GreenTop aims to create an online ecosystem that connects plant lovers, gardeners, and environmental enthusiasts.  
Users can explore products, manage their carts, checkout securely, and even become sellers to list their own green products.

---

## ✨ Features

- 🪴 **Buy & Sell Plants** — A marketplace for trees, seeds, and gardening items  
- 🧾 **Dynamic CMS** — Managed via **Sanity.io** for flexible product updates  
- 👤 **Secure Authentication** — Login/signup using **Clerk**  
- 💳 **Multi-Gateway Payments**
  - **Stripe** for global transactions  
  - **SSLCommerz** for Bangladesh users  
- 🛍️ **Shopping Cart** — Persistent cart with quantity updates  
- 🌐 **SEO-Friendly & Fast** — Built on **Next.js App Router**  
- 🪩 **Responsive Design** — Styled using **Bootstrap 5** + custom CSS  
- 🧩 **Type Safe** — 100% **TypeScript** with custom types  
- ☁️ **Database** — **MongoDB Atlas** for data persistence  
- 🌳 **Eco-Inspired UI** — Clean, nature-themed design  

---


---

## ⚙️ Environment Setup

Create a `.env.local` file in your project root and add:

```bash
# ==== Sanity ====
NEXT_PUBLIC_SANITY_PROJECT_ID=75jievmu
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BASE_URL=http://localhost:3000
SANITY_API_TOKEN=your_sanity_api_token
SANITY_API_READ_TOKEN=your_sanity_read_token

# ==== Clerk ====
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# ==== Stripe (optional) ====
STRIPE_SECRET_KEY=your_stripe_secret_key

# ==== SSLCommerz ====
SSLC_STORE_ID=your_ssl_store_id
SSLC_STORE_PASS=your_ssl_store_password

# ==== MongoDB ====
MONGO_URI=your_mongodb_connection_uri
