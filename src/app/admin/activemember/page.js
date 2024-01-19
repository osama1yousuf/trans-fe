"use client";

import axiosInstance from "@/interceptor/axios_inteceptor";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { MdOutlinePayment } from "react-icons/md";
import moment from "moment";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useUserValidator } from "@/interceptor/userValidate";

export default function ActiveMember() {
  useUserValidator("superadmin")
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [challanData, setChallanData] = useState({
    customerId: null,
    driverId: null,
    challanType: "CUSTOMER",
    challanDate: null,
  });
  const columns = [
    {
      name: "Actions",
      selector: (row) => row.actions,
      // width:"100px",
      cell: (row) => (
        <div className="w-full flex  gap-1 lg:w-full ">
          <span title="Edit Member" >
            <button
              onClick={(e) => editMember(row)}
              className="bg-green-500 hover:bg-blue-700 text-white  p-1 rounded"
              type="submit"
            >
              <BiEdit />
            </button>
            {/* <button className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" type="submit">Edit driver</button> */}
          </span>
          <span title="Customer Challan Generate">
            <button
              onClick={(e) => {
                setShowModal(true);
                setChallanData({
                  ...challanData,
                  customerId: row?._id,
                });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white text-xs  p-1 rounded"
            >
              {" "}
              <MdOutlinePayment />
            </button>
          </span>
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.firstName,
    },
    {
      name: "Mobile #",
      selector: (row) => row.contactOne,
    },
    // {
    //     name: 'Vehicle #',
    //     selector: row => row.vehicleNo,
    // },
    {
      name: "Joining Date",
      selector: (row) => row.status.joinDate,
      cell: (row) => (
        <div>{moment(row.status.joinDate).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.currentStatus,
      cell: (row) => (
        <select
          onChange={() => handleCustomerStatusChange(row)}
          value={row.currentStatus}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          data-te-select-init
        >
          <option value="active">Active</option>
          <option value="inActive">InActive</option>
        </select>
      ),
    },
    ,
  ];
  const editMember = (e) => {
    router.push(`/admin/editMember/${e._id}`);
  };
  const [data, setData] = useState([]);
  async function getMemeber() {
    try {
      let response = await axiosInstance.get("/customer?status=active");
      setData(response.data);
    } catch (e) {
      console.log("error", e?.response?.data?.message[0]);
    }
  }
  const handleCustomerStatusChange = async (row) => {
    let body = {
      status: row.currentStatus == "active" ? "inActive" : "active",
    };
    console.log(row);
    console.log(body);
    try {
      let response = await axiosInstance.put(
        `/customer/status/${row._id}`,
        body
      );
      console.log("response", response);
      await getMemeber();
      toast.success(response.message);
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
  const handleGenerateChallan = async () => {
    try {
      let response = await axiosInstance.post("/challan/generate" , {...challanData , challanDate : challanData.challanDate + "-01T00:09:19.733Z"});
      console.log("response", response)
      toast.success("challan generated successfully")
      setShowModal(false)
     } catch (error) {
      toast.error(error?.message);
      console.log("error", error);
      setShowModal(false)
    }
  };
  useEffect(() => {
    getMemeber();
  }, []);
  return (
    // <Dashboard >
    <div className="w-full">
          {showModal && <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Challan Generate</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
            <label className="text-xs px-2">Fee Period</label>
            <input
              type="month"
              value={challanData.challanDate}
              className="appearance-none block w-full  border border-gray-200 rounded  leading-tight focus:outline-none py-1 px-2 m-2 focus:bg-white focus:border-gray-500"
              onChange={(e) => {
                setChallanData({
                  ...challanData,
                  challanDate: e.target.value ,
                });
              }}
            />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleGenerateChallan}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>}
      {" "}
      <div className="z-0">
        <DataTable
 pagination
 paginationPerPage={10} 
fixedHeader
          title="Active Member List"
          //  fixedHeader
          columns={columns}
          data={data}
        />
      </div>
    </div>
    // </Dashboard>
  );
}
