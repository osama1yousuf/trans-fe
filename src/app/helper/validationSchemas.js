import * as Yup from "yup";

export const validateDriverSchema = Yup.object().shape({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  dateOfBirth: Yup.date().required("Date of Birth is Required"),
  cnicNo: Yup.string()
    .length(15, "CNIC value should be 15 characters")
    .required("CNIC # is required"),
  cnicExpiry: Yup.date().required("CNIC expiry date is required"),
  contactOne: Yup.string()
    .length(11, "Phone Number Invalid")
    .required("Phone Number required"),
  contactTwo: Yup.string()
    .nullable() // Allow the field to be null
    .test("length", "Phone Number Invalid", (value) => {
      // Check if the value is provided and has a length of 11
      return value === "" || value.length === 11;
    }),
  address: Yup.string().required("Address is required"),
  joiningDate: Yup.date().required("Joining date is required"),

  // Vehicle Info Validation
  vehicleInfo: Yup.object().shape({
    vehicleName: Yup.string().required("Vehicle name required"),
    model: Yup.string().required("Vehicle model required"),
    make: Yup.string()
      .oneOf(
        [
          "daihatsu_hijet",
          "suzuki_alto",
          "suzuki_cultus",
          "daihatsu_mira",
          "coaster",
          "toyota_hiace",
          "hino_bus",
          "toyota_corolla",
          "suzuki_apv",
          "suzuki_bolan",
        ],
        "Invalid option selected"
      )
      .required("Please select an option"),
    vehicleNo: Yup.string().required("Vehicle number required"),
  }),

  // License Info Validation
  licenseInfo: Yup.object().shape({
    licenseNo: Yup.string().required("License number required"),
    licenseIssue: Yup.date().required("License issue date is required"),
    licenseExpiry: Yup.date().required("License expiry date is required"),
  }),

  // Salary Info Validation
  salaryInfo: Yup.array().of(
    Yup.object().shape({
      salary: Yup.string().min(1).required("Salary amount is required"),
      salaryType: Yup.string()
        .oneOf(["advance", "monthEnd"], "Invalid option selected")
        .required("Please select an option"),
    })
  ),

  // Optional fields
  comments: Yup.string(),
  shifts: Yup.array().of(
    Yup.object().shape({
      shift: Yup.string(),
      checkInTime: Yup.string().required("Trip start date is required"),
      checkOutTime: Yup.string().required("Trip end date is required"),
    })
  ),
  noOfShifts: Yup.number()
    .nullable()
    .required("Number of shifts is required")
    .min(1, "Minimum number of shifts is 1")
    .typeError("Number of shifts must be a number"),
});
