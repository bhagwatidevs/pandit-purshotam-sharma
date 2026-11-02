# Astrology Website — React + Express + MongoDB

This folder contains the refactored React/Vite frontend and the Express/MongoDB backend from the supplied astrology project.

## Included dynamic features

- Product cards load from `GET /api/product`.
- Blog/article cards and the footer's recent posts load from `GET /api/blog`.
- Gallery images load from `GET /api/photo`.
- Inquiry/appointment form saves through `POST /api/contact`.
- Newsletter form stores unique emails through `POST /api/subscribers`.
- Register/sign-in use the existing authentication APIs and store the JWT in browser local storage.
- Product add-to-cart and the cart page use the authenticated `/api/cart` APIs.
- Admin page at `/admin` shows database statistics and supports creating, editing, and deleting blog posts, press releases, products, and gallery photos. Inquiry and subscriber records can also be edited. Uploads require an admin account and Cloudinary configuration.
- Product checkout uses the backend payment endpoints. Without Razorpay credentials in development, the backend clearly labels a development-only test order that does not charge money. A full Kundli payment/generation user flow can be added to the service page as a separate feature.

## Folder layout

- `src/` — React frontend
- `backend/` — Express API, Mongoose models, controllers, routes, and upload/email/payment helpers
- `.env.example` — frontend API URL
- `backend/.env.example` — server environment variable template

## Setup

Requirements: a recent supported Node.js release, npm, and a MongoDB instance. Cloudinary, Brevo, Razorpay, and Gemini credentials are only needed for the features that use those providers.

### 1. Configure the backend

Open Terminal in this project folder and run:

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and set at least:

- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — a long private random string
- `FRONTEND_ORIGIN` — allowed frontend origins for production (default port 5173). In development, localhost/127.0.0.1 origins on any port are accepted to support Vite auto-selecting 5174/5175 when 5173 is busy.

For image publishing, configure `CLOUD_NAME`, `API_KEY`, and `API_SECRET`.
For email notifications, configure `ADMIN_EMAIL` and `BREVO_API_KEY`.
For real payments, configure the Razorpay server-side keys.
For AI-assisted Kundli generation, configure `GEMINI_API_KEY`.
If you enable real Kundli payments, set `KUNDLI_PRICE_INR` to the actual service price in rupees.

Install and start the server:

```bash
npm install
npm run dev
```

The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health`.

### 2. Optional: create the first admin

In the backend `.env`, set `INITIAL_ADMIN_EMAIL` and a unique `INITIAL_ADMIN_PASSWORD` (at least 12 characters), then run in another backend terminal:

```bash
npm run seed:admin
```

The seed script does not contain a hardcoded password. After creating the admin, do not leave the setup password in shared files.

### 3. Configure and start the frontend

Open a second Terminal at the project root (not inside `backend`):

```bash
cp .env.example .env
npm install
npm run dev
```

Open the local URL Vite prints, for example `http://localhost:5173` or `http://localhost:5175`. The API client calls `http://localhost:5000` directly in development, so keep `VITE_API_URL=` blank locally or set it explicitly to `http://localhost:5000`. Do not set it to the Vite frontend port (5173/5175).

### 4. Optional sample data

If your connected database is empty and you want sample blog/product/photo records:

```bash
cd backend
npm run seed:data
```

This script is idempotent and only inserts sample records that are missing; it does not clear existing content. Sample image URLs may need replacing with real Cloudinary URLs.

## API endpoints from the original backend

- `/api/auth` — registration, login, profile, users
- `/api/blog` — read and admin create/delete blog posts
- `/api/product` — read and admin create/delete products
- `/api/photo` — read and admin create/delete photos
- `/api/contact` — inquiry submissions and admin contact list
- `/api/subscribers` — newsletter subscription list (admin-only to read)
- `/api/cart` — authenticated cart operations
- `/api/orders` — authenticated order operations
- `/api/payment` — Razorpay order/payment endpoints
- `/api/kundli` — authenticated Kundli endpoints
- `/api/admin` — admin-only stats, orders, and users
- `/api/health` — backend/database status

