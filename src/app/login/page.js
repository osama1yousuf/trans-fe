"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import * as Yup from "yup";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Textfield2 from "../Components/TextField2";
import { yupResolver } from "@hookform/resolvers/yup";
export default function Login() {
  let url = process.env.BASE_URL;
  const pathname = usePathname();
  const router = useRouter();
  const validateLoginSchema = Yup.object().shape({
    contactOne: Yup.string()
      .length(11, "Phone Number Invalid")
      .required("Phone Number required"),
    password: Yup.string()
      .min(8, "Password Length is greater than 8")
      .required("Password is required"),
  });
  const {
    register,
    setFocus,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      contactOne: "",
      password: "",
    },
    resolver: yupResolver(validateLoginSchema),
  });

  const onSubmit = async (values) => {
    console.log("wrk", values);
    try {
      const response = await axios.post(`${url}/api/login`, values);
      if (response.status == 201) {
        let { token, role, user } = response?.data;
        console.log("res", user);
        localStorage.setItem("token", token);
        localStorage.setItem("userType", role);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successfully", { autoClose: 1000 });
        router.push("/dashboard");
      }
    } catch (e) {
      console.log("error", e);
      toast.error(e.response?.data?.message || "Server Error", {
        autoClose: 1000,
      });
    }
  };
  return (
    <section className="bg-gray-50 min-h-screen :bg-gray-900">
      <div className="flex flex-col items-center justify-center px-2 py-3 mx-auto md:h-screen lg:py-0">
        <a className="flex flex-col items-center mb-2 text-xl font-semibold text-gray-900 :text-white">
          <Image
            className="mr-2"
            width={140}
            height={140}
            src={logo}
            alt="logo"
          />
          TRANSPORT EASE
        </a>
        <div className="w-full bg-white rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-6">
                <Textfield2
                  setFocus={setFocus}
                  error={errors?.contactOne}
                  register={register}
                  name={"contactOne"}
                  label={"Contact"}
                  type={"text"}
                />
              </div>
              <div className="mt-6">
                <Textfield2
                  setFocus={setFocus}
                  error={errors?.password}
                  register={register}
                  name={"password"}
                  label={"Password"}
                  type={"password"}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 text-white ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-[#811630] hover:bg-primary-700"
                } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
