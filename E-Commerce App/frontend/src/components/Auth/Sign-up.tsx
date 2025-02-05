import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = () => {
  const nevigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5000/users/create-user",
      user
    );
    if (res.data.user) {
      toast.success("User Created Successfully!!");
      nevigate("/users/sign-in");
    } else {
      toast.error("Something Went Wrong!!");
      setUser({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    }
  };

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="relative">
              <input
                name="phone"
                type="number"
                placeholder="Phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?
            <Link to="/users/sign-in" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
