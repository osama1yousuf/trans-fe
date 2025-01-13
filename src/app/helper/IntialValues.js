export const driverFormIntVal = {
  //Personal details
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  cnicNo: null,
  cnicExpiry: null,
  contactOne: null,
  contactTwo: "",
  password: "",
  address: "",
  joiningDate: null,

  // Nested objects
  licenseInfo: {
    licenseNo: "",
    licenseIssue: null,
    licenseExpiry: null,
  },
  vehicleInfo: {
    vehicleName: "",
    vehicleNo: null,
    model: "",
    make: "",
  },
  salaryInfo: [
    {
      salary: "",
      salaryType: "monthEnd",
    },
  ],

  shifts: [],
  noOfShifts: 0,
};

export const memberFormIntVal = {
  firstName: "",
  lastName: "",
  contactOne: "",
  contactTwo: "",
  cnicNo: null,
  password: "",
  comments: "",
  joinDate: "",
  //location
  residentialAddress: "",
  pickUpAddress: "",
  dropOffAddress: "",
  bothSide: "bothSide",
  //timings
  timings: [],
  fees: "",
  feeType: "advance",
};
