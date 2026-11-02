# Local run and deployment checklist

## Local development

1. Copy `backend/.env.example` to `backend/.env`, then set a valid `MONGO_URI` and a long private `JWT_SECRET`.
2. Terminal 1: `cd backend && npm install && npm run dev`.
3. Terminal 2 (project root): `npm install && npm run dev`.
4. Check `http://localhost:5000/api/health` and `http://localhost:5000/api/routes`. The route list must include `/api/press-release`.
5. The frontend defaults to calling the API at `http://localhost:5000` in development.
6. If `/api/press-release` still returns 404, run `GET http://localhost:5000/api/routes`. If the route list doesn't include it, stop the old backend process and run `npm run dev` from this project's `backend/` folder. If it does include the route, make sure MongoDB is connected at `/api/health`; 503 means the route was found but the database is offline.

## Fixing an old backend still returning 404 for press-release

A 404 on `GET /api/press-release` from this source should not happen: `backend/index.js` mounts `backend/routes/pressReleaseRoutes.js`. If `/api/routes` does not list the route, the process on port 5000 is not running this code. Stop the old backend in its terminal with Ctrl+C, then start it from this project's `backend` folder using `npm run dev`. Do not start `npm run dev` from inside `backend` for the frontend.

On macOS, to inspect which process owns port 5000, run `lsof -nP -iTCP:5000 -sTCP:LISTEN`. Stop only the old process you recognise, then restart the backend from this project.

## Admin account recovery

Set `INITIAL_ADMIN_EMAIL`, `INITIAL_ADMIN_PASSWORD` (12+ characters), and `INITIAL_ADMIN_NAME` in `backend/.env`, then run `npm run seed:admin` from `backend/`. If an account already exists for that email, the script makes no changes by default. To deliberately reset that exact account and promote it to admin, set `RESET_EXISTING_ADMIN=true`, run the seed command once, then set it back to `false`. Do not enable the reset flag in a public/deployed environment.

## Production deployment

- Deploy `backend/` as a Node web service. `backend/render.yaml` is a starter blueprint; set all secret environment variables in the host dashboard.
- Deploy the frontend to Vercel/Netlify or another static host. `vercel.json` enables history fallback for React Router on Vercel.
- Set the frontend build-time environment variable `VITE_API_URL` to the deployed backend origin (for example, `https://your-api.onrender.com`).
- Set backend `FRONTEND_ORIGIN` to the exact deployed frontend origin. Do not use `*` for a production origin when credentials are involved.
- Configure MongoDB Atlas network access and credentials, plus Cloudinary/Brevo/Razorpay/Gemini credentials for the features you use. Never commit real `.env` files.
- This is deploy configuration scaffolding, not proof of a live production deployment. Verify APIs, image uploads, authentication, payments and database access in staging before launch.
