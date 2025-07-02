"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/interceptor/axios_inteceptor";
import Loader from "@/app/Components/Loader";
import DataTable from "react-data-table-component";
import moment from "moment";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LayoutGrid,
  TableIcon,
} from "lucide-react";

const RenderCard = ({ item }) => (
  <Card
    key={item._id}
    className="overflow-hidden relative group hover:shadow-lg transition-shadow duration-300"
  >
    <CardHeader className="pb-2 mt-2">
        <span className="text-sm text-muted-foreground capitalize">
          Challan no:
        </span>
      <CardTitle className="text-lg font-semibold flex justify-between items-center">
        <span className="flex-1">{item?.challanNo}</span>
        <span
          className={
            item?.challanStatus === "UN_PAID"
              ? "bg-red-500 uppercase text-white font-semibold text-xs rounded-md p-2 ml-2"
              : item?.challanStatus === "PAID"
              ? "bg-green-500 uppercase text-white font-semibold text-xs rounded-md p-2 ml-2"
              : "bg-gray-500 uppercase text-white font-semibold text-xs rounded-md p-2 ml-2"
          }
        >
          {item?.challanStatus === "UN_PAID" ? "Unpaid" : item?.challanStatus}
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <div className="flex items-start">
        <div className="flex-grow space-y-2">
          {/* <div className="flex items-center justify-between">
            
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
              {item?.challanNo}
            </div>
          </div> */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              Period:
            </span>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
              {item?.feePeriod}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              Amount:
            </span>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
              {Number(item?.amount).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              Date:
            </span>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
              {item?.challanDate
                ? moment(item?.challanDate).format("DD-MMM-YYYY")
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const MemberChallanPage = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [tableView, setTableView] = useState(true);

  // Responsive view toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTableView(false);
      } else {
        setTableView(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch member data
  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/customer/${id}`);
        setMember(data);
      } catch (e) {
        setMember(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMember();
  }, [id]);

  // Fetch challans for this member
  useEffect(() => {
    const fetchChallans = async () => {
      if (!member) return;
      try {
        setLoading(true);
        let url = `/challan/get?challanType=CUSTOMER&customer=${id}`;
        // Always search by this member's name
        const searchParam = `${member.firstName || ""} ${
          member.lastName || ""
        }`.trim();
        if (searchParam) url += `&search=${encodeURIComponent(searchParam)}`;
        if (paymentStatus && paymentStatus !== "All")
          url += `&challanStatus=${paymentStatus}`;
        url += `&limit=${limit}&offset=${
          currentPage > 1 ? (currentPage - 1) * limit : 0
        }`;
        const response = await axiosInstance.get(url);
        setChallans(response?.data?.data || []);
        setTotalCount(response?.data?.count || 0);
        setTotalPages(Math.ceil((response?.data?.count || 0) / limit));
      } catch (e) {
        setChallans([]);
        setTotalCount(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };
    if (id && member) fetchChallans();
  }, [id, paymentStatus, currentPage, limit, member]);

  // Table columns (similar to admin/challan/page.js, but simplified)
  const columns = [
    {
      name: "Challan No",
      selector: (row) => row?.challanNo,
    },
    {
      name: "Challan Date",
      selector: (row) => moment(row?.challanDate).format("DD-MMM-YYYY"),
    },
    {
      name: "Period",
      selector: (row) => row?.feePeriod,
    },
    {
      name: "Amount",
      selector: (row) => Number(row?.amount).toLocaleString(),
    },
    {
      name: "Status",
      selector: (row) => row?.challanStatus,
      cell: (row) => (
        <span
          className={
            row?.challanStatus === "UN_PAID"
              ? "bg-red-500 uppercase text-white font-semibold text-xs rounded-md p-2"
              : row?.challanStatus === "PAID"
              ? "bg-green-500 uppercase text-white font-semibold text-xs rounded-md p-2"
              : "bg-gray-500 uppercase text-white font-semibold text-xs rounded-md p-2"
          }
        >
          {row?.challanStatus === "UN_PAID" ? "Unpaid" : row?.challanStatus}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4">
      {member && (
        <Accordion type="single" collapsible defaultValue="member-details">
          <AccordionItem value="member-details">
            <AccordionTrigger>
              <span className="text-base font-semibold">Member Details</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs bg-white p-2 rounded">
                <div>
                  <b>Name:</b> {member.firstName} {member.lastName}
                </div>
                <div>
                  <b>Code:</b> {member.customerCode}
                </div>
                <div>
                  <b>Contact:</b> {member.contactOne}
                </div>
                <div>
                  <b>CNIC:</b> {member.cnicNo}
                </div>
                <div>
                  <b>Status:</b> {member.currentStatus}
                </div>
                <div>
                  <b>Address:</b> {member.location?.residentialAddress}
                </div>
                <div>
                  <b>Pick Up:</b> {member.location?.pickUpAddress}
                </div>
                <div>
                  <b>Drop Off:</b> {member.location?.dropOffAddress}
                </div>
                <div>
                  <b>Comments:</b> {member.comments}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
          <h2 className="text-lg font-bold">Challan List</h2>
          <div className="flex gap-2 items-center">
            <select
              value={paymentStatus}
              onChange={(e) => {
                setPaymentStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="border p-2 rounded text-sm"
            >
              <option value="All">All</option>
              <option value="PAID">Paid</option>
              <option value="UN_PAID">Unpaid</option>
              <option value="VOID">Void</option>
            </select>
            {/* Table/Card toggle for desktop */}
            <button
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 p-2.5 hidden md:block"
              onClick={() => setTableView((v) => !v)}
              variant="outline"
            >
              {tableView ? (
                <LayoutGrid className="h-4 w-4" />
              ) : (
                <TableIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        {/* Loader only for challan area */}
        {loading ? (
          <div className="py-8">
            <Loader />
          </div>
        ) : tableView ? (
          <div className="bg-white rounded shadow">
            <DataTable
              columns={columns}
              data={challans}
              progressPending={false}
              noHeader
              highlightOnHover
              pointerOnHover
              responsive
              pagination={false}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {challans &&
                challans.map((item) => (
                  <RenderCard key={item._id} item={item} />
                ))}
            </div>
          </div>
        )}
        {/* Pagination controls */}
        <div className="flex justify-center items-center space-x-2 py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Page {currentPage} of {totalPages} | {totalCount} records
            </span>
            <div className="relative inline-block">
              <select
                value={limit.toString()}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {[10, 20, 50, 100].map((option) => (
                  <option key={option} value={option.toString()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || limit >= totalCount}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || limit >= totalCount}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberChallanPage;
