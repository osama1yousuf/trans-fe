const SelectInput = ({
  label,
  name,
  register,
  showDefaultOption,
  options,
  error,
  setFocus,
}) => {
  const handleFocus = (field) => {
    setFocus(field);
  };
  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      <select
        {...register(name)}
        onFocus={() => handleFocus(name)}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
      >
        {showDefaultOption && <option value="">Select Option</option>}
        {options.map((e, i) => (
          <option key={i} value={e.value}>
            {e.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-red-500 text-xs">{error.message}</span>
      )}
    </>
  );
};

export default SelectInput;