"use client";
import { TableComp } from "@/app/Components/DataTable";
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
import Textfield2 from "@/app/Components/TextField2";
import SearchableSelect from "@/app/Components/searchable-select";
import Loader from "@/app/Components/Loader";
import axiosInstance from "@/interceptor/axios_inteceptor";
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
  const [driverList, setDriverList] = useState([]);

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
    // console.log("res", res);
    setData(res);
  };

  const fromDate = watch("search.fromDate");
  const toDate = watch("search.toDate");

  useEffect(() => {
    getAttendance({ fromDate, toDate }, 0);
  }, [fromDate, toDate]);

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
        date.setUTCHours(0, 0, 0, 0);
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
      console.log(e);
    }
  }
  return (
    <div>
      <Accordion type="single" collapsible className="w-full mb-2">
        <AccordionItem
          className="border-2 border-gray-300 rounded-lg"
          value="item-1"
        >
          <AccordionTrigger className="px-2">Filters</AccordionTrigger>
          <AccordionContent className="w-full flex rounded-2 flex-wrap">
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
            {/* <div className="mt-5 px-3">
              <SearchableSelect
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
            </div> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="max-w-[96vw] rounded-sm">
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
    </div>
  );
}
