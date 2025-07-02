"use client";

import axiosInstance from "@/interceptor/axios_inteceptor";
import { Suspense, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/navigation";
import Textfield2 from "@/app/Components/TextField2";
import SelectInput from "@/app/Components/SelectInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LockKeyholeOpen,
  Edit,
  LayoutGrid,
  TableIcon,
  DollarSign,
  FileText,
} from "lucide-react";
import { useForm } from "react-hook-form";
import Loader from "@/app/Components/Loader";
import InactiveForm from "@/app/Components/Forms/InactiveForm";
import ChallanModal from "@/app/Components/ChallanModal";
import { twMerge } from "tailwind-merge";

export default function ActiveMember() {
  // useUserValidator("superadmin");

  const {
    register,
    watch,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
      status: "active",
    },
  });

  const router = useRouter();
  const isMounted = useRef(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableView, setTableView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [inactiveModal, setInactiveModal] = useState(false);
  const [inactiveModalUser, setInactiveModalUser] = useState(null);

  const [modal, setModal] = useState(false);

  const [customer, setCustomer] = useState(null);
  const [challanData, setChallanData] = useState({
    customerId: null,
    driverId: null,
    challanType: "CUSTOMER",
    challanDate: null,
  });

  const search = watch("search");
  const status = watch("status");

  const columns = [
    {
      name: "Actions",
      width: "120px",
      selector: (row) => row.actions,
      // width:"100px",
      cell: (row) => (
        <div className="w-full flex lg:w-full ">
          <span title="Edit Member">
            <button
              onClick={() => editMember(row)}
              className="bg-green-500 hover:bg-gray-500 text-white ms-1 p-1 rounded"
            >
              <Edit className="w-3 h-3" />
            </button>
          </span>
          <span title="Reset Password">
            <button
              onClick={() => resetPassword(row)}
              className="bg-yellow-500 hover:bg-gray-500 text-white ms-1 p-1 rounded"
            >
              <LockKeyholeOpen className="w-3 h-3" />
            </button>
          </span>
          <span title="Collection">
            <button
              onClick={() => {
                setCustomer({
                  name: row.firstName,
                  label: `${row.firstName} ${row.lastName}`,
                  value: row._id,
                });
                setModal(true);
              }}
              className="bg-orange-500 hover:bg-gray-500 text-white ms-1 p-1 rounded"
            >
              <DollarSign className="w-3 h-3" />
            </button>
          </span>
          <span title="Challan">
            <Link href={`/admin/member/challan/${row._id}`}>
              <button className="bg-blue-500 hover:bg-gray-500 text-white ms-1 p-1 rounded">
                <FileText className="w-3 h-3" />
              </button>
            </Link>
          </span>
        </div>
      ),
    },
    {
      name: "Image",
      width: "100px",
      cell: (item) => (
        <>
          <Avatar className="AvatarRoot  inline-flex items-center justify-center align-middle overflow-hidden select-none">
            {/* <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${item?.firstName}%20${item?.lastName}`}
              alt={`${item?.firstName} ${item?.lastName}`}
            /> */}
            <AvatarFallback>
              {item?.firstName?.charAt(0).toUpperCase()}
              {item?.lastName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </>
      ),
    },
    {
      name: "Name",
      width: "270px",
      selector: (row) => row?.firstName + " " + row?.lastName,
    },
    {
      name: "Mobile #",
      width: "140px",
      selector: (row) => row.contactOne,
    },
    {
      name: "Joining Date",
      width: "150px",
      selector: (row) => row.status.joinDate,
      cell: (row) => (
        <div>{moment(row.status.joinDate).format("DD-MMM-YYYY")}</div>
      ),
    },
    {
      name: "Challan Paid/Unpaid",
      width: "150px",
      selector: (row) => row.challan,
      cell: (row) => (
        <div>
          {row.unPaidChallans} / {row.paidChallans}
        </div>
      ),
    },
    {
      name: "Status",
      width: "140px",
      selector: (row) => row.currentStatus,
      cell: (row) => (
        <div
          variant="outline"
          className={`inline-flex items-center rounded-md border p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${
            row.currentStatus.toUpperCase() === "ACTIVE"
              ? "border-green-800 text-green-800 bg-green-200"
              : "border-red-800 text-red-800 bg-red-200"
          }`}
          // onClick={() => handleCustomerStatusChange(row)}
          onClick={() => {
            if (row.currentStatus.toUpperCase() === "ACTIVE") {
              setInactiveModal(true);
              setInactiveModalUser(row);
            } else {
              handleStatusChangetoActive(row);
            }
          }}
        >
          {row.currentStatus === "active" ? (
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

    ,
  ];

  const editMember = (e) => {
    router.push(`/admin/editMember/${e._id}`);
  };

  const handleGenerateChallan = async () => {
    try {
      await axiosInstance.post("/challan/generate", {
        ...challanData,
        challanDate: challanData.challanDate + "-01T00:09:19.733Z",
      });
      toast.success("challan generated successfully");
      setShowModal(false);
    } catch (error) {
      toast.error(error?.message);
      setShowModal(false);
      console.log("error", error);
    }
  };

  async function getMemeber() {
    try {
      setLoading(true);
      let response = await axiosInstance.get(
        `/customer?status=${status}&search=${search}&limit=${limit}&offset=${
          currentPage > 1 ? (currentPage - 1) * limit : 0
        }`
      );
      setData(response.data);
      setTotalCount(response?.data?.count);
      setTotalPages(Math.ceil(response.data.count / limit));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  /// status change to active user event
  const handleStatusChangetoActive = async (row) => {
    let confirm = window.confirm("Are You Sure to Active Member?");
    if (confirm) {
      let body = {
        status: "active",
      };
      try {
        let response = await axiosInstance.put(
          `/customer/status/${row?._id}`,
          body
        );
        await getMemeber();
        toast.success(response.data.message);
      } catch (e) {
        toast.error(e?.response?.data?.message || "Server Error");
      }
    }
  };

  /// status change to inactive user event
  const handleStatusChangetoInactive = async (values, user) => {
    let body = {
      status: "inActive",
      comments: values?.comments,
      inActiveDate: values?.date,
    };
    try {
      let response = await axiosInstance.put(
        `/customer/status/${user._id}`,
        body
      );
      if (response) {
        setInactiveModal(false);
        toast.success(response.data.message);
        getMemeber();
      }
    } catch (e) {
      setInactiveModal(false);
      toast.error(e?.response?.data?.message || "Server Error");
    }
  };

  const resetPassword = async (e) => {
    try {
      if (confirm("Are  you sure you want to reset password")) {
        let body = { contactOne: e?.contactOne };
        // console.log("body", body);
        let response = await axiosInstance.post(
          "/superadmin/reset-password",
          body
        );
        // console.log("response", response);
        toast.success(response.data.message);
      }
    } catch (e) {
      // console.log("e", e);
      toast.error(e?.response?.data?.message || "Server Error");
    }
  };

  // change view table and card
  const toggleView = () => {
    setTableView(!tableView);
  };

  // Effect for currentPage and limt change
  useEffect(() => {
    if (isMounted.current) {
      getMemeber();
    }
  }, [currentPage, limit]);

  // Effect for search change
  useEffect(() => {
    if (isMounted.current) {
      const handler = setTimeout(() => {
        const fetchData = async () => {
          setCurrentPage(1); // Reset pagination
          await getMemeber();
        };

        fetchData();
      }, 500); // 0.5 second debounce
      return () => {
        clearTimeout(handler); // Cleanup
      };
    }
  }, [search]);

  // Effect for `status` change
  useEffect(() => {
    if (isMounted.current) {
      setCurrentPage(1); // Reset pagination
      getMemeber();
    }
  }, [status]);

  // Set the flag to true after the first render
  useEffect(() => {
    let isNotDesktop = window.innerWidth < 450;
    setTableView(!isNotDesktop);
    if (!isMounted.current) {
      getMemeber();
    }
    isMounted.current = true;
  }, []);

  const handlePayNow = async (val, type) => {
    try {
      let response = await axiosInstance.post(`/challan/status/paid`, val);
      // console.log("response", response);
      toast.success(response?.data?.message);
    } catch (error) {
      // console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    setModal(false);
  };

  return (
    <div>
      {/* challan generate model  */}
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
      )}{" "}
      {inactiveModal && (
        <InactiveForm
          setInactiveModal={setInactiveModal}
          inactiveModalUser={inactiveModalUser}
          type={"Member"}
          handleStatusChangetoInactive={handleStatusChangetoInactive}
        />
      )}
      {modal && (
        <ChallanModal
          type={"customer"}
          isCustomerExists={true}
          setChallanModal={setModal}
          handlePayNow={handlePayNow}
          customer={customer}
        />
      )}
      {/* filter area */}
      <div className="flex bg-white p-2 rounded-md gap-2 mb-2 md:gap-0 md:flex-row flex-col md:items-center items-end justify-between">
        <div className="w-full md:w-1/4">
          <Textfield2
            register={register}
            setFocus={setFocus}
            error={""}
            name={"search"}
            label={"Search"}
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
                  value: "active",
                  label: "Active",
                },
                {
                  value: "inActive",
                  label: "In Active",
                },
                {
                  value: "",
                  label: "All",
                },
              ]}
            />
          </div>
          <Link href={"/admin/createmember"}>
            {" "}
            <button
              type="button"
              form="driverCreate"
              disabled={loading}
              className={` text-white bg-[#811630] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-xs px-5 py-2.5 text-center`}
            >
              Create
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
      {/* date view table and card  */}
      <div>
        <Suspense fallback={<Loader />}>
          {tableView ? (
            <div className="max-w-[96vw] rounded-sm">
              {/* <Suspense fallback={<Loader />} /> */}
              <DataTable
                title={"Members"}
                data={data?.data?.length > 0 ? data.data : []}
                columns={columns}
                progressPending={loading}
                pagination={false}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data &&
                  data?.data?.map((item, i) => {
                    return (
                      <RenderCard
                        key={`card-${i}`}
                        item={item}
                        setModal={setModal}
                        setCustomer={setCustomer}
                        editMember={editMember}
                        resetPassword={resetPassword}
                        router={router}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </Suspense>

        {!loading && (
          <div className="flex justify-center items-center space-x-2 mt-4">
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
                Page {currentPage} of {totalPages} | {totalCount} {}
                records
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
        )}
      </div>
    </div>
  );
}

const RenderCard = ({
  item,
  setModal,
  setCustomer,
  editMember,
  resetPassword,
  router,
}) => {
  return (
    <Card
      key={item.image}
      className="overflow-hidden relative group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => router.push(`/admin/member/info/${item._id}`)}
    >
      <div className="absolute top-1 right-2 duration-200 flex">
        <span title="Reset Password">
          <button
            onClick={() => resetPassword(item)}
            className="bg-yellow-500 hover:bg-gray-500 text-white ms-1 p-1 rounded"
          >
            <LockKeyholeOpen className="w-3 h-3" />
          </button>
        </span>
        <span title="Edit Member From">
          <button
            onClick={() => editMember(item)}
            className="bg-green-500 hover:bg-gray-500 text-white ms-1 p-1 rounded"
          >
            <Edit className="w-3 h-3" />
          </button>
        </span>
        <span title="Collection">
          <button
            onClick={() => {
              setModal(true);
              setCustomer({
                name: item?.firstName,
                label: `${item?.firstName} ${item?.lastName}`,
                value: item._id,
              });
            }}
            className="bg-orange-500 hover:bg-gray-500 text-white ms-1 p-1 rounded"
          >
            <DollarSign className="w-3 h-3" />
          </button>
        </span>
        <span title="Challan">
          <Link href={`/admin/member/challan/${item._id}`}>
            <button className="bg-blue-500 hover:bg-gray-500 text-white ms-1 p-1 rounded">
              <FileText className="w-3 h-3" />
            </button>
          </Link>
        </span>
      </div>
      <CardHeader className="pb-2 mt-2">
        <CardTitle className="text-lg font-semibold flex justify-between items-center">
          {item?.firstName + " " + item?.lastName}
          <Avatar className="md:h-10 md:w-10 sm:h-8 sm:w-8">
            {/* <AvatarImage
                                src={`https://api.dicebear.com/6.x/initials/svg?seed=${item?.firstName}%20${item?.lastName}`}
                                alt={`${item?.firstName} ${item?.lastName}`}
                              /> */}
            <AvatarFallback>
              {item?.firstName?.charAt(0).toUpperCase()}
              {item?.lastName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="flex-grow space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground capitalize">
                Mobile #:
              </span>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {item.contactOne}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground capitalize">
                Residential Location:
              </span>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {item?.location?.residentialAddress || "N/A"}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground capitalize">
                Joining Date:
              </span>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {moment(item?.status?.joinDate).format("DD-MMM-YYYY") || "N/A"}
              </div>
            </div>
            <div key={3} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground capitalize">
                Status:
              </span>
              <div
                className={twMerge(
                  `inline-flex items-center rounded-md border p-1 text-xs font-semibold focus:outline-none 
                  focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-gray-200 cursor-pointer transition-all duration-300 `,
                  item?.currentStatus?.toUpperCase() === "ACTIVE"
                    ? "border-green-800 text-green-800 bg-green-200"
                    : "border-red-800 text-red-800 bg-red-200"
                )}
              >
                {item.currentStatus === "active" ? (
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
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground capitalize">
                Challan Paid/Unpaid:
              </span>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {item.unPaidChallans} / {item.paidChallans}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
