"use client";
import Loader from "@/app/Components/Loader";
import { SelectDropdown } from "@/app/Components/SelectDropdown";
import { attendanceCol } from "@/app/helper/columnList";
import { getDriverAttendance } from "@/app/helper/DriverServices";
import { Button } from "@/components/ui/button";
import { Bus, CalendarDays, LayoutGrid, TableIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Suspense, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const filterOptions = [
  {
    value: (function () {
      let date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      date.setUTCHours(0, 0, 0, 0);
      return date.toISOString();
    })(),
    label: "This Month",
  },
  {
    value: (function () {
      let date = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        1
      );
      date.setUTCHours(0, 0, 0, 0);
      return date.toISOString();
    })(),
    label: "Last 2 Month",
  },
  {
    value: (function () {
      let date = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 2,
        1
      );
      date.setUTCHours(0, 0, 0, 0);
      return date.toISOString();
    })(),
    label: "Last 3 Month",
  },
];
export default function Attendance() {
  const [filterSelect, setFilterSelect] = useState(
    new Date(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1).setUTCHours(
        0,
        0,
        0,
        0
      )
    ).toISOString()
  );
  const [data, setData] = useState([]);
  const [tableView, setTableView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noOfShifts, setNoOfShifts] = useState(0);

  let attendColBaseOnShifs = Array.from({ length: noOfShifts }, (_, index) => {
    return {
      name: `Tr ${index + 1}`,
      selector: (row) => row,
      cell: (row) => (
        <div className="flex min-w-[68px] flex-col gap-1 py-1">
          <p className="bg-red-500 p-1 text-center text-white">
            {row.attendance.find(
              (e) => e.shift === `SHIFT_${index + 1}` && e?.checkInTime !== null
            )
              ? formatTime(
                  new Date(
                    row.attendance.find(
                      (e) =>
                        e.shift === `SHIFT_${index + 1}` &&
                        e?.checkInTime !== null
                    )?.checkInTime
                  )
                )
              : "-"}
          </p>
          <p className="bg-green-500 p-1 text-center text-white">
            {row.attendance.find(
              (e) =>
                e.shift === `SHIFT_${index + 1}` && e?.checkoutTime !== null
            )
              ? formatTime(
                  new Date(
                    row.attendance.find(
                      (e) =>
                        e.shift === `SHIFT_${index + 1}` &&
                        e?.checkoutTime !== null
                    )?.checkoutTime
                  )
                )
              : "-"}
          </p>
        </div>
      ),
    };
  });

  const getAttendance = async (filter) => {
    setLoading(true);
    let res = await getDriverAttendance(filter);
    setData(res);
    setLoading(false);
  };
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  useEffect(() => {
    getAttendance(filterSelect);
  }, [filterSelect]);

  useEffect(() => {
    setNoOfShifts(JSON.parse(localStorage.getItem("user"))?.noOfShifts);
  }, []);
  const toggleView = () => {
    setTableView(!tableView);
  };
  useEffect(() => {
    let isNotDesktop = window.innerWidth < 450;
    setTableView(!isNotDesktop);
  }, []);
  const formatTimeForCard = (time) => {
    return time !== null ? new Date(time).toLocaleTimeString() : "-";
  };

  const getStatusColor = (time) => {
    return time !== null ? "bg-green-500" : "bg-red-500";
  };
  return (
    <div>
      <div className="flex gap-2 mb-2 md:gap-0 md:flex-row flex-col items-center justify-between">
        <div className="w-full mb-2 md:w-1/4">
          <SelectDropdown
            label={"Filter"}
            options={filterOptions}
            handleChange={(e) => setFilterSelect(e.target.value)}
          />
        </div>
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
          <Suspense fallback={<Loader />} />
          <DataTable
            title={"Attendance Record"}
            data={data?.length > 0 ? data : []}
            columns={[...attendanceCol, ...attendColBaseOnShifs]}
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
                                Trip {trip?.shift.replace("SHIFT_" , "")}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Badge
                                variant="secondary"
                                className={getStatusColor(trip.checkInTime)}
                              >
                                In: {formatTimeForCard(trip.checkInTime)}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className={getStatusColor(trip.checkoutTime)}
                              >
                                Out: {formatTimeForCard(trip.checkoutTime)}
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
