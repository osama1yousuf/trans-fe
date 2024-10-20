"use client";
import { TableComp } from "@/app/Components/DataTable";
import { SelectDropdown } from "@/app/Components/SelectDropdown";
import { attendanceCol } from "@/app/helper/columnList";
import { getDriverAttendance } from "@/app/helper/DriverServices";
import { useEffect, useState } from "react";
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
    <div className="p-4">
      <div className="w-full lg:w-1/4">
        <SelectDropdown
          label={"Filter"}
          options={filterOptions}
          handleChange={(e) => setFilterSelect(e.target.value)}
        />
      </div>
      <div className="w-full">
        {/* <TableComp
          count={data?.count || 0}
          columns={attendanceCol}
          title={"Attendance Record"}
          data={data}
        /> */}
      </div>
    </div>
  );
}
