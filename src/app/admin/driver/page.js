"use client";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import { Suspense, useEffect, useState } from "react";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
import Loader from "@/app/Components/Loader";
import { useUserValidator } from "@/interceptor/userValidate";
import Textfield2 from "@/app/Components/TextField2";
import { useForm } from "react-hook-form";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  LayoutGrid,
  TableIcon,
} from "lucide-react";
import * as Avatar from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImagePreview from "@/app/Components/ImagePreview";
import SelectInput from "@/app/Components/SelectInput";
import Link from "next/link";

export default function ActiveDriver() {
  // useUserValidator("superadmin")
  const {
    register,
    watch,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
      status: "",
    },
  });
  const router = useRouter();
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableView, setTableView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isImagePreview, setIsImagePreview] = useState(false);
  const [modalImage, setModalImage] = useState("");
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
      width: "90px",
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
      width: "100px",
      cell: (row) => (
        <Avatar.Root className="AvatarRoot  inline-flex items-center justify-center align-middle overflow-hidden select-none">
          <Avatar.Image
            onClick={() => {
              setIsImagePreview(true);
              setModalImage(row?.image);
            }}
            className="AvatarImage cursor-pointer w-16 h-16 rounded-full object-cover"
            src={row.image}
            alt={`Avatar for ${row.name || "User"}`}
          />
          <Avatar.Fallback
            className="AvatarImage cursor-pointer w-16 h-16 rounded-full object-cover text-center flex items-center justify-center  bg-gray-200"
            delayMs={600}
          >
            N/A
          </Avatar.Fallback>
        </Avatar.Root>
      ),
    },
    {
      name: "Name",
      width: "300px",
      selector: (row) => row?.firstName + " " + row?.lastName,
    },
    {
      name: "Mobile #",
      width: "140px",
      selector: (row) => row.contactOne,
    },
    {
      name: "Vehicle #",
      width: "140px",
      selector: (row) => row.vehicleInfo.vehicleNo,
    },
    {
      name: "Joining Date",
      width: "150px",
      selector: (row) => new Date(row.joiningDate).toDateString(),
    },
    {
      name: "Cnic Expire",
      width: "120px",
      selector: (row) => row.cnicExpiry,
      cell: (row) => (
        <div
          className={`${
            row?.cnicExpiry !== ""
              ? new Date(row?.cnicExpiry) <= new Date()
                ? "border-red-800 text-red-800 bg-red-200"
                : "border-green-800 text-green-800 bg-green-200"
              : "border-gray-800 text-gray-600 bg-gray-200"
          } border rounded-lg p-1 font-semibold text-xs m-auto`}
        >
          {row?.cnicExpiry !== ""
            ? new Date(row?.cnicExpiry) <= new Date()
              ? "Yes"
              : "No"
            : "N/A"}
        </div>
      ),
    },
    {
      name: "License Expire",
      width: "120px",
      selector: (row) => row.licenseInfo,
      cell: (row) => (
        <div
          className={`${
            row?.licenseInfo?.licenseExpiry !== ""
              ? new Date(row?.licenseInfo?.licenseExpiry) <= new Date()
                ? "border-red-800 text-red-800 bg-red-200"
                : "border-green-800 text-green-800 bg-green-200"
              : "border-gray-800 text-gray-600 bg-gray-200"
          } border rounded-lg p-1 font-semibold text-xs m-auto`}
        >
          {row?.licenseInfo?.licenseExpiry !== ""
            ? new Date(row?.licenseInfo?.licenseExpiry) <= new Date()
              ? "Yes"
              : "No"
            : "N/A"}
        </div>
      ),
    },
    {
      name: "Status",
      width: "140px",
      selector: (row) => row.status,
      cell: (row) => (
        <div
          variant="outline"
          className={`inline-flex items-center rounded-md border p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${
            row.status.toUpperCase() === "ACTIVE"
              ? "border-green-800 text-green-800 bg-green-200"
              : "border-red-800 text-red-800 bg-red-200"
          }`}
          onClick={() => handleCustomerStatusChange(row)}
        >
          {row.status === "active" ? (
            <span className="relative">
              <span
                className={`
              } transition-transform duration-300`}
              >
                Active
              </span>
            </span>
          ) : (
            <span className="relative">
              <span
                className={`
              } transition-transform duration-300`}
              >
                Inactive
              </span>
            </span>
          )}
        </div>
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

  async function getDriver(search, page, status) {
    try {
      setLoading(true);
      let response = await axiosInstance.get(
        `/driver?status=${status}&search=${search}&limit=${10}&offset=${
          page > 1 ? (page - 1) * 10 : 0
        }`
      );
      setData(response.data);
      setTotalPages(Math.ceil(response.data.count / 10));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }
  const handleCustomerStatusChange = async (row) => {
    let confirm = window.confirm("Are You Sure");
    if (confirm) {
      let body = {
        status: row.status == "active" ? "inActive" : "active",
      };
      try {
        let response = await axiosInstance.put(
          `/driver/status/${row._id}`,
          body
        );
        toast.success(response.data.message);
        getDriver("", 1, "");
      } catch (e) {
        console.log(e);
        toast.error(e.data);
      }
    }
  };
  const search = watch("search");
  const status = watch("status");
  useEffect(() => {
    let isNotDesktop = window.innerWidth < 450;
    setTableView(!isNotDesktop);
    getDriver("", 1, "");
  }, []);

  const toggleView = () => {
    setTableView(!tableView);
  };

  useEffect(() => {
    getDriver("", currentPage, status);
  }, [currentPage]);
  /// work when search value change
  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchData = async () => {
        setCurrentPage(1);
        setValue("status", "");
        await getDriver(search, 0, "");
      };

      fetchData();
    }, 1000); // 1 second delay

    return () => {
      clearTimeout(handler); // Cleanup on unmount or search change
    };
  }, [search]);

  /// work when status value change
  useEffect(() => {
    setCurrentPage(1);
    getDriver(search, 0, status);
  }, [status]);
  return (
    // <Dashboard >
    <div>
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
      {isImagePreview && (
        <ImagePreview
          closeModal={() => {
            setIsImagePreview(false);
            setModalImage("");
          }}
          imageUrl={modalImage}
        />
      )}
      <div className="flex bg-white p-2 rounded-md gap-2 mb-2 md:gap-0 md:flex-row flex-col md:items-center items-end justify-between">
        <div className="w-full md:w-1/4">
          <Textfield2
            register={register}
            setFocus={setFocus}
            error={""}
            name={"search"}
            label={"Search By Name"}
            type={"text"}
          />
        </div>
        <div className="flex justify-center items-end gap-2">
          <div className="min-w-200">
            <SelectInput
              label={"Status"}
              name={"status"}
              setFocus={setFocus}
              error={errors?.status}
              register={register}
              options={[
                {
                  value: "",
                  label: "All",
                },
                {
                  value: "active",
                  label: "Active",
                },
                {
                  value: "inActive",
                  label: "In Active",
                },
              ]}
            />
          </div>
          <Link href={"/admin/createdriver"}>
            {" "}
            <button
              type="button"
              form="driverCreate"
              disabled={loading}
              className={` text-white bg-[#811630] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-xs px-5 py-2.5 text-center`}
            >
              Create Driver
            </button>
          </Link>

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
      <div>
        {loading ? (
          <Loader />
        ) : tableView ? (
          <div className="max-w-[96vw] rounded-sm">
            <Suspense fallback={<Loader />} />
            <DataTable
              title={"Active Driver List"}
              data={data?.data.length > 0 ? data.data : []}
              columns={columns}
              progressPending={loading}
              pagination={false}
              // paginationServer={true}
              // highlightOnHover={true}
              // paginationRowsPerPageOptions={[10]}
              // paginationTotalRows={data?.count || 0}
              // paginationPerPage={currentPage}
              // fixedHeader
              // onChangePage={(e) => {
              //   console.log("e", e);
              //   setCurrentPage(e);
              // }}
            />
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
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
        ) : (
          <div className="flex flex-col">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {data &&
                data?.data.map((item) => {
                  return (
                    <>
                      <Card
                        key={item.image}
                        className="overflow-hidden relative group hover:shadow-lg transition-shadow duration-300"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 duration-200"
                          onClick={(e) => editDriver(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-semibold flex justify-between items-center">
                            {item.firstName + " " + item.lastName}
                            <Avatar.Root className="AvatarRoot inline-flex items-center justify-center align-middle overflow-hidden select-none">
                              <Avatar.Image
                                onClick={() => {
                                  setIsImagePreview(true);
                                  setModalImage(item?.image);
                                }}
                                className="AvatarImage cursor-pointer w-16 h-16 rounded-full object-cover"
                                src={item.image}
                                alt={`Avatar for ${item.name || "User"}`}
                              />
                              <Avatar.Fallback
                                className="AvatarImage cursor-pointer w-16 h-16 rounded-full object-cover text-center flex items-center justify-center  bg-gray-200"
                                delayMs={600}
                              >
                                N/A
                              </Avatar.Fallback>
                            </Avatar.Root>
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
                                  Mobile #:
                                </span>
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                  {item.contactOne}
                                </div>
                              </div>
                              <div
                                key={2}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm text-muted-foreground capitalize">
                                  Vehicle #:
                                </span>
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                  {item.vehicleInfo.vehicleNo || "N/A"}
                                </div>
                              </div>
                              <div
                                key={3}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm text-muted-foreground capitalize">
                                  Joining Date:
                                </span>
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                  {new Date(item.joiningDate).toDateString()}
                                </div>
                              </div>
                              <div
                                key={3}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm text-muted-foreground capitalize">
                                  Cnic Expire:
                                </span>
                                <div
                                  className={`${
                                    item?.cnicExpiry !== ""
                                      ? new Date(item?.cnicExpiry) <= new Date()
                                        ? "border-red-800 text-red-800 bg-red-200"
                                        : "border-green-800 text-green-800 bg-green-200"
                                      : "border-gray-800 text-gray-600 bg-gray-200"
                                  } border rounded-lg p-1 font-semibold text-xs`}
                                >
                                  {item?.cnicExpiry !== ""
                                    ? new Date(item?.cnicExpiry) <= new Date()
                                      ? "Yes"
                                      : "No"
                                    : "N/A"}
                                </div>
                              </div>
                              <div
                                key={3}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm text-muted-foreground capitalize">
                                  License Expire:
                                </span>
                                <div
                                  className={`${
                                    item?.licenseInfo?.licenseExpiry !== ""
                                      ? new Date(
                                          item?.licenseInfo?.licenseExpiry
                                        ) <= new Date()
                                        ? "border-red-800 text-red-800 bg-red-200"
                                        : "border-green-800 text-green-800 bg-green-200"
                                      : "border-gray-800 text-gray-600 bg-gray-200"
                                  } border rounded-lg p-1 font-semibold text-xs`}
                                >
                                  {item?.licenseInfo?.licenseExpiry !== ""
                                    ? new Date(
                                        item?.licenseInfo?.licenseExpiry
                                      ) <= new Date()
                                      ? "Yes"
                                      : "No"
                                    : "N/A"}
                                </div>
                              </div>
                              <div
                                key={3}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm text-muted-foreground capitalize">
                                  Status:
                                </span>
                                {/* <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                              {item.status.toUpperCase()}
                            </div> */}
                                <div
                                  variant="outline"
                                  className={`inline-flex items-center rounded-md border p-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${
                                    item.status.toUpperCase() === "ACTIVE"
                                      ? "border-green-800 text-green-800 bg-green-200"
                                      : "border-red-800 text-red-800 bg-red-200"
                                  }`}
                                  onClick={() =>
                                    handleCustomerStatusChange(item)
                                  }
                                >
                                  {item.status === "active" ? (
                                    <span className="relative">
                                      <span
                                        className={`
              } transition-transform duration-300`}
                                      >
                                        Active
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="relative">
                                      <span
                                        className={`
              } transition-transform duration-300`}
                                      >
                                        Inactive
                                      </span>
                                    </span>
                                  )}
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
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
        )}
      </div>
    </div>
    // </Dashboard>
  );
}
