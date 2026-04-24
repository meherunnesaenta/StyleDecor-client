# StyleDecor

A smart full-stack web application for booking and managing home and ceremony decoration services. It enables users to book services, admins to manage operations, and decorators to handle assigned projects efficiently.

🌐 **Live Website**
Client: https://cheery-cranachan-6e2445.netlify.app/

Server: https://style-decor-server-xi.vercel.app

---

## 🎯 Project Purpose

StyleDecor is designed to digitize and streamline the decoration service industry. It helps local businesses manage bookings, assign decorators, track progress, and handle payments in a modern, efficient way.

---

## ✨ Key Features

### 👤 User Features

* Browse decoration services & packages
* Search services by name
* Filter by category & budget
* View detailed service information
* Book consultation or on-site services
* Secure payment via Stripe
* Track booking status in real-time
* View booking history & receipts
* Cancel or update bookings

---

### 🛠️ Admin Features

* Manage decorators (Create, Update, Disable)
* Manage services & packages (CRUD)
* Assign decorators for projects
* Verify payment status
* Monitor revenue
* Analytics dashboard with charts
* Service demand visualization

---

### 🎨 Decorator Features

* View assigned projects
* Daily schedule tracking
* Update project status step-by-step:

  * Assigned
  * Planning Phase
  * Materials Prepared
  * On the Way
  * Setup in Progress
  * Completed
* View earnings summary
* Track payment history

---

## 🔐 Authentication & Security

* Firebase Authentication (Email/Password & Social Login)
* JWT-based authentication
* Role-based access control (Admin, Decorator, User)
* Secure environment variables

---

## 💳 Payment System

* Stripe integration
* Secure transactions
* Payment receipt in dashboard

---

## 🌍 Additional Features

* 🗺️ Interactive map (React Leaflet)
* 🎬 Animations (Framer Motion)
* 🔄 Global loading & skeleton UI
* ⚠️ Error handling system
* 🔔 Toast notifications
* 📱 Fully responsive design

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* DaisyUI
* React Router
* Axios
* Framer Motion
* React Query
* Chart.js / Recharts

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* Firebase + JWT

### Payment

* Stripe

### Hosting

* Client: Netlify
* Server: Vercel / Render / Railway

---

## 📦 Installation

### 1. Clone the repository

```bash id="p3s9ka"
git clone https://github.com/your-username/styledecor.git
cd styledecor
```

### 2. Install dependencies

```bash id="d9n2fp"
npm install
```

### 3. Run development server

```bash id="o4z8ml"
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the client:

```env id="l2f8cn"
VITE_API_URL=your_backend_url
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_STRIPE_PUBLISHABLE_KEY=your_key
```

Server `.env`:

```env id="m7k2sa"
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_key
```

---

## 📁 Folder Structure

```id="u1h9ks"
/src
 ├── components
 ├── pages
 ├── hooks
 ├── services
 ├── layouts
 ├── routes
 └── utils
```

---

## 📊 API Overview

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | /services        | Get all services      |
| POST   | /bookings        | Create booking        |
| PATCH  | /bookings/:id    | Update booking status |
| GET    | /dashboard/stats | Admin analytics       |

---

## 🚀 Deployment

* Frontend: Netlify / Vercel
* Backend: Vercel / Render / Railway

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed with ❤️ to simplify decoration service booking and management.

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
