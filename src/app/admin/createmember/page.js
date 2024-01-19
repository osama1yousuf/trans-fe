'use client'

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup';
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useUserValidator } from "@/interceptor/userValidate";
export default function createMember() {
  useUserValidator("superadmin")
    const router = useRouter()
    let time = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM", "12:00 AM"]
    // let area = ["Baldia Town", "Bin Qasim Town", "Gadap Town", "Gulberg Town", "Gulshan Town", "Jamshed Town", "Kiamari Town", "Korangi Town", "Liaquatabad Town", "Lyari Town", "Malir Town", "New Karachi Town"]
    const [location , setlocation] = useState([])
    const validateMemberSchema = Yup.object().shape({
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        password: Yup.string().min(8, "Password length is greater than 8").required("Password is required"),
        residentialAddress: Yup.string().required("Address is required"),
        joinDate: Yup.date().required("Join date is required"),
        cnicNo: Yup.string().length(13, "Nic value is greater than 13").required("Nic # is required"),
        contactOne: Yup.string().length(11, "Phone Number Invalid").required("Phone Number required"),
        contactTwo: Yup.string().length(11, "Phone Number Invalid"),
        // file: Yup.mixed().required('File is required'),
        bothSide: Yup.string().oneOf(['bothSide', 'pickUp', 'dropOff'], 'Invalid option selected').required('Please select an option'),
        pickUpAddress: Yup.string().oneOf(location, 'Invalid option selected').when('bothSide', {
            is: (value) => value === 'pickUp' || value === 'bothSide',
            then: (sechema)=> sechema.required('Please select an option'),
            otherwise: (schema)=> schema
        }),
        pickUpTime: Yup.string().oneOf(time, 'Invalid option selected').when('bothSide', {
            is: (value) => value === 'pickUp' || value === 'bothSide',
            then: (sechema)=> sechema.required('Please select an option'),
            otherwise: (schema)=> schema
        }),
        satPickUpTime: Yup.string().oneOf(time, 'Invalid option selected'),
        sunPickUpTime: Yup.string().oneOf(time, 'Invalid option selected'),
        dropOffAddress: Yup.string().oneOf(location, 'Invalid option selected').when('bothSide', {
            is: (value) => value === 'dropOff' || value === 'bothSide',
            then: (sechema)=> sechema.required('Please select an option'),
            otherwise: (schema)=> schema
        }),
        dropOffTime: Yup.string().oneOf(time, 'Invalid option selected').when('bothSide', {
            is: (value) => value === 'dropOff' || value === 'bothSide',
            then: (sechema)=> sechema.required('Please select an option'),
            otherwise: (schema)=> schema
        }),
        satDropOffTime: Yup.string().oneOf(time, 'Invalid option selected'),
        sunDropOffTime: Yup.string().oneOf(time, 'Invalid option selected'),
        fees: Yup.string().required("Fees amount is required"),
        feeType: Yup.string().oneOf(["advance", "monthEnd"], 'Invalid option selected').required('Please select an option'),
        // status: Yup.string().oneOf(['Active', 'InActive'], 'Invalid option selected').required('Please select an option'),
        comment: Yup.string(),
    });
   
const getLocation = async ()=>{
   try{
   let response = await axiosInstance.get('/locations')
  if (response.data) {
    let data = []
      for (let i = 0; i < response.data.length; i++) {
         const element = response.data[i];
         data.push(element.location)
      }
      setlocation(data)
  }
   }catch(e){
    console.log(e.message);
   }
}
useEffect(()=>{
  getLocation()
},[])
    const initialValues = {
        firstName: '',
        lastName: '',
        contactOne: "",
        contactTwo: "",
        cnicNo: "",
        password: "",
        comment: "",
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
    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false)
        let body = {
            firstName: values.firstName,
            lastName: values.lastName,
            contactOne: values.contactOne,
            contactTwo: values.contactTwo,
            cnicNo: values.cnicNo,
            password: values.password,
            comments: values.comment,
            joinDate: new Date(values.joinDate).toISOString(),
            location: {
                residentialAddress: values.residentialAddress,
                pickUpAddress: values.pickUpAddress,
                dropOffAddress: values.dropOffAddress,
                dropType: values.bothSide
            },
            timings: {
                pickUpTime: values.bothSide == "pickUp" || values.bothSide == "bothSide" ? values.pickUpTime : null,
                dropOffTime: values.bothSide == "dropOff" || values.bothSide == "bothSide" ? values.dropOffTime : null,
                saturdayTimings: values.satPickUpTime || values.satDropOffTime ? {
                    pickUpTime: values.bothSide == "pickUp" || values.bothSide == "bothSide" ? values.satPickUpTime : null,
                    dropOffTime: values.bothSide == "dropOff" || values.bothSide == "bothSide" ? values.satDropOffTime : null
                } : null,
                sundayTimings: values.sunPickUpTime || values.sunDropOffTime ? {
                    pickUpTime: values.bothSide == "pickUp" || values.bothSide == "bothSide" ? values.sunPickUpTime : null,
                    dropOffTime: values.bothSide == "dropOff" || values.bothSide == "bothSide" ? values.pickUpTime : null
                } : null,
            },

            fees: values.fees,
            feesType: values.feeType

        }
        console.log("values", body);
        try {
            let response = await axiosInstance.post('/customer', body)
            // if (response.status == 201) {
            console.log("responne", response);
            toast.success("Member created successfully", { autoClose: 1000 })
            router.push('/admin/activemember')
            // }
        } catch (e) {
            console.log("error", e.response.data.message[0]);
            toast.error(e.message, { autoClose: 1000 })
        }
    }
    return (
        <>
            {/* <br /> */}
            {/* <h1 className="text-3xl border-b-2">Create Member</h1> */}
            {/* <br /> */}
            <Formik
                initialValues={initialValues}
                validationSchema={validateMemberSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full">
                        <div className="w-full flex m-1 lg:w-full px-3">
                                <button type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >SAVE</button>
                            </div>
                        <div className="flex  flex-wrap -mx-3 mb-6">
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
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                                    >
                                        Password
                                    </label>
                                    <Field
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                                    // required=""
                                    />
                                    <ErrorMessage name="password">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="residentialAddress"
                                    >
                                        Address
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="residentialAddress"
                                        type="text"
                                        name="residentialAddress"
                                    // placeholder="Last Name"
                                    />
                                    <ErrorMessage name="residentialAddress">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="joinDate"
                                    >
                                        Joining Date
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="joinDate"
                                        type="date"
                                        name="joinDate"
                                    // placeholder="Last Name"
                                    />
                                    <ErrorMessage name="joinDate">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="cnicNo"
                                    >
                                        NIC No
                                    </label>
                                    <Field
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="cnicNo"
                                        name="cnicNo"
                                        type="text"
                                        placeholder="42***-*******-*"
                                    />
                                    <ErrorMessage name="cnicNo">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="w-full  mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="contactOne"
                                    >
                                        Mobile # *
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
                                        Mobile # 2
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
                            </div>
                            <label className="text-sm m-2">Travel Info</label>
                            <div className="w-full flex rounded-2 flex-wrap border-2 p-2">
                                <div className="w-full my-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="bothSide"
                                    >
                                        Travel Type
                                    </label>
                                    <Field
                                        as="select"
                                        id="bothSide"
                                        name="bothSide"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        
                                    >
                                        <option value="">Select Option</option>
                                        <option value='pickUp' >Pickup</option>
                                        <option value='dropOff'>DropOff</option>
                                        <option value='bothSide' >Both Side</option>
                                    </Field>
                                    <ErrorMessage name="bothSide">
                                        {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                    </ErrorMessage>
                                    <label className="text-sm m-2">PickUp Info</label>
                                </div>
                                <hr />
                                {/* <label className="text-sm m-2">PickUp Info</label> */}
                                <div className="w-full flex rounded-2 flex-wrap border-2 p-2">
                                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="pickUpAddress"
                                        >
                                            PickUp From
                                        </label>
                                        <Field as="select"
                                            id="pickUpAddress"
                                            name="pickUpAddress"
                                            
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value="select">Select</option>
                                            {
                                                location.map((val, index) => {
                                                    return (
                                                        <option key={index} value={val}>{val}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="pickUpAddress">
                                            {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                        </ErrorMessage>
                                    </div>
                                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="pickUpTime"
                                        >
                                            PICKUP TIME
                                        </label>
                                        <Field as="select"
                                            id="pickUpTime"
                                            name="pickUpTime"
                                            
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value="select">Select</option>
                                            {
                                                time.map((val, index) => {
                                                    return (
                                                        <option key={index} value={val}>{val}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="pickUpTime">
                                            {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                        </ErrorMessage>
                                    </div>
                                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="satPickUpTime"
                                        >
                                            SAT PICKUP TIME
                                        </label>
                                        <Field as="select"
                                            id="satPickUpTime"
                                            name="satPickUpTime"
                                            
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value="select">Select</option>
                                            {
                                                time.map((val, index) => {
                                                    return (
                                                        <option key={index} value={val}>{val}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="satPickUpTime">
                                            {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                        </ErrorMessage>
                                    </div>
                                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="sunPickUpTime"
                                        >
                                            SUNDAY PICKUP TIME
                                        </label>
                                        <Field as="select"
                                            id="sunPickUpTime"
                                            name="sunPickUpTime"
                                            
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value="select">Select</option>
                                            {
                                                time.map((val, index) => {
                                                    return (
                                                        <option key={index} value={val}>{val}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="sunPickUpTime">
                                            {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                <label className="text-sm m-2">DropOff Info</label>
                                <div className="w-full flex rounded-2 flex-wrap border-2 p-2" >
                                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="dropOffAddress"
                                        >
                                            DROP OFF
                                        </label>
                                        <Field as="select"
                                            id="dropOffAddress"
                                            name="dropOffAddress"
                                            
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value="select">Select</option>
                                            {
                                                location.map((val, index) => {
                                                    return (
                                                        <option key={index} value={val}>{val}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="dropOffAddress">
                                            {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                        </ErrorMessage>
                                    </div>
                                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="dropOffTime"
                                        >
                                            DROPOFF TIME
                                        </label>
                                        <Field as="select"
                                            id="dropOffTime"
                                            name="dropOffTime"
                                            
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value="select">Select</option>
                                            {
                                                time.map((val, index) => {
                                                    return (
                                                        <option key={index} value={val}>{val}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="dropOffTime">
                                            {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                        </ErrorMessage>
                                    </div>
                                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="satDropOffTime"
                                        >
                                            SAT DROPOFF TIME
                                        </label>
                                        <Field as="select"
                                            id="satDropOffTime"
                                            name="satDropOffTime"
                                            
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value="select">Select</option>
                                            {
                                                time.map((val, index) => {
                                                    return (
                                                        <option key={index} value={val}>{val}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="satDropOffTime">
                                            {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                        </ErrorMessage>
                                    </div>
                                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="sunDropOffTime"
                                        >
                                            SUNDAY DROPOFF TIME
                                        </label>
                                        <Field as="select"
                                            id="sunDropOffTime"
                                            name="sunDropOffTime"
                                            
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value="select">Select</option>
                                            {
                                                time.map((val, index) => {
                                                    return (
                                                        <option key={index} value={val}>{val}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="sunDropOffTime">
                                            {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                                        </ErrorMessage>
                                    </div>

                                </div>

                            </div>
                            <label className="text-sm m-2">Fee Info</label>
                            <div className="w-full flex rounded-2 flex-wrap border-2 p-2">
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
                                        
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                        <option value="">Select Option</option>
                                        <option value="advance">Advance</option>
                                        <option value="monthEnd ">Month End</option>
                                    </Field>
                                    <ErrorMessage name="feeType">
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

    )
}