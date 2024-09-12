"use client";
import Loader from "@/app/Components/Loader";
import StatisticsCardAmount from "@/app/Components/StatisticCardAmount";
import StatisticsCard from "@/app/Components/statisticsCard";
import DataTable from "react-data-table-component";
import { Suspense, useEffect } from "react";
import { PieChart } from "@/app/Components/PieChart";
import { useUserValidator } from "@/interceptor/userValidate";
import VechicleDetails from "@/app/Components/VehicleDetails/VehicleDetails";
import DriverInfo from "@/app/Components/DriverInfo/DriverInfo";

export default function MemberDashboard() {
  // useUserValidator("member")
  const columns = [
    {
      name: "Chalan No",
      selector: (row) => row?.challanNo,
    },
    {
      name: "Date",
      selector: (row) =>
        `${new Date(row?.challanDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}`,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Month",
      selector: (row) => {
        const createdAtDate = new Date(row.createdAt);
        const monthAbbreviation = createdAtDate.toLocaleString("default", {
          month: "long",
        });
        return row?.feePeriod;
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center flex w-full p-2">
        <div className="border border-gray-300 p-1 sm:w-full w-1/3 flex flex-col rounded-lg shadow-md">
          <StatisticsCard name={"Last Collection Date"} value={"10/1/2024"} />
           <StatisticsCardAmount
                useType={"member"}
            name={"Last Challan"}
            showAmount={true}
            value={"Mar-22"}
            amount={"12,000"}
            type={"unpaid"}
          />
           <StatisticsCardAmount
                useType={"member"}
            name={"Last Collection"}
            showAmount={true}
            value={"Mar-22"}
            amount={"24,000"}
            type={"paid"}
          />
        </div>
        <div className="border border-gray-300 p-2 sm:w-full w-1/3 flex flex-col rounded-lg shadow-md">
          <ul className="p-4 list-disc list-inside h-full bg-red-100 rounded text-left shadow-md">
            <div>
              <h2 className="font-semibold text-md text-gray-600  m-2">
                Last 3 Unpaid Challan
              </h2>
            </div>
            <li className="mb-2 text-red-700">Apple</li>
            <li className="mb-2 text-red-700">Orange</li>
            <li className="mb-2 text-red-700">Banana</li>
          </ul>
        </div>
        <div className="border border-gray-300 p-2 sm:w-full w-1/3 flex flex-col rounded-lg shadow-md">
          <ul className="p-4 list-disc list-inside h-full bg-green-100 rounded text-left shadow-md">
            <div>
              <h2 className="font-semibold text-md text-gray-600  m-2">
                Last 3 Challan Collection
              </h2>
            </div>
            <li className="mb-2 text-green-700">Apple</li>
            <li className="mb-2 text-green-700">Orange</li>
            <li className="mb-2 text-green-700">Banana</li>
          </ul>
        </div>
      </div>
      <div className="text-center flex p-2">
        <div className="border border-gray-300 p-2 sm:w-full w-1/2 flex flex-col rounded-lg shadow-md">
          <div className="z-0">
            <Suspense fallback={<Loader />} />
            <DataTable
              pagination
              paginationPerPage={10}
              fixedHeader
              columns={columns}
              // data={data}
            />
          </div>
        </div>
        <div className="border border-gray-300 p-2 sm:w-full w-1/2 flex flex-col justify-center items-center rounded-lg shadow-md">
          <div className="flex justify-between items-center py-2  w-[350px] h-[350px] ">
            <PieChart dataSet={[3, 5]} type={"Challan"} />
          </div>
        </div>
      </div>
      <div className="text-center flex flex-wrap p-2">
        <div className="border border-gray-300 p-2 sm:w-full w-1/2 flex flex-col rounded-lg shadow-md">
          <VechicleDetails />
        </div>
        <div className="border border-gray-300 p-2 sm:w-full w-1/2 flex flex-col rounded-lg shadow-md">
          {/* <div className="flex justify-between items-center py-2"> */}
            <DriverInfo />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
