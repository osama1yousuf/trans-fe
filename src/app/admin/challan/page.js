"use client";
import React, { Suspense, useState } from "react";
import DataTable from "react-data-table-component";
import Loader from "@/app/Components/Loader";
import { toast } from "react-toastify";
import { FcCancel } from "react-icons/fc";
import { useEffect } from "react";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { useUserValidator } from "@/interceptor/userValidate";

const Challan = () => {
  useUserValidator("superadmin")
  const [filterValue, setFilterValues] = useState({
    startDate: null,
    endDate: null,
    paymentStatus: null,
    challanType: "CUSTOMER",
    search: null,
  });
  const [generateBulk, setGenerateBulk] = useState({
    challanType: "CUSTOMER",
    feePeriod: null,
  });
  const [generateModal, setGenerateModal] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
    {
      name: filterValue.challanType === "CUSTOMER" ?  "Challan No": "PaySlip No",
      selector: (row) => row?.challanNo,
    },
    {
      name: filterValue.challanType === "CUSTOMER" ?  "Challan Date": "PaySlip Date",
      selector: (row) => new Date(row?.challanDate).toDateString(),
    },
    {
      name: filterValue.challanType === "CUSTOMER" ?  "Member Name": "Driver Name",
      selector: (row) =>
        `${row?.customerData?.firstName} ${row?.customerData?.lastName}`,
    },
    {
      name: "Period",
      selector: (row) => row?.feePeriod,
    },
    {
      name: "Amount",
      selector: (row) =>  row?.amount.toLocaleString('en-US', { minimumFractionDigits: 0 }),
    },
    {
      name: "Status",
      selector: (row) => {row?.challanStatus},
      cell : (row) =>(
        <span className= {row?.challanStatus === "UN_PAID" ? "bg-red-500 uppercase text-white font-semibold text-xs rounded-md p-2" : row?.challanStatus === "PAID" ? "bg-green-500 uppercase text-white font-semibold text-xs rounded-md p-2" : "bg-gray-500 uppercase text-white font-semibold text-xs rounded-md p-2" } >{row?.challanStatus === "UN_PAID" ?  "Unpaid" : row?.challanStatus}</span>
      )

      
    },
    {
      name: "Acion",
      selector: (row) => row.action,
      cell: (row) => (
        <>
          {row.challanStatus === "UN_PAID" && (
            <span title="Void Challan">
              <button
                onClick={(e) => voidChallan(row)}
                className="bg-gray-100 hover:bg-blue-700 text-white  p-1 rounded"
              >
                <FcCancel size={"22px"} />
              </button>
              {/* <button className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" type="submit">Edit driver</button> */}
            </span>
          )}
        </>
      ),
    },
  ];
  const generateChallan = async () => {
    if (generateBulk.feePeriod && generateBulk.challanType) {
      try {
        toast.loading(`Generating ${generateBulk.challanType === "CUSTOMER" ? "Challan" : "Payslip"}`);
        let response = await axiosInstance.post("/challan/all/generate", {
          ...generateBulk,
          challanDate: generateBulk.feePeriod + "-01T00:09:19.733Z",
        });
        // console.log("response", response);
        toast.dismiss();
        getChallanList();
        setGenerateBulk({
          challanType: "CUSTOMER",
          feePeriod: null,
        });
        setGenerateModal(false);

        toast.success(
          response?.data?.message || "Challan Generated Successfully"
        );
      } catch (error) {
        // console.log("error while generating challan", error);
        toast.dismiss();
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.info("Please fill required fields");
    }
  };

  const getChallanList = async () => {
    let endDate = new Date(filterValue.startDate)
    if (filterValue.startDate !== null) {
      endDate.setMonth(endDate.getMonth() + 1);
    }
    let url =
      "/challan/get" +
      (filterValue.challanType !== null && filterValue.challanType !== "All"
        ? `?challanType=${filterValue.challanType}`
        : "") +
      (filterValue.paymentStatus !== null && filterValue.paymentStatus !== "All"
        ? `&challanStatus=${filterValue.paymentStatus}`
        : "") +
      (filterValue.startDate !== null
        ? `&fromDate=${filterValue.startDate}-01T00:00:00.000Z`
        : "") +
      (filterValue.startDate !== null
        ?  `&toDate=${endDate.toISOString().split('T')[0]}T00:00:00.000Z`
        : "") +
      (filterValue.search !== null ? `&search=${filterValue.search}` : "");
    try {
      let response = await axiosInstance.get(url);
      if (response.status === 200) {
        // console.log(response);
        setData(response?.data?.data);
      }
    } catch (error) {
      // console.log("error", error);
      setData([]);
    }
  };

  const voidChallan = async (e) => {
    try {
      // console.log("e", e);
      const value = window.confirm('Are you sure you want to void challan?')
      if(value) {
        let response = await axiosInstance.put(`/challan/status/void/${e._id}`);
        toast.success(response?.data?.message || "Challan Void Successfully");
        getChallanList();
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getChallanList();
  }, [filterValue]);
  return (
    <div className="w-full">
      {generateModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Bulk Transaction</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setGenerateModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 py-2 flex-auto">
                  <div className="w-full ">
                    <label className="text-xs px-2">Transaction Type</label>
                    <select
                      value={generateBulk.challanType}
                      onChange={(e) => {
                        // console.log("e.target.value", e.target.value);
                        setGenerateBulk({
                          ...generateBulk,
                          challanType: e.target.value,
                        });
                      }}
                      className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
                    >
                      <option value="DRIVER">Pay Slip</option>
                      <option value="CUSTOMER">Challan</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs px-2">Period</label>
                    <input
                      type="month"
                      value={generateBulk.feePeriod}
                      className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
                      onChange={(e) => {
                        setGenerateBulk({
                          ...generateBulk,
                          feePeriod: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setGenerateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={generateChallan}
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="w-full align-bottom lg:w-full">
        {/* filter and generate button */}
        <div className="flex flex-wrap justify-between">
          <h2 className="text-sm font-semibold leading-tight tracking-tight  text-gray-900 md:text-2xl dark:text-white">
            Filters
          </h2>
          <div>
            <button
              onClick={() => {
                setGenerateModal(true);
              }}
              className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
            >
              Generate Bulk
            </button>
          </div>
        </div>
        {/* filters */}
        <div className="flex justify-between items-center ">
          <div className="w-full sm:w-1/3 p-2">
            <label className="text-xs px-2">Transaction Type</label>
            <select
              value={filterValue.challanType}
              onChange={(e) => {
                // console.log("e.target.value", e.target.value);
                setFilterValues({
                  ...filterValue,
                  challanType: e.target.value,
                });
              }}
              className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 p-2 focus:bg-white focus:border-gray-500"
            >
              <option value="DRIVER">Pay Slip</option>
              <option value="CUSTOMER">Challan</option>
            </select>
          </div>
          <div className="w-full sm:w-1/3 p-2">
            <label className="text-xs px-2">Period</label>
            <input
              type="month"
              value={filterValue.startDate}
              className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 p-2 focus:bg-white focus:border-gray-500"
              onChange={(e) => {
                setFilterValues({
                  ...filterValue,
                  startDate: e.target.value,
                });
              }}
            />
          </div>
          <div className="w-full sm:w-1/3 m-2">
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
              <option value="VOID">Void</option>
            </select>
          </div>
        </div>
      </div>
      {/* table section */}
      <div className="z-0">
        <Suspense fallback={<Loader />} />
        <div className="flex flex-wrap justify-between">
        <h2 className="text-sm font-semibold leading-tight tracking-tight  text-gray-900 md:text-2xl dark:text-white">
            {filterValue.challanType === "DRIVER"
              ? "PaySlip List"
              : "Challan List"}
          </h2>
          <input
            id="remember"
            aria-describedby="remember"
            type="text"
            className="border  p-1 rounded  focus:ring-3 focus:ring-primary-300 :bg-gray-700 :border-gray-600 :focus:ring-primary-600 :ring-offset-gray-800"
            placeholder="Search Name"
            onChange={(e) => {
              setFilterValues({
                ...filterValue,
                search: e.target.value,
              });
            }}
          />
        </div>
        <DataTable
 pagination
 paginationPerPage={10} 
fixedHeader columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Challan;
