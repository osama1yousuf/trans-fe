"use client";
import { useEffect, useState } from "react";
import LocationModal from "@/app/Components/LocationModal";
import axiosInstance from "@/interceptor/axios_inteceptor";
import Loader from "@/app/Components/Loader";
import { Pencil, RefreshCw } from "lucide-react";

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editLocation, setEditLocation] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    let data = locations
    console.log(data, 'data');
    if (search) {
      data = data.filter(loc => loc.location.toLowerCase().includes(search.toLowerCase()));
    }
    if (statusFilter) {
      data = data.filter(loc => loc.status === statusFilter);
    }
    setFiltered(data);
  }, [search, statusFilter, locations]);

  async function fetchLocations() {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/locations");
      setLocations(res.data);
    } catch (e) {
      setLocations([]);
    }
    setLoading(false);
  }

  const handleEdit = (loc) => {
    setEditLocation(loc);
    setShowModal(true);
  };

  const handleStatusChange = async (loc) => {
    try {
      await axiosInstance.put(`/locations/${loc._id}`, { status: loc.status === "active" ? "inActive" : "active" });
      fetchLocations();
    } catch (e) {}
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold">Locations</h2>
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 font-semibold"
          onClick={() => { setEditLocation(null); setShowModal(true); }}
        >
          + Create Location
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search location..."
          className="border rounded px-3 py-2 w-full sm:w-1/2"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 w-full sm:w-1/4"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inActive">Inactive</option>
        </select>
        <button
          className="bg-gray-100 border px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-1"
          onClick={fetchLocations}
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]"><Loader /></div>
      ) : (
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-6 text-gray-400">No locations found.</td></tr>
              ) : (
                filtered.map(loc => (
                  <tr key={loc._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{loc.location}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${loc.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {loc.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 flex gap-2 items-center">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEdit(loc)}
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => handleStatusChange(loc)}
                        title="Toggle Status"
                      >
                        {loc.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <LocationModal setShowModal={setShowModal} location={editLocation} refresh={fetchLocations} />
      )}
    </div>
  );
} 