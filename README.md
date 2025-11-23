# Akotet Shoes

Akotet Shoes is a premium leather shoe e-commerce platform featuring a dark, high-end design, smooth shopping experience, online payments with Chapa, and a custom admin panel for managing products and orders. The system includes product filtering, size search, cost sorting, and secure backend APIs powered by Express and PostgreSQL.

---

## 👞 Features

### 🛍️ User Features
- Browse premium 100% leather shoes  
- Dark, elegant UI focusing on brand identity  
- Search products by shoe code  
- Filter by shoe size  
- Sort products by price  
- Place orders with full Chapa online payment integration  
- Responsive and mobile-friendly design  

### 🔧 Admin Features
- Secure admin panel (password protected on frontend)  
- Add, update, or delete products  
- Upload product images via Cloudinary  
- View and manage customer orders  
- Track payment references (`chapa_tx_ref`)  
- Update order status (pending → paid → delivered)  

---

## 🛠️ Tech Stack

### **Frontend**
- React + Vite  
- Tailwind CSS  
- Axios  

### **Backend**
- Node.js  
- Express  
- PostgreSQL  
- Cloudinary (image upload)  
- Chapa Payment API  
- CORS  


---

## 🗄️ Database Schema

Akotet Shoes uses PostgreSQL with two main tables:

```sql
CREATE TABLE IF NOT EXISTS public.products
(
  id SERIAL PRIMARY KEY,
  code INTEGER,
  price INTEGER NOT NULL,
  size INTEGER,
  image_url TEXT,
  posted_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.orders
(
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


⚙️ Installation & Setup

Clone the repository and install dependencies for backend and frontend:

git https://github.com/dawit-yitbarek/akotet-shoes.git
cd akotet-shoes


📦 Backend Setup
cd akotet-backend
npm install

Create a .env file inside /akotet-backend:

DATABASE_URL=your_postgres_url
FRONTEND_URL=your_frontend_url
BACKEND_URL=your_backend_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CHAPA_API_SECRET=your_chapa_api_key
PORT=port_number

Run the backend:
node server.js


💻 Frontend Setup
cd akotet-frontend
npm install

Create a .env file inside /akotet-frontend:

VITE_BACKEND_URL=your_backend_url
VITE_FRONTEND_URL=your_frontend_url
VITE_ADMIN_PASSWORD=your_admin_passkey

Run the frontend:
npm run dev


🌐 Deployment

Frontend deployed at:
https://akotet-shoes.vercel.app/


📌 Future Improvements

Add product categories and subcategories

Add inventory/stock management

Customer account system with order history

Admin analytics dashboard

Multi-image product galleries

Discount and coupon system