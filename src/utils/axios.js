import axios from "axios";

export default (history = null) => {
  const baseURL = "http://dev.nyusoft.in/nyusoft-practical/backend/api/";
  const headers = {};
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  return axiosInstance;
};
