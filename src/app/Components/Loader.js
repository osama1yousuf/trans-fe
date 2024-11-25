import React from "react";

const Loader = () => {

  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-16 h-16 border-4  border-[#811630]-500 rounded-full animate-spin border-t-transparent`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default Loader;