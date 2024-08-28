import axios from "axios";
import config from "../config";
import { useDispatch } from "react-redux";
import { clearToken, setToken } from "../Features/User/userSlice";
import { useState } from "react";

export const useUser = () => {

  const [error,setError] = useState("")

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
      localStorage.setItem("user", name);
      dispatch(setToken({ token, name, refreshToken }));
      return response.data;
    } catch (error) {
      console.error("Login request failed:", error);
      setError(error.response.data.error)
      return { status: "error", message : "Invalid email ID or Password" };
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
    logoutUser,
    error
  };
};
