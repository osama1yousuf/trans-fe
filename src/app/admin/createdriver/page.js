"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { useEffect } from "react";
export default function Createdriver() {
  useUserValidator("superadmin");
  const router = useRouter();
  const validateDriverSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    dateOfBirth: Yup.date().required("Date of Birth is Required"),
    cnicNo: Yup.string()
      .length(13, "CNIC value should be 13 characters")
      .required("CNIC # is required"),
    cnicExpiry: Yup.date().required("CNIC expiry date is required"),
    contactOne: Yup.string()
      .length(11, "Phone Number Invalid")
      .required("Phone Number required"),
    contactTwo: Yup.string().length(11, "Phone Number Invalid"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
    joiningDate: Yup.date().required("Joining date is required"),

    // Vehicle Info Validation
    vehicleInfo: Yup.object().shape({
      vehicleName: Yup.string().required("Vehicle name required"),
      model: Yup.string().required("Vehicle model required"),
      make: Yup.string()
        .oneOf(
          ["toyota", "suzuki", "changan", "honda"],
          "Invalid option selected"
        )
        .required("Please select an option"),
      vehicleNo: Yup.string().required("Vehicle number required"),
    }),

    // License Info Validation
    licenseInfo: Yup.object().shape({
      licenseNo: Yup.string().required("License number required"),
      licenseIssue: Yup.date().required("License issue date is required"),
      licenseExpiry: Yup.date().required("License expiry date is required"),
    }),

    // Salary Info Validation
    salaryInfo: Yup.object().shape({
      salary: Yup.string().required("Salary amount is required"),
      salaryType: Yup.string()
        .oneOf(["advance", "monthEnd"], "Invalid option selected")
        .required("Please select an option"),
    }),

    // Optional fields
    comment: Yup.string(),
    shifts: Yup.array()
      .of(
        Yup.object().shape({
          shift: Yup.string(),
          checkInTime: Yup.string().required("Shift start date is required"),
          checkOutTime: Yup.string().required("Shift end date is required"),
        })
      )
      .min(1, "At least one shift is required"),
    noOfShifts: Yup.number()
      .nullable("Number of shifts is required")
      .min(1, "Minimum number of shifts is 1")
      .max(4, "Maximum number of shifts is 4")
      .required("Number of shifts is required"),
  });

  const initialValues = {
    //Personal details
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    cnicNo: null,
    cnicExpiry: null,
    contactOne: null,
    contactTwo: null,
    password: "",
    address: "",
    joiningDate: null,

    // Nested objects
    licenseInfo: {
      licenseNo: "",
      licenseIssue: null,
      licenseExpiry: null,
    },
    vehicleInfo: {
      vehicleName: "",
      vehicleNo: null,
      model: "",
      make: "",
    },
    salaryInfo: {
      salary: null,
      salaryType: "",
    },

    shifts: [],
    noOfShifts: null,
  };
  const {
    register,
    watch,
    setValue,
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
      shifts: [],
      noOfShifts: null,
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

  const noOfShifts = watch("noOfShifts");
  useEffect(() => {
    if (noOfShifts) {
      let shifts = Array.from({ length: noOfShifts }, (e, i) => ({
        shift: `SHIFT_${i + 1}`,
        checkInTime: "",
        checkOutTime: "",
      }));
      setValue("shifts", shifts);
    } else {
      setValue("shifts", []);
    }
  }, [noOfShifts, setValue]);
  return (
    <>
      <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
        <div >
          <button
            type="submit"
            // disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            SAVE
          </button>
        </div>
        <div className="flex  flex-wrap">
          {/* <div> */}
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Personal Info</AccordionTrigger>
              <AccordionContent className="w-full flex rounded-2 flex-wrap">
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Vehicle Info</AccordionTrigger>
              <AccordionContent className="w-full flex rounded-2 flex-wrap">
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors}
                    name={"vehicleInfo.vehicleName"}
                    label={"Vehicle Name"}
                    type={"text"}
                  />
                </div>
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    error={errors}
                    setFocus={setFocus}
                    register={register}
                    name={"vehicleInfo.vehicleNo"}
                    label={"Vehicle #"}
                    type={"text"}
                  />
                </div>
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors}
                    name={"licenseInfo.licenseNo"}
                    label={"License #"}
                    type={"text"}
                  />
                </div>
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors}
                    name={"licenseInfo.licenseIssue"}
                    label={"LICENSE ISSUE DATE"}
                    type={"date"}
                  />
                </div>
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors}
                    name={"licenseInfo.licenseExpiry"}
                    label={"LICENSE EXPIRY DATE"}
                    type={"date"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors}
                    name={"vehicleInfo.model"}
                    label={"Model"}
                    type={"text"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"Company Make Name"}
                    name={"vehicleInfo.make"}
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Salary Info</AccordionTrigger>
              <AccordionContent className="w-full flex rounded-2 flex-wrap">
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    setFocus={setFocus}
                    register={register}
                    error={errors}
                    name={"salaryInfo.salary"}
                    label={"Salary"}
                    type={"number"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"Salary Type"}
                    setFocus={setFocus}
                    name={"salaryInfo.salaryType"}
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Shifts Info</AccordionTrigger>
              <AccordionContent className="w-full flex rounded-2 flex-wrap">
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    setFocus={setFocus}
                    register={register}
                    error={errors}
                    name={"noOfShifts"}
                    label={"No of Shifts"}
                    type={"number"}
                  />
                </div>
                <br />
                {watch("noOfShifts") > 0 &&
                  watch("shifts").map((e, i) => {
                    return (
                      <>
                        <div className="w-full mt-2 lg:w-1/4 px-3">
                          <Textfield2
                            setFocus={setFocus}
                            register={register}
                            error={errors}
                            name={`shifts.${i}.checkInTime`}
                            label={`CheckIn ${i + 1}`}
                            type={"time"}
                          />
                        </div>
                        <div className="w-full mt-2 lg:w-1/4 px-3">
                          <Textfield2
                            setFocus={setFocus}
                            register={register}
                            error={errors}
                            name={`shifts.${i}.checkOutTime`}
                            label={`CheckOut ${i + 1}`}
                            type={"time"}
                          />
                        </div>
                      </>
                    );
                  })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Comment</AccordionTrigger>
              <AccordionContent className="w-full flex rounded-2 flex-wrap">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </form>
    </>
    // </Dashboard>
  );
}
