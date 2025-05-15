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
        loader: ({ params }) => fetch(`http://localhost:5000/matchesBio/${params.id}`)
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
        element: <p>view</p>
      },
      {
        path: '/dashboard/contactRequest',
        element: <p>contact</p>
      },
      {
        path: '/dashboard/favorites',
        element: <FavoriteBioData></FavoriteBioData>
      },
      {
        path: '/dashboard/gotMarried',
        element: <p>gotMarried</p>
      },
      // admin Routes

      {
        path: '/dashboard/admin',
        element: <p>admin</p>
      },
      {
        path: '/dashboard/manage',
        element: <AllUser></AllUser>
      },
      {
        path: '/dashboard/premium',
        element: <p>Premium</p>
      },
      {
        path: '/dashboard/contactRequest',
        element: <p>contactRequest</p>
      },
      {
        path: '/dashboard/successStory',
        element: <p>successStory</p>
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
