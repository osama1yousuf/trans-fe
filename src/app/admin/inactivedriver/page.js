"use client";
import { TableComp } from "@/app/Components/DataTable";
import Textfield2 from "@/app/Components/TextField2";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { useUserValidator } from "@/interceptor/userValidate";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import * as Avatar from "@radix-ui/react-avatar";
import ImagePreview from "@/app/Components/ImagePreview";
import { Button } from "@/components/ui/button";
import {
  Badge,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Trash2,
  LayoutGrid,
  TableIcon,
} from "lucide-react";
import Loader from "@/app/Components/Loader";
import DataTable from "react-data-table-component";

export default function InactiveDriver() {
  // useUserValidator("superadmin");

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
  const columns = [
    {
      name: "Image",
      width: "100px",
      cell: (row) => (
        <Avatar.Root className="AvatarRoot inline-flex items-center justify-center align-middle overflow-hidden select-none">
          <Avatar.Image
            className="AvatarImage w-16 h-16 rounded-full object-cover"
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
      selector: (row) => row.joiningDate,
    },
    {
      name: "Status",
      width: "140px",
      selector: (row) => row.status,
      cell: (row) => (
        <select
          value={row.status}
          onChange={() => handleCustomerStatusChange(row)}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          data-te-select-init
        >
          <option value="2">InActive</option>
          <option value="1">Active</option>
        </select>
      ),
    },
    {
      name: "Actions",
      selector: (row) => row.actions,
      // width:"100px",
      cell: (row) => (
        <div className="w-full flex   lg:w-full ">
          <Button
            variant="ghost"
            size="icon"
            className=" duration-200 bg-red-600 hover:bg-red-100 text-white hover:text-red-600 hover:border-red-600"
            // onClick={(e) => editDriver(item)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState(null);
  const [tableView, setTableView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isImagePreview, setIsImagePreview] = useState(false);

  async function getDriver(search, page) {
    try {
      let response = await axiosInstance.get(
        `/driver?status=inActive&search=${search}&limit=${10}&offset=${
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
    let body = {
      status: row.status == "active" ? "inActive" : "active",
    };
    try {
      let response = await axiosInstance.put(`/driver/status/${row._id}`, body);

      toast.success(response.data.message);
      getDriver("", 1);
    } catch (e) {
      console.log(e.message);
      toast.error(e.data);
    }
  };
  const search = watch("search");
  useEffect(() => {
    getDriver("", 1);
  }, []);

  const toggleView = () => {
    setTableView(!tableView);
  };

  useEffect(() => {
    getDriver("", currentPage);
  }, [currentPage]);

  useEffect(() => {
    let isNotDesktop = window.innerWidth < 450;
    setTableView(!isNotDesktop);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchData = async () => {
        setCurrentPage(1);
        await getDriver(search, 0);
      };

      fetchData();
    }, 1000); // 1 second delay

    return () => {
      clearTimeout(handler); // Cleanup on unmount or search change
    };
  }, [search]);
  return (
    // <Dashboard >
    <div>
      {isImagePreview && (
        <ImagePreview
          closeModal={() => {
            setIsImagePreview(false);
            setModalImage("");
          }}
          imageUrl={modalImage}
        />
      )}
      <div className="flex gap-2 mb-2 md:gap-0 md:flex-row flex-col items-center justify-between">
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
        <div className="w-full md:w-1/4">
          <Button onClick={toggleView} variant="outline">
            {tableView ? (
              <LayoutGrid className="mr-2 h-4 w-4" />
            ) : (
              <TableIcon className="mr-2 h-4 w-4" />
            )}
            {tableView ? "Switch to Card View" : "Switch to Table View"}
          </Button>
        </div>
      </div>

      <div>
        {loading ? (
          <Loader />
        ) : tableView ? (
          <div className="max-w-[96vw] rounded-sm">
            <Suspense fallback={<Loader />} />
            <DataTable
              title={"In Active Driver List"}
              data={data?.data.length > 0 ? data.data : []}
              columns={columns}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={data?.count || 0}
              paginationPerPage={currentPage}
              fixedHeader
              onChangePage={(e) => setCurrentPage(e)}
            />
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 left-1 duration-200 bg-red-600 hover:bg-red-100 text-white hover:text-red-600 hover:border-red-600"
                          // onClick={(e) => editDriver(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-semibold flex justify-between mt-1 items-center">
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
                                  Status:
                                </span>
                                {/* <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                              {item.status.toUpperCase()}
                            </div> */}
                                <div
                                  variant="outline"
                                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-500 hover:bg-red-500 text-white cursor-pointer transition-all duration-300 ${
                                    item.status.toUpperCase() === "ACTIVE"
                                      ? "bg-green-500 hover:bg-red-500"
                                      : "bg-red-500 hover:bg-green-500"
                                  } text-white`}
                                  onClick={() =>
                                    handleCustomerStatusChange(item)
                                  }
                                >
                                  <span className="relative">
                                    <span
                                      className={`absolute inset-0 ${
                                        item.status.toUpperCase() === "ACTIVE"
                                          ? "translate-x-0"
                                          : "-translate-x-full"
                                      } transition-transform duration-300`}
                                    >
                                      Active
                                    </span>
                                    <span
                                      className={`${
                                        item.status.toUpperCase() === "ACTIVE"
                                          ? "opacity-0"
                                          : "opacity-100"
                                      } transition-opacity duration-300`}
                                    >
                                      Inactive
                                    </span>
                                  </span>
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
