import axios from "axios";
import config from "../../config";
import {jwtDecode} from "jwt-decode";
import { clearToken, setAuthToken } from "../../Features/User/userSlice";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 
import { useEffect } from "react";

const api = axios.create({
  baseURL: config.apiBaseUrl,
});

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000;
    return decoded.exp > now;
  } catch (error) {
    return false;
  }
};

export const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const setRefreshToken = async (refreshToken) => {
      try {
        const response = await axios.post(`${config.apiBaseUrl}/refreshToken`, { refreshToken });
        const { token } = response.data;
        localStorage.setItem('token', token);
        dispatch(setAuthToken({ token, refreshToken }));
        return token;
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        dispatch(clearToken());
        navigate("/login");
        throw new Error('Failed to refresh token');
      }
    };

    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        let token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!isTokenValid(token) && refreshToken) {
          token = await setRefreshToken(refreshToken);
        }

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [navigate, dispatch]);
};

export default api;
