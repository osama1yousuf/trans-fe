export const driverFormIntVal = {
  //Personal details
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  cnicNo: null,
  cnicExpiry: null,
  contactOne: null,
  contactTwo: '',
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
      salary: null,
      salaryType: "",
    },
  ],

  shifts: [],
  noOfShifts: null,
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
  bothSide: "",
  //timings
  pickUpTime: "",
  dropOffTime: "",
  //timing // saturdayTimings
  satPickUpTime: "",
  satDropOffTime: "",
  //timing // sundayTimings
  sunPickUpTime: "",
  sunDropOffTime: "",
  // fees
  fees: "",
  feeType: "",
};