import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './Layout/MainLayout.jsx';
import Home from './Pages/Home/Home/Home.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import Login from './Pages/Authentication/Login/Login.jsx';
import Signup from './Pages/Authentication/Register/SignUp.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import Dashboard from './Layout/Dashboard.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx';
import Matches from './Pages/Matches/Matches.jsx';
import MatchesDetails from './Pages/Matches/MatchesDetails.jsx';
import EditBioData from './Pages/DashboardPage/DashboardUser/EditBioData.jsx';
import AllUser from './Pages/DashboardPage/DashboardAdmin/AllUser.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import FavoriteBioData from './Pages/DashboardPage/DashboardUser/FavoriteBioData.jsx';
import ViewBioData from './Pages/DashboardPage/DashboardUser/ViewBioData.jsx';
import About from './Pages/About/About.jsx';
import ContactRequest from './Pages/Matches/ContactRequest.jsx';
import MyContactRequest from './Pages/DashboardPage/DashboardUser/MyContactRequest.jsx';
import AdminHome from './Pages/DashboardPage/DashboardAdmin/AdminHome.jsx';
import ApprovedPremium from './Pages/DashboardPage/DashboardAdmin/ApprovedPremium.jsx';
import ApprovedContactRequest from './Pages/DashboardPage/DashboardAdmin/ApprovedContactRequest.jsx';
import GotMarried from './Pages/DashboardPage/DashboardUser/GotMarried.jsx';
import SuccessStory from './Pages/DashboardPage/DashboardAdmin/SuccessStory.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/matches',
        element: <Matches></Matches>
      },
      {
        path: '/matches/:id',
        element: <PrivateRoute><MatchesDetails></MatchesDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://matrimony-server-mu.vercel.app/matchesBio/${params.id}`)
      },
      {
        path: '/requestContact/:id',
        element: <ContactRequest></ContactRequest>,
        loader: ({ params }) => fetch(`https://matrimony-server-mu.vercel.app/matchesBio/${params.id}`)
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: 'contact',
        element: <PrivateRoute><Contact></Contact></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Signup></Signup>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      // user Routes
      {
        path: '/dashboard/editBioData',
        element: <EditBioData></EditBioData>
      },
      {
        path: '/dashboard/viewBioData',
        element: <ViewBioData></ViewBioData>
      },
      {
        path: '/dashboard/userContactRequest',
        element: <MyContactRequest></MyContactRequest>,
      },
      {
        path: '/dashboard/favorites',
        element: <FavoriteBioData></FavoriteBioData>
      },
      {
        path: '/dashboard/gotMarried',
        element: <GotMarried></GotMarried>
      },
      // admin Routes

      {
        path: '/dashboard/admin',
        element: <AdminHome></AdminHome>
      },
      {
        path: '/dashboard/manage',
        element: <AllUser></AllUser>
      },
      {
        path: '/dashboard/premium',
        element: <ApprovedPremium></ApprovedPremium>
      },
      {
        path: '/dashboard/adminContactRequest',
        element: <ApprovedContactRequest></ApprovedContactRequest>,
      },
      {
        path: '/dashboard/successStory',
        element: <SuccessStory></SuccessStory>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
