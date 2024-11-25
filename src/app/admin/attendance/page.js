"use client";
import { TableComp } from "@/app/Components/DataTable";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { attendanceColForAdmin } from "@/app/helper/columnList";
import { getDriverAttendanceForAdmin } from "@/app/helper/DriverServices";
import { useEffect, useState } from "react";
import Textfield2 from "@/app/Components/TextField2";
import SearchableSelect from "@/app/Components/searchable-select";
export default function Attendance() {
  const {
    register,
    setFocus,
    watch,
    formState: {},
  } = useForm({
    defaultValues: {
      search: {
        type: "",
        driverIds: [],
        fromDate: (function () {
          let date = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          );
          date.setUTCHours(0, 0, 0, 0);
          return date.toISOString();
        })(),
        toDate: (function () {
          let date = new Date();
          date.setUTCHours(0, 0, 0, 0);
          return date.toISOString();
        })(),
      },
    },
  });
  const [data, setData] = useState("");
  const getAttendance = async (search, page) => {
    let from_date = search?.fromDate
      ? new Date(search.fromDate).setUTCHours(0, 0, 0, 0)
      : "";
    let to_date = search?.toDate
      ? new Date(search.toDate).setUTCHours(0, 0, 0, 0)
      : "";
    let searchBody = {
      driverIds: search?.driverIds?.length > 0 ? search.driverIds : "",
      fromDate: new Date(from_date).toISOString(),
      toDate: new Date(to_date).toISOString(),
      type: search?.type ?? "",
    };
    let res = await getDriverAttendanceForAdmin(searchBody, page);
    console.log("res", res);
    setData(res);
  };
  const search = watch("search");
  useEffect(() => {
    getAttendance(search, 0);
  }, [search]);
  return (
    <div className="p-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          className="border-2 border-gray-300 rounded-lg"
          value="item-1"
        >
          <AccordionTrigger className="px-2">Filters</AccordionTrigger>
          <AccordionContent className="w-full flex rounded-2 flex-wrap">
            <div className="w-full lg:w-1/4  px-3">
              <Textfield2
                label={"From Date"}
                name={"fromDate"}
                setFocus={setFocus}
                register={register}
                type={"date"}
              />
            </div>
            <div className="w-full lg:w-1/4  px-3">
              <Textfield2
                label={"To Date"}
                name={"toDate"}
                setFocus={setFocus}
                register={register}
                type={"date"}
              />
            </div>
            <div className="w-full mt-5 lg:w-1/4 px-3">
              <SearchableSelect />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="w-full">
        {/* <TableComp
          columns={attendanceColForAdmin}
          count={data?.length || 0}
          data={data}
          getFunc={getAttendance}
          search={search}
          title={"Attendance Record"}
        /> */}
      </div>
    </div>
  );
}
