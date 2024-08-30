import axios from "axios";
import AuthApi from "./AuthApi";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v2",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url.includes("login")) {
      return config;
    }

    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${access_token}`,
      };
    }
    return config;
  },
  (error) => {
    console.error("axiosInstance.interceptors.request Error:", error.message);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
   (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if ( error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await AuthApi.refresh();
        axios.defaults.headers.common["Authorization"] = `Bearer ${refreshResponse.access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    console.error("axiosInstance.interceptors.response Error:", error.message);
    return Promise.reject(error);
  }
);

// if backend not yet ready
// const axiosInstance = {
//   post: (url, body) => {
//     console.log({ url, body });

//     return {
//       data: {
//         access_token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imhhc2hjb2RlIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluMSIsImVtYWlsIjoic3VwZXJhZG1pbjFAZW1haWwuY29tIiwibmFtZSI6IlN1cGVyIEFkbWluIDEiLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJwcm9maWxlUGljdHVyZVVybCI6Imh0dHBzOi8vaS5waW5pbWcuY29tLzczNngvMjIvOGMvYTQvMjI4Y2E0ZTlkMDk0NGMxODM4Yzk5OTcyYmRmNGU0MjguanBnIn0.st3AQlg_L4oi_0oNSzxLXwfaHi5dw_tXP5YKTW5_jM8",
//         refreshToken:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imhhc2hjb2RlIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluMSIsImVtYWlsIjoic3VwZXJhZG1pbjFAZW1haWwuY29tIiwibmFtZSI6IlN1cGVyIEFkbWluIDEiLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJwcm9maWxlUGljdHVyZVVybCI6Imh0dHBzOi8vaS5waW5pbWcuY29tLzczNngvMjIvOGMvYTQvMjI4Y2E0ZTlkMDk0NGMxODM4Yzk5OTcyYmRmNGU0MjguanBnIn0.st3AQlg_L4oi_0oNSzxLXwfaHi5dw_tXP5YKTW5_jM8",
//       },
//     };
//   },
// };

export default axiosInstance;