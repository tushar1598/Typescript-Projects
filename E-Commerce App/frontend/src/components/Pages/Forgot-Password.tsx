import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = (): any => {
  const [user, setUser] = useState({ email: "" });

  const SubmitHandler = async (e: any) => {
    e.preventDefault();
    let res = await axios.post(
      "http://localhost:5000/users/forgot-password",
      user
    );

    if (res.data.link) {
      toast.success("Link has been sent successfully!!");
      setUser({ email: "" });
    } else {
      toast.error("user does't exists!!");
      setUser({ email: "" });
    }
  };

  const Handler = (e: any) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Forgot Your Password?
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            Enter your email address to receive a password reset link.
          </p>

          <form className="space-y-4" onSubmit={SubmitHandler}>
            <div>
              <label htmlFor="email" className="block text-gray-700 py-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={Handler}
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              Send Link
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?
              <Link
                to="/users/sign-in"
                className="text-blue-500 hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
