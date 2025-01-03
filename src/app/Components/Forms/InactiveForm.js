import { useForm } from "react-hook-form";
import Textfield2 from "../TextField2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { data } from "autoprefixer";
import TextArea from "../TextArea";

const InactiveForm = ({
  setInactiveModal,
  inactiveModalUser,
  type,
  handleStatusChangetoInactive,
}) => {
  const {
    handleSubmit,
    setFocus,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      date: null,
      comments: null,
    },
    resolver: yupResolver(
      Yup.object().shape({
        date: Yup.date().required("Inactive Date is Required"),
        comments: Yup.string().nullable(),
      })
    ),
  });
  const onSubmit = (values) => {
    handleStatusChangetoInactive(values, inactiveModalUser);
  };
  return (
    <div className="z-10 absolute bg-gray-200 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative p-5 border w-[88vw] sm:w-[50vw] md:w-[37vw] lg:w-[32vw] xl:w-[28vw] left-auto mx-4 md:m-0 md:left-1/4 top-20 lg:top-1/4 shadow-lg rounded-md bg-white">
        <div className="mt-3  text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {type} In Active Form
          </h3>
          <span className="text-sm leading-6 font-medium text-gray-900">
            Name : {inactiveModalUser?.firstName} {inactiveModalUser?.firstName}{" "}
            contact No : {inactiveModalUser?.contactOne}
          </span>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-2 text-left">
            <div className="mb-4">
              <Textfield2
                error={errors?.date}
                label={"Inactive Date"}
                name={"date"}
                setFocus={setFocus}
                register={register}
                type={"date"}
              />
            </div>
            <div className="mb-4">
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
            <div className="flex items-center gap-2 justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`my-4 text-white ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-[#811630] hover:bg-primary-700"
                } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setInactiveModal(false);
                }}
                className={`my-4 text-white ml-3 bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InactiveForm;
