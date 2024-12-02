"use client";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
import { useUserValidator } from "@/interceptor/userValidate";
import { useCallback, useEffect, useState } from "react";
import DriverForm from "@/app/Components/Forms/DriverForm";
import { validateDriverSchema } from "@/app/helper/validationSchemas";
import { driverFormIntVal } from "@/app/helper/IntialValues";
import axios from "axios";
import Loader from "@/app/Components/Loader";
import useHandleNavigation from "@/app/Components/useHandleNavigation";
export default function Createdriver() {
  useUserValidator("superadmin");
  const router = useRouter();
  useHandleNavigation();
  const {
    register,
    watch,
    setValue,
    setFocus,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: driverFormIntVal,
    resolver: yupResolver(validateDriverSchema),
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImageOnCloud = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", `keb3hz0o`);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dh3d6g21h/image/upload`,
        formData
      );
      console.log("form", response);
      return response.data;
    } catch (error) {
      console.log("Error while uplading image on cloudinary", error.message);
      return null;
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    let payload = values;
    try {
      if (file) {
        const uploadResponse = await uploadImageOnCloud(file);
        payload = { ...payload, image: uploadResponse?.secure_url };
      }
    } catch (e) {
      console.error("Image upload failed", error);
      return; // Optionally handle the error, e.g., show an alert or toast messag
    }
    try {
      const responsne = await axiosInstance.post("/driver", payload);
      console.log("responsne", responsne);
      router.push("/admin/activedriver");
      toast.success("Driver created successfully", { autoClose: 1000 });
      reset();
      setFile(null);
      setLoading(false);
    } catch (e) {
      console.log("error", e, e?.response?.data?.message);
      toast.error(e?.response?.data?.message, { autoClose: 1000 });
      reset();
      setFile(null);
      setLoading(false);
    }
  };

  const handleBackAction = () => {
    if (window.confirm("Are you sure you want to leave this page?")) {
      router.push("/admin/activedriver");
    }
  };
  useEffect(() => {
    const handlePopState = (event) => {
      handleBackAction();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const noOfShifts = watch("noOfShifts");
  useEffect(() => {
    if (noOfShifts < 5) {
      let shifts = Array.from({ length: noOfShifts }, (e, i) => ({
        shift: `SHIFT_${i + 1}`,
        checkInTime: "",
        checkOutTime: "",
      }));
      setValue("shifts", shifts);
    } else if (noOfShifts > 4) {
      let shifts = Array.from({ length: 4 }, (e, i) => ({
        shift: `SHIFT_${i + 1}`,
        checkInTime: "",
        checkOutTime: "",
      }));
      setValue("shifts", shifts);
      setValue("noOfShifts", 4);
    } else {
      setValue("shifts", []);
    }
  }, [noOfShifts, setValue]);
  return (
    <div>
      <div>
        <button
          type="submit"
          form="driverCreate"
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
        <DriverForm
          formId={"driverCreate"}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
          showPassField={true}
          setFocus={setFocus}
          register={register}
          watch={watch}
          setFile={setFile}
          file={file}
        />
      )}
    </div>
  );
}
