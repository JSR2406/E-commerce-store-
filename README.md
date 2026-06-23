# Apparel Artisan

Full-stack e-commerce scaffold built from the course brief and lesson notes.

## Structure

- `server/` Express, MongoDB, Mongoose, JWT authentication, product/cart/order APIs
- `client/` React, React Router, Redux Toolkit, Axios, Tailwind CSS

## Features

- user registration and login
- public product catalog and product detail pages
- authenticated cart management
- simulated frontend order history
- admin product management and dashboard

## Getting Started

1. Install dependencies in `server/` and `client/`
2. Copy `server/.env.example` to `server/.env`
3. Start the backend and frontend separately

## Run It

- Backend: `npm run dev --workspace server`
- Frontend: `npm run dev --workspace client`
- Seed data: `npm run seed --workspace server`

## Environment

- `server/.env` needs `MONGODB_URI`, `JWT_SECRET`, and optionally `CLIENT_ORIGIN`
- `client/.env` can set `VITE_API_BASE_URL` if the API is not on `http://localhost:5000/api`

## Render Deploy

- Use [`render.yaml`](./render.yaml) for the backend API service on Render.
- Set `MONGODB_URI` in the Render dashboard during Blueprint creation.
- The frontend is configured to use `https://apparel-artisan-api.onrender.com/api` by default, and you can override it with `VITE_API_BASE_URL` for local or alternate deployments.
