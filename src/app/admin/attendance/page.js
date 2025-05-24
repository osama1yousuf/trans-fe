"use client";
import { CalendarDays, User, Bus, LayoutGrid, TableIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { attendanceColForAdmin } from "@/app/helper/columnList";
import { getDriverAttendanceForAdmin } from "@/app/helper/DriverServices";
import { Suspense, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Textfield2 from "@/app/Components/TextField2";
import SearchableSelect from "@/app/Components/searchable-select";
import Loader from "@/app/Components/Loader";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { Button } from "@/components/ui/button";
export default function Attendance() {
  const {
    register,
    setFocus,
    setValue,
    watch,
    formState: {},
  } = useForm({
    defaultValues: {
      search: {
        type: "",
        driverIds: [],
        fromDate: (function () {
          const date = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          );
          date.setUTCHours(0, 0, 0, 0);
          return date.toISOString().split("T")[0]; // ✅ YYYY-MM-DD
        })(),
        toDate: (function () {
          const date = new Date();
          date.setUTCHours(23, 59, 59, 59);
          return date.toISOString().split("T")[0]; // ✅ YYYY-MM-DD
        })(),
      },
    },
  });

  const [data, setData] = useState([]);
  const [tableView, setTableView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getAttendance = async (search, page) => {
    // console.log("first", search);
    setLoading(true);
    let from_date = search?.fromDate
      ? new Date(search.fromDate).setUTCHours(0, 0, 0, 0)
      : "";
    let to_date = search?.toDate
      ? new Date(search.toDate).setUTCHours(23, 59, 59, 0)
      : "";
    let searchBody = {
      driverIds: search?.driverIds?.length > 0 ? search.driverIds : "",
      fromDate: new Date(from_date).toISOString(),
      toDate: new Date(to_date).toISOString(),
      type: search?.type ?? "",
    };
    let res = await getDriverAttendanceForAdmin(searchBody, page);
    setData(res);

    // setDataForGrid(res.splice(0, 10));
    setTotalPages(res.length || 0);
    setLoading(false);
  };

  const fromDate = watch("search.fromDate");
  const toDate = watch("search.toDate");
  const driverIds = watch("search.driverIds");
  useEffect(() => {
    getAttendance({ fromDate, toDate, driverIds }, 0);
  }, [fromDate, toDate, driverIds]);

  useEffect(() => {
    setValue(
      "search.fromDate",
      (function () {
        let date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        date.setUTCHours(0, 0, 0, 0);
        return date.toISOString();
      })()
    );
    setValue(
      "search.toDate",
      (function () {
        let date = new Date();
        date.setUTCHours(23, 59, 59, 59);
        return date.toISOString();
      })()
    );
    getDriver("");
  }, []);

  async function getDriver(search) {
    try {
      let response = await axiosInstance.get(
        `/driver?status=active&search=${search}&limit=${100000}`
      );
      setDriverList(response?.data?.data);
    } catch (e) {
      // console.log(e);
    }
  }

  const formatTime = (time) => {
    return time !== null ? new Date(time).toLocaleTimeString() : "-";
  };

  const getStatusColor = (time) => {
    return time !== null ? "bg-green-500" : "bg-red-500";
  };
  const toggleView = () => {
    setTableView(!tableView);
  };
  useEffect(() => {
    let isNotDesktop = window.innerWidth < 450;
    setTableView(!isNotDesktop);
  }, []);

  return (
    <div>
      <div className="flex gap-2 mb-2 md:gap-0 md:flex-row flex-col items-center justify-between">
        <Accordion type="single" collapsible className="w-full md:w-5/6 mb-2">
          <AccordionItem
            className="border-2 border-gray-300 rounded-lg"
            value="item-1"
          >
            <AccordionTrigger className="px-2">Filters</AccordionTrigger>
            <div className="w-full flex rounded-2 flex-wrap mb-2">
              <div className="w-full lg:w-1/4  px-3">
                <Textfield2
                  label={"From Date"}
                  name={"search.fromDate"}
                  setFocus={setFocus}
                  register={register}
                  type={"date"}
                />
              </div>
              <div className="w-full lg:w-1/4  px-3">
                <Textfield2
                  label={"To Date"}
                  name={"search.toDate"}
                  setFocus={setFocus}
                  register={register}
                  type={"date"}
                />
              </div>
              <div className="mt-5 w-full lg:w-1/4 px-3">
                <SearchableSelect
                  handleSelect={(val) => {
                    const previousValue = driverIds || [];
                    const newValue = previousValue.includes(val)
                      ? previousValue.filter((id) => id !== val)
                      : [...previousValue, val];
                    setValue("search.driverIds", newValue);
                  }}
                  driverIds={driverIds}
                  options={
                    driverList.length > 0
                      ? driverList.map((e) => {
                          return {
                            label: `${e?.firstName} ${e?.contactOne}`,
                            value: e?._id,
                          };
                        })
                      : []
                  }
                />
              </div>
            </div>
          </AccordionItem>
        </Accordion>
        <div className="w-full md:w-1/6 ml-3">
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
      {loading ? (
        <Loader />
      ) : tableView ? (
        <div className="max-w-[96vw] rounded-sm">
          <span>
            {driverIds
              .map(
                (id) =>
                  driverList.find((driver) => driver._id === id)?.firstName +
                  " " +
                  driverList.find((driver) => driver._id === id)?.lastName
              )
              .filter(Boolean)
              .join(", ")}
          </span>
          <Suspense fallback={<Loader />} />
          <DataTable
            title={"Attendance Record"}
            data={data?.length > 0 ? data : []}
            columns={attendanceColForAdmin}
            pagination
            paginationTotalRows={data?.length}
            paginationPerPage={10}
            fixedHeader
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.length > 0 &&
              data.map((e, i) => {
                const { date, driverName, attendance } = e; // Assuming 'e' has these properties
                return (
                  <Card key={i} className="w-full max-w-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          {date}
                        </div>
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm">{driverName}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {attendance.map((trip) => (
                          <div
                            key={trip.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <Bus className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                Trip {trip?.shift.replace("SHIFT_", "")}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Badge
                                variant="secondary"
                                className={getStatusColor(trip.checkInTime)}
                              >
                                In: {formatTime(trip.checkInTime)}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className={getStatusColor(trip.checkOutTime)}
                              >
                                Out: {formatTime(trip.checkOutTime)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
