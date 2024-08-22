import axios from "axios";
import config from "../config";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, setToken } from "../Features/User/userSlice";

export const useUser = () => {
  const userName = useSelector((state) => state.user.name);
  const userPassword = useSelector((state) => state.user.password);
  const dispatch = useDispatch();

  const signUpUser = async (userData) => {
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/register`,
        userData
      );

      return response.data;
    } catch (error) {
      console.error("signUp request failed:", error);
      return { status: "error" };
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/login`, userData);
      const { token, name, refreshToken } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(name));
      dispatch(setToken({ token, name, refreshToken }));
      return response.data;
    } catch (error) {
      console.error("Login request failed:", error);
      return { status: "error" };
    }

  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    dispatch(clearToken());
  };


  return {
    signUpUser,
    loginUser,
    logoutUser
  };
};
