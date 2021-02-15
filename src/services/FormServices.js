import axiosInstance from "../utils/axios";
import { param } from "jquery";

export const getAllFormData = async (values) => {
  return await axiosInstance().post("/getRecord", values);
};

export const addFormData = async (values) => {
  return await axiosInstance().post("/postData", values);
};

export const getSingleData = async (values) => {
  return await axiosInstance().post("/getSingleData", values);
};

export const editFormData = async (values) => {
  return await axiosInstance().post("/editData", values);
};

export const deleteFormData = async (values) => {
  return await axiosInstance().post("/deleteData", values);
};
