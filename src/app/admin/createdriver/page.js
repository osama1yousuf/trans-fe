'use client';

import { FaUser } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup';

import axios from "axios";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
export default function createdriver() {
    const router = useRouter()
    const validateDriverSchema = Yup.object().shape({
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        dateOfBirth: Yup.date().required("Date of Birth is Required"),
        cnicNo: Yup.string().length(13, "Nic value is greater than 13").required("Nic # is required"),
        cnicExpiry: Yup.date().required("Nic expiry date is required"),
        contactOne: Yup.string().length(11, "Phone Number Invalid").required("Phone Number required"),
        contactTwo: Yup.string().length(11, "Phone Number Invalid"),
        password: Yup.string().min(8, "Password Length is greater than 8").required("Password is required"),
        address: Yup.string().required("Address is Required"),
        vehicleName: Yup.string().required("Vehicle name required"),
        model: Yup.string().required("Vehicle model required"),
        make: Yup.string().oneOf(['toyota', 'suzuki', 'changan', 'honda'], 'Invalid option selected').required('Please select an option'),
        vehicleNo: Yup.string().required("Vehicle number required"),
        licenseNo: Yup.string().required("License number required"),
        licenseIssue: Yup.date().required("License issue date is required"),
        licenseExpiry: Yup.date().required("License expiry date is required"),
        joiningDate: Yup.date().required("License expiry date is required"),
        salary: Yup.string().required("Salary amount is required"),
        salaryType: Yup.string().oneOf(['advance', 'monthEnd'], 'Invalid option selected').required('Please select an option'),
        comment: Yup.string(),
    });

    const initialValues = {
        //Personaldetails
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        cnicNo: "",
        cnicExpiry: "",
        contactOne: "",
        contactTwo: "",
        password: "",
        address: "",
        //vehicleInfo
        vehicleName: "",
        model: "",
        vehicleNo: "",
        make: "",
        //license info
        licenseNo: "",
        licenseIssue: "",
        licenseExpiry: "",
        joiningDate: "",
        salary: "",
        salaryType: "",
        comments: ""
    };
    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false);
        // console.log(values);
        let body = {
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth: values.dateOfBirth,
            cnicNo: values.cnicNo,
            cnicExpiry: values.cnicExpiry,
            contactOne: values.contactOne,
            contactTwo: values.contactTwo,
            password: values.password,
            address: values.address,
            joiningDate: values.joiningDate,
            licenseInfo: {
                licenseNo: values.licenseNo,
                licenseIssue: values.licenseIssue,
                licenseExpiry: values.licenseExpiry
            },
            vehicleInfo: {
                vehicleName: values.vehicleName,
                vehicleNo: values.vehicleNo,
                model: values.model,
                make: values.make
            },
            salaryInfo: {
                salary: values.salary,
                salaryType: values.salaryType
            }
        }
        try {
            console.log(body);
            const responsne = await axiosInstance.post('/driver', body)
            console.log("responsne", responsne);
            toast.success("Driver created successfully", { autoClose: 1000 })
            router.push('/admin/activedriver')
        } catch (e) {
            console.log("error", e.response.data.message[0]);
            toast.error(e.response.data.message[0], { autoClose: 1000 })
        }
    }
    return (
        // <Dashboard>
        <>
            {/* <br /> */}
            {/* <h1 className="text-3xl border-b-2">Create Driver</h1> */}
            {/* <br /> */}

            <Formik
                initialValues={initialValues}
                validationSchema={validateDriverSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full">
                        <div className="w-full flex m-1 lg:w-full px-3">
                            <button type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >SAVE</button>
                        </div>
                        <div className="flex  flex-wrap -mx-3 mb-6">
                            {/* <div> */}
                            <label className="text-sm m-2">Personal Info</label>
                            <div className="w-full flex rounded-2 flex-wrap border-2 p-2">
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="firstName"
                                    >
                                        First Name
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                    />
                                    <ErrorMessage name="firstName">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="lastName"
                                    >
                                        Last Name
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                    <ErrorMessage name="lastName">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="dateOfBirth"
                                    >
                                        Date of Birth
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        type="date"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="dateOfBirth">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="cnicNo"
                                    >
                                        CNIC No
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="cnicNo"
                                        name="cnicNo"
                                        type="number"
                                        placeholder="42***********"
                                    />
                                    <ErrorMessage name="cnicNo">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="cnicExpiry"
                                    >
                                        CNIC Expiry
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="cnicExpiry"
                                        name="cnicExpiry"
                                        type="date"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="cnicExpiry">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="contactOne"
                                    >
                                        Contact # 1*
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="contactOne"
                                        name="contactOne"
                                        type="tel"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="contactOne">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="contactTwo"
                                    >
                                        Contact # 2
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="contactTwo"
                                        name="contactTwo"
                                        type="tel"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="contactTwo">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="joiningDate"
                                    >
                                        JOINING DATE
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="joiningDate"
                                        name="joiningDate"
                                        type="date"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="joiningDate">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="password"
                                        name="password"
                                        type="password"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="password">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full mt-2 lg:w-3/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="address"
                                    >
                                        Address
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="address"
                                        name="address"
                                        type="text"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="address">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <label className="text-sm m-2">Vehicle Info</label>
                            <div className="w-full flex rounded-2 flex-wrap border-2 p-2">
                                <div className="w-full mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="vehicleName"
                                    >
                                        Vehicle Name
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="vehicleName"
                                        name="vehicleName"
                                        type="text"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="vehicleName">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="vehicleNo"
                                    >
                                        Vehicle #
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="vehicleNo"
                                        name="vehicleNo"
                                        type="text"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="vehicleNo">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="licenseNo"
                                    >
                                        License #
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="licenseNo"
                                        name="licenseNo"
                                        type="text"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="licenseNo">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="licenseIssue"
                                    >
                                        LICENSE ISSUE DATE
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="licenseIssue"
                                        name="licenseIssue"
                                        type="date"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="licenseIssue">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="licenseExpiry"
                                    >
                                        LICENSE EXPIRY DATE
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="licenseExpiry"
                                        name="licenseExpiry"
                                        type="date"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="licenseExpiry">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="model"
                                    >
                                        Model
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="model"
                                        name="model"
                                        type="text"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="model">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="make"
                                    >
                                        Company Make Name
                                    </label>
                                    <Field
                                        as="select"
                                        id="make"
                                        name="make"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        data-te-select-init
                                    >
                                        <option value="">Select Option</option>
                                        <option value="toyota">Toyota</option>
                                        <option value="suzuki">Suzuki</option>
                                        <option value="changan">Changan</option>
                                        <option value="honda">Honda</option>
                                    </Field>
                                    <ErrorMessage name="salaryType">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <label className="text-sm m-2">Salary Info</label>
                            <div className="w-full flex rounded-2 flex-wrap border-2 p-2">
                                <div className="w-full mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="salary"
                                    >
                                        Salary
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="salary"
                                        name="salary"
                                        type="number"
                                    // placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="salary">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>

                                </div>
                                <div className="w-full mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="salaryType"
                                    >
                                        Salary Type
                                    </label>
                                    <Field
                                        as="select"
                                        id="salaryType"
                                        name="salaryType"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        data-te-select-init
                                    >
                                        <option value="">Select Option</option>
                                        <option value="advance">Advance</option>
                                        <option value="monthEnd">Month End</option>
                                    </Field>
                                    <ErrorMessage name="salaryType">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div className="w-full mt-2 lg:w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="comment"
                                >
                                    Comments
                                </label>
                                <textarea
                                    rows="6" cols="50"
                                    id="comment"
                                    name="comment"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                // id="grid-last-name"
                                // type="textarea"
                                // placeholder="42***-*******-*"
                                />
                            </div>

                        </div>

                    </Form>
                )}
            </Formik>
        </>
        // </Dashboard>

    )
}