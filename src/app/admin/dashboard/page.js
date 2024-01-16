"use client";
// import Dashboard from "../Components/Dashboard"
import { useEffect, useState } from "react";
import { BarChart } from "@/app/Components/BarChart";
import { PieChart } from "@/app/Components/PieChart";
import StatisticsCard from "@/app/Components/statisticsCard";
import axiosInstance from "@/interceptor/axios_inteceptor";

export default function dashboard() {
  const [feePeriod, setFeePeriod] = useState(
    new Date().getFullYear() + "-" + new Date().getMonth() + 1
  );
  const [analytics, setAnalytics] = useState(null);

  const getChallanDataByPeriod = async () => {
    try {
      let response = await axiosInstance.get(`/superadmin/analytics`);
      console.log("response", response);
      setAnalytics(response?.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getChallanDataByPeriod();
  }, []);
  return (
    <>
      <div className="flex items-center flex-wrap">
        {/* driver Stats */}
        <div className="sm:w-1/2 text-center">
          <h3 className="text-xl font-semibold mb-1">Driver</h3>
          <div className="flex">
            <div className="text-center sm:w-4/12 p-2">
              <div className="border border-gray-300 p-3 rounded-lg shadow-md">
                <StatisticsCard
                  name={"Total"}
                  value={analytics?.totalDriversCount || 0}
                />
                <StatisticsCard
                  name={"Active"}
                  value={analytics?.activeDriverCount || 0}
                />
                <StatisticsCard
                  name={"In Active"}
                  value={analytics?.inActiveDriverCount || 0}
                />
              </div>
            </div>
            <div className="text-center sm:w-8/12 p-2">
              <div className="border border-gray-300 p-3 rounded-lg shadow-md">
                <StatisticsCard
                  name={"Total PaySlip"}
                  value={50}
                  showAmount={true}
                  amount={"40000"}
                />
                <StatisticsCard
                  name={"Paid PaySlip"}
                  value={30}
                  showAmount={true}
                  amount={"25000"}
                />
                <StatisticsCard
                  name={"Unpaid PaySlip"}
                  value={20}
                  showAmount={true}
                  amount={"15000"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* member stats */}
        <div className="sm:w-1/2 text-center">
          <h3 className="text-xl font-semibold mb-1">Member</h3>
          <input
              type="month"
              value={feePeriod}
              className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
              onChange={(e) => {
                setFeePeriod(e.target.value);
              }}
            />
          <div className="flex">
            <div className="text-center sm:w-4/12 p-2">
              <div className="border border-gray-300 p-3 rounded-lg shadow-md">
                <StatisticsCard
                  name={"Total"}
                  value={analytics?.totalCustomersCount || 0}
                />
                <StatisticsCard
                  name={"Active"}
                  value={analytics?.activeCustomerCount || 0}
                />
                <StatisticsCard
                  name={"In Active"}
                  value={analytics?.inActiveCustomerCount || 0}
                />
              </div>
            </div>
            <div className="text-center sm:w-8/12 p-2">
              <div className="border border-gray-300 p-3 rounded-lg shadow-md">
                <StatisticsCard
                  name={"Total Challan"}
                  value={50}
                  showAmount={true}
                  amount={"40000"}
                />
                <StatisticsCard
                  name={"Paid Challan"}
                  value={30}
                  showAmount={true}
                  amount={"25000"}
                />
                <StatisticsCard
                  name={"Unpaid Challan"}
                  value={20}
                  showAmount={true}
                  amount={"15000"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* challan Stats */}
      </div>
      <div className="flex items-center flex-wrap">
        {/* challan Stats */}
        <div className="sm:w-1/2 text-center">
          <h3 className="text-xl font-semibold">Challan</h3>
          <div className="">
            <StatisticsCard name={"Total Challan"} value={50} />
            <StatisticsCard name={"Total Void Challan"} value={50} />
            <StatisticsCard name={"Paid Challan"} value={30} />
            <StatisticsCard name={"Unpaid Challan"} value={20} />
          </div>
        </div>
        <div className="flex-col text-center w-full sm:w-1/2 px-20 pt-0">
          <h3 className="text-xl font-semibold flex justify-center items-center">
            Last 12 Month
          </h3>
          <div className="flex justify-between">
            <PieChart />
          </div>
        </div>
      </div>

      <div className="flex items-center ">
        {/* challan Stats - Last 12 Month */}
        <div className="flex-col text-center w-full sm:w-1/2 p-4">
          <h3 className="text-xl font-semibold flex justify-center items-center">
            Last 12 Month
          </h3>
          <div className="flex justify-between">
            <BarChart />
          </div>
        </div>

        {/* challan Stats - Last 6 Month */}
        <div className="flex-col text-center w-full sm:w-1/2 p-4">
          <h3 className="text-xl font-semibold flex justify-center items-center">
            Last 6 Month
          </h3>
          <div className="flex justify-between">
            <BarChart />
          </div>
        </div>
      </div>
    </>
    //  <Dashboard />
  );
}
