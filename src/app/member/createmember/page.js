'use client'

import Dashboard from "@/app/Components/Dashboard";
import { FaUser } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup';
export default function createMember() {
    let time = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM", "12:00 AM"]
    let area = ["Baldia Town", "Bin Qasim Town", "Gadap Town", "Gulberg Town", "Gulshan Town", "Jamshed Town", "Kiamari Town", "Korangi Town", "Liaquatabad Town", "Lyari Town", "Malir Town", "New Karachi Town"]

    const validateMemberSchema = Yup.object().shape({
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        file: Yup.mixed().required('File is required'),
        nicNo: Yup.string().length(13, "Nic value is greater than 13").required("Nic # is required"),
        mobile: Yup.string().length(11, "Phone Number Invalid").required("Phone Number required"),
        pickup: Yup.string().oneOf(area, 'Invalid option selected').required('Please select an option'),
        dropOff: Yup.string().oneOf(area, 'Invalid option selected').required('Please select an option'),
        pickTime: Yup.string().oneOf(time, 'Invalid option selected').required('Please select an option'),
        dropTime: Yup.string().oneOf(time, 'Invalid option selected').required('Please select an option'),
        satPickTime: Yup.string().oneOf(time, 'Invalid option selected').required('Please select an option'),
        satDropTime: Yup.string().oneOf(time, 'Invalid option selected').required('Please select an option'),
        dayOff: Yup.string().oneOf(["Sat Off", "Sat-Sun Off"], 'Invalid option selected').required('Please select an option'),
        fees: Yup.string().required("Fees amount is required"),
        feeType: Yup.string().oneOf(["Advance", "Month End"], 'Invalid option selected').required('Please select an option'),
        status: Yup.string().oneOf(['Active', 'InActive'], 'Invalid option selected').required('Please select an option'),
        comment: Yup.string(),
    });

    const initialValues = {
        firstName: '',
        lastName: '',
        file: null,
        nicNo: "",
        mobile: "",
        pickup: "",
        dropOff: "",
        pickTime: "",
        dropTime: "",
        satPickTime: "",
        satDropTime: "",
        dayOff: "",
        fees: "",
        feeType: "",
        status: "",
        comment: ""
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
            <h1 className="text-3xl border-b-2">Create Member</h1>
            <br />
            <Formik
                initialValues={initialValues}
                validationSchema={validateMemberSchema}
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
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                    />
                                    <ErrorMessage name="lastName">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
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
                                    placeholder="42***-*******-*"
                                />
                                <ErrorMessage name="firstName">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>

                            {/* <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            NIC Expiry
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="date"
                        // placeholder="42***-*******-*"
                        />
                    </div> */}
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="mobile"
                                >
                                    Mobile # *
                                </label>
                                <Field
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="mobile"
                                    name="mobile"
                                    type="tel"
                                // placeholder="42***-*******-*"
                                />
                                <ErrorMessage name="mobile">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="pickup"
                                >
                                    PickUp
                                </label>
                                <Field as="select"
                                    id="pickup"
                                    name="pickup"
                                    data-te-select-init
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                    <option value="select">Select</option>
                                    {
                                        area.map((val, index) => {
                                            return (
                                                <option key={index} value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="pickup">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="dropOff"
                                >
                                    DROP OFF
                                </label>
                                <Field as="select"
                                    id="dropOff"
                                    name="dropOff"
                                    data-te-select-init
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                    <option value="select">Select</option>
                                    {
                                        area.map((val, index) => {
                                            return (
                                                <option key={index} value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="dropOff">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            {/* <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Mobile # 2
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                        // placeholder="42***-*******-*"
                        />
                    </div> */}
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="pickTime"
                                >
                                  MORNING PICKUP TIME
                                </label>
                                <Field as="select"
                                    id="pickTime"
                                    name="pickTime"
                                    data-te-select-init
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                    <option value="select">Select</option>
                                    {
                                        time.map((val, index) => {
                                            return (
                                                <option key={index} value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="pickTime">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="dropTime"
                                >
                                 EVENING DROPOFF TIME
                                </label>
                                <Field as="select"
                                    id="dropTime"
                                    name="dropTime"
                                    data-te-select-init
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                    <option value="select">Select</option>
                                    {
                                        time.map((val, index) => {
                                            return (
                                                <option key={index} value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="dropTime">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="satPickTime"
                                >
                                SAT-MORNING PICKUP TIME
                                </label>
                                <Field as="select"
                                    id="satPickTime"
                                    name="satPickTime"
                                    data-te-select-init
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                    <option value="select">Select</option>
                                    {
                                        time.map((val, index) => {
                                            return (
                                                <option key={index} value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="satPickTime">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="satDropTime"
                                >
                               SAT-EVENING DROPOFF TIME
                                </label>
                                <Field as="select"
                                    id="satDropTime"
                                    name="satDropTime"
                                    data-te-select-init
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                    <option value="select">Select</option>
                                    {
                                        time.map((val, index) => {
                                            return (
                                                <option key={index} value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="satDropTime">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full  mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="dayOff"
                                >
                                    Day Off
                                </label>
                                <Field  as="select"
                                    id="dayOff"
                                    name="dayOff"
                                    data-te-select-init
                                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                    <option value="Sat">Select Option</option>
                                    <option value="Sat">Sat Off</option>
                                    <option value="Sat-Sun">Sat-Sun Off</option>
                                </Field>
                                <ErrorMessage name="dayOff">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>

                            <div className="w-full mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="fees"
                                >
                                    Fees
                                </label>
                                <Field
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="fees"
                                    name="fees"
                                    type="number"
                                // placeholder="42***-*******-*"
                                />
                                 <ErrorMessage name="fees">
                                    {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="w-full mt-2 lg:w-1/4 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="feeType"
                                >
                                    Fees Type
                                </label>
                                <Field as="select"
                                    id="feeType"
                                    name="feeType"
                                    data-te-select-init
                                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                    <option value="">Select Option</option>
                                    <option value="Advance">Advance</option>
                                    <option value="Month End">Month End</option>
                                </Field>
                                <ErrorMessage name="feeType">
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
                                <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >SAVE</button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </Dashboard>

    )
}