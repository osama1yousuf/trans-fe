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
import Textfield2 from "@/app/Components/TextField2";
import { useForm } from "react-hook-form";
import { TableComp } from "@/app/Components/DataTable";
import { Badge, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, LayoutGrid, TableIcon } from "lucide-react";
import * as Avatar from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ActiveDriver() {
  // useUserValidator("superadmin")
  const {
    register,
    watch,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const router = useRouter();
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tableView, setTableView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0);
  const [challanData, setChallanData] = useState({
    customerId: null,
    driverId: null,
    challanType: "DRIVER",
    challanDate: null,
  });

  const handleSource = (image) => {
    if (image.length) {
      image = JSON.parse(image);
      if (image && image.buffer && image.buffer.data) {
        const base64Image = Buffer.from(image.buffer.data).toString('base64');
        const preview = `data:${image.mimetype};base64,${base64Image}`;
        // return "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        return preview;
      }
    }
  }
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
          {/* <span title="Edit Driver Assignment">
            <button
              onClick={(e) => handleEditAssign(row)}
              className="bg-blue-500 hover:bg-blue-700 text-white  p-1 rounded"
            >
              <BsPersonPlusFill />
            </button>
          </span> */}
          {/* <span title="Driver Challan Generate">
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
          </span> */}
        </div>
      ),
    },
    {
      name: "Image",
      cell: (row) => (
        <Avatar.Root className="AvatarRoot">
          <Avatar.Image
            className="AvatarImage w-16 h-10"
            src={handleSource(row.image)}
            alt="Colm Tuite"
          />
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            N/A
          </Avatar.Fallback>
        </Avatar.Root>
      ),
    },
    {
      name: "Name",
      selector: (row) => row?.firstName + " " + row?.lastName,
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
      selector: (row) => new Date(row.joiningDate).toDateString(),
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
          <option value="active">Active</option>
          <option value="inActive">InActive</option>
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

  async function getDriver(search, page) {
    try {
      let response = await axiosInstance.get(
        `/driver?status=active&search=${search}&limit=${10}&offset=${(page - 1) * 10}`
      );
      setData(response.data);
      setTotalPages(Math.ceil(response.data.count / 10));
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
      // await getDriver();
      toast.success(response.data.message);
      const tempData = { ...data };
      console.log(tempData, "tempData")
      console.log(row._id)
      const index = tempData.data.findIndex((item) => item._id == row._id)
      console.log(index, "index")
      tempData.data[index].status = body.status;
      setData(tempData);
      console.log(tempData, "tempData")
    } catch (e) {
      console.log(e);
      toast.error(e.data);
    }
  };
  const search = watch("search");

  useEffect(() => {
    getDriver("", 1);
  }, [])

  const toggleView = () => {
    setTableView(!tableView);
  }

  const handleStatusChange = async (id, newStatus) => {
    let body = {
      status: newStatus,
    };
    try {
      let response = await axiosInstance.put(`/driver/status/${id}`, body);
      toast.success(response.data.message);
      const tempData = { ...data };
      const index = tempData.data.findIndex((item) => item._id === id)
      tempData.data[index].status = newStatus;
      setData(tempData);
    } catch (e) {
      console.log(e);
      toast.error(e.data);
    }
  }

  useEffect(() => {
    getDriver("", currentPage);
  }, [currentPage])

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
      <div className="flex justify-between">
        <div className="w-full mt-2 lg:w-1/4 px-3">
          <Textfield2
            register={register}
            setFocus={setFocus}
            error={""}
            name={"search"}
            label={"Search By Name"}
            type={"text"}
          />
        </div>
        <Button onClick={toggleView} variant="outline">
          {tableView ? <LayoutGrid className="mr-2 h-4 w-4" /> : <TableIcon className="mr-2 h-4 w-4" />}
          {tableView ? "Switch to Card View" : "Switch to Table View"}
        </Button>

      </div>
      <div className="z-0">
        {
          tableView ?
            <TableComp
              columns={columns}
              count={data?.count || 0}
              data={data}
              title={"Active Driver List"}
              getFunc={getDriver}
              search={search}
            />
            :
            <div className="flex flex-col">
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data && data?.data.map((item) => {
                  return (<>
                    <Card key={item._id} className="overflow-hidden relative group hover:shadow-lg transition-shadow duration-300">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 duration-300"
                        onClick={(e) => editDriver(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold flex justify-between items-center">
                          {item.firstName + item.lastName}
                          {
                            item.image.length ?
                              <div className="ml-4 flex-shrink-0">
                                <Image
                                  src={handleSource(item.image)}
                                  alt={`Image for ${item._id}`}
                                  width={80}
                                  height={80}
                                />
                              </div> : <div className="h-[50px]"></div>
                          }
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <div className="flex-grow space-y-2">
                            {/* {cardColumns.map((column) => {
                      const columnId = column.id
                      if (columnId !== imageColumn && columnId !== nameColumn && !dateColumns?.includes(columnId)) {
                        return (
                          <div key={columnId} className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground capitalize">{columnId}:</span>
                            <Badge variant="secondary">
                              {column.accessorFn ? column.accessorFn(item) : item[columnId]}
                            </Badge>
                          </div>
                        )
                      }
                      return null
                    })} */}
                            {/* <div key={0} className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground capitalize">Name:</span>
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                              {item.firstName + item.lastName}
                            </div>
                          </div> */}
                            <div key={1} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground capitalize">Mobile #:</span>
                              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                {item.contactOne}
                              </div>
                            </div>
                            <div key={2} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground capitalize">Vehicle #:</span>
                              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                {item.vehicleInfo.vehicleNo || "N/A"}
                              </div>
                            </div>
                            <div key={3} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground capitalize">Joining Date:</span>
                              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                {new Date(item.joiningDate).toDateString()}
                              </div>
                            </div>
                            <div key={3} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground capitalize">Status:</span>
                              {/* <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                              {item.status.toUpperCase()}
                            </div> */}
                              <div
                                variant="outline"
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-500 hover:bg-red-500 text-white cursor-pointer transition-all duration-300 ${item.status.toUpperCase() === "ACTIVE" ? "bg-green-500 hover:bg-red-500" : "bg-red-500 hover:bg-green-500"
                                  } text-white`}
                                onClick={() => handleStatusChange(item._id, item.status.toUpperCase() === "ACTIVE" ? "inActive" : "active")}
                              >
                                <span className="relative">
                                  <span className={`absolute inset-0 ${item.status.toUpperCase() === "ACTIVE" ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
                                    Active
                                  </span>
                                  <span className={`${item.status.toUpperCase() === "ACTIVE" ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
                                    Inactive
                                  </span>
                                </span>
                              </div>
                            </div>


                            {/* {dateColumns && (
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-sm">
                                <p className="text-muted-foreground">{dateColumns[0]}:</p>
                                <p className="font-medium">{item[dateColumns[0]]}</p>
                              </div>
                              <div className="text-sm text-right">
                                <p className="text-muted-foreground">{dateColumns[1]}:</p>
                                <p className="font-medium">{item[dateColumns[1]]}</p>
                              </div>
                            </div>
                          )} */}
                          </div>
                          {/* {imageColumn && (
                          <div className="ml-4 flex-shrink-0">
                            <Image
                              src={item[imageColumn]}
                              alt={`Image for ${item.id}`}
                              width={80}
                              height={80}
                              className="rounded-full object-cover border-2 border-primary"
                            />
                          </div>
                        )} */}
                          {/* <div className="ml-4 flex-shrink-0">
                          <Image
                            src={handleSource(item.image)}
                            alt={`Image for ${item.id}`}
                            width={80}
                            height={80}
                            className="rounded-full object-cover border-2 border-primary"
                          />
                        </div> */}
                        </div>
                      </CardContent>
                    </Card>
                  </>)
                })}
              </div>
              <div className="flex justify-center items-center space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
        }
      </div>
    </div>
    // </Dashboard>
  );
}
