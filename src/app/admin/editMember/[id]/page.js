"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserValidator } from "@/interceptor/userValidate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { memberFormIntVal } from "@/app/helper/IntialValues";
import MemberForm from "@/app/Components/Forms/MemberForm";
import useHandleNavigation from "@/app/Components/useHandleNavigation";
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
  //   useUserValidator("superadmin")
  const router = useRouter();
  const pathname = usePathname();

  const [location, setlocation] = useState([]);
  const [loading, setLoading] = useState(false);

  const validateMemberSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    residentialAddress: Yup.string().required("Address is required"),
    joinDate: Yup.date().required("Join date is required"),
    cnicNo: Yup.string()
      .length(15, "Nic value is greater than 15")
      .required("Nic # is required"),
    contactOne: Yup.string()
      .length(11, "Phone Number Invalid")
      .required("Phone Number required"),
    contactTwo: Yup.string()
      .nullable()
      .test("length", "Phone Number Invalid", (value) => {
        return value === "" || value.length === 11;
      }),
    bothSide: Yup.string()
      .oneOf(["bothSide", "pickUp", "dropOff"], "Invalid option selected")
      .required("Please select an option"),
    pickUpAddress: Yup.string().when("bothSide", {
      is: (value) => value === "pickUp" || value === "bothSide", // When "pickUp" or "bothSide"
      then: (schema) => schema.required("Please select a pick-up address"), // Make it required
      otherwise: (schema) => schema.notRequired().nullable(), // Make it optional and allow null for "dropOff"
    }),
    dropOffAddress: Yup.string().when("bothSide", {
      is: (value) => value === "dropOff" || value === "bothSide", // When "dropOff" or "bothSide"
      then: (schema) => schema.required("Please select a drop-off address"), // Make it required
      otherwise: (schema) => schema.notRequired().nullable(), // Make it optional for other cases
    }),
    timings: Yup.array().of(
      Yup.object().shape({
        travelType: Yup.string()
          .oneOf(["bothSide", "pickUp", "dropOff"], "Invalid option selected")
          .required("Please select an option"),
        day: Yup.string().required("Please select a day"),
        pickUpTime: Yup.string().when("travelType", {
          is: (value) => value === "pickUp" || value === "bothSide",
          then: (schema) => schema.required("Please select a pickup time"),
          otherwise: (schema) => schema,
        }),
        dropOffTime: Yup.string().when("travelType", {
          is: (value) => value === "dropOff" || value === "bothSide",
          then: (schema) => schema.required("Please select a drop-off time"),
          otherwise: (schema) => schema,
        }),
        pickUpAddress: Yup.string().required("Please select a pickup address"),
        dropOffAddress: Yup.string().required(
          "Please select a drop-off address"
        ),
      })
    ),
    fees: Yup.string().required("Fees amount is required"),
    feeType: Yup.string()
      .oneOf(["advance", "monthEnd"], "Invalid option selected")
      .required("Please select an option"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Invalid option selected")
      .required("Please select an option"),
    comments: Yup.string(),
  });
  useHandleNavigation("/admin/member");

  const {
    register,
    setFocus,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: memberFormIntVal,
    resolver: yupResolver(validateMemberSchema),
  });

  const getLocation = async () => {
    try {
      let { data } = await axiosInstance.get("/locations");
      setlocation(data);
    } catch (e) {
      // console.log(e.message);
    }
  };
  useEffect(() => {
    setLoading(true);
    getLocation();
    (async function () {
      try {
        let id = pathname.replace("/admin/editMember/", "");
        let { data } = await axiosInstance.get(`/customer/${id}`);
        let currentMember = {
          firstName: data.firstName,
          lastName: data.lastName,
          contactOne: data.contactOne,
          contactTwo: data.contactTwo,
          cnicNo: data.cnicNo,
          // password: "",
          comments: data.comments,
          joinDate: new Date(data.status[0].joinDate)
            .toISOString()
            .split("T")[0],
          //location
          residentialAddress: data.location.residentialAddress,
          pickUpAddress: data.location.pickUpAddress,
          dropOffAddress: data.location.dropOffAddress,
          bothSide: data.location.dropType,
          timings: data.timings.length > 0 ? data.timings : [],
          fees: data.fees.fees,
          feeType: data.fees.feesType,
          gender: data.gender,
        };
        Object.entries(currentMember).forEach(([field, value]) => {
          setValue(field, value);
        });
        setLoading(false);
      } catch (error) {
        // console.log(error.message);
        toast.error(error.message, { autoClose: 1000 });
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (values) => {
    setLoading(true);
    // console.log("intial Values", values);
    let id = pathname.replace("/admin/editMember/", "");
    let body = {
      firstName: values.firstName,
      lastName: values.lastName,
      contactOne: values.contactOne,
      contactTwo: values.contactTwo,
      cnicNo: values.cnicNo,
      // password: values.password,
      comments: values.comments,
      joinDate: new Date(values.joinDate).toISOString(),
      location: {
        residentialAddress: values.residentialAddress,
        pickUpAddress: values.pickUpAddress,
        dropOffAddress: values.dropOffAddress,
        dropType: values.bothSide,
      },
      timings: values.timings,
      gender: values.gender,
      fees: values.fees,
      feesType: values.feeType,
    };
    try {
      let response = await axiosInstance.put(`/customer/${id}`, body);
      toast.success("Member updated successfully", { autoClose: 1000 });
      router.push("/admin/member");
      reset();
      setLoading(false);
    } catch (e) {
      // console.log("error", e, e?.response?.data?.message);
      toast.error(e?.response?.data?.message, { autoClose: 1000 });
      reset();
      setLoading(false);
    }
  };

  const handleBackAction = () => {
    if (isDirty) {
      if (window.confirm("Are you sure you want to leave this page?")) {
        router.push("/admin/member");
      }
    } else {
      router.push("/admin/member");
    }
  };
  return (
    <>
      <div>
        <button
          type="submit"
          form="memberCreate"
          disabled={loading}
          className={`my-4 text-white ${loading ? "bg-gray-400" : "bg-[#811630] hover:bg-primary-700"
            } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
        >
          {isSubmitting ? "Updating" : "Update"}
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
          setValue={setValue}
          watch={watch}
          setFocus={setFocus}
          register={register}
          formId={"memberCreate"}
        />
      )}
    </>
  );
}
