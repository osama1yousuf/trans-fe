import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";

export const getDriverAttendance = async (date) => {
  try {
    let { data } = await axiosInstance.get(`/driv/attendance?fromDate=${date}`);
    if (data.data.length > 0) {
      return data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error?.message);
  }
};

export const getDriverAttendanceForAdmin = async (searchBody, page) => {
  try {
    let { data } = await axiosInstance.get(
      `/driver/attendance?fromDate=${searchBody.fromDate}&toDate=${
        searchBody.toDate
      }&type=${
        searchBody.type
      }&driverIds=${searchBody?.driverIds.toString()}`
    );

    if (data.data.length > 0) {
      let arr = data?.data;
      let result = [];
      for (const element of arr) {
        let driverName =
          element?.driverDetails[0]?.firstName +
          " " +
          element?.driverDetails[0]?.lastName;
        let driverId = element?.driverId;
        let { records } = element;
        for (const ele of records) {
          result.push({ ...ele, driverName, driverId });
        }
      }
      return result;
    } else {
      return [];
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error?.message);
  }
};
