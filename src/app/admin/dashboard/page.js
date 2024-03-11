"use client";
// import Dashboard from "../Components/Dashboard"
import { useEffect, useState } from "react";
import { BarChart } from "@/app/Components/BarChart";
import { PieChart } from "@/app/Components/PieChart";
import StatisticsCard from "@/app/Components/statisticsCard";
import axiosInstance from "@/interceptor/axios_inteceptor";
import Loader from "@/app/Components/Loader";
import StatisticsCardAmount from "@/app/Components/StatisticCardAmount";
import { useUserValidator } from "@/interceptor/userValidate";

export default function Dashboard() {
  useUserValidator("superadmin");
  const [loader, setLoader] = useState(true);
  const [feePeriod, setFeePeriod] = useState(
    new Date().getFullYear() + "-" + new Date().getMonth() + 1
  );
  const [analytics, setAnalytics] = useState(null);
  const [analyticsByPeriod, setAnalyticsByPeriod] = useState(null);

  const getChallan = async () => {
    try {
      let response = await axiosInstance.get(`/superadmin/analytics`);
      console.log("response", response);
      setAnalytics(response?.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getChallanDataByPeriod = async () => {
    try {
      let response = await axiosInstance.get(
        `/superadmin/analytics/challans?date=${feePeriod}`
      );
      setAnalyticsByPeriod(response?.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getChallan();
  }, []);
  useEffect(() => {
    setLoader(true);
    getChallanDataByPeriod();
    setLoader(false);
  }, [feePeriod]);
  return (
    <div className="w-full">
      {loader ? (
        <Loader />
      ) : (
        <>
          {/* statisticsCard */}
          <div className="flex items-center flex-wrap-reverse">
            {/* driver Stats */}
            <div className="sm:w-1/2 ">
              <h3 className="text-xl font-semibold mx-2 mb-1">Driver</h3>
              <div className="flex items-center flex-wrap">
                <div className="text-center w-full sm:w-4/12 p-2">
                  <div className="border border-gray-300 p-3 rounded-lg shadow-md">
                    <StatisticsCard
                      name={"Total"}
                      value={analytics?.totalDriversCount || 0}
                    />
                    <StatisticsCard
                      type={"paid"}
                      name={"Active"}
                      value={analytics?.activeDriverCount || 0}
                    />
                    <StatisticsCard
                      type={"unpaid"}
                      name={"In Active"}
                      value={analytics?.inActiveDriverCount || 0}
                    />
                  </div>
                </div>
                <div className="text-center w-full sm:w-8/12 p-2">
                  <div className="border border-gray-300 p-3 rounded-lg shadow-md">
                    <StatisticsCardAmount
                      useType={"admin"}
                      name={"Total PaySlip"}
                      value={analyticsByPeriod?.driverTotalChallansCount || 0}
                      showAmount={true}
                      amount={analyticsByPeriod?.driverTotalChallansAmount || 0}
                    />
                    <StatisticsCardAmount
                      useType={"admin"}
                      type={"paid"}
                      name={"Paid PaySlip"}
                      value={analyticsByPeriod?.driverPaidChallansCount || 0}
                      showAmount={true}
                      amount={analyticsByPeriod?.driverPaidChallansAmount || 0}
                    />
                    <StatisticsCardAmount
                      useType={"admin"}
                      type={"unpaid"}
                      name={"Unpaid PaySlip"}
                      value={analyticsByPeriod?.driverUnPaidChallansCount || 0}
                      showAmount={true}
                      amount={
                        analyticsByPeriod?.driverUnPaidChallansAmount || 0
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* member stats */}
            <div className="sm:w-1/2 text-center">
              <div className="flex justify-between items-center">
                <h3 className="text-xl mr-2 font-semibold mb-1 sm:w-1/3">
                  Member
                </h3>
                <input
                  type="month"
                  value={feePeriod}
                  className="appearance-none sm:w-1/3 block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 mb-1 focus:bg-white focus:border-gray-500"
                  onChange={(e) => {
                    setFeePeriod(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-row-reverse items-center flex-wrap">
                <div className="text-center w-full sm:w-4/12 p-2">
                  <div className="border border-gray-300 p-3 rounded-lg shadow-md">
                    <StatisticsCard
                      name={"Total"}
                      value={analytics?.totalCustomersCount || 0}
                    />
                    <StatisticsCard
                      type={"paid"}
                      name={"Active"}
                      value={analytics?.activeCustomerCount || 0}
                    />
                    <StatisticsCard
                      type={"unpaid"}
                      name={"In Active"}
                      value={analytics?.inActiveCustomerCount || 0}
                    />
                  </div>
                </div>
                <div className="text-center w-full sm:w-8/12 p-2">
                  <div className="border border-gray-300 p-3 rounded-lg shadow-md">
                    <StatisticsCardAmount
                      useType={"admin"}
                      name={"Total Challan"}
                      value={analyticsByPeriod?.customerTotalChallansCount || 0}
                      showAmount={true}
                      amount={
                        analyticsByPeriod?.customerTotalChallansAmount || 0
                      }
                    />
                    <StatisticsCardAmount
                      useType={"admin"}
                      type={"paid"}
                      name={"Paid Challan"}
                      value={analyticsByPeriod?.customerPaidChallansCount || 0}
                      showAmount={true}
                      amount={
                        analyticsByPeriod?.customerPaidChallansAmount || 0
                      }
                    />
                    <StatisticsCardAmount
                      useType={"admin"}
                      type={"unpaid"}
                      name={"Unpaid Challan"}
                      value={
                        analyticsByPeriod?.customerUnPaidChallansCount || 0
                      }
                      showAmount={true}
                      amount={
                        analyticsByPeriod?.customerUnPaidChallansAmount || 0
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bar Charts */}
          <div className="flex items-center flex-wrap">
            {/* challan Stats - Last 12 Month */}
            <div className="flex-col text-center w-full sm:w-1/2 p-2">
              <div className="flex justify-between border border-gray-300 p-3 rounded-lg shadow-md">
                <BarChart
                  secondLabel={"Collection"}
                  firstLabel={"Challan"}
                  firstData={analytics?.customer?.challanCountsArray | []}
                  secondData={analytics?.customer?.paymentCountsArray | []}
                />
              </div>
            </div>

            {/* challan Stats - Last 6 Month */}
            <div className="flex-col text-center w-full sm:w-1/2 p-2">
              <div className="flex justify-between border border-gray-300 p-3 rounded-lg shadow-md">
                <BarChart
                  secondLabel={"Payment"}
                  firstLabel={"Slips"}
                  firstData={analytics?.driver?.challanCountsArray | []}
                  secondData={analytics?.driver?.paymentCountsArray | []}
                />
              </div>
            </div>
          </div>

          {/* Pie Charts*/}
          <div className="flex items-center flex-wrap">
            <div className="sm:w-1/2 p-2">
              <div className=" flex justify-center text-center border border-gray-300 rounded-lg shadow-md">
                <div className="flex justify-between items-center py-2  w-[350px] h-[350px] ">
                  <PieChart
                    type={"driver"}
                    dataSet={[
                      analyticsByPeriod?.customerCashTotal || 0,
                      analyticsByPeriod?.customerBankTotal || 0,
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="sm:w-1/2 p-2">
              <div className="flex justify-center text-center border border-gray-300 rounded-lg shadow-md">
                <div className="flex justify-between items-center py-2  w-[350px] h-[350px] ">
                  <PieChart
                    type={"member"}
                    dataSet={[
                      analyticsByPeriod?.driverCashTotal || 0,
                      analyticsByPeriod?.driverBankTotal || 0,
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    //  <Dashboard />
  );
}
