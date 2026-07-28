🎯 Sentinel Gear (TacticalStore)

A full-stack airsoft e-commerce store with a dark, tactical "command center" vibe. Browse gear, filter and sort products, check out as a guest, and pay with Stripe — no BS, just loadout shopping.

📦 Stack


Next.js 14 (App Router)
TypeScript
Tailwind CSS
Prisma + PostgreSQL
Redux Toolkit
Stripe
Supabase Storage
JWT auth (via jose, Edge-compatible)


✨ Quick start

bashnpm install
npx prisma generate
npm run dev

Don't forget your .env — you'll need a Postgres connection string, Stripe keys, and Supabase credentials.

🛒 Shopping flow


Browse & filter — category filters + custom sort dropdown, all URL-based
Add to cart — Redux-powered cart sidebar
Checkout — multi-step modal, guest checkout supported (no account needed)
Pay — Stripe handles the money, webhooks handle the confirmation
Admin — full CRUD on products, protected by role-based JWT auth


🎨 Look & feel

Dark, gothic-military aesthetic. Sharp font-display headers, #353535 borders, uppercase eyebrow labels everywhere. Think "special forces gear catalog," not "cute boutique."

🤖 How it works

Auth is JWT-based with roles baked into the token, checked in middleware to gate /admin routes. Products, filtering, and sorting are driven by Prisma queries with URL search params as the source of truth — no client-side state drift. Cart lives in Redux and survives the checkout modal's multiple steps. Orders don't require a userId (guest checkout is a first-class citizen, not an afterthought), and product images are hosted on Supabase Storage instead of bloating the repo.

📁 Project structure

src/
  app/
    admin/              # Admin dashboard + protected routes
    api/                # Route handlers (auth, products, checkout, webhooks)
    products/            # Product listing + detail pages
  components/
    cart/                # Cart sidebar, checkout modal
    products/            # Filter bar, sort dropdown, product cards
  lib/
    prisma.ts            # Prisma client
    auth.ts              # JWT helpers
  store/                 # Redux slices

👤 Author

Milos Lazendic — github.com/itsmilos
