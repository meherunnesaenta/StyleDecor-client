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
import BecomeDecoratorModal from "../components/Seller/BecomeDecoratorModal";
import Allpayments from "../Pages/Dashboard/Admin/Allpayments";
import UserManagement from "../Pages/Dashboard/Admin/UserManagement";
import AdminRoute from "./AdminRoute";
import AssignedProjects from "../Pages/Dashboard/Decorator/AssignedProjects";
import DecoratorRoute from "./DecoratorRoute";
import CompletedProjects from "../Pages/Dashboard/Decorator/CompletedProjects";
import ViewDecorator from "../components/Admin/ViewDecorator";
import Trackproduct from "../Pages/TrackProduct/Trackproduct";
import Dashboard from "../Pages/Dashboard/Home/Dashboard";
import DecoratorDashboardHome from "../Pages/Dashboard/Home/DecoratorDashboardHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    loader: async () => {
      try {
        console.log("Trying to fetch /serviceCenters.json...");
        const res = await fetch('/serviceCenters.json');
        console.log("Fetch response status:", res.status);

        if (!res.ok) {
          console.error("Fetch failed with status:", res.status);
          return [];
        }

        const data = await res.json();
        console.log("Successfully loaded serviceCenters:", data);
        return data;
      } catch (err) {
        console.error("Loader error while fetching serviceCenters:", err);
        return [];
      }
    },
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
        Component: BookingSuccess
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: '/contact',
        Component: Contact,
        loader: async () => {
          try {
            const res = await fetch('/serviceCenters.json');
            if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
            const data = await res.json();
            console.log("Coverage loader - loaded data:", data);
            return data;
          } catch (err) {
            console.error("Coverage loader error:", err);
            return [];
          }
        }
      },
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
        index: true,
        path:'home',
        element:<Dashboard></Dashboard>
      },
      {
        path: 'dashboard-home',
        element:<DecoratorDashboardHome></DecoratorDashboardHome>
      },
      {
        path: 'my-bookings',
        Component: MyBookings
      },
      {
        path: 'become-decorator',
        loader: () => fetch("/serviceCenters.json"),
        Component: BecomeDecoratorModal
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: 'admin/servicesadd',
        element: <AdminRoute><ServiceAdd></ServiceAdd></AdminRoute>,

      },

      {
        path: 'admin/booking',
        element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>
      },
      {
        path: 'admin/analytics',
        element: <AdminRoute><Analytics></Analytics></AdminRoute>
      },

      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'all-payment-history',
        element: <AdminRoute><Allpayments></Allpayments></AdminRoute>
      },
      {
        path: 'admin/users-maanagement',
        element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
      },

      {
        path: 'view-decorator/:id',
        element: <AdminRoute><ViewDecorator></ViewDecorator></AdminRoute>
      },


      {
        path: 'manage-decorators',
        element: <AdminRoute><DecoratorRequests></DecoratorRequests></AdminRoute>
      },

      {
        path: 'completed-projects',
        element: <DecoratorRoute><CompletedProjects></CompletedProjects></DecoratorRoute>
      },

      {
        path: 'assigned-projects',
        element: <DecoratorRoute><AssignedProjects></AssignedProjects></DecoratorRoute>
      }
    ]

  },

  {
    path: '/track-product/:trackingId',
    Component: Trackproduct
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);