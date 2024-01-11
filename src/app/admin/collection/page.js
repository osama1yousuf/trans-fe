"use client";
import React, { Suspense, useState } from "react";
import DataTable from "react-data-table-component";
import Loader from "@/app/Components/Loader";
import { useEffect } from "react";
import axiosInstance from "@/interceptor/axios_inteceptor";
import ChallanModal from "@/app/Components/ChallanModal";

const Collection = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterValue, setFilterValues] = useState({
    startDate: null,
    endDate: null,
    paymentStatus: null,
    challanType: "CUSTOMER",
    search: null,
  });
  const [challanModal , setChallanModal] = useState(false)
  const [data, setData] = useState([]);
  const columns = [
    {
      name: '',
      ignoreRowClick: true,
      allowOverflow: true,
      button: false,
      width:"50px",
      cell: row => (
        <div>
          <input type="checkbox" checked={row?._id === selectedRow?._id} onChange={() => setSelectedRow(row)} />
        </div>
      ),
      head: () => null, 
    },
    {
      name: "Chalan Id",
      selector: (row) => row._id,
    },
    {
      name: "Name",
      selector: (row) =>
        `${row.customerData.firstName} ${row.customerData.lastName}`,
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
  const getChallanList = async () => {
    let url =
      "/challan/get" +
      (filterValue.challanType !== null && filterValue.challanType !== "All"
        ? `?type=${filterValue.challanType}`
        : "") +
      (filterValue.paymentStatus !== null && filterValue.paymentStatus !== "All"
        ? `&status=${filterValue.paymentStatus}`
        : "") +
      (filterValue.startDate !== null
        ? `&fromDate=${filterValue.startDate}T00:00:00.000Z`
        : "") +
      (filterValue.endDate !== null
        ? `&toDate=${filterValue.endDate}T23:59:59.000Z`
        : "");
    filterValue.search !== null ? `&status=${filterValue.search}` : "";
    try {
      let response = await axiosInstance.get(url);
      if (response.status === 200) {
        console.log(response);
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
      setData([]);
    }
  };
  useEffect(() => {
    getChallanList();
  }, [filterValue]);
const handlePayNow =(val)=>{
  console.log("val", val)
}
  return (
    <div>
      <ChallanModal challanModal={challanModal} selectedRow={selectedRow} setChallanModal={setChallanModal} handlePayNow={handlePayNow} />
      <div className="w-full flex justify-between lg:w-full  px-1">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight py-1 px-2 m-2 text-gray-900 md:text-2xl dark:text-white">
          Filters
        </h2>
        <div>
          <button
            onClick={()=>{
              if (selectedRow && selectedRow?._id) {
                setChallanModal(true)
              }
            }}
            className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
          >
            {filterValue.challanType === "CUSTOMER"
              ? "Collection"
              : "Payment"}
          </button>
        </div>
      </div>
       
      <div className="flex justify-between">
        <div className="w-full m-2">
          <label className="text-xs px-2">Start Date</label>
          <input
            type="date"
            value={filterValue.startDate}
            className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
            onChange={(e) => {
              setSelectedRow(null)
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
              setSelectedRow(null)
              setFilterValues({ ...filterValue, endDate: e.target.value });
            }}
          />
        </div>
        <div className="w-full m-2">
          <label className="text-xs px-2">Payment Status</label>
          <select
            value={filterValue.paymentStatus}
            onChange={(e) => {
              setSelectedRow(null)
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
        {/* <div className="w-full m-2">
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
        </div> */}
      </div>
      <div className="z-0">
        <Suspense fallback={<Loader />} />
        <DataTable
          title="Challan List"
          
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
};

export default Collection;
