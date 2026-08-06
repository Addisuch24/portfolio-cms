# Portfolio CMS

A full-stack portfolio CMS built with React, Vite, Node.js, Express, MySQL, and JWT authentication.

## Features

- Public portfolio frontend with projects, skills, social links, and contact form
- Admin dashboard for managing projects, skills, experiences, social links, and messages
- JWT-based authentication for admin routes
- Cloudinary image uploads, Multer file handling, and email notifications via SMTP
- MySQL backend with migration helpers for required schema columns

## Tech Stack

- Frontend: React, Vite, Bootstrap, React Router, Framer Motion
- Backend: Node.js, Express, MySQL, JWT, Cloudinary, Nodemailer
- Tools: ESLint, Nodemon, dotenv

## Repository Structure

- `client/` - React frontend application
- `server/` - Express backend API and database setup
- `server/env.example` - example backend environment variables

## Prerequisites

- Node.js 18+ installed
- npm installed
- MySQL server available

## Setup

### Backend

1. Open a terminal in `server/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `server/.env` based on `server/env.example`
4. Fill in required values:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM`, `EMAIL_TO`

### Frontend

1. Open a terminal in `client/`
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

### Backend

From the `server/` folder:

```bash
npm run dev
```

### Frontend

From the `client/` folder:

```bash
npm run dev
```

## Admin Login

- Admin pages require a valid JWT token stored in `localStorage` under `token`
- Use the admin login page at `/admin/login`
- If you see `Invalid or expired token`, clear the saved token and log in again:

```js
localStorage.removeItem('token')
```

## Notes

- If `server/.env` is missing or incomplete, the backend can fail to sign JWTs or connect to the database
- Keep secret values out of source control
- For production, use secure environment values and do not expose `.env` files

## Troubleshooting

- `Cannot find module 'express'`: run `npm install` in `server/`
- `Cannot resolve 'vite'`: run `npm install` in `client/`
- `JWT_SECRET is not configured`: ensure `JWT_SECRET` exists in `server/.env`
- `Invalid api_key`: update Cloudinary credentials in `server/.env`

## License

MIT
