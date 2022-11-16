import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'antd/dist/antd.min.js';
import 'antd/dist/antd.min.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import LoginPage from './pages/auth/LoginPage';
import ManageMaterial from './pages/manage/material';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import AuthorizedWrapper from './components/Auth/AuthorizedWrapper';
import NoAuthorizeWrapper from './components/Auth/NoAuthorizeWrapper';
import MailSent from './pages/auth/MailSent';
import Handler from './pages/auth/__handler';

const queryClient = new QueryClient();
const routes = createBrowserRouter([
  {
    path: '/',
    element: <NoAuthorizeWrapper />,
    children: [
      {
        path: '__auth',
        element: <Handler />
      },
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/forgot',
        element: <ForgotPasswordPage />
      },
      {
        path: '/forgot/mail-sent',
        element: <MailSent />
      },
    ]
  },
  {
    path: '/manage',
    element: <AuthorizedWrapper />,
    children: [
      {
        path: '/manage',
        loader: () => redirect('/manage/material'),
      },
      {
        path: 'material',
        element: <ManageMaterial />
      }
    ]
  },
  {
    path: '*',
    loader: () => redirect('/'),
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.info))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
