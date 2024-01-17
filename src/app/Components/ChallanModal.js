"use client";

import React, { Suspense ,useState} from "react";
import Loader from "./Loader";
import DataTable from "react-data-table-component";
const ChallanModal = ({
  challanModal,
  selectedRow,
  setChallanModal,
  handlePayNow,
}) => {
    // const [selectableRows, setSelectableRows] = useState(false);
    // const [selectedRows, setSelectedRows] = useState([]);  
 
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
          const monthAbbreviation = createdAtDate.toLocaleString('default', { month: 'long' });
          return monthAbbreviation;
        },
      }
  ];

  return (
    <>
      {" "}
      {challanModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Unpaid Challan</h3>
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
                  <div className="flex justify-between">
                    <h3
                      class="text-base font-light leading-2 text-gray-900"
                      id="modal-title"
                    >
                      First Name : {selectedRow[0]?.customerData?.firstName}
                    </h3>
                    <h3
                      class="text-base font-light leading-2 text-gray-900"
                      id="modal-title"
                    >
                      Last Name : {selectedRow[0]?.customerData?.lastName}
                    </h3>
                  </div>
                  <div className="flex justify-between">
                    <h3
                      class="text-base font-light leading-2 text-gray-900"
                      id="modal-title"
                    >
                      CNIC : {selectedRow[0]?.customerData?.cnicNo}
                    </h3>
                    <h3
                      class="text-base font-light leading-2 text-gray-900"
                      id="modal-title"
                    >
                      Contact : {selectedRow[0]?.customerData?.contactOne}
                    </h3>
                  </div>
                  <div className="z-0">
                    <Suspense fallback={<Loader />} />
                    <DataTable
                      // title="Challan List"
                      columns={columns}
                      data={selectedRow}
              
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setChallanModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e)=> handlePayNow(selectedRows)}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ChallanModal;
