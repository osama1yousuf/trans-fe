import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Textfield2 from "../TextField2";
import SelectInput from "../SelectInput";
import TextArea from "../TextArea";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, CircleX } from "lucide-react";
const DriverForm = ({
  handleSubmit,
  errors,
  setFocus,
  register,
  watch,
  formId,
  showPassField,
  setFile,
  file,
  setIsPrfileChange = function () {},
  shifts,
  setValue,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    setImagePreview(file);
    // if (file && file.buffer && file.buffer.data) {
    //   const base64Image = Buffer.from(file.buffer.data).toString('base64');
    //   setImagePreview(`data:${file.mimetype};base64,${base64Image}`);
    // }
  }, [file]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
      setIsPrfileChange(true);
    }
  };
  const handleCnicChange = (e) => {
    let inputValue = e.replace(/\D/g, ""); // Remove non-digit characters

    // Insert hyphen after the 5th digit and second-last digit
    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5) + "-" + inputValue.slice(5);
    }
    if (inputValue.length > 13) {
      inputValue = inputValue.slice(0, 13) + "-" + inputValue.slice(13);
    }

    // Set the value using react-hook-form's setValue
    setValue("cnicNo", inputValue);
  };
  const cnicNo = watch("cnicNo");
  useEffect(() => {
    cnicNo !== null && handleCnicChange(cnicNo);
  }, [cnicNo]);

  const handleTripAdd = () => {
    let noOfShifts = watch("noOfShifts");
    let shifts = watch("shifts");
    setValue("noOfShifts", noOfShifts + 1);
    setValue("shifts", [
      ...shifts,
      {
        shift: `SHIFT_${noOfShifts + 1}`,
        checkInTime: "",
        shiftWay: "UP",
        checkOutTime: "",
      },
    ]);
  };

  const handleTripDelete = (e) => {
    console.log("e", e);
    let noOfShifts = watch("noOfShifts");
    let shifts = watch("shifts");
    let updatedShifts = shifts.filter((el) => el?.shift !== e?.shift);
    updatedShifts = updatedShifts.map((e, i) => {
      return {
        shift: `SHIFT_${i + 1}`,
        checkInTime: e.checkInTime,
        shiftWay: e?.shiftWay,
        checkOutTime: e?.checkOutTime,
      };
    });
    console.log("updatedShifts", updatedShifts);
    setValue("noOfShifts", noOfShifts - 1);
    setValue("shifts", updatedShifts);
  };
  return (
    <form id={formId} onSubmit={handleSubmit}>
      <div className="flex  flex-wrap">
        {/* <div> */}
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full"
        >
          <AccordionItem
            className={
              errors?.firstName ||
              errors.lastName ||
              errors.dateOfBirth ||
              errors.cnicNo ||
              errors.cnicExpiry ||
              errors?.contactOne ||
              errors?.contactTwo ||
              errors?.joiningDate ||
              errors?.password ||
              errors?.address
                ? "border-2 border-red-600 my-1"
                : "border-2 border-gray-300 rounded-lg my-1"
            }
            value="item-1"
          >
            <AccordionTrigger className="px-2">Personal Info</AccordionTrigger>
            <AccordionContent className="w-full flex rounded-2 flex-wrap">
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  error={errors?.firstName}
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
                  error={errors?.lastName}
                  name={"lastName"}
                  label={"Last Name"}
                  type={"text"}
                />
              </div>
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  register={register}
                  error={errors?.dateOfBirth}
                  name={"dateOfBirth"}
                  label={"Date of Birth"}
                  type={"date"}
                />
              </div>
              {/* Image Preview */}
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="image-upload"
                    className="block mb-2 text-xs font-sm text-gray-700 :text-white"
                  >
                    Upload an Image
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      width={160}
                      height={160}
                      alt="Preview"
                      className="mt-4  object-cover rounded-md border border-gray-300"
                    />
                  )}
                </div>
              </div>
              {/*  */}
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  register={register}
                  error={errors?.cnicNo}
                  name={"cnicNo"}
                  label={"CNIC No"}
                  maxLength={15}
                  type={"text"}
                />
              </div>
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  register={register}
                  error={errors?.cnicExpiry}
                  name={"cnicExpiry"}
                  label={"CNIC Expiry Date"}
                  type={"date"}
                />
              </div>
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  error={errors?.contactOne}
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
                  error={errors?.contactTwo}
                  name={"contactTwo"}
                  label={"Contact # 2"}
                  type={"tel"}
                />
              </div>
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  register={register}
                  error={errors?.joiningDate}
                  name={"joiningDate"}
                  label={"JOINING DATE"}
                  type={"date"}
                />
              </div>
              {showPassField && (
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    setFocus={setFocus}
                    register={register}
                    error={errors?.password}
                    name={"password"}
                    label={"Password"}
                    type={"password"}
                  />
                </div>
              )}
              <div className="w-full mt-2 lg:w-2/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  register={register}
                  error={errors?.address}
                  name={"address"}
                  label={"Address"}
                  type={"text"}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            className={
              errors?.vehicleInfo
                ? "border-2 border-red-600 my-1"
                : "border-2 border-gray-300 rounded-lg my-1"
            }
            value="item-2"
          >
            <AccordionTrigger className="px-2">Vehicle Info</AccordionTrigger>
            <AccordionContent className="w-full flex rounded-2 flex-wrap">
              <div className="w-full mt-2 lg:w-1/4 px-3">
                <Textfield2
                  register={register}
                  setFocus={setFocus}
                  error={errors?.vehicleInfo?.vehicleName}
                  name={"vehicleInfo.vehicleName"}
                  label={"Vehicle Name"}
                  type={"text"}
                />
              </div>
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  error={errors?.vehicleInfo?.vehicleNo}
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
                  error={errors?.licenseInfo?.licenseNo}
                  name={"licenseInfo.licenseNo"}
                  label={"License #"}
                  type={"text"}
                />
              </div>
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  register={register}
                  setFocus={setFocus}
                  error={errors?.licenseInfo?.licenseIssue}
                  name={"licenseInfo.licenseIssue"}
                  label={"LICENSE ISSUE DATE"}
                  type={"date"}
                />
              </div>
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  register={register}
                  setFocus={setFocus}
                  error={errors?.licenseInfo?.licenseExpiry}
                  name={"licenseInfo.licenseExpiry"}
                  label={"LICENSE EXPIRY DATE"}
                  type={"date"}
                />
              </div>
              <div className="w-full mt-2 lg:w-1/4 px-3">
                <Textfield2
                  register={register}
                  setFocus={setFocus}
                  error={errors?.vehicleInfo?.model}
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
                  error={errors?.vehicleInfo?.make}
                  register={register}
                  options={[
                    {
                      value: "daihatsu_hijet",
                      label: "Every Hijet",
                    },
                    {
                      value: "suzuki_bolan",
                      label: "Suzuki Bolan",
                    },
                    {
                      value: "suzuki_alto",
                      label: "Suzuki Alto",
                    },
                    {
                      value: "suzuki_cultus",
                      label: "Suzuki Cultus",
                    },
                    {
                      value: "daihatsu_mira",
                      label: "Mira",
                    },
                    {
                      value: "coaster",
                      label: "Coaster",
                    },
                    {
                      value: "toyota_hiace",
                      label: "Toyota Hiace",
                    },
                    {
                      value: "hino_bus",
                      label: "Hino Bus",
                    },
                    {
                      value: "toyota_corolla",
                      label: "Toyota Corolla",
                    },
                    {
                      value: "suzuki_apv",
                      label: "Suzuki APV",
                    },
                  ]}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className={
              errors?.salaryInfo
                ? "border-2 border-red-600 my-1"
                : "border-2 border-gray-300 rounded-lg my-1"
            }
            value="item-3"
          >
            <AccordionTrigger className="px-2">Salary Info</AccordionTrigger>
            <AccordionContent className="w-full flex rounded-2 flex-wrap">
              <div className="w-full mt-2 lg:w-1/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  register={register}
                  error={errors?.salaryInfo?.salary}
                  name={"salaryInfo[0].salary"}
                  label={"Salary"}
                  type={"number"}
                />
              </div>
              <div className="w-full mt-2 lg:w-1/4 px-3">
                <SelectInput
                  label={"Salary Type"}
                  setFocus={setFocus}
                  name={"salaryInfo[0].salaryType"}
                  showDefaultOption={true}
                  error={errors?.salaryInfo?.salaryType}
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
          <AccordionItem
            className={
              errors?.shifts || errors?.noOfShifts
                ? "border-2 border-red-600 my-1"
                : "border-2 border-gray-300 rounded-lg my-1"
            }
            value="item-4"
          >
            <AccordionTrigger className="px-2">Trips Info</AccordionTrigger>
            <AccordionContent className="w-full rounded-2">
              <div className="w-full mt-2 flex items-end gap-2 lg:w-1/5 px-3">
                <div className="w-1/2">
                  <Textfield2
                    readOnly={true}
                    setFocus={setFocus}
                    register={register}
                    error={errors?.noOfShifts}
                    name={"noOfShifts"}
                    label={"No of Trips"}
                    type={"number"}
                  />
                </div>
                <div className="border-slate-950 hover:border-slate-200 border rounded-md hover:bg-gray-500  cursor-pointer bg-white p-1">
                  <Plus onClick={handleTripAdd} className="text-gray-700" />
                </div>
              </div>
              <br />
              {watch("noOfShifts") > 0 &&
                watch("shifts").map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full gap-2 px-3 flex mt-2 lg:w-1/4 items-end"
                    >
                      {" "}
                      <div className=" border mb-1 rounded-md cursor-pointer p-1 bg-transparent">
                        <CircleX
                          onClick={() => handleTripDelete(shifts[i])}
                          className="text-red-400 w-5 h-5"
                        />
                      </div>
                      {/* First Input Field with "P" */}
                      <div className="w-1/2 flex items-center">
                        <div className="flex items-center mt-4">
                          <span className="text-gray-500 font-bold mr-2">
                            P
                          </span>
                        </div>
                        <div className="flex-1">
                          <Textfield2
                            setFocus={setFocus}
                            register={register}
                            error={
                              errors?.shifts?.length > 0 &&
                              errors?.shifts[i] &&
                              errors?.shifts[i]?.checkInTime
                            }
                            name={`shifts.${i}.checkInTime`}
                            label={`Trip-${i + 1}`}
                            type={"time"}
                          />
                        </div>
                      </div>
                      {/* Second Input Field with "D" */}
                      <div className="w-1/2 flex items-center mt-4">
                        <div className="flex items-center">
                          <span className="text-gray-500 font-bold mr-2">
                            D
                          </span>
                        </div>
                        <div className="flex-1">
                          <Textfield2
                            setFocus={setFocus}
                            register={register}
                            error={
                              errors?.shifts?.length > 0 &&
                              errors?.shifts[i] &&
                              errors?.shifts[i]?.checkOutTime
                            }
                            name={`shifts.${i}.checkOutTime`}
                            label={``}
                            type={"time"}
                          />
                        </div>
                      </div>
                      {/* Vertical Toggle Switch */}
                      <div className="mb-2">
                        <label className="switch">
                          <input
                            type="checkbox"
                            name={`shifts.${i}.shiftWay`}
                            checked={shifts[i].shiftWay === "UP"}
                            onChange={(e) => {
                              const newShiftWay = e.target.checked
                                ? "UP"
                                : "DN";

                              setValue(`shifts.${i}.shiftWay`, newShiftWay);
                            }}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  );
                })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className={
              errors?.comments
                ? "border-2 border-red-600 my-1"
                : "border-2 border-gray-300 rounded-lg my-1"
            }
            value="item-5"
          >
            <AccordionTrigger className="px-2">Comments</AccordionTrigger>
            <AccordionContent className="w-full flex rounded-2 flex-wrap">
              <div className="w-full mt-2 lg:w-full px-3">
                <TextArea
                  register={register}
                  setFocus={setFocus}
                  label={"Comments"}
                  col={"3"}
                  row={"6"}
                  name={"comments"}
                  error={errors?.comments}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </form>
  );
};
export default DriverForm;
