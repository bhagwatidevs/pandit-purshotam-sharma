# Astrology API

See the top-level `README.md` for full setup. Copy `.env.example` to `.env`, configure MongoDB and `JWT_SECRET`, then run:

```bash
npm install
npm run dev
```

The server defaults to port 5000. Keep `.env` private.

## Admin content editing

All update and delete endpoints for content are admin-protected. Blog article and press release records share the Blog model but use `contentType: "article"` or `contentType: "news"` so their public pages remain separate.

- `PUT /api/blog/:id`: edit article/news text and optionally replace its image.
- `PUT /api/product/:id`: edit product name, description, price, old price, and optionally replace image.
- `PUT /api/photo/:id`: replace a gallery image (image upload required).
- `PUT /api/contact/:id`: edit a customer inquiry.
- `PUT /api/subscribers/:id`: edit subscriber email.
- Subscriber and content delete endpoints require an admin token too.

Image uploads require `CLOUD_NAME`, `API_KEY`, and `API_SECRET` in `backend/.env`. Existing images are kept if an edit does not upload a replacement image.


## Press releases API

- `GET /api/press-release` — public list of press releases.
- `POST /api/press-release` — admin-only create (optional image requires Cloudinary).
- `PUT /api/press-release/:id` — admin-only update.
- `DELETE /api/press-release/:id` — admin-only delete and only removes a news/press record.
- `GET /api/routes` — shows the active server's route registry even if MongoDB is disconnected.

The root frontend uses `VITE_API_URL`; in local development it defaults to `http://localhost:5000`.
