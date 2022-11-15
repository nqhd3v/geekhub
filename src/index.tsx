import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'antd/dist/antd.min.js';
import 'antd/dist/antd.min.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import LoginPage from './pages/auth/login';
import ManageWrapper from './pages/manage';
import ManageMaterial from './pages/manage/material';

const queryClient = new QueryClient();
const routes = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/manage',
    element: <ManageWrapper />,
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
