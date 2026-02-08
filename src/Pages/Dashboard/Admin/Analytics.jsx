import axios from 'axios';
import { useEffect } from 'react';

import { useNavigate } from 'react-router';
import { getAuth } from 'firebase/auth'; // ← এটা import করো
import useAuth from '../../../hooks/useAuth';

const axiosSecure = axios.create({
  baseURL: 'https://zap-shift-server-phi.vercel.app', // production URL
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          try {
            const token = await currentUser.getIdToken(true); // force fresh token
            config.headers.Authorization = `Bearer ${token}`;
            console.log(`Token attached to: ${config.url}`);
          } catch (err) {
            console.error(`Token failed for ${config.url}:`, err.message);
          }
        } else {
          console.warn(`No user → no token for: ${config.url}`);
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status; // ← এখানে error.response?.status

        if (status === 401 || status === 403) {
          console.log(`Unauthorized ${status} on ${error.config?.url} — Logging out`);
          logOut()
            .then(() => {
              navigate('/login');
            })
            .catch((logoutErr) => {
              console.error("Logout failed:", logoutErr);
            });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logOut, navigate]); // user বাদ দিলাম, কারণ getIdToken() dynamic

  return axiosSecure;
};

export default useAxiosSecure;