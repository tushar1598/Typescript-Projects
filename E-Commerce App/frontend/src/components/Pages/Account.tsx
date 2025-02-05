import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Account = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState({
    id: user?._id,
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:5000/users/update-profile`,
      profile
    );
    if (res.data.updatedData) {
      toast.success("user updated successfully");
      
    } else {
      toast.error("something went wrong");
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* <div className="flex justify-center">
          <div className="relative">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
              onClick={() =>
                document.getElementById("profileImageInput")?.click()
              }
            />
            <input
              type="file"
              id="profileImageInput"
              name="avatar"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div> */}

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter new password"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
