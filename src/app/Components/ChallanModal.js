"use client";

import React, { Suspense, useState, useCallback } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Select from "react-select";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import debounce from 'lodash.debounce';
import { components } from "react-select";


const ChallanModal = ({
  setChallanModal,
  handlePayNow,
  type,
  customer,
  isCustomerExists,
}) => {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [driverList, setDriverList] = useState([]);
  const [driverSearch, setDriverSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [paymentData, setPaymentData] = useState({
    paymentMode: "CASH",
    paidAt: new Date().toISOString().split("T")[0],
    paymentType: type === "driver" ? "DRIVER" : "CUSTOMER",
    challanIds: [],
    comments: "",
    receivedByDriverId: null,
  });

  const columns = [
    {
      name: "Challan No",
      selector: (row) => row?.challanNo,
      style: {
        fontSize: "10px",
        paddingInline: "1px",
        maxWidth: "35px",
        minWidth: "35px",
      },
    },
    {
      name: "Date",
      selector: (row) =>
        `${new Date(row?.challanDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}`,
      style: {
        fontSize: "10px",
        paddingInline: "1px",
        maxWidth: "50px",
        minWidth: "50px",
      },
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
      style: {
        fontSize: "10px",
        paddingInline: "1px",
        maxWidth: "50px",
        minWidth: "50px",
      },
    },
    {
      name: "Amount",
      selector: (row) => Number(row.amount).toLocaleString(),
      style: {
        fontSize: "10px",
        paddingInline: "1px",
        maxWidth: "50px",
        minWidth: "50px",
        textAlign: "right",
      },
    },
  ];

  // Debounced search function for customers
  const debouncedCustomerSearch = useCallback(
    debounce((searchValue) => {
      getList(searchValue);
    }, 500),
    []
  );

  const handleCustomerSearchChange = (inputValue, { action }) => {
    // Only trigger search on input change, not on menu open/close
    if (action === 'input-change') {
      setCustomerSearch(inputValue);
      debouncedCustomerSearch(inputValue);
    }
  };

  // Debounced search function for drivers
  const debouncedDriverSearch = useCallback(
    debounce((searchValue) => {
      getDriverList(searchValue);
    }, 500),
    []
  );

  const handleDriverSearchChange = (inputValue, { action }) => {
    // Only trigger search on input change, not on menu open/close
    if (action === 'input-change') {
      setDriverSearch(inputValue);
      debouncedDriverSearch(inputValue);
    }
  };

  const getList = async (search = "") => {
    try {
      let url = `/${type}?status=active`;
      if (search) {
        url += `&search=${search}`;
      }
      let response = await axiosInstance.get(url);
      setList(response?.data?.data);
      if (customer) {
        setSelectedUser({
          name: customer.name,
          label: customer.label,
          value: customer.value,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getDriverList = async (search = "") => {
    try {
      let url = `/driver?status=active`;
      if (search) {
        url += `&search=${search}`;
      }
      let response = await axiosInstance.get(url);
      setDriverList(response?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getChallanList = async () => {
    let url =
      "/challan/get" +
      (type === "customer" ? `?challanType=CUSTOMER` : "?challanType=DRIVER") +
      `&challanStatus=UN_PAID` +
      `&search=${selectedUser?.name}`;
    try {
      let response = await axiosInstance.get(url);
      if (response.status === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
      setData([]);
    }
  };

  useEffect(() => {
    if (customer || selectedUser) {
      getChallanList();
    }
  }, [selectedUser]);

  useEffect(() => {
    getList();
    getDriverList();
  }, []);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto md:max-w-6xl max-sm:max-w-[95vw] max-h-[90vh]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                {type === "driver" ? "Payment" : "Collection"}
              </h3>
            </div>
            {/*body*/}
            {(isCustomerExists && selectedUser && data) || (!isCustomerExists && data) ? (
              <div className="relative px-2 py-2 flex-auto">
                <div className="flex flex-col justify-between items-center gap-3">
                  <div className="w-full">
                    <label className="text-xs capitalize px-2">{type}</label>
                    <Select
                      value={selectedUser}
                      onChange={(e) => {
                        setSelectedUser(e);
                        // Reset DataTable selection when new user is selected
                        setPaymentData(prev => ({
                          ...prev,
                          challanIds: []
                        }));
                        // If user clears the selection, also clear challan data
                        if (!e) {
                          setData([]);
                        }
                      }}
                      onInputChange={handleCustomerSearchChange}
                      isClearable
                      isSearchable
                      placeholder={`Search ${type}...`}
                      options={list?.map((e) => ({
                        value: e._id,
                        label: e.firstName + " " + e.lastName,
                        name: e.firstName,
                      }))}
                      styles={{
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9999, // Higher z-index to appear above table
                        }),
                        menuPortal: (provided) => ({
                          ...provided,
                          zIndex: 9999, // Higher z-index for portal
                        }),
                      }}
                      menuPortalTarget={document.body} // Render menu in body to avoid z-index issues
                    />
                  </div>
                  <div className="flex gap-2 w-full">
                    <div className="w-1/2">
                      <label className="text-xs px-2">Mode</label>
                      <select
                        value={paymentData.paymentMode}
                        onChange={(e) => {
                          setPaymentData({
                            ...paymentData,
                            paymentMode: e.target.value,
                          });
                        }}
                        className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-2 px-2 focus:bg-white focus:border-gray-500"
                      >
                        <option value="CASH">Cash</option>
                        <option value="EasyPaisa">Easy Paisa</option>
                        <option value="DubaiIslamic">Dubai Islamic</option>
                        <option value="Allied">Allied</option>
                        <option value="Silk">Silk</option>
                        <option value="AlHabib">AlHabib</option>
                        <option value="Meezan">Meezan</option>
                      </select>
                    </div>
                    <div className="w-1/2">
                      <label className="text-xs px-2">
                        {type === "driver" ? "Paid Date" : "Collect Date"}
                      </label>
                      <input
                        type="date"
                        value={paymentData.paidAt}
                        className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-2 px-2 focus:bg-white focus:border-gray-500"
                        onChange={(e) => {
                          setPaymentData({
                            ...paymentData,
                            paidAt: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="text-xs px-2">Driver (Optional)</label>
                    <Select
                      value={paymentData.receivedByDriverId ? {
                        value: paymentData.receivedByDriverId,
                        label: driverList.find(d => d._id === paymentData.receivedByDriverId)?.firstName + " " + driverList.find(d => d._id === paymentData.receivedByDriverId)?.lastName
                      } : null}
                      onChange={(e) => {
                        setPaymentData({
                          ...paymentData,
                          receivedByDriverId: e ? e.value : null,
                        });
                      }}
                      onInputChange={handleDriverSearchChange}
                      isClearable
                      isSearchable
                      placeholder="Select driver (optional)"
                      options={driverList?.map((e) => ({
                        value: e._id,
                        label: e.firstName + " " + e.lastName,
                      }))}
                      styles={{
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                        }),
                        menuPortal: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                        }),
                      }}
                      menuPortalTarget={document.body}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs px-2">Comments</label>
                    <input
                      type="text"
                      value={paymentData.comments}
                      onChange={e => setPaymentData({
                        ...paymentData,
                        comments: e.target.value
                      })}
                      className="appearance-none block w-full border border-gray-200 rounded leading-tight focus:outline-none py-2 px-2 focus:bg-white focus:border-gray-500"
                      placeholder="Enter comments (optional)"
                    />
                  </div>
                </div>
                <div className="z-0 mt-2">
                  <Suspense fallback={<Loader />} />
                  <p className="text-md ml-3 font-medium">
                    {type === "driver" ? "Unpaid Payslips" : "Unpaid Challans"}
                  </p>
                  <DataTable
                    pagination
                    paginationPerPage={10}
                    fixedHeader
                    selectableRows
                    onSelectedRowsChange={(e) => {
                      setPaymentData({
                        ...paymentData,
                        challanIds: e.selectedRows.map((v) => v._id),
                      });
                    }}
                    columns={columns}
                    data={data}
                    customStyles={{
                      headRow: {
                        style: {
                          fontSize: "10px",
                          paddingLeft: "1px",
                          paddingRight: "1px",
                        },
                      },
                      headCells: {
                        style: {
                          paddingInline: "0px",
                          width: "65px",
                          minWidth: "65px !important",
                          maxWidth: "65px !important",
                        },
                      },
                      cells: {
                        style: {
                          paddingInline: "0px",
                          width: "65px",
                          minWidth: "65px !important",
                          maxWidth: "65px !important",
                        },
                      },
                      selectableRowsCell: {
                        style: {
                          width: "35px",
                          minWidth: "35px !important",
                          maxWidth: "35px !important",
                        },
                      },
                    }}
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </div>
            ) : (
              <div className="my-32">
                <Loader />
              </div>
            )}
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-white bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setChallanModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => {
                  if (paymentData.paidAt && paymentData.paymentMode) {
                    if (paymentData.challanIds.length > 0) {
                      handlePayNow(paymentData, type);
                    } else {
                      toast.info("Please select atleast one challan");
                    }
                  } else {
                    toast.info("Please fill required field");
                  }
                }}
              >
                {type === "customer" ? "Receive" : "Pay"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ChallanModal;
