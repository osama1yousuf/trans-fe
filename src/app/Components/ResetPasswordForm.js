import axios from "axios";
import Textfield2 from "./TextField2";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
export const ResetPasswordForm = ({ isIntialChange, setHasPasswordChange }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
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
    setValue,
  } = useForm({
    defaultValues: {
      contactOne: "",
      currentPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const changePasswordSubmit = async (values) => {
    try {
      let response = await axios.post(
        `${process.env.BASE_URL}/api/reset-password`,
        values
      );
      let user = JSON.parse(localStorage.getItem("user"));
      user.hasPasswordChange = true;
      localStorage.setItem("user", JSON.stringify(user));
      if (isIntialChange) {
        router.refresh();
        setHasPasswordChange(true);
      }
      toast.success(response?.data?.message);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Error", {
        autoClose: 1000,
      });
      reset();
    }
  };
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setValue("contactOne", user?.contactOne);
    }
  }, []);
  return (
    <div className="m-auto bg-white rounded-lg mt-5 sm:max-w-md sm:p-8">
      <form
        onSubmit={handleSubmit(changePasswordSubmit)}
        className=" p-5 sm:p-0 space-y-5"
      >
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <div>
          <Textfield2
            readOnly={isIntialChange}
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
  );
};
