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
import { Plus, CircleX, BookCopy } from "lucide-react";
import { toast } from "react-toastify";

let Days = [
  {
    short: "Mon",
    full: "Monday",
  },
  {
    short: "Tue",
    full: "Tuesday",
  },
  {
    short: "Wed",
    full: "Wednesday",
  },
  {
    short: "Thu",
    full: "Thursday",
  },
  {
    short: "Fri",
    full: "Friday",
  },
  {
    short: "Sat",
    full: "Saturday",
  },
  {
    short: "Sun",
    full: "Sunday",
  },
];

const gender = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];

const MemberForm = ({
  handleSubmit,
  errors,
  setFocus,
  setValue,
  register,
  watch,
  formId,
  showPassField,
  location,
  time,
}) => {
  const cnicNo = watch("cnicNo");
  const timings = watch("timings");
  const pickUpAddress = watch("pickUpAddress");
  const dropOffAddress = watch("dropOffAddress");
  const bothSide = watch("bothSide");

  const [duplicateModal, setDuplicateModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentDuplicateDay, setCurrentDuplicateDay] = useState(null);

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

  const handleDuplicate = (e) => {
    setDuplicateModal(true);
    setCurrentDuplicateDay(e);
  };

  const handleMultipleDuplicate = () => {
    if (selectedDays.length > 0) {
      let duplicateRecord = selectedDays.map((e) => {
        return {
          ...currentDuplicateDay,
          day: e?.short,
          isAddressChange: false,
          isTravelTypeChange: false,
        };
      });
      let updatedTimings = [...timings, ...duplicateRecord];
      setValue("timings", updatedTimings);
      setSelectedDays([]);
      setCurrentDuplicateDay(null);
      setDuplicateModal(false);
    }
    setSelectedDays([]);
    setCurrentDuplicateDay(null);
    setDuplicateModal(false);
  };

  const handleDeleteDay = (e) => {
    let updateTimings = timings.filter((el) => el.day !== e.day);
    setValue("timings", updateTimings);
  };

  useEffect(() => {
    cnicNo !== null && handleCnicChange(cnicNo);
  }, [cnicNo]);

  const handleTimings = () => {
    if (
      pickUpAddress.length === 0 ||
      dropOffAddress.length === 0 ||
      bothSide.length === 0
    ) {
      toast.error("Please select Travel Type , Pickup , DropOff");
      return;
    } else {
      let addDay = {
        day: "",
        pickUpTime: "",
        dropOffTime: "",
        pickUpAddress: pickUpAddress,
        dropOffAddress: dropOffAddress,
        travelType: bothSide,
        isAddressChange: false,
        isTravelTypeChange: false,
      };
      if (timings.length > 0) {
        let remainingDays = Days.filter((e) => {
          let findInTimings = timings.find((el) => el?.day === e?.short);
          return !findInTimings; // Return true if the day is not found in timings
        });
        addDay.day = remainingDays[0].short;
      } else {
        addDay.day = Days[0].short;
      }
      let updateTiming = [...timings, addDay];
      setValue("timings", updateTiming);
    }
  };

  return (
    <>
      {duplicateModal && (
        <div className="z-10 absolute bg-gray-200 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative  border w-[60vw] sm:w-[20vw]  left-auto mx-auto md:m-0 md:left-1/4 top-20 lg:top-1/4 shadow-lg rounded-md bg-white">
            <h2 className="m-2">Select days for duplicate</h2>
            <div className="border-y-2 p-5">
              {Days.map((el, i) => {
                return (
                  <div key={i}>
                    <input
                      disabled={timings.some((e) => e?.day === el?.short)}
                      onInput={(e) => {
                        if (e.target.checked) {
                          setSelectedDays([...selectedDays, el]);
                        } else {
                          let filterData = selectedDays.filter(
                            (v) => v?.short !== el?.short
                          );
                          setSelectedDays(filterData);
                        }
                      }}
                      type="checkbox"
                      className={
                        timings.some((e) => e?.day === el?.short)
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }
                    />
                    <span
                      className={
                        timings.some((e) => e?.day === el?.short)
                          ? "mx-2 text-xs  text-gray-400 line-through"
                          : "mx-2 text-xs  text-gray-700"
                      }
                    >
                      {el?.full}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center my-2">
              <button
                onClick={handleMultipleDuplicate}
                className=" text-white bg-[#811630] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedDays([]);
                  setDuplicateModal(false);
                }}
                className={` text-white ml-3 bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
      <form id={formId} onSubmit={handleSubmit}>
        <div className="flex  flex-wrap">
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
                  errors.password ||
                  errors.cnicNo ||
                  errors.residentialAddress ||
                  errors?.contactOne ||
                  errors?.contactTwo ||
                  errors?.joinDate
                  ? "border-2 border-red-600 my-1"
                  : "border-2 border-gray-300 rounded-lg my-1"
              }
              value="item-1"
            >
              <AccordionTrigger className="px-2">
                Personal Info
              </AccordionTrigger>
              <AccordionContent className="w-full flex rounded-2 flex-wrap">
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors?.firstName}
                    name={"firstName"}
                    label={"First Name"}
                    type={"text"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors?.lastName}
                    name={"lastName"}
                    label={"Last Name"}
                    type={"text"}
                  />
                </div>

                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors?.residentialAddress}
                    name={"residentialAddress"}
                    label={"Address"}
                    type={"text"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors?.joinDate}
                    name={"joinDate"}
                    label={"Joining Date"}
                    type={"date"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors?.cnicNo}
                    name={"cnicNo"}
                    label={"CNIC No"}
                    maxLength={15}
                    type={"text"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors?.contactOne}
                    name={"contactOne"}
                    label={"Mobile # 1 (WA)"}
                    maxLength={11}
                    type={"tel"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors?.contactTwo}
                    maxLength={11}
                    name={"contactTwo"}
                    label={"Mobile # 2"}
                    type={"tel"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors?.whatsAppNo}
                    maxLength={11}
                    name={"emergencyNo"}
                    label={"Emergency #"}
                    type={"tel"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors?.email}
                    // maxLength={11}
                    name={"email"}
                    label={"Email"}
                    type={"email"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"Gender"}
                    name={"gender"}
                    showDefaultOption={true}
                    setFocus={setFocus}
                    error={errors?.gender}
                    register={register}
                    options={gender}
                  />
                </div>
                {showPassField && (
                  <div className="w-full mt-2 lg:w-1/4 px-3">
                    <Textfield2
                      register={register}
                      setFocus={setFocus}
                      error={errors?.password}
                      name={"password"}
                      label={"Password"}
                      type={"password"}
                    />
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              className={
                errors?.bothSide ||
                  errors.pickUpAddress ||
                  errors.pickUpTime ||
                  errors.satPickUpTime ||
                  errors.sunPickUpTime ||
                  errors?.dropOffAddress ||
                  errors?.dropOffTime ||
                  errors?.satDropOffTime ||
                  errors?.sunDropOffTime
                  ? "border-2 border-red-600 my-1"
                  : "border-2 border-gray-300 rounded-lg my-1"
              }
              value="item-2"
            >
              <AccordionTrigger className="px-2">Travel Info</AccordionTrigger>
              <AccordionContent className="w-full  rounded-2 flex-wrap">
                <div className="w-full flex rounded-2 gap-2 px-3 items-end flex-wrap">
                  <div className="w-full flex items-end gap-1 sm:gap-2 lg:w-1/6">
                    <div className="w-[10%]">
                      <button
                        onClick={handleTimings}
                        disabled={timings.length === 7}
                        className={
                          timings.length === 7
                            ? "border-slate-950  border rounded-md cursor-not-allowed bg-gray-100 p-1"
                            : "border-slate-950 hover:border-slate-200 border rounded-md mb-1 hover:bg-gray-500 cursor-pointer bg-white p-1"
                        }
                      >
                        <Plus className="text-gray-700 w-5 h-5" />
                      </button>
                    </div>
                    <div className="w-[90%]">
                      <SelectInput
                        label={"Travel Type"}
                        name={"bothSide"}
                        setFocus={setFocus}
                        error={errors?.bothSide}
                        register={register}
                        options={[
                          {
                            value: "bothSide",
                            label: "Both Side",
                          },
                          {
                            value: "pickUp",
                            label: "Pickup",
                          },
                          {
                            value: "dropOff",
                            label: "DropOff",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/6">
                    <SelectInput
                      label={"Pick Up"}
                      name={"pickUpAddress"}
                      showDefaultOption={true}
                      setFocus={setFocus}
                      error={errors?.pickUpAddress}
                      register={register}
                      options={location.map((e, i) => {
                        return {
                          value: e?.location,
                          label: e?.location,
                        };
                      })}
                    />
                  </div>
                  <div className="w-full lg:w-1/6">
                    <SelectInput
                      label={"Drop Off"}
                      name={"dropOffAddress"}
                      showDefaultOption={true}
                      setFocus={setFocus}
                      error={errors?.dropOffAddress}
                      register={register}
                      options={location.map((e, i) => {
                        return {
                          value: e?.location,
                          label: e?.location,
                        };
                      })}
                    />
                  </div>
                </div>
                {/* {// console.log("timings", timings)} */}
                {timings &&
                  timings.length > 0 &&
                  timings.map((el, ind) => {
                    return (
                      <div
                        key={el?.day}
                        className="w-full border-y-2 px-2  my-1 py-2 sm:gap-0 gap-2 flex rounded-2 items-end flex-wrap"
                      >
                        <div className="w-full lg:w-3/12 px-1  gap-2 flex flex-row-reverse sm:flex-row justify-center items-end">
                          <div className="w-1/12">
                            <button
                              type="button"
                              onClick={() => handleDeleteDay(el)}
                              className=" border rounded-md cursor-pointer p-1 bg-transparent"
                            >
                              <CircleX className="text-red-400 w-4 h-4" />
                            </button>
                          </div>
                          <div className="w-1/12">
                            <button
                              type="button"
                              onClick={() => handleDuplicate(el)}
                              disabled={timings.length === 7}
                              className={
                                timings.length === 7
                                  ? "border rounded-md cursor-not-allowed p-1 bg-transparent"
                                  : "border rounded-md cursor-pointer p-1 bg-transparent"
                              }
                            >
                              <BookCopy
                                className={
                                  timings.length === 7
                                    ? "text-gray-400 w-4 h-4"
                                    : "text-green-400 w-4 h-4"
                                }
                              />
                            </button>
                          </div>
                          <div className="w-10/12">
                            <SelectInput
                              label={"Day"}
                              name={`timings.${ind}.day`}
                              setFocus={setFocus}
                              error={
                                errors?.timings &&
                                errors?.timings.length > 0 &&
                                errors?.timings[ind] &&
                                errors?.timings[ind]?.day
                              }
                              register={register}
                              options={Days.map((v) => ({
                                label: v.full,
                                value: v.short,
                                disable: timings.some((e) => e.day === v.short)
                                  ? "disabled"
                                  : "",
                              }))}
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-3/12 px-1 gap-2 flex flex-row justify-center items-end">
                          <div className="w-1/2">
                            <SelectInput
                              label={" Pickup Time"}
                              name={`timings.${ind}.pickUpTime`}
                              showDefaultOption={true}
                              setFocus={setFocus}
                              error={
                                errors?.timings &&
                                errors?.timings.length > 0 &&
                                errors?.timings[ind] &&
                                errors?.timings[ind]?.pickUpTime
                              }
                              register={register}
                              options={time.map((e, i) => {
                                return {
                                  value: e,
                                  label: e,
                                };
                              })}
                            />
                          </div>
                          <div className="w-1/2">
                            <SelectInput
                              label={" DropOff Time"}
                              name={`timings.${ind}.dropOffTime`}
                              showDefaultOption={true}
                              setFocus={setFocus}
                              error={
                                errors?.timings &&
                                errors?.timings.length > 0 &&
                                errors?.timings[ind] &&
                                errors?.timings[ind]?.dropOffTime
                              }
                              register={register}
                              options={time.map((e, i) => {
                                return {
                                  value: e,
                                  label: e,
                                };
                              })}
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-2/12 px-1 gap-2 flex flex-row-reverse sm:flex-row justify-center items-end">
                          <div className="w-1/12">
                            {/* <label>Change TT</label> */}
                            <input
                              {...register(`timings.${ind}.isTravelTypeChange`)}
                              type="checkbox"
                            />
                          </div>
                          <div className="w-11/12">
                            <SelectInput
                              label={"Travel Type"}
                              disable={!el?.isTravelTypeChange}
                              name={`timings.${ind}.travelType`}
                              setFocus={setFocus}
                              error={
                                errors?.timings &&
                                errors?.timings.length > 0 &&
                                errors?.timings[ind] &&
                                errors?.timings[ind]?.travelType
                              }
                              register={register}
                              options={[
                                {
                                  value: "bothSide",
                                  label: "Both Side",
                                },
                                {
                                  value: "pickUp",
                                  label: "Pickup",
                                },
                                {
                                  value: "dropOff",
                                  label: "DropOff",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 gap-2 px-1 flex flex-row-reverse sm:flex-row justify-center items-end">
                          <div className="w-[5%]">
                            {/* <label>Change TT</label> */}
                            <input
                              {...register(`timings.${ind}.isAddressChange`)}
                              type="checkbox"
                            />
                          </div>
                          <div className="w-[45%]">
                            <SelectInput
                              label={"Pick Up"}
                              disable={!el?.isAddressChange}
                              name={`timings.${ind}.pickUpAddress`}
                              showDefaultOption={true}
                              setFocus={setFocus}
                              error={
                                errors?.timings &&
                                errors?.timings.length > 0 &&
                                errors?.timings[ind] &&
                                errors?.timings[ind]?.pickUpAddress
                              }
                              register={register}
                              options={location.map((e, i) => {
                                return {
                                  value: e?.location,
                                  label: e?.location,
                                };
                              })}
                            />
                          </div>
                          <div className="w-[45%]">
                            <SelectInput
                              label={"Drop Off"}
                              name={`timings.${ind}.dropOffAddress`}
                              disable={!el?.isAddressChange}
                              showDefaultOption={true}
                              setFocus={setFocus}
                              error={
                                errors?.timings &&
                                errors?.timings.length > 0 &&
                                errors?.timings[ind] &&
                                errors?.timings[ind]?.dropOffAddress
                              }
                              register={register}
                              options={location.map((e, i) => {
                                return {
                                  value: e?.location,
                                  label: e?.location,
                                };
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              className={
                errors?.fees || errors.feeType
                  ? "border-2 border-red-600 my-1"
                  : "border-2 border-gray-300 rounded-lg my-1"
              }
              value="item-3"
            >
              <AccordionTrigger className="px-2">Fee Info</AccordionTrigger>
              <AccordionContent className="w-full flex rounded-2 flex-wrap">
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <Textfield2
                    register={register}
                    setFocus={setFocus}
                    error={errors?.fees}
                    name={"fees"}
                    label={"Fees"}
                    type={"number"}
                  />
                </div>
                <div className="w-full mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"Fees Type"}
                    name={"feeType"}
                    setFocus={setFocus}
                    error={errors?.feeType}
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
    </>
  );
};

export default MemberForm;
