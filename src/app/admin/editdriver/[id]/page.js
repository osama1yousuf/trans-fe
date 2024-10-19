"use client";
import { usePathname, useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
import { useUserValidator } from "@/interceptor/userValidate";
import { useEffect } from "react";
import DriverForm from "@/app/Components/Forms/DriverForm";
import { validateDriverSchema } from "@/app/helper/validationSchemas";
import { driverFormIntVal } from "@/app/helper/IntialValues";
export default function Editdriver() {
  useUserValidator("superadmin");
  const pathname = usePathname();
  const router = useRouter();
  let id = pathname.replace("/admin/editdriver/", "");
  const {
    register,
    watch,
    setValue,
    reset,
    setFocus,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm({
    defaultValues: driverFormIntVal,
    resolver: yupResolver(validateDriverSchema),
  });

  const onSubmit = async (values) => {
    try {
      const responsne = await axiosInstance.put(`/driver/${id}`, values);
      console.log("responsne", responsne);
      toast.success("Driver updated successfully", { autoClose: 1000 });
      router.push("/admin/activedriver");
    } catch (e) {
      console.log("error", e?.response?.data?.message[0]);
      toast.error(e?.response?.data?.message[0], { autoClose: 1000 });
    }
  };
  const noOfShifts = watch("noOfShifts");
  const shifts = watch("shifts");
  useEffect(() => {
    if (noOfShifts < 5) {
      let shiftsArr = Array.from({ length: noOfShifts }, (e, i) => ({
        shift: `SHIFT_${i + 1}`,
        checkInTime: shifts[i]?.checkInTime ? shifts[i]?.checkInTime : "",
        checkOutTime: shifts[i]?.checkInTime ? shifts[i]?.checkOutTime : "",
      }));
      setValue("shifts", shiftsArr);
    } else if (noOfShifts > 4) {
      let shiftsArr = Array.from({ length: 4 }, (e, i) => ({
        shift: `SHIFT_${i + 1}`,
        checkInTime: shifts[i]?.checkInTime ? shifts[i]?.checkInTime : "",
        checkOutTime: shifts[i]?.checkInTime ? shifts[i]?.checkOutTime : "",
      }));
      setValue("shifts", shiftsArr);
      setValue("noOfShifts", 4);
    } else {
      setValue("shifts", []);
    }
  }, [noOfShifts, setValue]);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axiosInstance.get(`/driver/${id}`);
        if (data) {
          let updateval = { ...driverFormIntVal, ...data };
          console.log("updateval", updateval);
          reset(updateval);
          setValue("salaryInfo", [
            updateval.salaryInfo[updateval.salaryInfo.length - 1],
          ]);
          setValue(
            "cnicExpiry",
            new Date(updateval?.cnicExpiry).toISOString().split("T")[0]
          );
          setValue(
            "dateOfBirth",
            new Date(updateval?.dateOfBirth).toISOString().split("T")[0]
          );
          setValue(
            "joiningDate",
            new Date(updateval?.joiningDate).toISOString().split("T")[0]
          );
          setValue(
            "licenseInfo.licenseIssue",
            new Date(updateval?.licenseInfo?.licenseIssue)
              .toISOString()
              .split("T")[0]
          );
          setValue(
            "licenseInfo.licenseExpiry",
            new Date(updateval?.licenseInfo?.licenseExpiry)
              .toISOString()
              .split("T")[0]
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);
  return (
    <div className="p-4">
      <div>
        <button
          type="submit"
          form="driverEdit"
          disabled={isSubmitting}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          UPDATE
        </button>
      </div>
      <DriverForm
        formId={"driverEdit"}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        setFocus={setFocus}
        register={register}
        watch={watch}
      />
    </div>
  );
}
