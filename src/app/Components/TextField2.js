export default function Textfield2({
  name,
  label,
  type,
  placeHolder,
  error,
  register,
  setFocus,
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
      {console.log("error" , error[name] , name)}
      <label className="block mb-2 text-xs font-sm text-gray-700 :text-white">
        {label}ٖ
      </label>
      <input
        type={type}
        onFocus={() => handleFocus(name)}
        {...inputProps}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
        placeholder={placeHolder}
      />
      {error[name] && (
        <span className="text-red-500 text-xs">{error[name].message}</span>
      )}
    </>
  );
}
