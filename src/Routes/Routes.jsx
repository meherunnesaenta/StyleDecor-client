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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
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
      }
    ] 
  },
  {
    path: "*",
    Component:ErrorPage
  }
]);