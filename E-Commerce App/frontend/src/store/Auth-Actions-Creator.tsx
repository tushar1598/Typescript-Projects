import { authActions } from "./Auth-Slice";
import axios from "axios";

export const fetchUserHandler = (): any => {
  return async (dispatch: any) => {
    const token = localStorage.getItem("Token");
    dispatch(authActions.setAuthLoading(true));
    if (!token) {
      dispatch(authActions.setAuthLoading(false));
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:5000/users/protected",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(authActions.setUser(response.data.user));
    } catch (error) {
      console.error("Error fetching profile:", error);
      dispatch(authActions.setError("Failed to fetch user data"));
    } finally {
      dispatch(authActions.setAuthLoading(false));
    }
  };
};

export const logoutHandler = () => {
  return (dispatch: any) => {
    dispatch(authActions.logout());
  };
};
