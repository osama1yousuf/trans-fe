import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Textfield2 from "../TextField2";
import SelectInput from "../SelectInput";
import TextArea from "../TextArea";

const DriverForm = ({
  handleSubmit,
  errors,
  setFocus,
  register,
  watch,
  formId,
  showPassField,
}) => {
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
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  register={register}
                  error={errors?.cnicNo}
                  name={"cnicNo"}
                  label={"CNIC No"}
                  type={"number"}
                />
              </div>
              <div className="w-full  mt-2 lg:w-1/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  error={errors?.cnicExpiry}
                  register={register}
                  name={"cnicExpiry"}
                  label={"CNIC Expiry"}
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
              <div className="w-full mt-2 lg:w-3/4 px-3">
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
            <AccordionTrigger className="px-2">Shifts Info</AccordionTrigger>
            <AccordionContent className="w-full flex rounded-2 flex-wrap">
              <div className="w-full mt-2 lg:w-1/4 px-3">
                <Textfield2
                  setFocus={setFocus}
                  register={register}
                  error={errors?.noOfShifts}
                  name={"noOfShifts"}
                  label={"No of Shifts"}
                  type={"number"}
                />
              </div>
              <br />
              {watch("noOfShifts") > 0 &&
                watch("shifts").map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full gap-2 px-3 flex mt-2 lg:w-1/4"
                    >
                      <div className="w-1/2">
                        <Textfield2
                          setFocus={setFocus}
                          register={register}
                          error={
                            errors?.shifts?.length > 0 &&
                            errors?.shifts[i] &&
                            errors?.shifts[i]?.checkInTime
                          }
                          name={`shifts.${i}.checkInTime`}
                          label={`Shift-${i + 1}`}
                          type={"time"}
                        />
                      </div>
                      <div className="w-1/2 mt-4">
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
                  );
                })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className={
              errors?.comment
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
                  name={"comment"}
                  error={errors?.comment}
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
