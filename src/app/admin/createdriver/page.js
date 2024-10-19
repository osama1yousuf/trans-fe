"use client";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
import { useUserValidator } from "@/interceptor/userValidate";
import { useEffect } from "react";
import DriverForm from "@/app/Components/Forms/DriverForm";
import { validateDriverSchema } from "@/app/helper/validationSchemas";
import { driverFormIntVal } from "@/app/helper/IntialValues";
export default function Createdriver() {
  useUserValidator("superadmin");
  const router = useRouter();

  const {
    register,
    watch,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm({
    defaultValues: driverFormIntVal,
    resolver: yupResolver(validateDriverSchema),
  });

  const onSubmit = async (values) => {
    console.log("values", values);
    try {
      const responsne = await axiosInstance.post("/driver", values);
      console.log("responsne", responsne);
      toast.success("Driver created successfully", { autoClose: 1000 });
      router.push("/admin/activedriver");
    } catch (e) {
      console.log("error", e, e?.response?.data?.message[0]);
      toast.error(e?.response?.data?.message[0], { autoClose: 1000 });
    }
  };

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
    <div className="p-4">
      <div>
        <button
          type="submit"
          form="driverCreate"
          disabled={isSubmitting}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          SAVE
        </button>
      </div>
      <DriverForm
        formId={"driverCreate"}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        showPassField={true}
        setFocus={setFocus}
        register={register}
        watch={watch}
      />
    </div>
  );
}
