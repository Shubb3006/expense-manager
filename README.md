# 💸 Expense Tracker App

A modern, full-stack **Expense Tracker** built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase** for authentication and data storage. The app allows users to sign up, log in, manage their expenses, and track their spending in a user-friendly dashboard — fully responsive and optimized for dark mode.

## 🔗 Live Demo

👉 [Check it Live](https://expense-manager-virid-nine.vercel.app/)

---

## ✨ Features

- ✅ User authentication (Sign Up / Log In / Log Out) using Supabase
- ✅ Protected routes with session handling
- ✅ Add, edit, and delete expenses
- ✅ Dark mode compatible UI
- ✅ Responsive design for mobile and desktop
- ✅ Clean and modern UI using Tailwind CSS

---

## 🛠️ Tech Stack

| Frontend     | Backend   | Auth        | Styling      | Hosting     |
|--------------|-----------|-------------|--------------|-------------|
| Next.js 14   | Supabase  | Supabase    | Tailwind CSS | Vercel      |

---

## 🔐 Authentication Flow

- Email/password-based authentication with Supabase.
- Custom login/signup UI with validation.
- Stores additional user profile data in a `profiles` table.

---

## 📁 Folder Structure

app/
├── page.jsx # Home Page
├── login/page.jsx # Login/Signup Page
├── expenses/ # List, Add Expenses
├── layout.jsx # Layout wrapper
components/
├── Navbar.jsx # Top navigation bar
context/
├── Authcontext.tsx # Supabase auth context
lib/
├── supabase.ts # Supabase client setup
public/
styles/

---
