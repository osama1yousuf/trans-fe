"use client";
import { TableComp } from "@/app/Components/DataTable";
import Loader from "@/app/Components/Loader";
import { SelectDropdown } from "@/app/Components/SelectDropdown";
import { attendanceCol } from "@/app/helper/columnList";
import { getDriverAttendance } from "@/app/helper/DriverServices";
import { Suspense, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
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
  const getAttendance = async (filter) => {
    let res = await getDriverAttendance(filter);
    setData(res);
  };
  useEffect(() => {
    getAttendance(filterSelect);
  }, [filterSelect]);
  return (
    <div>
      <div className="w-full mb-2 md:w-1/4">
        <SelectDropdown
          label={"Filter"}
          options={filterOptions}
          handleChange={(e) => setFilterSelect(e.target.value)}
        />
      </div>
      <div className="max-w-[92vw]  rounded-sm">
        <Suspense fallback={<Loader />} />
        <DataTable
          title={"Attendance Record"}
          data={data?.length > 0 ? data : []}
          columns={attendanceCol}
          pagination
          paginationTotalRows={data?.length}
          paginationPerPage={10}
          fixedHeader
        />
      </div>
    </div>
  );
}
