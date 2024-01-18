"use client";

import React, { Suspense, useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Select from "react-select";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { useEffect } from "react";

const ChallanModal = ({ setChallanModal, handlePayNow, type }) => {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [paymentData, setPaymentData] = useState({
    paymentMode: null,
    paidAt: null,
    paymentType: type === "driver" ? "DRIVER" : "CUSTOMER",
    challanIds: [],
  });

  const columns = [
    {
      name: "Chalan Id",
      selector: (row) => row.challanNo,
    },
    {
      name: "Name",
      selector: (row) => `${row.customerData.firstName}`,
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
        return monthAbbreviation;
      },
    },
  ];
  const getList = async () => {
    try {
      let response = await axiosInstance.get(`/${type}?status=active`);
      console.log(response.data);
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getChallanList = async () => {
    console.log("selectedUser", selectedUser);
    let url =
      "/challan/get" +
      (type === "customer" ? `?challanType=CUSTOMER` : "?challanType=DRIVER") +
      `&challanStatus=UN_PAID` +
      `&search=${selectedUser.name}`;
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
    if (selectedUser) {
      getChallanList();
    }
  }, [selectedUser]);

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {type === "driver"
                  ? "Unpaid Pay Slip List"
                  : "Unpaid Challan List"}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setChallanModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative px-6 py-2 flex-auto">
              <div className="flex justify-between items-center gap-3">
                <div className="w-full">
                  <label className="text-xs capitalize px-2">Select {type}</label>
                  <Select
                    value={selectedUser}
                    onChange={(e) => {
                      console.log(e);
                      setSelectedUser(e);
                    }}
                    options={list.map((e) => ({
                      value: e._id,
                      label: e.firstName + " " + e.lastName,
                      name: e.firstName,
                    }))}
                  />
                </div>
                <div className="w-full">
                  <label className="text-xs px-2">Payment Mode</label>
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
                    <option value="ONLINE">Online</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="text-xs px-2">Paid At</label>
                  <input
                    type="date"
                    value={paymentData.paidAt}
                    className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
                    onChange={(e) => {
                      setPaymentData({
                        ...paymentData,
                        paidAt: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="z-0">
                <Suspense fallback={<Loader />} />
                <DataTable
                  // title="Challan List"
                  selectableRows
                  onSelectedRowsChange={(e) => {
                    setPaymentData({
                      ...paymentData,
                      challanIds: e.selectedRows.map((v)=> v._id),
                    });
                  }}
                  columns={columns}
                  data={data}
                />
              </div>
            </div>
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
                    }else{
                    toast.info("Please select atleast one challan")
                    }
                  } else {
                    toast.info("Please fill required field")
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
