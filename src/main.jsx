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
    element: <Dashboard></Dashboard>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
