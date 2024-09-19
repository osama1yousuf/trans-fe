export const SelectDropdown = ({ label, options , handleChange }) => {
  return (
    <div className="w-full">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      <select
        onChange={handleChange}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {options.map((opt, ind) => {
          return (
            <option key={ind} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
