"use client";
import React, { Suspense, useState } from "react";
import DataTable from "react-data-table-component";
import Loader from "@/app/Components/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/interceptor/axios_inteceptor";
import ChallanModal from "@/app/Components/ChallanModal";
import { useUserValidator } from "@/interceptor/userValidate";
import { FcCancel } from "react-icons/fc";
import { Edit, Eye, LayoutGrid, LockKeyholeOpen, TableIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Collection = () => {
  useUserValidator("superadmin");
  const [filterValue, setFilterValues] = useState({
    startDate: null,
    endDate: null,
    paymentStatus: "PAID",
    challanType: "CUSTOMER",
    search: null,
  });
  const [challanModal, setChallanModal] = useState(false);
  const [data, setData] = useState([]);
  const [tableView, setTableView] = useState(window.innerWidth < 450);
  const toggleView = () => {
    setTableView(!tableView);
  };
  const columns = [
    {
      name: "Chalan No",
      selector: (row) => row?.challanData?.challanNo,
    },
    {
      name: "Name",
      selector: (row) =>
        `${row?.challanData?.customerData?.firstName} ${row?.challanData?.customerData?.lastName}`,
    },

    {
      name: "Fee Period",
      selector: (row) => row?.feePeriod,
    },
    {
      name: "Amount",
      selector: (row) => row?.amount,
    },

    {
      name: "Mode",
      selector: (row) => row?.paymentMode,
    },
    {
      name: "Paid at",
      selector: (row) => row?.paidAt,
    },
    {
      name: "Acion",
      selector: (row) => row.action,
      cell: (row) => (
        <>
          <span title="Void Challan">
            <button
              // onClick={(e) => voidChallan(row)}
              className="text-blue-700 hover:scale-[1.2] p-1 rounded"
            >
              <Eye width={'20px'} height={'20px'} />
            </button>
          </span>
        </>
      ),
    },
  ];

  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    setFilterValue(prev => ({
      ...prev,
      search: debouncedSearchTerm
    }));
  }, [debouncedSearchTerm]);

  const voidChallan = async (e) => {
    try {
      const confirmed = await new Promise((resolve) => {
        toast.info("Are you sure?", {
          autoClose: false,
          onClose: resolve,
          closeOnClick: false,
          draggable: false,
          closeButton: false,
          position: toast.POSITION.BOTTOM_CENTER,
          render: ({ closeToast }) => (
            <div>
              <span>Are you sure?</span>
              <button onClick={() => resolve(true)}>Confirm</button>
              <button onClick={() => resolve(false)}>Cancel</button>
            </div>
          ),
        });
      });

      getChallanList();
    } catch (error) {
      // console.log(error);
      toast.error(error?.message);
    }
  };

  function getMonthDateRange(dateString) {
    const [year, month] = dateString.split('-').map(Number);
    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
    return {
      startDate: startDate.toISOString(), // "2025-04-01T00:00:00.000Z"
      endDate: endDate.toISOString()      // "2025-04-30T23:59:59.999Z"
    };
  }

  const getChallanList = async () => {
    // console.log(filterValue.startDate, 'filterValue.startDate')

    let url =
      "/payment/get" +
      (filterValue.challanType !== null && filterValue.challanType !== "All"
        ? `?paymentType=${filterValue.challanType}`
        : "") +
      (filterValue.search !== null ? `&search=${filterValue.search}` : "")
    if (filterValue.startDate) {
      const { startDate, endDate } = getMonthDateRange(filterValue.startDate);
      // console.log(startDate); // "2025-04-01T00:00:00.000Z"
      // console.log(endDate);   // "2025-04-30T23:59:59.999Z"
      url += `&fromDate=${startDate}&toDate=${endDate}`
    }

    try {
      let response = await axiosInstance.get(url);
      if (response.status === 200) {
        // console.log(response?.data?.data, 'response?.data?.data');
        setData(response?.data?.data);
      }
    } catch (error) {
      // console.log("error", error);
      setData([]);
    }
  };
  useEffect(() => {
    getChallanList();
  }, [filterValue]);
  const handlePayNow = async (val, type) => {
    try {
      let response = await axiosInstance.post(`/challan/status/paid`, val);
      // console.log("response", response);
      toast.success(response?.data?.message);
    } catch (error) {
      // console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    setChallanModal(false);
  };
  return (
    <div className="w-full">
      {challanModal && (
        <ChallanModal
          type={"customer"}
          setChallanModal={setChallanModal}
          handlePayNow={handlePayNow}
        />
      )}
      <div className="w-full flex justify-between lg:w-full  px-1">
        <h2 className="mb-1 text-md font-bold leading-tight tracking-tight py-1 px-2 m-2 text-gray-900 md:text-2xl dark:text-white">
          Collection
        </h2>
        <div>
          <button
            onClick={() => {
              setChallanModal(true);
            }}
            className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
          >
            {filterValue.challanType === "CUSTOMER" ? "New Collection" : "Payment"}
          </button>
        </div>
      </div>

      <div className="flex justify-between">
      </div>
      <div className="z-0">
        <Suspense fallback={<Loader />} />
        <div className="flex bg-white p-2 rounded-md gap-2 mb-2 md:gap-0 md:flex-row flex-col md:items-center items-end justify-between">
          <div className="w-full md:w-1/4">
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
          <div className="flex justify-center items-end gap-2">
            <div className="min-w-200">
              <input
                id="remember"
                aria-describedby="remember"
                type="text"
                className="border border-gray-300 p-1 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 :bg-gray-700 :border-gray-600 :focus:ring-primary-600 :ring-offset-gray-800"
                placeholder="Search Name"
                onChange={(e) => {
                  setFilterValues({
                    ...filterValue,
                    search: e.target.value,
                  });
                }}
              />
            </div>
            <button
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 p-2.5 :bg-gray-700 :border-gray-600 :focus:ring-blue-500 :focus:border-blue-500"
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

        {
          !tableView ?
            <DataTable
              pagination
              paginationPerPage={10}
              fixedHeader
              // selectableRows
              // onSelectedRowsChange={(e) => {
              //   // console.log(e)
              //   setSelectedRow(e.selectedRows);
              // }}
              columns={columns}
              data={data}
            />
            :
            <div className="flex flex-col">
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data &&
                  data?.map((item) => {
                    // console.log(item, 'ccheck ites')
                    return (
                      <>
                        <Card
                          key={item.image}
                          className="overflow-hidden relative group hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="absolute top-1 right-2 duration-200 flex  gap-1">
                            <span title="View">
                              <button
                                className="bg-blue-500 hover:bg-gray-500 text-white ms-1 p-1 rounded"
                              >
                                <Eye className="w-3 h-3" />
                              </button>
                            </span>
                          </div>
                          <CardHeader className="pb-2 mt-2">
                            <CardTitle className="text-lg font-semibold flex justify-between items-center">
                              {item?.challanData.customerData.firstName + " " + item?.challanData.customerData.lastName}
                              <Avatar className="md:h-10 md:w-10 sm:h-8 sm:w-8">
                                {/* <AvatarImage
                                src={`https://api.dicebear.com/6.x/initials/svg?seed=${item?.challanData.customerData.firstName}%20${item?.challanData.customerData.lastName}`}
                                alt={`${item?.firstName} ${item?.lastName}`}
                              /> */}
                                <AvatarFallback>
                                  {item?.challanData.customerData.firstName?.charAt(0).toUpperCase()}
                                  {item?.challanData.customerData.lastName?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="p-4">
                            <div className="flex items-start">
                              <div className="flex-grow space-y-2">
                                <div
                                  key={1}
                                  className="flex items-center justify-between"
                                >
                                  <span className="text-sm text-muted-foreground capitalize">
                                    Challan #:
                                  </span>
                                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    {item.challanData.challanNo}
                                  </div>
                                </div>
                                <div
                                  key={2}
                                  className="flex items-center justify-between"
                                >
                                  <span className="text-sm text-muted-foreground capitalize">
                                    Amount:
                                  </span>
                                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    {item?.amount?.toLocaleString()}
                                  </div>
                                </div>
                                <div
                                  key={3}
                                  className="flex items-center justify-between"
                                >
                                  <span className="text-sm text-muted-foreground capitalize">
                                    Collection Date:
                                  </span>
                                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    {moment(item?.paidAt).format(
                                      "DD-MMM-YYYY"
                                    ) || "N/A"}
                                  </div>
                                </div>
                                <div
                                  key={3}
                                  className="flex items-center justify-between"
                                >
                                  <span className="text-sm text-muted-foreground capitalize">
                                    Mode:
                                  </span>
                                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    {item?.paymentMode}
                                  </div>

                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })}
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default Collection;
