"use client";
import React, { Suspense, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Loader from "@/app/Components/Loader";
import { toast } from "react-toastify";
import { FcCancel } from "react-icons/fc";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { useUserValidator } from "@/interceptor/userValidate";
import { FileText, LayoutGrid, TableIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";

const RenderCard = ({ item, voidChallan }) => (
  <Card
    key={item._id}
    className="overflow-hidden relative group hover:shadow-lg transition-shadow duration-300"
  >
    <CardHeader className="pb-2 mt-2">
      <CardTitle className="text-lg font-semibold flex justify-between items-center">
        <span className="flex-1">
          {item?.customerData
            ? `${item?.customerData?.firstName} ${item?.customerData?.lastName}`
            : "-"}
        </span>
        <span
          className={
            item?.challanStatus === "UN_PAID"
              ? "bg-red-500 uppercase text-white font-semibold text-xs rounded-md p-2 ml-2"
              : item?.challanStatus === "PAID"
              ? "bg-green-500 uppercase text-white font-semibold text-xs rounded-md p-2 ml-2"
              : "bg-gray-500 uppercase text-white font-semibold text-xs rounded-md p-2 ml-2"
          }
        >
          {item?.challanStatus === "UN_PAID" ? "Unpaid" : item?.challanStatus}
        </span>
        <div className="flex items-center ml-2 gap-1">
          {item?.challanStatus === "UN_PAID" && (
            <button
              title="Void Challan"
              onClick={() => voidChallan(item)}
              className="bg-gray-100 hover:bg-blue-700 text-white p-1 rounded"
            >
              <FcCancel size={20} />
            </button>
          )}
          {/* <Link href={`/admin/member/challan/${item?.customerId}`} title="Challan">
            <button className="bg-blue-500 hover:bg-gray-500 text-white ms-1 p-1 rounded">
              <FileText className="w-3 h-3" />
            </button>
          </Link> */}
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <div className="flex items-start">
        <div className="flex-grow space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              Challan no:
            </span>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
              {item?.challanNo}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              Period:
            </span>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
              {item?.feePeriod}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              Amount:
            </span>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
              {Number(item?.amount).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              Date:
            </span>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
              {item?.challanDate
                ? moment(item?.challanDate).format("DD-MMM-YYYY")
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Challan = () => {
  useUserValidator("superadmin");
  const getCurrentMonth = () => {
    const now = new Date();
    return now.toISOString().slice(0, 7); // YYYY-MM
  };
  const [filterValue, setFilterValues] = useState({
    startDate: getCurrentMonth(),
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
  const [tableView, setTableView] = useState(true);
  const toggleView = () => setTableView((v) => !v);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const columns = [
    {
      name:
        filterValue.challanType === "CUSTOMER" ? "Challan No" : "PaySlip No",
      selector: (row) => row?.challanNo,
    },
    {
      name:
        filterValue.challanType === "CUSTOMER"
          ? "Challan Date"
          : "PaySlip Date",
      selector: (row) => new Date(row?.challanDate).toDateString(),
    },
    {
      name:
        filterValue.challanType === "CUSTOMER" ? "Member Name" : "Driver Name",
      selector: (row) =>
        `${row?.customerData?.firstName} ${row?.customerData?.lastName}`,
    },
    {
      name: "Period",
      selector: (row) => row?.feePeriod,
    },
    {
      name: "Amount",
      selector: (row) =>
        row?.amount.toLocaleString("en-US", { minimumFractionDigits: 0 }),
    },
    {
      name: "Status",
      selector: (row) => {
        row?.challanStatus;
      },
      cell: (row) => (
        <span
          className={
            row?.challanStatus === "UN_PAID"
              ? "bg-red-500 uppercase text-white font-semibold text-xs rounded-md p-2"
              : row?.challanStatus === "PAID"
              ? "bg-green-500 uppercase text-white font-semibold text-xs rounded-md p-2"
              : "bg-gray-500 uppercase text-white font-semibold text-xs rounded-md p-2"
          }
        >
          {row?.challanStatus === "UN_PAID" ? "Unpaid" : row?.challanStatus}
        </span>
      ),
    },
    {
      name: "Acion",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="w-full flex lg:w-full ">
          {row.challanStatus === "UN_PAID" && (
            <span title="Void Challan">
              <button
                onClick={(e) => voidChallan(row)}
                className="bg-gray-100 hover:bg-blue-700 text-white  p-1 rounded"
              >
                <FcCancel className="w-4 h-4" />
              </button>
              {/* <button className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" type="submit">Edit driver</button> */}
            </span>
          )}
          {/* <span title="Challan">
            <Link href={`/admin/member/challan/${row?.customerId}`}>
              <button className="bg-blue-500 hover:bg-gray-500 text-white ms-1 p-1 rounded">
                <FileText className="w-4 h-4" />
              </button>
            </Link>
          </span> */}
        </div>
      ),
    },
  ];
  const generateChallan = async () => {
    if (generateBulk.feePeriod && generateBulk.challanType) {
      try {
        toast.loading(
          `Generating ${
            generateBulk.challanType === "CUSTOMER" ? "Challan" : "Payslip"
          }`
        );
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
    console.log("API called for challan list", {
      filterValue,
      currentPage,
      limit,
    }); // Debug
    
    let url = "/challan/get";
    let queryParams = [];
    
    // Add challanType parameter
    if (filterValue.challanType !== null && filterValue.challanType !== "All") {
      queryParams.push(`challanType=${filterValue.challanType}`);
    }
    
    // Add payment status parameter
    if (filterValue.paymentStatus !== null && filterValue.paymentStatus !== "All") {
      queryParams.push(`challanStatus=${filterValue.paymentStatus}`);
    }
    
    // Add date range parameters only if startDate is provided
    if (filterValue.startDate && filterValue.startDate.trim() !== "") {
      let endDate = new Date(filterValue.startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      queryParams.push(`fromDate=${filterValue.startDate}-01T00:00:00.000Z`);
      queryParams.push(`toDate=${endDate.toISOString().split("T")[0]}T00:00:00.000Z`);
    }
    
    // Add search parameter
    if (filterValue.search && filterValue.search.trim() !== "") {
      queryParams.push(`search=${filterValue.search}`);
    }
    
    // Add pagination parameters
    queryParams.push(`limit=${limit}`);
    queryParams.push(`offset=${currentPage > 1 ? (currentPage - 1) * limit : 0}`);
    
    // Construct final URL
    if (queryParams.length > 0) {
      url += "?" + queryParams.join("&");
    }
    try {
      let response = await axiosInstance.get(url);
      if (response.status === 200) {
        // console.log(response);
        setData(response?.data?.data);
        setTotalCount(response?.data?.count || 0);
        setTotalPages(Math.ceil((response?.data?.count || 0) / limit));
      }
    } catch (error) {
      // console.log("error", error);
      setData([]);
      setTotalCount(0);
      setTotalPages(0);
    }
  };

  const voidChallan = async (e) => {
    try {
      // console.log("e", e);
      const value = window.confirm("Are you sure you want to void challan?");
      if (value) {
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
  }, [filterValue, currentPage, limit]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTableView(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <h2 className="text-md font-semibold leading-tight tracking-tight  text-gray-900 md:text-2xl dark:text-white">
            Filters
          </h2>
          <div>
            <button
              onClick={() => {
                setGenerateModal(true);
              }}
              className="bg-green-500 m-2 hover:bg-green-700 text-white text-sm font-bold py-1 px-3 rounded"
            >
              Generate Bulk
            </button>
          </div>
        </div>
        {/* filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="w-full md:w-1/3 sm:p-2">
            <label className="text-xs px-2">Transaction Type</label>
            <select
              value={filterValue.challanType}
              onChange={(e) => {
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
          <div className="w-full md:w-1/3 sm:p-2">
            <label className="text-xs px-2">Period</label>
            <div className="relative">
              <input
                type="month"
                value={filterValue.startDate || ""}
                className="appearance-none block w-full border border-gray-200 rounded leading-tight focus:outline-none py-1 px-2 p-2 focus:bg-white focus:border-gray-500 pr-8"
                onChange={(e) => {
                  setFilterValues({
                    ...filterValue,
                    startDate: e.target.value,
                  });
                }}
              />
              {filterValue.startDate && (
                <button
                  type="button"
                  onClick={() => {
                    setFilterValues({
                      ...filterValue,
                      startDate: null,
                    });
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  title="Clear period"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/3 m-2">
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
      {/* table/card toggle and search */}
      <div className="z-0">
        <Suspense fallback={<Loader />} />
        <div className="flex flex-wrap justify-between items-center mb-2">
          <h2 className="text-sm font-semibold leading-tight tracking-tight  text-gray-900 md:text-2xl dark:text-white">
            {filterValue.challanType === "DRIVER"
              ? "PaySlip List"
              : "Challan List"}
          </h2>
          <div className="flex gap-2 items-center">
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
            <button
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 p-2.5"
              onClick={toggleView}
              variant="outline"
            >
              {tableView ? (
                <LayoutGrid className="h-4 w-4" />
              ) : (
                <TableIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        {tableView ? (
          <div className="w-full overflow-x-auto">
            <DataTable
              pagination={false}
              fixedHeader
              columns={columns}
              data={data}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {data &&
                data.map((item) => (
                  <RenderCard
                    key={item._id}
                    item={item}
                    voidChallan={voidChallan}
                  />
                ))}
            </div>
          </div>
        )}
        {/* Pagination controls */}
        <div className="flex justify-center items-center space-x-2 py-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs sm:text-sm  text-muted-foreground">
              Page {currentPage} of {totalPages} | {totalCount} records
            </span>
            <div className="relative inline-block">
              <select
                value={limit.toString()}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-full rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {[10, 20, 50, 100].map((option) => (
                  <option key={option} value={option.toString()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || limit >= totalCount}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || limit >= totalCount}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challan;