## Security and configuration notes

- Real secret values from the uploaded archive were deliberately not copied to this project. Populate `backend/.env` locally; do not commit or share it.
- If any keys in the source archive were real and active, rotate the MongoDB password, JWT secret, Cloudinary credentials, Brevo key, Razorpay keys and Gemini key because the archive contained plaintext environment values.
- The backend blocks the development payment-mock path when `NODE_ENV=production`; do not set production credentials in a local test setup.
- Review payment and Kundli business logic with a backend developer before taking real payments or deploying publicly. The original payment design is retained for compatibility; this project does not claim a production payment audit.
- Admin content uploads store the image on Cloudinary and records in MongoDB. Without Cloudinary values, upload requests will fail, while public reads and most frontend pages can still be tested.

## Troubleshooting local API / CORS errors

- Run the backend in one terminal (`cd backend && npm run dev`) and the frontend in a second terminal (`npm run dev` from the project root).
- Development API requests default to `http://localhost:5000` directly. Backend CORS allows local dev origins on any port. Vite also has an `/api` proxy to `127.0.0.1:5000` for same-origin configurations.
- In the frontend `.env`, leave `VITE_API_URL=` blank for local development (the code defaults to `http://localhost:5000`) or set it explicitly to `http://localhost:5000`. If API errors still show port `5173` in the requested URL, the browser is running an old frontend build or the wrong project folder; stop and restart Vite from this project root. Restart Vite after changing environment variables or `vite.config.js`.
- Open `http://localhost:5000/api/health`. It should report `"database":"Connected"`. Open `http://localhost:5000/api/routes` to verify the running backend has `GET` and `POST /api/press-release` registered. If it says `Disconnected`, set a valid `MONGO_URI` in `backend/.env`, make sure local MongoDB is running or the Atlas network access is configured, then restart the backend.
- The `Download the React DevTools` console line is informational, not a runtime error. The app now includes an explicit favicon link and `public/favicon.ico` to prevent the common missing-favicon request.

## Product carousel and shop catalogue

- Home page: `PopularProducts.jsx` displays up to 8 backend products in a responsive auto-playing Swiper carousel. Its **View More** button opens `/products`.
- Full catalogue: `/products` and the navbar's `/product` route open `ProductsPage.jsx`, with search, sorting, prices, and Add to Cart controls.
- Cart: `/cart` uses the authenticated backend cart API. Users need to sign in before adding products.

Both product views read from `GET /api/product`. Cart additions use `POST /api/cart/add` with `{ productId, quantity }`.


## Separating news releases from blog articles

The admin dashboard's Blogs tab now includes a Content type field. Choose **Blog Article** for educational astrology posts or **News / Press Release** for announcements and media coverage. The backend stores this as `contentType` and supports `GET /api/blog?type=article` and `GET /api/blog?type=news`. The `/blog` page displays articles; `/press-release` displays news only. Older documents without `contentType` are classified using their category (categories containing “news” or “press” are treated as news).

## Admin content management

Open `/admin` while signed in with an account whose database role is `admin`.
The dashboard has separate **Blog Articles** and **Press Releases** tabs. A new press release is saved with `contentType: "news"` and appears on `/press-release`; a blog article is saved with `contentType: "article"` and appears on `/blog` and the home Latest Articles section.

The admin can add, edit and delete blog articles, press releases and products. Gallery entries can be edited by replacing their image. Customer inquiries and newsletter subscriber email addresses can also be edited or deleted. Update routes are protected with the admin role middleware.

Relevant backend update endpoints are `PUT /api/blog/:id`, `PUT /api/product/:id`, `PUT /api/photo/:id`, `PUT /api/contact/:id`, and `PUT /api/subscribers/:id`. New image uploads require valid Cloudinary environment values in `backend/.env`; text-only edits do not require uploading a replacement image.
