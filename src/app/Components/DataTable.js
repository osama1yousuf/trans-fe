"use client"
import { Suspense } from "react";
import Loader from "@/app/Components/Loader";
import DataTable from "react-data-table-component";
export const TableComp = ({ columns, data, title }) => {
  return (
    <div className="z-0">
      <Suspense fallback={<Loader />} />
      <DataTable
        pagination
        paginationPerPage={10}
        fixedHeader
        title={title}
        //  fixedHeader
        columns={columns}
        data={data}
      />
    </div>
  );
};
