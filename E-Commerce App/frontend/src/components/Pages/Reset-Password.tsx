import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Resetpassword = () => {
  const { id } = useParams();
  const nevigate = useNavigate();
  const [user, setUser] = useState({
    id: id,
    password: "",

    confirm_password: "",
  });

  const SubmitHandler = async (e: any) => {
    e.preventDefault();
    if (user.password === user.confirm_password) {
      let res = await axios.post(
        "http://localhost:5000/users/reset-password",
        user
      );
      if (res.data.reset) {
        toast.success("Password updated successfully!!");
        nevigate("/users/sign-in");
      }
    } else {
      toast.error("Password does't match!!");
      setUser({ id: id, password: "", confirm_password: "" });
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
          <h4 className="text-center text-black mb-6 text-2xl font-semibold">
            Reset Your Password
          </h4>
          <div id="reset-password-form" className="w-full max-w-md">
            <form onSubmit={SubmitHandler}>
              <div className="h-10"></div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputPassword1"
                  className="block text-white text-sm font-medium"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={Handler}
                  required
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="exampleInputPassword1"
                  placeholder="Enter new password"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputPassword2"
                  className="block text-white text-sm font-medium"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={user.confirm_password}
                  onChange={Handler}
                  required
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="exampleInputPassword2"
                  placeholder="Re-Enter new password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resetpassword;
