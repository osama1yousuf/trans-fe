import { MdError } from "react-icons/md";

export default function Textfield2({
  name,
  label,
  type,
  placeHolder,
  error,
  register,
  setFocus,
  maxLength,
  autoComplete = "off",
  readOnly = false,
}) {
  const handleFocus = (field) => {
    setFocus(field);
  };

  let inputProps;

  if (type === "number") {
    inputProps = register(name, {
      setValueAs: (value) => (value === "" ? null : Number(value)),
    });
  } else {
    inputProps = register(name);
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <label className="block mb-2 text-xs font-sm text-gray-700 :text-white">
          {label}
        </label>
        {error && <MdError className="text-red-500" />}
      </div>
      <input
        autoComplete={autoComplete}
        type={type}
        readOnly={readOnly}
        maxLength={maxLength}
        onFocus={() => handleFocus(name)}
        {...inputProps}
        className={
          error
            ? "bg-gray-50 border-2 border-red-500 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
            : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
        }
        placeholder={placeHolder}
      />
      {/* {error && <span className="text-red-500 text-xs">{error?.message}</span>} */}
    </>
  );
}
