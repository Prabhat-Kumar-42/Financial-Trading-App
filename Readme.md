# Financial Trading App 

> A simple full-stack financial trading / portfolio app with KYC, products, watchlist, transactions and a portfolio dashboard.
> Backend: **Node.js + Express + TypeScript + Prisma + PostgreSQL + Supabase (optional storage)**
> Frontend: **Next.js (App Router) + React + TypeScript + Tailwind CSS + Recharts**

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Repository Layout (recommended)](#repository-layout-recommended)
5. [Environment variables (`.env.example`)](#environment-variables-envexample)
6. [Quick start (run locally)](#quick-start-run-locally)

   * [Backend setup](#backend-setup)
   * [Frontend setup](#frontend-setup)
7. [Database (Prisma) & Seed](#database-prisma--seed)
8. [API Reference (endpoints)](#api-reference-endpoints)
9. [Frontend details & integration notes](#frontend-details--integration-notes)
10. [File uploads / KYC handling](#file-uploads--kyc-handling)
11. [Error handling & validation](#error-handling--validation)
12. [Screenshots](#screenshots)
13. [Deployment notes](#deployment-notes)
14. [Troubleshooting & tips](#troubleshooting--tips)
15. [Contributing & License](#contributing--license)

---

# Project Overview

This repository contains the complete code for a mini Financial Trading application:

* Users can sign up (with PAN and KYC image), log in (JWT), view products, buy units (transactions), see their portfolio summary and returns, add/remove products from a watchlist, and view a profile (incl. KYC document).
* Backend exposes a JSON API (protected by JWT) and handles uploads (local during development or Supabase for production).
* Frontend is a Next.js app built with the App Router and uses React contexts & hooks for auth, watchlist and transactions.

---

# Features

* Signup / Login with PAN validation and KYC upload
* JWT-based authentication (tokens issued for 1 day)
* Browse products and view detailed product pages with price charts
* Buy products (transactions) that deduct from user wallet
* Portfolio view (transactions, current value, returns)
* Watchlist management (add/remove, list)
* Profile page (download/view KYC)
* Server-side validations (Zod) and centralized error handlers
* Prisma ORM for Postgres schema and queries
* Optional Supabase object storage for KYC files

---

# Tech Stack

**Backend**

* Node.js + Express (TypeScript)
* Prisma ORM + PostgreSQL
* Zod for validation
* bcrypt for password hashing
* jsonwebtoken (JWT) for auth
* multer (file uploads)
* Supabase client for object storage (optional)
* ts-node-dev / TypeScript tooling

**Frontend**

* Next.js 13 (App Router)
* React + TypeScript
* Tailwind CSS
* axios for API calls
* recharts for charts
* React Context + custom hooks for auth/watchlist/transactions
* toast notifications (e.g. `react-hot-toast` / any toast used)

---

# Repository layout (recommended)

You can adapt based on your existing layout. Example:

```
/README.md                        <- this master README
/backend
  /src
    /controllers
    /services
    /routes
    /middlewares
    /error-handlers
    /db/prisma.ts
    /scripts/product-seed.ts
    app.ts
    index.ts
  package.json
  tsconfig.json
  prisma/schema.prisma

/frontend
  /src
    /app
      /(protected)/...
      page.tsx
      layout.tsx
    /components
    /contexts
    /hooks
    /lib/api.ts
  package.json
  next.config.js
  tailwind.config.js

/screenshots
  login.png
  signup.png
  products.png
  product-detail.png
  portfolio.png
  watchlist.png
  profile.png
```

> If your repo is currently flat (both backend and frontend in the same `src`), adjust the commands below to point to the actual locations.

---

# Environment variables (`.env.example`)

## Backend — `.env.example`

```
##### JWT #####
JWT_SECRET=jwt-secret-key

##### SUPABASE #####
SUPABASE_URL=supabase-url
SUPABASE_KEY=supabase-key
SUPABASE_BUCKET=supabase-bucket
SUPABASE_FILE_SIZE_LIMIT_MB=number # in MB

POSTGRES_PASS=postgres-password
DATABASE_URL=postgres-db-url

# Direct connection to the database. Used for migrations
DIRECT_URL=postgres-direct-url # For Supabase
```

## Frontend — `.env.example`

```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

**Notes**

* Copy these to `.env` (or `.env.local`) and fill in real values before running.
* `JWT_SECRET` is required — backend will `process.exit(1)` if not set (see `src/utils/jwt.util.ts`).
* The frontend `NEXT_PUBLIC_API_BASE_URL` is used by `/src/lib/api.ts`. The frontend library appends `/api` automatically; if your backend is `http://localhost:4000` keep the default or set `http://localhost:4000`.

---

# Quick start (run locally)

## Prerequisites

* Node.js (v20+ recommended)
* npm / yarn / pnpm
* PostgreSQL (or use Supabase Postgres)
* (Optional) Supabase project if you want remote storage for KYC

---

## Backend setup

1. **Go to backend folder**

```bash
cd backend   # or adjust path where backend code lives
```

2. **Install dependencies**

```bash
npm install
# or
yarn
```

3. **Add `.env`**

* Copy `.env.example` -> `.env` and fill values:

  * `DATABASE_URL` (Postgres connection string)
  * `DIRECT_URL` (for migrations, optional)
  * `JWT_SECRET`
  * `SUPABASE_*` if you use Supabase or leave blank and set `NODE_ENV=local` for local uploads

4. **Prisma (generate & migrate / push)**

```bash
npx prisma generate
# If you want migration:
npx prisma migrate dev --name init
# Or to just push schema (non-migration)
npx prisma db push
```

5. **Seed initial products**
   The repo contains a seed script at `src/scripts/product-seed.ts`. Run with `node` after build:

```bash
# compile and run:
npm run build
node dist/src/scripts/product-seed.js   # adjust compiled path if needed
# or
npm run prisma:seed # after build
```

6. **Run server**

```json
// package.json example (backend)
"scripts": {
  "build": "tsc && tsc-alias",
  "start": "node dist/index.js"
}
```

Then:

```bash
npm run build && npm run start 
```

* Default listening: `http://localhost:4000` (see `src/index.ts`). Health check: `GET /healthz`.

---

## Frontend setup

1. **Go to frontend folder**

```bash
cd frontend  # or adjust
```

2. **Install dependencies**

```bash
npm install
# or
yarn
```

3. **Add `.env.local`**

* Copy frontend `.env.example` and set `NEXT_PUBLIC_API_BASE_URL` to your backend address, e.g.:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

(Frontend code automatically appends `/api`.)

4. **Run dev**

```bash
npm run dev
# default: http://localhost:3000
```

5. **Build / Start**

```bash
npm run build
npm run start
```

---

# Database (Prisma) & Seed

Prisma schema (the schema used in the project):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  password      String
  pan           String   @unique
  kycDocPath    String?
  walletBalance Float    @default(0)
  transactions  Transaction[]
  watchlist     Watchlist[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Product {
  id         String   @id @default(uuid())
  name       String
  category   String
  pricePerUnit Float
  metric     String
  transactions Transaction[]
  watchlist   Watchlist[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Transaction {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  product   Product  @relation(fields: [productId], references: [id])
  productId String
  units     Int
  amount    Float
  createdAt DateTime @default(now())
}

model Watchlist {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  product   Product  @relation(fields: [productId], references: [id])
  productId String
  @@unique([userId, productId])
}
```

Run `npx prisma generate` and `npx prisma migrate dev` to create tables.

---

# API Reference (endpoints)

> Base path: `/api` (the backend mounts `appRouter` at `/api`). Also health check at `/healthz`.

Common header for protected routes:

```
Authorization: Bearer <JWT_TOKEN>
```

### Auth

* `POST /api/auth/signup`

  * Content-Type: `multipart/form-data`
  * Body: `name`, `email`, `password`, `pan`, `kycDoc` (file)
  * Response: `201 { success: true, data: { user, token } }`
  * Notes: KYC is required (middleware validates file). PAN validated using regex `^[A-Z]{5}[0-9]{4}[A-Z]$`.

* `POST /api/auth/login`

  * Content-Type: `application/json`
  * Body: `{ "email": "...", "password": "..." }`
  * Response: `{ success: true, data: { user, token } }`

### Products

* `GET /api/products` — Returns list of all products (auth required).
* `GET /api/products/:id` — Returns a product by ID (auth required).

### Transactions

* `POST /api/transactions` — Create/Update a transaction (auth required).

  * Body:

    ```json
    { "productId": "<uuid>", "units": <int> }
    ```
  * Response: `201 { transaction, updatedBalance }` (backend uses a transaction to deduct user wallet and create/update transaction)

### Portfolio

* `GET /api/portfolio` — Returns:

  ```json
  {
    transactions: [...],
    watchlist: [...],
    totalInvested: number,
    currentValue: number,
    returns: number
  }
  ```

  (auth required)

### Watchlist

* `POST /api/watchlist` — Body: `{ "productId": "<uuid>" }` — adds product to watchlist
* `DELETE /api/watchlist` — Body: `{ "productId": "<uuid>" }` — removes product from watchlist
* `GET /api/watchlist` — list watchlist for the user

### Users

* `GET /api/users/me` — profile (auth required). Returns:

  ```json
  {
    id, name, email, pan, walletBalance, kycImageUrl, createdAt
  }
  ```

---

# Frontend details & integration notes

* Frontend will append `/api` to the `NEXT_PUBLIC_API_BASE_URL` you provide, as implemented in `src/lib/api.ts`. Example:

  * If backend is `http://localhost:4000` set `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000` and requests will go to `http://localhost:4000/api/...`.
* Auth context stores `token` and `user` in `localStorage` and restores on load. Use the `AuthProvider` wrapper and `useAuth()` hook.
* Watchlist is managed via `WatchlistProvider` and `useWatchlistContext()` returning: `{ watchlist, loading, error, add, remove, refetch }`.
* Transaction hook `useTransactions()` will dispatch a `portfolio-updated` event (browser) to notify the app; the portfolio listener or components can subscribe to refresh.
* UI components and pages exist for: products list, product detail (chart with Recharts), portfolio, watchlist, profile, login, signup (file upload via FormData).

---

# File uploads / KYC handling

* Backend middleware `uploadKycDoc` uses multer. Behavior:

  * If `NODE_ENV === "local"` -> saves to `uploads/` folder and sets `req.fileUrl = /uploads/<filename>`
  * Else uses Supabase storage:

    * Uploads the file to `SUPABASE_BUCKET` with a generated path
    * Retrieves public URL and sets `req.fileUrl` to that public URL
* Frontend signup page uses `FormData` and sends `kycDoc` file with `multipart/form-data`.
* Ensure `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_BUCKET` are set for production use.

---

# Error handling & validation

* Zod schemas validate request bodies (signup, login, transactions, watchlist). If Zod fails, controllers typically respond with `400` and errors.
* A `globalErrorHandler` centralizes errors and returns:

```json
{ "success": false, "message": "...", "details": ... }
```

* JWT errors handled by `jwtErrorHandler` with explicit messages for `TokenExpiredError` & `JsonWebTokenError`.
* Common validation details:

  * PAN validated by `PAN_REGEX` and length (10 chars)
  * Password min length 6
  * Transaction units int >= 1 and <= 100000
  * productId must be UUID

---

# Example `curl` requests

**Signup (with file)**

```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=secret123" \
  -F "pan=ABCDE1234F" \
  -F "kycDoc=@/path/to/file.jpg"
```

**Login**

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}'
```

**Get products**

```bash
curl -H "Authorization: Bearer $TOKEN" http://localhost:4000/api/products
```

**Create transaction**

```bash
curl -X POST http://localhost:4000/api/transactions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":"<uuid>", "units": 2}'
```

**Add to watchlist**

```bash
curl -X POST http://localhost:4000/api/watchlist \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":"<uuid>"}'
```

---

# Screenshots

Create a `/screenshots` folder at the repo root and add your screenshots there. Example placeholders are listed below — replace the filenames with your actual screenshots.

```md
## Screenshots

### Login
![Login](/screenshots/login.png)

### Signup (KYC)
![Signup](/screenshots/signup.png)

### Products list
![Products](/screenshots/products.png)

### Product detail (chart + buy)
![Product Detail](/screenshots/product-detail.png)

### Portfolio (summary + transactions)
![Portfolio](/screenshots/portfolio.png)

### Watchlist
![Watchlist](/screenshots/watchlist.png)

### Profile (KYC & details)
![Profile](/screenshots/profile.png)
```

---

# Deployment notes

**Frontend**

* Vercel is an excellent option for Next.js (App Router). Configure `NEXT_PUBLIC_API_BASE_URL` in project environment settings to your backend API URL.
* Make sure to set any public env vars via Vercel UI.

**Backend**

* Deploy to Heroku / Render / Railway / Fly / DigitalOcean / AWS. Configure:

  * `DATABASE_URL` (Postgres)
  * `JWT_SECRET`
  * `SUPABASE_*` if using Supabase storage
  * `NODE_ENV=production`
* Run migrations on the target environment (`npx prisma migrate deploy`) after deploying.

**Supabase**

* If you use Supabase for hosting Postgres and storage, set `DATABASE_URL`, `DIRECT_URL`, `SUPABASE_*` values from your Supabase project. Be careful with bucket policy: ensure uploaded KYC images are accessible only as intended (public read if required by front-end).

---

# Troubleshooting & tips

* **`JWT_SECRET` missing**: backend will exit with a fatal error. Ensure `JWT_SECRET` is set.
* **Local uploads fail**: ensure `uploads/` folder exists and Node process can write to it.
* **Prisma errors**: run `npx prisma generate` and check `DATABASE_URL`.
* **CORS**: backend `app.ts` uses `cors()` — fine for development; tighten for production.
* **Supabase Blob**: server-side `Blob` usage requires Node 18+ (global Blob support). If running older Node, use `buffer` path or upgrade Node.
* **Front-end API path**: frontend appends `/api` to `NEXT_PUBLIC_API_BASE_URL`. If you set `.../api` in env, you may get `.../api/api` — avoid double slashes.

---

# Contributing

Thank you for wanting to improve this project! A short contributing guideline:

1. Fork & create a feature branch.
2. Respect TypeScript types & linting.
3. Add tests for critical paths (auth, transactions).
4. Open a PR with description and testing steps.

---

# License

Add your chosen license here (MIT, Apache-2.0, etc.). Example:

```
MIT License
```

---

# Final notes / checklist before running

* [ ] Copy `.env.example` -> `.env` (backend) and `.env.example` -> `.env.local` (frontend) and fill values.
* [ ] `npx prisma generate` + `npx prisma migrate dev` 
* [ ] Seed products: `npm run build && npm run prisma:seed` (or compiled file)
* [ ] Start backend: `npm run build && npm run start` 
* [ ] Start frontend: `npm run dev` (Next.js)

---