"use client";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/app/Components/Loader";
import DataTable from "react-data-table-component";

export const TableComp = ({ columns, data, title, getFunc, search, count }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  // Effect to handle search changes with a debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchData = async () => {
        setLoading(true);
        setPage(0); // Reset to page 0 on new search
        await getFunc(search, 0);
        setLoading(false);
      };

      fetchData();
    }, 1000); // 1 second delay

    return () => {
      clearTimeout(handler); // Cleanup on unmount or search change
    };
  }, [search]); // Dependency array includes getFunc

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getFunc(search, page);
      setLoading(false);
    };

    fetchData();
  }, [page, search]); // Watch page and search

  return (
    <div className="max-w-[92vw] rounded-sm">
      <Suspense fallback={<Loader />} />
      <DataTable
        title={title}
        data={data?.data.length > 0 ? data.data : []}
        columns={columns}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={count}
        paginationPerPage={perPage}
        fixedHeader
        onChangePage={(e) => setPage(e)}
      />
    </div>
  );
};
