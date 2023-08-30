import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userAccessToken = localStorage.getItem('token');
    console.log(userAccessToken, "check userAccessToken");

    if (userAccessToken) {
      config.headers.Authorization = `Bearer ${userAccessToken}`;
    } else {
      localStorage.clear();
      window.location.reload(false);
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
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      localStorage.clear();
      window.location.reload(false);
      return Promise.reject(error);
     
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;