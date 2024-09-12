"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "../admin/dashboard/adminDashboard";
import MemberDashboard from "../member/dashboard/memberDashboard";
import DriverDashboard from "../driver/dashboard/driverDashboard";

export default function Dashboard() {
    const [dashboardType , setDasboardType] = useState()
  useEffect(() => {
    let userType = localStorage.getItem("userType")
    if (userType) {
        setDasboardType(userType)
    }
  }, []);
  return (
    <>
     {
        dashboardType === "SUPERADMIN" && <DriverDashboard /> ||
        dashboardType === "DRIVER" && <DriverDashboard /> ||
        dashboardType === "CUSTOMER" && <MemberDashboard />
     }
    </>
  );
}
