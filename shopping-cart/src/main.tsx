import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './pages/Main.tsx';
import Products from './pages/Products/Products.tsx';
import Cart from './pages/Cart.tsx';
import './index.css'
import Header from './components/Header/Header.tsx';
import App from './App.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "coffee",
        element: <Products />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
