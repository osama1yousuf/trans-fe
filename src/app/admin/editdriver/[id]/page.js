"use client";
import { usePathname, useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
import { useUserValidator } from "@/interceptor/userValidate";
import { useEffect, useState } from "react";
import DriverForm from "@/app/Components/Forms/DriverForm";
import { validateDriverSchema } from "@/app/helper/validationSchemas";
import { driverFormIntVal } from "@/app/helper/IntialValues";
import Loader from "@/app/Components/Loader";
import useHandleNavigation from "@/app/Components/useHandleNavigation";
import { dateFormater } from "@/lib/utils";
export default function Editdriver() {
  useUserValidator("superadmin");
  const pathname = usePathname();
  const router = useRouter();
  useHandleNavigation("/admin/driver");
  let id = pathname.replace("/admin/editdriver/", "");
  const {
    register,
    watch,
    setValue,
    reset,
    setFocus,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: driverFormIntVal,
    resolver: yupResolver(validateDriverSchema),
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPrfileChange, setIsPrfileChange] = useState(false);
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
  const handleBackAction = () => {
    if (isDirty) {
      if (window.confirm("Are you sure you want to leave this page?")) {
        router.push("/admin/driver");
      }
    } else {
      router.push("/admin/driver");
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    let payload = values;
    try {
      if (file && isPrfileChange) {
        const uploadResponse = await uploadImageOnCloud(file);
        payload = { ...payload, image: uploadResponse?.secure_url };
      }
    } catch (e) {
      console.error("Image upload failed", error);
      return; // Optionally handle the error, e.g., show an alert or toast messag
    }
    try {
      const response = await axiosInstance.put(`/driver/${id}`, payload);
      router.push("/admin/driver");
      toast.success("Driver updated successfully", { autoClose: 500 });
      reset();
      setFile(null);
      setLoading(false);
    } catch (e) {
      console.log("error", e?.response?.data?.message[0]);
      toast.error(e?.response?.data?.message, { autoClose: 500 });
      setLoading(false);
    }
  };
  const shifts = watch("shifts");
  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/driver/${id}`);
        if (data) {
          const image = data.image;
          setFile(image);
          let updateval = { ...driverFormIntVal, ...data };
          reset(updateval);
          console.log(
            new Date(updateval?.cnicExpiry).toISOString(),
            new Date(updateval?.cnicExpiry).toLocaleDateString("en-US"),
            new Date(updateval?.cnicExpiry).toISOString().split("T")[0],
            "updateval?.cnicExpiry"
          );

          setValue("salaryInfo", [
            updateval.salaryInfo[updateval.salaryInfo.length - 1],
          ]);
          setValue(
            "cnicExpiry",
            dateFormater(
              new Date(updateval?.cnicExpiry).toLocaleDateString("en-US")
            )
          );
          setValue(
            "dateOfBirth",
            dateFormater(
              new Date(updateval?.dateOfBirth).toLocaleDateString("en-US")
            )
          );
          setValue(
            "joiningDate",
            dateFormater(
              new Date(updateval?.joiningDate).toLocaleDateString("en-US")
            )
          );
          setValue(
            "licenseInfo.licenseIssue",
            dateFormater(
              new Date(updateval?.licenseInfo?.licenseIssue).toLocaleDateString(
                "en-US"
              )
            )
          );
          setValue(
            "licenseInfo.licenseExpiry",
            dateFormater(
              new Date(
                updateval?.licenseInfo?.licenseExpiry
              ).toLocaleDateString("en-US")
            )
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    })();
  }, []);
  return (
    <div className="p-4">
      <div>
        <button
          type="submit"
          form="driverEdit"
          disabled={loading}
          className={`my-4 text-white ${
            loading ? "bg-gray-400" : "bg-[#811630] hover:bg-primary-700"
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
        <DriverForm
          formId={"driverEdit"}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
          setFocus={setFocus}
          register={register}
          watch={watch}
          setFile={setFile}
          setIsPrfileChange={setIsPrfileChange}
          file={file}
          shifts={shifts}
          setValue={setValue}
        />
      )}
    </div>
  );
}
