"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/interceptor/axios_inteceptor";
import DataTable from "react-data-table-component";
import Loader from "@/app/Components/Loader";
import moment from "moment";
import { Edit2, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function MemberInfoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch member details
        const memberRes = await axiosInstance.get(`/customer/${id}`);
        setMember(memberRes.data);
        // Fetch challans for this member
        const challanRes = await axiosInstance.get(`/challan/get?challanType=CUSTOMER&userId=${id}`);
        setChallans(challanRes.data.data || []);
      } catch (err) {
        setMember(null);
        setChallans([]);
      }
      setLoading(false);
    }
    if (id) fetchData();
  }, [id]);

  const challanColumns = [
    { name: "Challan No", selector: row => row.challanNo },
    { name: "Period", selector: row => row.feePeriod },
    { name: "Amount", selector: row => Number(row.amount).toLocaleString() },
    { name: "Status", selector: row => row.challanStatus,
      cell: row => (
        <span className={
          row.challanStatus === "UN_PAID"
            ? "bg-red-500 uppercase text-white font-semibold text-xs rounded-md p-2"
            : row.challanStatus === "PAID"
            ? "bg-green-500 uppercase text-white font-semibold text-xs rounded-md p-2"
            : "bg-gray-500 uppercase text-white font-semibold text-xs rounded-md p-2"
        }>{row.challanStatus === "UN_PAID" ? "Unpaid" : row.challanStatus}</span>
      )
    },
    { name: "Date", selector: row => moment(row.challanDate).format("DD-MMM-YYYY") },
  ];

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Loader /></div>;
  if (!member) return <div className="p-8 text-center text-red-500">Member not found.</div>;

  return (
    <div className="max-w-[95vw] mx-auto p-2 sm:p-4">
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <button className="text-blue-600 hover:underline text-sm sm:text-base" onClick={() => router.back()}>&larr; Back</button>
        <div className="flex items-center">
          {/* WhatsApp image */}
          <a
            href={`https://wa.me/${member.contactOne?.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
            title="Chat on WhatsApp"
          >
            <Image width={48} height={48} src="/whatsapp.webp" alt="WhatsApp" className="object-contain"/>
          </a>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-8 relative">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Member Details</h2>
        <button
          onClick={() => router.push(`/admin/editMember/${id}`)}
          className="absolute top-4 right-4 text-gray-700 hover:text-blue-600"
          title="Edit Member"
        >
          <Edit2 className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <div><span className="font-semibold">Name:</span> {member.firstName} {member.lastName}</div>
          <div><span className="font-semibold">Contact 1:</span> {member.contactOne}</div>
          <div><span className="font-semibold">Contact 2:</span> {member.contactTwo || "-"}</div>
          <div><span className="font-semibold">CNIC:</span> {member.cnicNo}</div>
          <div><span className="font-semibold">Status:</span> {member.currentStatus}</div>
          <div><span className="font-semibold">Join Date:</span> {member.status && member.status[0]?.joinDate ? moment(member.status[0].joinDate).format("DD-MMM-YYYY") : "-"}</div>
          <div><span className="font-semibold">Residential Address:</span> {member.location?.residentialAddress}</div>
          <div><span className="font-semibold">Pick Up Address:</span> {member.location?.pickUpAddress}</div>
          <div><span className="font-semibold">Drop Off Address:</span> {member.location?.dropOffAddress}</div>
          <div><span className="font-semibold">Drop Type:</span> {member.location?.dropType}</div>
          <div><span className="font-semibold">Fee Type:</span> {member.fees?.feesType}</div>
          <div><span className="font-semibold">Fee Amount:</span> {member.fees?.fees}</div>
          <div><span className="font-semibold">Gender:</span> {member.gender || "-"}</div>
          <div><span className="font-semibold">Comments:</span> {member.comments || "-"}</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Challan History</h2>
        <DataTable
          columns={challanColumns}
          data={challans}
          pagination
          paginationPerPage={10}
          highlightOnHover
          striped
          responsive
        />
      </div>
    </div>
  );
} 