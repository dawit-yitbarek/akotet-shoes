# Akotet Shoes

Akotet Shoes is a premium leather shoe e-commerce platform featuring a dark, high-end design, smooth shopping experience, online payments with Chapa, and a custom admin panel for managing products and orders. The system includes product filtering, size search, cost sorting, and secure backend APIs powered by Express and PostgreSQL.

---

## 👞 Features

# Akotet Shoes

Akotet Shoes is a small e-commerce project for selling premium leather shoes. It contains a React + Vite frontend and an Express + PostgreSQL backend with image uploads (Cloudinary) and payment integration (Chapa).

**Repository layout**
- `akotet-frontend/` — React app (Vite + Tailwind)
- `akotet-backend/` — Node.js + Express API

**Quick overview**
- Browse products, filter by size, and sort by price.
- Place orders and pay via Chapa integration (backend).
- Admin panel for managing products and orders (frontend-protected).

---

**Features**
- **User:** product listing, search by code, size filter, price sorting, checkout with Chapa.
- **Admin:** add/update/delete products, image uploads via Cloudinary, view/manage orders and payment references.

---

**Tech stack**
- Frontend: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express
- Database: PostgreSQL
- Storage: Cloudinary
- Payments: Chapa

---

**Local setup (Windows / PowerShell)**

Prerequisites:
- Node.js (LTS)
- npm (comes with Node)
- PostgreSQL

1) Clone the repo

```powershell
git clone https://github.com/dawit-yitbarek/akotet-shoes.git
cd akotet-shoes
```

2) Backend

```powershell
cd akotet-backend
npm install
```

Create a `.env` file in `akotet-backend/` with the following variables (example names):

```env
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DATABASE
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CHAPA_API_SECRET=your_chapa_api_key
PORT=5000
```

Start backend:

```powershell
node server.js
```

If you use `nodemon` for development:

```powershell
npx nodemon server.js
```

3) Frontend

```powershell
cd ..\akotet-frontend
npm install
```

Create a `.env` file in `akotet-frontend/` with:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_FRONTEND_URL=http://localhost:5173
VITE_ADMIN_PASSWORD=your_admin_password
```

Start frontend (Vite):

```powershell
npm run dev
```

Open the app in your browser at `http://localhost:5173` (Vite default).

---

**Database (example schema)**

Below are simplified SQL examples used by the project. The real app may create tables programmatically.

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  code INTEGER,
  price INTEGER NOT NULL,
  size INTEGER,
  image_url TEXT,
  posted_at TIMESTAMP DEFAULT now()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR,
  phone VARCHAR NOT NULL,
  address TEXT,
  product_code VARCHAR,
  price INTEGER,
  status VARCHAR DEFAULT 'pending',
  chapa_tx_ref TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  image_url TEXT
);
```

---

**Environment notes & tips**
- Make sure `DATABASE_URL` points to a reachable Postgres instance.
- Ensure Cloudinary credentials are correct before uploading images.
- Chapa API secret must be kept private; do not commit `.env` files.

**Deployment**
- Frontend can be deployed to Vercel, Netlify, or similar platforms (build step: `npm run build`).
- Backend can be hosted on platforms that support Node (Heroku, render.com, DigitalOcean App Platform, etc.) with a managed Postgres add-on.

---

**Contact**
- Repo owner: `dawit-yitbarek` (GitHub)
