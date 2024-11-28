"use client";
import Loader from "@/app/Components/Loader";
import { SelectDropdown } from "@/app/Components/SelectDropdown";
import { attendanceCol } from "@/app/helper/columnList";
import { getDriverAttendance } from "@/app/helper/DriverServices";
import { Suspense, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
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
  const [noOfShifts, setNoOfShifts] = useState(0);

  let attendColBaseOnShifs = Array.from({ length: noOfShifts }, (_, index) => {
    return {
      name: `Shift ${index + 1}`,
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
    let res = await getDriverAttendance(filter);
    setData(res);
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

  return (
    <div>
      <div className="w-full mb-2 md:w-1/4">
        <SelectDropdown
          label={"Filter"}
          options={filterOptions}
          handleChange={(e) => setFilterSelect(e.target.value)}
        />
      </div>
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
    </div>
  );
}
