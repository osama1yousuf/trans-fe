"use client";

import { useEffect, useState } from "react";
import Textfield2 from "../Components/TextField2";
import UserProfile from "./UserProfile";
import { useForm } from "react-hook-form";
export default function Setting() {
  const {
    register,
    formState: { errors },
    setFocus,
  } = useForm();
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="p-4 m-auto">
      {console.log("iser", user)}
      <UserProfile
        firstName={user?.firstName}
        lastName={user?.lastName}
        contactOne={user?.contactOne}
        joiningDate={new Date(user?.joiningDate).toDateString()}
        vehicleName={user?.vehicleInfo?.vehicleName}
      />
      <div className="w-full m-auto bg-white rounded-lg md:mt-0 sm:max-w-md sm:p-8">
        <form className="mt-4 lg:mt-5 w-full md:space-y-5" action="#">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <div>
            <Textfield2
              error={errors}
              register={register}
              label={"Contact"}
              name={"contact"}
              setFocus={setFocus}
              type={"text"}
            />
          </div>
          <div>
            <Textfield2
              error={errors}
              register={register}
              label={"New Password"}
              name={"newPassword"}
              setFocus={setFocus}
              type={"password"}
            />
          </div>
          <div>
            <Textfield2
              error={errors}
              register={register}
              label={"Confirm Password"}
              name={"newPassword"}
              setFocus={setFocus}
              type={"password"}
            />
          </div>
          <button
            type="submit"
            className="w-full text-gray-900 bg-green-500  -600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}
