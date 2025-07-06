"use client";
import { useEffect, useState } from "react";
import LocationModal from "@/app/Components/LocationModal";
import axiosInstance from "@/interceptor/axios_inteceptor";
import Loader from "@/app/Components/Loader";
import { Edit, Pencil, RefreshCw } from "lucide-react";

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
    let data = locations;
    console.log(data, "data");
    if (search) {
      data = data.filter((loc) =>
        loc.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      data = data.filter((loc) => loc.status === statusFilter);
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
      console.log("loc")
      await axiosInstance.put(`/locations/${loc._id}`, {
        status: loc.status === "active" ? "inActive" : "active",
      });
      fetchLocations();
    } catch (e) {}
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold">Locations</h2>
        <button
          className={` text-white bg-[#811630] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-xs px-5 py-2.5 text-center`}
          onClick={() => {
            setEditLocation(null);
            setShowModal(true);
          }}
        >
          Create
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search location..."
          className="border rounded px-3 py-2 w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 w-full sm:w-1/4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inActive">In Active</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
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
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-400">
                    No locations found.
                  </td>
                </tr>
              ) : (
                filtered.map((loc) => (
                  <tr key={loc._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{loc.location}</td>
                    <td className="py-2 px-3">
                      <div
                        variant="outline"
                        className={`inline-flex items-center rounded-md border p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${
                          loc.status.toUpperCase() === "ACTIVE"
                            ? "border-green-800 text-green-800 bg-green-200"
                            : "border-red-800 text-red-800 bg-red-200"
                        }`}
                        onClick={() => {
                          handleStatusChange(loc);
                        }}
                      >
                        {loc.status.toUpperCase() === "ACTIVE" ? (
                          <span className="relative">
                            <span
                              className={`transition-transform duration-300`}
                            >
                              Active
                            </span>
                          </span>
                        ) : (
                          <span className="relative">
                            <span
                              className={`transition-transform duration-300`}
                            >
                              Inactive
                            </span>
                          </span>
                        )}
                      </div>
                      {/* <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          loc.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {loc.status === "active" ? "Active" : "In Active"}
                      </span> */}
                    </td>
                    <td className="py-2 px-3 flex gap-2 items-center">
                      {/* <span title="Edit Member"> */}
                        <button
                          onClick={() => handleEdit(loc)}
                          className="bg-green-500 hover:bg-gray-500 text-white ms-1 p-1 rounded "
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      {/* </span> */}
                      {/* <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEdit(loc)}
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button> */}
                      {/* <button
                        className="text-gray-600 bg-gray-50 hover:text-gray-900"
                        onClick={() => handleStatusChange(loc)}
                        title="Toggle Status"
                      >
                        {loc.status === "active" ? "Deactivate" : "Activate"}
                      </button> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <LocationModal
          setShowModal={setShowModal}
          location={editLocation}
          refresh={fetchLocations}
        />
      )}
    </div>
  );
}
