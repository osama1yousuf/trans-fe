import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userAccessToken = window.localStorage.getItem('token');
    console.log(userAccessToken, "check userAccessToken");

    if (userAccessToken) {
      config.headers.Authorization = `Bearer ${userAccessToken}`;
    } else {
      // Token not available, redirect to login page
      console.log("Token not available, redirecting to login");
      localStorage.clear();
      window.location.href = '/';
      return Promise.reject('No token available');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle any successful responses here
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      // Token is expired or unauthorized, clear token and redirect
      localStorage.clear();
      console.log("Unauthorized, redirecting to login");
      window.location.href = '/';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
