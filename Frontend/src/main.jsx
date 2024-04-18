import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import store from './store/store.js';
import {Provider} from 'react-redux'
import AuthLayout from './component/AuthLayout.jsx'
import Profile from './component/Profile.jsx';
import Login from './component/login.jsx';
import Signup from './component/signup.jsx';
import {Auth0Provider} from '@auth0/auth0-react'
import Home from './component/Home/Home.jsx'
import LessonsPage from './component/LessonsPage.jsx';
import CoursePage from './component/CoursePage.jsx';
import Lessons from './component/Lessons.jsx';
import Cart from './component/Cart.jsx';
import Email from './component/Email/Emaiul.jsx'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
          {
              path: "/",
              element: (
                  <AuthLayout authentication={false}>
                      <Home />
                  </AuthLayout>
              ),
          },
          {
              path: "/login",
              element: (
                  <AuthLayout authentication={false}>
                      <Login />
                  </AuthLayout>
              ),
          },
            {
                path: "/profile",
                element: (
                    <AuthLayout authentication={true}>
                        <Profile />
                     </AuthLayout>
                ),
            },
          {
              path: "/signup",
              element: (
                  <AuthLayout authentication={false}>
                      <Signup />
                  </AuthLayout>
              ),
          },
          {
            path:"/courses",
            element: (
                <AuthLayout authentication={true}>
                    <CoursePage />
                 </AuthLayout>
            ),
          },
          {
            path:"/course/:courseId",
            element: (
                <AuthLayout authentication={true}>
                    <LessonsPage />
                 </AuthLayout>
            ),
        },
          {
            path:"/courses/:courseId/lesson/:lessonId",
            element: (
                <AuthLayout authentication={true}>
                    <Lessons />
                 </AuthLayout>
            ),
        },
          {
            path:"/courses/:courseId/cart/:CartId",
            element: (
                <AuthLayout authentication={true}>
                    <Cart />
                 </AuthLayout>
            ),
          },
          {
            path:"/email",
            element: (
                <AuthLayout authentication={true}>
                    <Email />
                 </AuthLayout>
            ),
        }
      ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
         {/* <Auth0Provider
               domain="dev-1xn20zw4434lds0n.us.auth0.com"
               clientId="APx5rEq00tUSKDnjEn1b1q7ZO7hGsrRs"
            authorizationParams={{
              redirect_uri : window.location.origin
            }}
         > */}
          <RouterProvider router={router} />
        {/* </Auth0Provider> */}
    </Provider>
)
