"use client";

import * as Yup from "yup";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserValidator } from "@/interceptor/userValidate";
import useHandleNavigation from "@/app/Components/useHandleNavigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { memberFormIntVal } from "@/app/helper/IntialValues";
import MemberForm from "@/app/Components/Forms/MemberForm";
import Loader from "@/app/Components/Loader";

let time = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
  "12:00 AM",
];

export default function CreateMember() {
  // useUserValidator("superadmin");
  const router = useRouter();
  const [location, setlocation] = useState([]);
  const [loading, setLoading] = useState(false);

  const validateMemberSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    password: Yup.string()
      .min(8, "Password length is greater than 8")
      .required("Password is required"),
    residentialAddress: Yup.string().required("Address is required"),
    joinDate: Yup.date().required("Join date is required"),
    cnicNo: Yup.string()
      .length(13, "Nic value is greater than 13")
      .required("Nic # is required"),
    contactOne: Yup.string()
      .length(11, "Phone Number Invalid")
      .required("Phone Number required"),
    contactTwo: Yup.string().length(11, "Phone Number Invalid"),
    // file: Yup.mixed().required('File is required'),
    bothSide: Yup.string()
      .oneOf(["bothSide", "pickUp", "dropOff"], "Invalid option selected")
      .required("Please select an option"),
    pickUpAddress: Yup.string()
      .oneOf(location, "Invalid option selected")
      .when("bothSide", {
        is: (value) => value === "pickUp" || value === "bothSide",
        then: (sechema) => sechema.required("Please select an option"),
        otherwise: (schema) => schema,
      }),
    pickUpTime: Yup.string()
      .oneOf(time, "Invalid option selected")
      .when("bothSide", {
        is: (value) => value === "pickUp" || value === "bothSide",
        then: (sechema) => sechema.required("Please select an option"),
        otherwise: (schema) => schema,
      }),
    satPickUpTime: Yup.string().oneOf(time, "Invalid option selected"),
    sunPickUpTime: Yup.string().oneOf(time, "Invalid option selected"),
    dropOffAddress: Yup.string()
      .oneOf(location, "Invalid option selected")
      .when("bothSide", {
        is: (value) => value === "dropOff" || value === "bothSide",
        then: (sechema) => sechema.required("Please select an option"),
        otherwise: (schema) => schema,
      }),
    dropOffTime: Yup.string()
      .oneOf(time, "Invalid option selected")
      .when("bothSide", {
        is: (value) => value === "dropOff" || value === "bothSide",
        then: (sechema) => sechema.required("Please select an option"),
        otherwise: (schema) => schema,
      }),
    satDropOffTime: Yup.string().oneOf(time, "Invalid option selected"),
    sunDropOffTime: Yup.string().oneOf(time, "Invalid option selected"),
    fees: Yup.string().required("Fees amount is required"),
    feeType: Yup.string()
      .oneOf(["advance", "monthEnd"], "Invalid option selected")
      .required("Please select an option"),
    // status: Yup.string().oneOf(['Active', 'InActive'], 'Invalid option selected').required('Please select an option'),
    comments: Yup.string(),
  });
  useHandleNavigation("/admin/activemember");
  const {
    register,
    setFocus,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: memberFormIntVal,
    resolver: yupResolver(validateMemberSchema),
  });

  const getLocation = async () => {
    try {
      let { data } = await axiosInstance.get("/locations");
      setlocation(data);
    } catch (e) {
      console.log(e.message);
    }
  };
  
  useEffect(() => {
    getLocation();
  }, []);

  const onSubmit = async (values) => {
    setLoading(true);
    let body = {
      firstName: values.firstName,
      lastName: values.lastName,
      contactOne: values.contactOne,
      contactTwo: values.contactTwo,
      cnicNo: values.cnicNo,
      password: values.password,
      comments: values.comments,
      joinDate: new Date(values.joinDate).toISOString(),
      location: {
        residentialAddress: values.residentialAddress,
        pickUpAddress: values.pickUpAddress,
        dropOffAddress: values.dropOffAddress,
        dropType: values.bothSide,
      },
      timings: {
        pickUpTime:
          values.bothSide == "pickUp" || values.bothSide == "bothSide"
            ? values.pickUpTime
            : null,
        dropOffTime:
          values.bothSide == "dropOff" || values.bothSide == "bothSide"
            ? values.dropOffTime
            : null,
        saturdayTimings:
          values.satPickUpTime || values.satDropOffTime
            ? {
                pickUpTime:
                  values.bothSide == "pickUp" || values.bothSide == "bothSide"
                    ? values.satPickUpTime
                    : null,
                dropOffTime:
                  values.bothSide == "dropOff" || values.bothSide == "bothSide"
                    ? values.satDropOffTime
                    : null,
              }
            : null,
        sundayTimings:
          values.sunPickUpTime || values.sunDropOffTime
            ? {
                pickUpTime:
                  values.bothSide == "pickUp" || values.bothSide == "bothSide"
                    ? values.sunPickUpTime
                    : null,
                dropOffTime:
                  values.bothSide == "dropOff" || values.bothSide == "bothSide"
                    ? values.pickUpTime
                    : null,
              }
            : null,
      },

      fees: values.fees,
      feesType: values.feeType,
    };
    console.log("values", body);
    try {
      let response = await axiosInstance.post("/customer", body);
      console.log("response", response);
      toast.success("Member created successfully", { autoClose: 1000 });
      router.push("/admin/activemember");
      reset();
      setLoading(false);
    } catch (e) {
      console.log("error", e, e?.response?.data?.message);
      toast.error(e?.response?.data?.message, { autoClose: 1000 });
      reset();
      setLoading(false);
    }
  };

  const handleBackAction = () => {
    if (window.confirm("Are you sure you want to leave this page?")) {
      router.push("/admin/activemember");
    }
  };
  return (
    <>
      <div>
        <button
          type="submit"
          form="memberCreate"
          disabled={loading}
          className={`my-4 text-white ${
            loading ? "bg-gray-400" : "bg-[#811630] hover:bg-primary-700"
          } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={handleBackAction}
          className={`my-4 text-white ml-3 bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
        >
          Back
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <MemberForm
          handleSubmit={handleSubmit(onSubmit)}
          location={location}
          time={time}
          errors={errors}
          setFocus={setFocus}
          register={register}
          formId={"memberCreate"}
          showPassField={true}
        />
      )}
    </>
  );
}
