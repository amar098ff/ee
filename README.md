# PRO-SHOP MERN E-Commerce

A production-ready e-commerce platform built with the MERN stack and Stripe integration.

## Features
- JWT Authentication
- Modern, Responsive UI with Tailwind CSS
- Stripe Payment Integration
- MVC Backend Architecture
- Product Browsing, Filtering, and Sorting
- Persistent Cart Management

## Prerequisites
- MongoDB installed locally or a MongoDB Atlas account
- Node.js (v16+)
- Stripe Account (for API keys)

## Setup Instructions

### 1. Backend Setup
1. Navigate to `/backend`
2. Run `npm install`
3. Rename `config/config.env` placeholders with your actual credentials:
   - `PORT=4000`
   - `DB_URI=your_mongodb_uri`
   - `JWT_SECRET=your_secret_key`
   - `STRIPE_API_KEY=pk_test_...`
   - `STRIPE_SECRET_KEY=sk_test_...`
4. Run `npm start` (or `node server.js`)

### 2. Frontend Setup
1. Navigate to `/frontend`
2. Run `npm install`
3. Run `npm run dev`
4. Access the app at `http://localhost:5173`

### 3. Database Seeding (Optional)
Create a user with `admin` role directly in MongoDB to access admin features.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Lucide Icons, Axios, Stripe React SDK
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Stripe Node SDK
