# 🎨 StyleDecor – Smart Home & Ceremony Decoration Booking System

## 🎯 Project Purpose
StyleDecor is a modern web-based appointment and booking management system designed for home and ceremony decoration services.  
It helps local decoration businesses manage online bookings, decorator assignments, payments, and real-time service tracking efficiently.

---

## 🌐 Live Website
Client: https://cheery-cranachan-6e2445.netlify.app/  
Server: https://style-decor-server-xi.vercel.app 

---


## ✨ Key Features

### 👤 User Features
- Browse decoration services and packages
- Search services by name
- Filter services by category and budget range
- View detailed service information
- Book consultation or on-site decoration services
- Secure payment using Stripe
- View booking history and payment receipts
- Track real-time service status
- Cancel or update bookings

### 🛠️ Admin Features
- Manage decorators (Create, Update, Disable)
- Manage decoration services & packages (CRUD)
- Assign decorators for on-site services
- Verify booking payment status
- Revenue monitoring
- Analytics dashboard with charts
- Service demand visualization

### 🎨 Decorator Features
- View assigned projects
- Check today’s schedule
- Update project status step-by-step:
  - Assigned
  - Planning Phase
  - Materials Prepared
  - On the Way to Venue
  - Setup in Progress
  - Completed
- View earnings summary
- Payment history tracking

### 🔐 Authentication & Security
- Firebase authentication (Email/Password & Social Login)
- JWT-based authentication for protected routes
- Role-based routing (Admin, Decorator, User)
- Secure environment variables

### 💳 Payment System
- Stripe payment integration
- Secure transaction storage in database
- Payment receipt available in user dashboard

### 🌍 Additional Features
- Interactive service coverage map using React Leaflet
- Animated hero section using Framer Motion
- Global loading spinner & skeletons
- Global error handling
- Toast notifications for success & error messages
- Fully responsive for mobile, tablet, and desktop

---

## 🧰 Technologies Used

### Frontend
- React.js
- Tailwind CSS
- DaisyUI
- React Router DOM
- Axios
- Framer Motion
- React Leaflet
- Firebase Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe API

### Hosting & Services
- Firebase
- ImageBB / Cloudinary (Image Upload)
- Vercel (Client)
- Render / Railway / Vercel (Server)

---

## 📦 NPM Packages Used

### Client Side
- react
- react-router-dom
- axios
- firebase
- framer-motion
- react-leaflet
- react-hot-toast
- daisyui
- tailwindcss
- npm i react-icons
- npm i framer-motion
- npm i react-icons/fa
- npm i @tanstack/react-query
- npm i sweetalert2
- npm i clsx
- @headlessui/react
- react-confetti
- react-responsive-carousel
- recharts
- lucide-react
- react-lottie
- date-fns
- chart.js
- react-chartjs-2

### Server Side
- express
- cors
- mongodb
- jsonwebtoken
- stripe
- dotenv

---

## 🔐 Environment Variables

### Client (.env)
```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_IMGBB_API_KEY=
