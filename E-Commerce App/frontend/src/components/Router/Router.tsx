import { useEffect } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import SignIn from "../Auth/Sign-in";
import SignUp from "../Auth/Sign-up";
import Navbar from "../Layout/Navbar";
import Profile from "../Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchUserHandler } from "../../store/Auth-Actions-Creator";
import SignOut from "../Pages/Sign-out";
import ForgotPassword from "../Pages/Forgot-Password";
import Resetpassword from "../Pages/Reset-Password";
import Invalid from "../Pages/Invalid";
import Account from "../Pages/Account";
import Download from "../Pages/Download";

const Router = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserHandler());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/users/sign-in",
          element: user ? <Navigate to="/users/profile" /> : <SignIn />,
        },
        {
          path: "/users/sign-up",
          element: user ? <Navigate to="/users/profile" /> : <SignUp />,
        },
        {
          path: "/users/profile",
          element: user ? <Profile /> : <Navigate to="/users/sign-in" />,
        },
        {
          path: "/users/my-account",
          element: user ? <Account /> : <Navigate to="/users/sign-in" />,
        },
        {
          path: "/users/download",
          element: user ? <Download /> : <Navigate to="/users/sign-in" />,
        },
        {
          path: "/users/forgot-password",
          element: user ? <Navigate to="/users/profile" /> : <ForgotPassword />,
        },
        {
          path: "/users/reset-password/:id",
          element: user ? <Navigate to="/users/profile" /> : <Resetpassword />,
        },
        {
          path: "/users/sign-out",
          element: user ? <SignOut /> : <Navigate to="/users/sign-in" />,
        },
        { path: "*", element: <Invalid /> },
      ],
    },
  ]);

  return router;
};

export default Router;
