"use client";

import { useEffect, useState } from "react";
import Textfield2 from "../Components/TextField2";
import * as Yup from "yup";
import UserProfile from "./UserProfile";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Setting() {
  const router = useRouter();
  const changePasswordSchema = Yup.object().shape({
    contactOne: Yup.string()
      .length(11, "Phone Number Invalid")
      .required("Phone Number required"),
    currentPassword: Yup.string()
      .min(8, "Password Length is greater than 8")
      .required("Password is required"),
    newPassword: Yup.string()
      .min(8, "Password Length is greater than 8")
      .required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm({
    defaultValues: {
      contactOne: "",
      currentPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const changePasswordSubmit = async (values) => {
    try {
      let response = await axios.post(
        `${process.env.BASE_URL}/api/reset-password`,
        values
      );
      toast.success(response?.data?.message);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Error", {
        autoClose: 1000,
      });
      reset();
    }
  };

  return (
    <div className="p-4 m-auto">
      <UserProfile
        firstName={user?.firstName}
        lastName={user?.lastName}
        contactOne={user?.contactOne}
        joiningDate={new Date(user?.joiningDate).toDateString()}
        vehicleName={user?.vehicleInfo?.vehicleName}
      />
      <div className="w-full m-auto bg-white rounded-lg md:mt-0 sm:max-w-md sm:p-8">
        <form
          onSubmit={handleSubmit(changePasswordSubmit)}
          className="mt-4 lg:mt-5 w-full md:space-y-5"
        >
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <div>
            <Textfield2
              setFocus={setFocus}
              error={errors?.contactOne}
              register={register}
              label={"Contact"}
              name={"contactOne"}
              type={"text"}
            />
          </div>
          <div>
            <Textfield2
              error={errors?.currentPassword}
              register={register}
              label={"Current Password"}
              name={"currentPassword"}
              setFocus={setFocus}
              type={"password"}
            />
          </div>
          <div>
            <Textfield2
              error={errors?.newPassword}
              register={register}
              label={"New Password"}
              name={"newPassword"}
              setFocus={setFocus}
              type={"password"}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-6 text-white ${
              isSubmitting ? "bg-gray-400" : "bg-[#811630] hover:bg-primary-700"
            } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
