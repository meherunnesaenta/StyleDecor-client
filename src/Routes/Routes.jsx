import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ErrorPage from "../Pages/Error/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import MyBookings from "../Pages/Dashboard/MyBooking/MyBookings";
import BookService from "../BookService/BookService";
import Profile from "../Pages/Dashboard/Profile/Profile";
import ServiceAdd from "../Pages/Dashboard/Admin/ServiceAdd";
import ServiceDetails from "../components/Home/ServiceDetails";
import Service from "../components/Home/Service";
import BookingSuccess from "../components/Home/BookingSuccess";
import DecoratorRequests from "../components/Dashboad/DecoratorRequest";
import About from "../components/Home/About";
import Contact from "../components/Home/Contact";
import ManageBookings from "../Pages/Dashboard/Admin/ManageBookings";
import PaymentHistory from "../Pages/Dashboard/Admin/PaymentHistory";
import Analytics from "../Pages/Dashboard/Admin/Analytics";
import EditPages from "../Pages/Dashboard/EditPages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    loader: () => fetch('/serviceCenters.json').then(res => res.json()),
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'bookingService',
        element: <BookService></BookService>,
      },
      {
        path: '/services',
        Component: Service
      },
      {
       path: '/service/:id',
       Component: ServiceDetails
      },
      {
        path: '/bookings/edit/:id',
        Component: EditPages
      },
      {
        path: '/booking-success',
        Component:BookingSuccess
      },
      {
        path:'/about',
        Component:About
      },
      {
        path:'/contact',
        Component:Contact
      }
    ]
  },
    
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
    {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      { 
        path: 'my-bookings',
        Component: MyBookings
      },
      {
        path:'profile',
        Component:Profile
      },
      {
        path:'admin/servicesadd',
        Component:ServiceAdd
      },
      {
        path:'admin/booking',
        Component:ManageBookings
      },
      {
        path:'admin/analytics',
        Component:Analytics
      },

      {
        path:'payment-history',
        Component:PaymentHistory
      },
      
      
      {
        path:'manage-decorators',
        Component:DecoratorRequests
      }
    ] 
  },
  {
    path: "*",
    Component:ErrorPage
  }
]);