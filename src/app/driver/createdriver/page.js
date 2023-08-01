'use client';

import Dashboard from "@/app/Components/Dashboard";
import { FaUser } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup';
export default function createdriver() {
    const validateDriverSchema = Yup.object().shape({
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        file: Yup.mixed().required('File is required'),
        nicNo: Yup.string().length(13, "Nic value is greater than 13").required("Nic # is required"),
        nicExpiry: Yup.date().required("Nic expiry date is required"),
        mobile_1: Yup.string().length(11, "Phone Number Invalid").required("Phone Number required"),
        mobile_2: Yup.string().length(11, "Phone Number Invalid"),
        vehicleNo: Yup.string().required("Vehicle number required"),
        licenseNo: Yup.string().required("License number required"),
        licenseIssue: Yup.date().required("License issue date is required"),
        licenseExpiry: Yup.date().required("License expiry date is required"),
        joiningDate: Yup.date().required("License expiry date is required").min(new Date(), "Date must be after today"),
        salary: Yup.string().required("Salary amount is required"),
        salaryType: Yup.string().oneOf(['Daily', 'Weekly', 'Monthly'], 'Invalid option selected').required('Please select an option'),
        status: Yup.string().oneOf(['Active', 'InActive'], 'Invalid option selected').required('Please select an option'),
        comment: Yup.string(),
    });

    const initialValues = {
        firstName: '',
        lastName: '',
        file:null ,
        nicNo: "",
        nicExpiry: "",
        mobile_1: "",
        mobile_2: "",
        vehicleNo: "",
        licenseNo: "",
        licenseIssue: "",
        licenseExpiry: "",
        joiningDate: "",
        salary: "",
        salaryType: "",
        status: "",
        comment:""
    };
    const handleSubmit = (values, { setSubmitting }) => {
        // setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        console.log(values);
        setSubmitting(false);

        // router.push("/driver/active")
        // }, 400);
    }
    return (
        <Dashboard>
            <br />
            <h1 className="text-3xl border-b-2">Create Driver</h1>
            <br />
            <Formik
                initialValues={initialValues}
                validationSchema={validateDriverSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full">
                        <div className="flex  flex-wrap -mx-3 mb-6">
                            <div className="lg:max-w-lg w-full lg:w-2/4 ">
                                <div className="w-full  mt-2 md:w-full px-3 mb-6 md:mb-0">
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
                                <div className="w-full  mt-2 md:w-full px-3">
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
                                        placeholder="First Name"
                                    />
                                    <ErrorMessage name="lastName">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                                </div>
                            </div>
                            <div className="w-full mt-2 lg:w-2/4 px-3">
                                <div className="border mx-14 sm:mx-24 lg:mx-20 xl:mx-32 flex justify-center aligin-center p-2">
                                    <FaUser size={130} />
                                </div>
                                <div className="block mx-12 sm:mx-32 my-2">
                                    {/* <span className="sr-only">Choose profile photo</span> */}
                                    <input
                                        id="file"
                                        name="file"
                                        type="file"
                                        
                                        className="block w-full  text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                    />
                                </div>
                            </div>
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="nicNo"
                                >
                                    NIC No
                                </label>
                                <Field
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="nicNo"
                                    name="nicNo"
                                    type="text"
                                    placeholder="42***********"
                                />
                                <ErrorMessage name="nicNo">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="nicExpiry"
                                >
                                    NIC Expiry
                                </label>
                                <Field
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="nicExpiry"
                                    name="nicExpiry"
                                    type="date"
                                // placeholder="42***-*******-*"
                                />
                                <ErrorMessage name="nicExpiry">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="mobile_1"
                                >
                                    Mobile # 1*
                                </label>
                                <Field
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="mobile_1"
                                    name="mobile_1"
                                    type="tel"
                                // placeholder="42***-*******-*"
                                />
                                <ErrorMessage name="mobile_1">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="mobile_2"
                                >
                                    Mobile # 2
                                </label>
                                <Field
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="mobile_2"
                                    name="mobile_2"
                                    type="tel"
                                // placeholder="42***-*******-*"
                                />
                                <ErrorMessage name="mobile_2">
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
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                </Field>
                                <ErrorMessage name="salaryType">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="status"
                                >
                                    Status
                                </label>
                                <Field
                                    as="select"
                                    id="status"
                                    name="status"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    data-te-select-init
                                >
                                    <option value="">Select Option</option>
                                    <option value="Daily">Actice</option>
                                    <option value="Monthly">Inactive</option>
                                </Field>
                                <ErrorMessage name="status">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
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
                            <div className="w-full flex justify-center aligin-center m-4 lg:w-full px-3">
                                <button  type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >SAVE</button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </Dashboard>

    )
}