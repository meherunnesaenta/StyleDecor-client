// src/hooks/useAxiosSecure.jsx
import axios from 'axios';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        try {
          const token = await auth.currentUser?.getIdToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Token attached →", config.url); // দেখবে কোন request-এ token যাচ্ছে
          } else {
            console.warn("No user logged in, no token attached");
          }
        } catch (err) {
          console.error("Failed to get token:", err);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("401/403 detected, logging out...");
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;