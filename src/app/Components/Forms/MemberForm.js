import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Textfield2 from "../TextField2";
import SelectInput from "../SelectInput";
import TextArea from "../TextArea";
import { useEffect } from "react";

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

  return (
    <form id={formId} onSubmit={handleSubmit}>
      {console.log("errors", errors)}
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
            <AccordionTrigger className="px-2">Personal Info</AccordionTrigger>
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
                  label={"Mobile # 1"}
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
            <AccordionTrigger className="px-2">Travel Type</AccordionTrigger>
            <AccordionContent className="w-full flex rounded-2 flex-wrap">
              <div className="w-full">
                <div className="w-full my-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"Travel Type"}
                    name={"bothSide"}
                    setFocus={setFocus}
                    showDefaultOption={true}
                    error={errors?.bothSide}
                    register={register}
                    options={[
                      {
                        value: "pickUp",
                        label: "Pickup",
                      },
                      {
                        value: "dropOff",
                        label: "DropOff",
                      },
                      {
                        value: "bothSide",
                        label: "Both Side",
                      },
                    ]}
                  />
                </div>
              </div>
              <label className="text-sm m-2">PickUp Info</label>
              <div className="w-full flex rounded-2 flex-wrap border-2 m-2 p-2">
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"PickUp From"}
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
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={" PICKUP TIME"}
                    name={"pickUpTime"}
                    showDefaultOption={true}
                    setFocus={setFocus}
                    error={errors?.pickUpTime}
                    register={register}
                    options={time.map((e, i) => {
                      return {
                        value: e,
                        label: e,
                      };
                    })}
                  />
                </div>
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"SAT PICKUP TIME"}
                    name={"satPickUpTime"}
                    showDefaultOption={true}
                    setFocus={setFocus}
                    error={errors?.satPickUpTime}
                    register={register}
                    options={time.map((e, i) => {
                      return {
                        value: e,
                        label: e,
                      };
                    })}
                  />
                </div>
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"SUNDAY PICKUP TIME"}
                    name={"sunPickUpTime"}
                    showDefaultOption={true}
                    setFocus={setFocus}
                    error={errors?.sunPickUpTime}
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
              <label className="text-sm m-2">DropOff Info</label>
              <div className="w-full flex rounded-2 flex-wrap border-2 m-2 p-2">
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"DROP OFF"}
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
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"DROPOFF TIME"}
                    name={"dropOffTime"}
                    showDefaultOption={true}
                    setFocus={setFocus}
                    error={errors?.dropOffTime}
                    register={register}
                    options={time.map((e, i) => {
                      return {
                        value: e,
                        label: e,
                      };
                    })}
                  />
                </div>
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"SAT DROPOFF TIME"}
                    name={"satDropOffTime"}
                    showDefaultOption={true}
                    setFocus={setFocus}
                    error={errors?.satDropOffTime}
                    register={register}
                    options={time.map((e, i) => {
                      return {
                        value: e,
                        label: e,
                      };
                    })}
                  />
                </div>
                <div className="w-full  mt-2 lg:w-1/4 px-3">
                  <SelectInput
                    label={"SUNDAY DROPOFF TIME"}
                    name={"sunDropOffTime"}
                    showDefaultOption={true}
                    setFocus={setFocus}
                    error={errors?.sunDropOffTime}
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
                  showDefaultOption={true}
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
  );
};

export default MemberForm;
