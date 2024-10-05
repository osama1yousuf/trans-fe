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
      fromDate: (function () {
        let date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        date.setUTCHours(0, 0, 0, 0);
        return date.toISOString();
      })(),
    },
  });
  const [data, setData] = useState([]);
  const getAttendance = async (filter) => {
    let res = await getDriverAttendanceForAdmin(filter);
    console.log("res", res);

    setData(res);
  };
  const fromDate = watch("fromDate");
  useEffect(() => {
    // getAttendance();
    let from_date = new Date(fromDate).setUTCHours(0, 0, 0, 0);
    if (from_date) {
      getAttendance(new Date(from_date).toISOString());
    }
  }, [fromDate]);
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
            <div className="w-full mt-5 lg:w-1/4 px-3">
              <SearchableSelect />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="w-full">
        <TableComp
          columns={attendanceColForAdmin}
          // title={"Attendance Record"}
          data={data}
        />
      </div>
    </div>
  );
}
