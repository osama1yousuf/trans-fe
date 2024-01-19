"use client";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import { BsPersonPlusFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import DataTable from "react-data-table-component";
import { Suspense, useEffect, useState } from "react";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
import Loader from "@/app/Components/Loader";
import { useUserValidator } from "@/interceptor/userValidate";

export default function activeDriver() {
  useUserValidator("superadmin")
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [challanData, setChallanData] = useState({
    customerId: null,
    driverId: null,
    challanType: "DRIVER",
    challanDate: null,
  });
  const columns = [
    {
      name: "Actions",
      selector: (row) => row,
      // width:"100px",
      cell: (row) => (
        <div className="w-full flex  gap-1 lg:w-full ">
          <span title="Edit Driver Detail">
            <button
              onClick={(e) => editDriver(row)}
              className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded"
            >
              <BiEdit />
            </button>
          </span>
          <span title="Edit Driver Assignment">
            <button
              onClick={(e) => handleEditAssign(row)}
              className="bg-blue-500 hover:bg-blue-700 text-white  p-1 rounded"
            >
              <BsPersonPlusFill />
            </button>
          </span>
          <span title="Driver Challan Generate">
            <button
              onClick={(e) => {
                setShowModal(true);
                setChallanData({
                  ...challanData,
                  driverId: row?._id,
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
    {
      name: "Vehicle #",
      selector: (row) => row.vehicleInfo.vehicleNo,
    },
    {
      name: "Joining Date",
      selector: (row) => row.joiningDate,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <select
          value={row.status}
          onChange={() => handleCustomerStatusChange(row)}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          data-te-select-init
        >
          <option value="1">Active</option>
          <option value="2">InActive</option>
        </select>
      ),
    },
  ];

  const editDriver = (e) => {
    router.push(`/admin/editdriver/${e._id}`);
  };
  const handleEditAssign = (e) => {
    router.push(`/admin/assign/${e._id}`);
  };

  const handleGenerateChallan = async () => {
    try {
      let response = await axiosInstance.post("/challan/generate", {
        ...challanData,
        challanDate: challanData.challanDate + "-01T00:09:19.733Z",
      });
      console.log("response", response);
      toast.success("challan generated successfully");
      setShowModal(false);
    } catch (error) {
      toast.error(error?.message);
      console.log("error", error);
      setShowModal(false);
    }
  };

  async function getDriver() {
    try {
      let response = await axiosInstance.get("/driver?status=active");
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  const handleCustomerStatusChange = async (row) => {
    let body = {
      status: row.status == "active" ? "inActive" : "active",
    };

    try {
      let response = await axiosInstance.put(`/driver/status/${row._id}`, body);
      console.log("response", response);
      await getDriver();
      toast.success(response.data.message);
    } catch (e) {
      console.log(e);
      toast.error(e.data);
    }
  };
  useEffect(() => {
    getDriver();
  }, []);

  return (
    // <Dashboard >
    <div className="w-full">
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                      challanDate: e.target.value,
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
        </div>
      )}
      <div className="z-0">
        <Suspense fallback={<Loader />} />
        <DataTable
          pagination
          paginationPerPage={10}
          fixedHeader
           title="Active Driver List"
          //  fixedHeader
          columns={columns}
          data={data}
        />
      </div>
    </div>
    // </Dashboard>
  );
}
