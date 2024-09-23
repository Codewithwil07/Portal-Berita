import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/main/Home';
import MainLayout from './pages/main/MainLayout';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UserList from './pages/admin/UserList';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Notifications from './pages/admin/Notifications';
import UserProfile from './pages/main/UserProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='text-center'>ERROR</h1>,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [{ path: '/', element: <Home />, index: true }],
      },
      {
        element: <AdminLayout />,
        children: [
          { path: 'admin/dashboard', element: <Dashboard /> },
          { path: 'admin/users', element: <UserList /> },
          { path: 'admin/notification', element: <Notifications /> },
          { path: 'admin/profile', element: <UserProfile /> },
        ],
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
