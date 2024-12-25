"use client";

import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import { ResetPasswordForm } from "../Components/ResetPasswordForm";
export default function Setting() {
 
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  

  return (
    <div className="m-auto">
      <UserProfile
        firstName={user?.firstName}
        image={user?.image}
        lastName={user?.lastName}
        contactOne={user?.contactOne}
        joiningDate={new Date(user?.joiningDate).toDateString()}
        vehicleName={user?.vehicleInfo?.vehicleName}
      />
      <ResetPasswordForm />
    </div>
  );
}
