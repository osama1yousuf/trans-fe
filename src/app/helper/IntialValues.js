export const driverFormIntVal = {
  //Personal details
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  cnicNo: null,
  cnicExpiry: null,
  contactOne: null,
  contactTwo: null,
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
