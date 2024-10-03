"use client";

import { FaUser } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import axios from "axios";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
import { useUserValidator } from "@/interceptor/userValidate";
import Textfield2 from "@/app/Components/TextField2";
import SelectInput from "@/app/Components/SelectInput";
import TextArea from "@/app/Components/TextArea";
export default function Createdriver() {
  useUserValidator("superadmin");
  const router = useRouter();
  const validateDriverSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    dateOfBirth: Yup.date().required("Date of Birth is Required"),
    cnicNo: Yup.string()
      .length(13, "Nic value is greater than 13")
      .required("CNIC # is required"),
    cnicExpiry: Yup.date().required("Nic expiry date is required"),
    contactOne: Yup.string()
      .length(11, "Phone Number Invalid")
      .required("Phone Number required"),
    contactTwo: Yup.string().length(11, "Phone Number Invalid"),
    password: Yup.string()
      .min(8, "Password Length is greater than 8")
      .required("Password is required"),
    address: Yup.string().required("Address is Required"),
    vehicleName: Yup.string().required("Vehicle name required"),
    model: Yup.string().required("Vehicle model required"),
    make: Yup.string()
      .oneOf(
        ["toyota", "suzuki", "changan", "honda"],
        "Invalid option selected"
      )
      .required("Please select an option"),
    vehicleNo: Yup.string().required("Vehicle number required"),
    licenseNo: Yup.string().required("License number required"),
    licenseIssue: Yup.date().required("License issue date is required"),
    licenseExpiry: Yup.date().required("License expiry date is required"),
    joiningDate: Yup.date().required("License expiry date is required"),
    salary: Yup.string().required("Salary amount is required"),
    salaryType: Yup.string()
      .oneOf(["advance", "monthEnd"], "Invalid option selected")
      .required("Please select an option"),
    comment: Yup.string(),
  });

  const initialValues = {
    //Personaldetails
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    cnicNo: "",
    cnicExpiry: "",
    contactOne: "",
    contactTwo: "",
    password: "",
    address: "",
    //vehicleInfo
    vehicleName: "",
    model: "",
    vehicleNo: "",
    make: "",
    //license info
    licenseNo: "",
    licenseIssue: "",
    licenseExpiry: "",
    joiningDate: "",
    salary: "",
    salaryType: "",
    comments: "",
    // shifts info
    shifts: 0,
  };
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validateDriverSchema),
  });

  const onSubmit = async (values) => {
    // setSubmitting(false);
    console.log("values", values);
    let body = {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      cnicNo: JSON.stringify(values.cnicNo),
      cnicExpiry: values.cnicExpiry,
      contactOne: values.contactOne,
      contactTwo: values.contactTwo,
      password: values.password,
      address: values.address,
      joiningDate: values.joiningDate,
      licenseInfo: {
        licenseNo: values.licenseNo,
        licenseIssue: values.licenseIssue,
        licenseExpiry: values.licenseExpiry,
      },
      vehicleInfo: {
        vehicleName: values.vehicleName,
        vehicleNo: values.vehicleNo,
        model: values.model,
        make: values.make,
      },
      salaryInfo: {
        salary: values.salary,
        salaryType: values.salaryType,
      },
    };
    // try {
    //   console.log(body);
    //   const responsne = await axiosInstance.post("/driver", body);
    //   console.log("responsne", responsne);
    //   toast.success("Driver created successfully", { autoClose: 1000 });
    //   router.push("/admin/activedriver");
    // } catch (e) {
    //   console.log("error", e.response.data.message[0]);
    //   toast.error(e.response.data.message[0], { autoClose: 1000 });
    // }
  };
  return (
    <>
      <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex m-1 lg:w-full px-3">
          <button
            type="submit"
            // disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            SAVE
          </button>
        </div>
        <div className="flex  flex-wrap -mx-3 mb-6">
          {/* <div> */}
          <label className="text-sm m-2">Personal Info</label>
          <div className="w-full flex rounded-2 flex-wrap border-2 p-2">
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                error={errors}
                register={register}
                name={"firstName"}
                label={"First Name"}
                type={"text"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                register={register}
                error={errors}
                name={"lastName"}
                label={"Last Name"}
                type={"text"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                register={register}
                error={errors}
                name={"dateOfBirth"}
                label={"Date of Birth"}
                type={"date"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                register={register}
                error={errors}
                name={"cnicNo"}
                label={"CNIC No"}
                type={"number"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                error={errors}
                register={register}
                name={"cnicExpiry"}
                label={"CNIC Expiry"}
                type={"date"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                error={errors}
                register={register}
                name={"contactOne"}
                label={"Contact # 1*"}
                type={"tel"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                register={register}
                error={errors}
                name={"contactTwo"}
                label={"Contact # 2"}
                type={"tel"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                register={register}
                error={errors}
                name={"joiningDate"}
                label={"JOINING DATE"}
                type={"date"}
              />
            </div>
            <div className="w-full mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                register={register}
                error={errors}
                name={"password"}
                label={"Password"}
                type={"password"}
              />
            </div>
            <div className="w-full mt-2 lg:w-3/4 px-3">
              <Textfield2
                setFocus={setFocus}
                register={register}
                error={errors}
                name={"address"}
                label={"Address"}
                type={"text"}
              />
            </div>
          </div>
          <label className="text-sm m-2">Vehicle Info</label>
          <div className="w-full flex rounded-2 flex-wrap border-2 p-2">
            <div className="w-full mt-2 lg:w-1/4 px-3">
              <Textfield2
                register={register}
                setFocus={setFocus}
                error={errors}
                name={"vehicleName"}
                label={"Vehicle Name"}
                type={"text"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                error={errors}
                setFocus={setFocus}
                register={register}
                name={"vehicleNo"}
                label={"Vehicle #"}
                type={"text"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                register={register}
                setFocus={setFocus}
                error={errors}
                name={"licenseNo"}
                label={"License #"}
                type={"text"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                register={register}
                setFocus={setFocus}
                error={errors}
                name={"licenseIssue"}
                label={"LICENSE ISSUE DATE"}
                type={"date"}
              />
            </div>
            <div className="w-full  mt-2 lg:w-1/4 px-3">
              <Textfield2
                register={register}
                setFocus={setFocus}
                error={errors}
                name={"licenseExpiry"}
                label={"LICENSE EXPIRY DATE"}
                type={"date"}
              />
            </div>
            <div className="w-full mt-2 lg:w-1/4 px-3">
              <Textfield2
                register={register}
                setFocus={setFocus}
                error={errors}
                name={"model"}
                label={"Model"}
                type={"text"}
              />
            </div>
            <div className="w-full mt-2 lg:w-1/4 px-3">
              <SelectInput
                label={"Company Make Name"}
                name={"make"}
                setFocus={setFocus}
                showDefaultOption={true}
                error={errors}
                register={register}
                options={[
                  {
                    value: "toyota",
                    label: "Toyota",
                  },
                  {
                    value: "suzuki",
                    label: "Suzuki",
                  },
                  {
                    value: "changan",
                    label: "Changan",
                  },
                  {
                    value: "honda",
                    label: "Honda",
                  },
                ]}
              />
            </div>
          </div>
          <label className="text-sm m-2">Salary Info</label>
          <div className="w-full flex rounded-2 flex-wrap border-2 p-2">
            <div className="w-full mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                register={register}
                error={errors}
                name={"salary"}
                label={"Salary"}
                type={"number"}
              />
            </div>
            <div className="w-full mt-2 lg:w-1/4 px-3">
              <SelectInput
                label={"Salary Type"}
                setFocus={setFocus}
                name={"salaryType"}
                showDefaultOption={true}
                error={errors}
                register={register}
                options={[
                  {
                    value: "advance",
                    label: "Advance",
                  },
                  {
                    value: "monthEnd",
                    label: "Month End",
                  },
                ]}
              />
            </div>
          </div>
          <label className="text-sm m-2">Shifts Info</label>
          <div className="w-full flex rounded-2 flex-wrap border-2 p-2">
            <div className="w-full mt-2 lg:w-1/4 px-3">
              <Textfield2
                setFocus={setFocus}
                register={register}
                error={errors}
                name={"shifts"}
                label={"No of Shifts"}
                type={"number"}
              />
            </div>
          </div>
          <div className="w-full mt-2 lg:w-full px-3">
            <TextArea
              register={register}
              setFocus={setFocus}
              label={"Comments"}
              col={"3"}
              row={"6"}
              name={"comment"}
              error={errors}
            />
          </div>
        </div>
      </form>
    </>
    // </Dashboard>
  );
}
