# 🧠 Lead Management System

A full-stack lead management system to collect, validate, and manage leads effectively. Built with **React + TypeScript** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## 🚀 Features

- 🔒 Validated lead form with real-time feedback (phone, email, year)
- 📱 Input fields auto-format (e.g. only numbers in phone/year)
- ❌ Invalid fields get red borders and shake animation
- 📍 Scrolls to first invalid field and focuses
- 🎨 Built with custom `Input`, `Dropdown`, and `Modal` components
- 🌐 Backend API using Express and Mongoose
- 🧾 Auto-printed backend routes during dev
- 💡 Lucide Icons as favicon and in UI

---

## 🖥️ Frontend Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

### 🔧 Setup

```
cd leadmanagement
npm install
npm run dev

````

---

## 🌐 Backend Stack

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Nodemon](https://nodemon.io/)

### 🔧 Setup

```
cd leadmanagement-backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/leadmanagement
```

---

## 📂 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── types/
│   │   └── main.tsx
│   └── index.html
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── utils/printRoutes.ts
│   └── index.ts
```

---

## 🧪 Validations

* ✅ **Phone Number** – Must be exactly 10 digits
* ✅ **Alternate Phone** – Optional but must be 10 digits if provided
* ✅ **Email** – Must be valid format
* ✅ **Passout Year** – 4-digit numeric only
* ✅ **Required Fields** – Show errors with animation

## 🧠 Developer Notes

* All invalid fields scroll into view on submit and shake.
* Backend routes are printed in console on dev start (only if routes are registered before `printRoutes(app)`).
* Input ref management uses `useRef` with key mapping.
* Backend is modularized (routes, controllers, models).

## 🛠️ Future Improvements

* ✅ Toast notifications
* 🔐 Auth (admin login)
* 📊 Lead analytics dashboard
* 📨 Email/SMS integration

---
```
