"use client";
import React, { Suspense, useState } from "react";
import DataTable from "react-data-table-component";
import Loader from "@/app/Components/Loader";
import { useEffect } from "react";
import axiosInstance from "@/interceptor/axios_inteceptor";

const Payment = () => {
  const [filterValue, setFilterValues] = useState({
    startDate: null,
    endDate: null,
    paymentStatus: null,
    challanType: "CUSTOMER",
    search : null ,
  });
  const [data, setData] = useState([]);
  const columns = [
    //   {
    //       name: 'Actions',
    //       selector: row => row,
    //       // width:"100px",
    //       cell:row =>(
    //           <div className="w-full flex  gap-1 lg:w-full ">

    //                       <span title="Edit Driver Detail">
    //                       <button onClick={(e)=> editDriver(row)} className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" ><BiEdit/></button>
    //                       </span>
    //                       <span title="Edit Driver Assignment">
    //                       <button onClick={(e)=> handleEditAssign(row) } className="bg-blue-500 hover:bg-blue-700 text-white  p-1 rounded" ><BsPersonPlusFill/></button>
    //                       </span>
    //                   </div>
    //       )
    //   },
    {
      name: "Chalan Id",
      selector: (row) => row._id,
    },
    {
      name: "Name",
      selector: (row) => row.firstName,
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
    (filterValue.challanType !== null ? `?type=${filterValue.challanType}` : "") +
    (filterValue.paymentStatus !== null ? `&status=${filterValue.paymentStatus}` : "") +
    (filterValue.startDate !== null ? `&fromDate=${filterValue.startDate}T00:00:00.000Z` : "") +
    (filterValue.endDate !== null ? `&toDate=${filterValue.endDate}T23:59:59.000Z` : "");
    (filterValue.search !== null ? `&status=${filterValue.search}` : "") 
    try {
      let response = await axiosInstance.get(url);
      if (response.status === 200) {
        console.log(response);
        setData(response?.data);
      }
    } catch (error) {
      console.log("error", error);
      setData([]);
    }
  };
  useEffect(() => {
    getChallanList();
    console.log("work");
  }, [filterValue]);

  return (
    <div>
      <div className="w-full flex justify-between lg:w-full  px-1">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight py-1 px-2 m-2 text-gray-900 md:text-2xl dark:text-white">
          Filters
        </h2>
        <div>
          <button
            //   type="submit"
            //   disabled={isSubmitting}
            className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
          >
            Receive Payment
          </button>
          <button
            //   type="submit"
            //   disabled={isSubmitting}
            className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
          >
            Pay Payment
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
              console.log(e);
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
              console.log("e.target.value", e.target.value);
              setFilterValues({ ...filterValue, endDate: e.target.value });
            }}
          />
        </div>
        <div className="w-full m-2">
          <label className="text-xs px-2">Payment Status</label>
          <select
            value={filterValue.paymentStatus}
            onChange={(e) => {
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
              setFilterValues({ ...filterValue, challanType: e.target.value });
            }}
            className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
          >
            <option>All</option>
            <option value="DRIVER">Driver</option>
            <option value="CUSTOMER">Member</option>
          </select>
        </div>
      </div>
      <div className="z-0">
        <Suspense fallback={<Loader />} />
        <DataTable
          title="Challan List"
          //  fixedHeader
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
};

export default Payment;
