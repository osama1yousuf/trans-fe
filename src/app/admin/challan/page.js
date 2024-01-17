"use client";
import React, { Suspense, useState } from "react";
import DataTable from "react-data-table-component";
import Loader from "@/app/Components/Loader";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axiosInstance from "@/interceptor/axios_inteceptor";

const Challan = () => {
  const [filterValue, setFilterValues] = useState({
    challanType: "CUSTOMER",
    challanDate: null,
  });

  const [data, setData] = useState([]);
  const columns = [
    {
      name: "Chalan Id",
      selector: (row) => row.challanNo,
    },
    {
      name: "Name",
      selector: (row) =>
        `${row.customerId.firstName} ${row.customerId.lastName}`,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Challan Type",
      selector: (row) => row.challanType,
    },
  ];
  const generateChallan = async () => {
    if (filterValue.challanDate && filterValue.challanType) {
      try {
        toast.loading("Generating Challan");
        let response = await axiosInstance.post("/challan/all/generate", {
          ...filterValue,
          challanDate: filterValue.challanDate + "-01T00:09:19.733Z",
        });
        console.log("response", response);
        toast.dismiss();
        setData(response?.data?.data);

        // Display success toast without immediate dismissal
        toast.success(
          response?.data?.message || "Challan Generated Successfully"
        );
      } catch (error) {
        console.log("error while generating challan", error);
        // Delay dismissal slightly to ensure error toast visibility
        toast.dismiss(); // Delay for 2 seconds
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.info("Please fill required fields");
    }
  };

  return (
    <div>
      <div className="w-full align-bottom lg:w-full">
        <div className="flex flex-wrap justify-between">
        <h2 className="text-md font-semibold leading-tight tracking-tight  text-gray-900 md:text-2xl dark:text-white">
          Filters
        </h2>
        <div>
        <button
          onClick={generateChallan}
          className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
        >
          {filterValue.challanType === "DRIVER"
            ? "Genrate PaySlip"
            : "Generate Challan"}
        </button>
      </div>
      </div>
        {/* <div className="flex justify-between">
          <div className="w-full m-2">
            <label className="text-xs px-2">Payment Type</label>
            <select
              value={filterValue.challanType}
              onChange={(e) => {
                setData([])
                setFilterValues({
                  ...filterValue,
                  challanType: e.target.value,
                });
              }}
              className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
            >
              <option value="DRIVER">Driver</option>
              <option value="CUSTOMER">Member</option>
            </select>
          </div>
          <div className="w-full m-2">
            <label className="text-xs px-2">Fee Period</label>
            <input
              type="month"
              value={filterValue.startDate}
              className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
              onChange={(e) => {
                setFilterValues({
                  ...filterValue,
                  challanDate: e.target.value,
                });
              }}
            />
          </div>
        </div> */}
        <div className="flex justify-between">
          <div className="w-full m-2">
            <label className="text-xs px-2">Fee Period</label>
            <input
              type="month"
              value={filterValue.startDate}
              className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
              onChange={(e) => {
                setFilterValues({
                  ...filterValue,
                  challanDate: e.target.value,
                });
              }}
            />
          </div>
          <div className="w-full m-2">
            <label className="text-xs px-2">Payment Status</label>
            <select
              value={filterValue.paymentStatus}
              onChange={(e) => {
                setSelectedRow(null);
                setFilterValues({
                  ...filterValue,
                  paymentStatus: e.target.value,
                });
              }}
              className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
            >
              <option>All</option>
              <option value="PAID">Paid</option>
              <option value="UN_PAID">Unpaid</option>
            </select>
          </div>
          <div className="w-full m-2">
            <label className="text-xs px-2">Payment Type</label>
            <select
              value={filterValue.challanType}
              onChange={(e) => {
                console.log("e.target.value", e.target.value);
                setSelectedRow(null);
                setFilterValues({
                  ...filterValue,
                  challanType: e.target.value,
                });
              }}
              className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
            >
              <option value="DRIVER">Driver</option>
              <option value="CUSTOMER">Member</option>
            </select>
          </div>
        </div>
      </div>


      {/* <div className="flex justify-between">
        <div className="w-full m-2">
          <label className="text-xs px-2">Start Date</label>
          <input
            type="date"
            value={filterValue.startDate}
            className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
            onChange={(e) => {
              setSelectedRow(null);
              setFilterValues({ ...filterValue, startDate: e.target.value });
            }}
          />
        </div>
        <div className="w-full m-2">
          <label className="text-xs px-2">End Date</label>
          <input
            type="date"
            value={filterValue.endDate}
            className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
            onChange={(e) => {
              setSelectedRow(null);
              setFilterValues({ ...filterValue, endDate: e.target.value });
            }}
          />
        </div>
        <div className="w-full m-2">
          <label className="text-xs px-2">Payment Status</label>
          <select
            value={filterValue.paymentStatus}
            onChange={(e) => {
              setSelectedRow(null);
              setFilterValues({
                ...filterValue,
                paymentStatus: e.target.value,
              });
            }}
            className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
          >
            <option>All</option>
            <option value="PAID">Paid</option>
            <option value="UN_PAID">Unpaid</option>
          </select>
        </div>
        <div className="w-full m-2">
          <label className="text-xs px-2">Payment Type</label>
          <select
            value={filterValue.challanType}
            onChange={(e) => {
              console.log("e.target.value", e.target.value);
              setSelectedRow(null)
              setFilterValues({ ...filterValue, challanType: e.target.value });
            }}
            className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
          >
            <option value="DRIVER">Driver</option>
            <option value="CUSTOMER">Member</option>
          </select>
        </div>
      </div> */}
      <div className="z-0">
        <Suspense fallback={<Loader />} />
        <DataTable
          title={
            filterValue.challanType === "DRIVER"
              ? "PaySlip List"
              : "Challan List"
          }
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
};

export default Challan;
