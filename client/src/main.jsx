import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/main/Home';
import MainLayout from './pages/main/MainLayout';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UserList from './pages/admin/UserList';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Notifications from './pages/admin/Notifications';
import UserProfile from './pages/main/UserProfile';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='text-center'>ERROR</h1>,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { element: <Dashboard />, index: true },
          { path: 'dashboard', element: <Dashboard />, index: true },
          { path: 'users', element: <UserList /> },
          { path: 'notification', element: <Notifications /> },
          { path: 'profile', element: <UserProfile /> },
        ],
      },
      {
        element: <MainLayout />,
        children: [{ element: <Home />, index: true }],
      },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
