import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Auth-Slice";

const SignIn = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/users/create-session",
        user
      );

      if (res.data.username === false) {
        toast.error("Username doesn't exist!");
        setUser({ email: "", password: "" });
        return;
      }

      if (res.data.password === false) {
        toast.error("Invalid password!");
        setUser({ email: "", password: "" });
        return;
      }

      toast.success("User logged in successfully!");
      localStorage.setItem("Token", res.data.Token);

      const response = await axios.get(
        "http://localhost:5000/users/protected",
        {
          headers: { Authorization: `Bearer ${res.data.Token}` },
        }
      );

      dispatch(authActions.setUser(response.data.user));
      nevigate("/users/profile");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-center text-sm">
            <Link
              to="/users/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?
          <Link to="/users/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
