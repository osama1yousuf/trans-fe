// Loader.js

import React from "react";

const Loader = ({show}) => {
  if (!show) {
    return null
  }
  return (
    <div className="loader">
      {/* Add your loading animation or message here */}
      Loading Documents...
    </div>
  );
};

export default Loader;
