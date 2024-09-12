'use client';
import { usePathname, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup';
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Textfield from "../Components/Textfield";

export default function () {
    let url = process.env.BASE_URL
    const rounter = useRouter()
    // console.log(url,"chec kurl")
    const validateSignUpSchema = Yup.object().shape({
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        email: Yup.string().email('Invalid email format'),
        dateOfBirth: Yup.date().required("date Of Birth date is required"),
        cnicNo: Yup.string().length(13, "CNIC value is greater than 13").required("CNIC # is required"),
        contactOne: Yup.string().length(11, "Phone Number Invalid").required("Phone Number required"),
        address: Yup.string(),
        password: Yup.string().min(8, "Password Length is greater than 8").required('Password is required'),
        confirmPassword: Yup.string().min(8, "confirmPassword Length is greater than 8").required('confirmPassword is required').test('password-match', 'Passwords must match', function (value) {
            return value == this.parent.password
        }),
    })
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        cnicNo: "",
        contactOne: "",
        address: "",
        password: '',
        confirmPassword: ''
    };
    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false);
        try {
            const responsne = await axios.post(`${url}/superadmin/create`, values)
            if (responsne.status == "201") {
                toast.success("Register successfully", { autoClose: 1000 })
                rounter.push('/admin_signin')
            }
        } catch (e) {
            console.log("error", e.message);
            toast.error(e.response.data.message[0], { autoClose: 1000 })
        }

    }
    return (
        <section className="bg-gray-50 :bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex flex-col items-center mb-1 m-2 text-xl font-semibold text-gray-900 :text-white"
                >
                    <img
                        className="w-32 h-16 mr-2"
                        src="https://muhammaditransport.com/wp-content/uploads/2023/03/cropped-logo-1.png"
                        alt="logo"
                    />
                     TRANSPORT EASE
                </a>
                <div className="w-full bg-white flex-wrap flex rounded-lg shadow :border md:mt-0  xl:p-0 :bg-gray-800 :border-gray-700">
                    <div className="w-full p-4 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white">
                            Create and account
                        </h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validateSignUpSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="flex flex-wrap justify-between  align-items-center  w-full" action="#">
                                    <div className="lg:max-w-lg w-full mt-2 md:w-[32%]" >
                                        <Textfield name={"firstName"} label={"First Name"} type={"text"} />
                                    </div>
                                    <div className="lg:max-w-lg w-full mt-2 md:w-[32%]" >
                                        <Textfield name={"lastName"} label={"Last Name"} type={"text"} />
                                    </div>
                                    <div className="lg:max-w-lg w-full mt-2 md:w-[32%]" >
                                        <Textfield name={"email"} label={"Email"} type={"email"} />
                                    </div>
                                    <div className="lg:max-w-lg w-full mt-2 md:w-[32%]" >
                                        <Textfield name={"dateOfBirth"} label={"Date Of Birth"} type={"date"} />
                                    </div>
                                    <div className="lg:max-w-lg w-full mt-2 md:w-[32%]">
                                        <Textfield name={"cnicNo"} label={"CNIC No"} type={"text"} />
                                    </div>
                                    <div className="lg:max-w-lg w-full mt-2 md:w-[32%]">
                                        <Textfield name={"contactOne"} label={"Contact"} type={"tel"} />
                                    </div>
                                    <div className="lg:max-w-lg w-full mt-2 md:w-[32%]">
                                        <Textfield name={"address"} label={"Address"} type={"text"} />
                                    </div>
                                    <div className="lg:max-w-lg w-full mt-2 md:w-[32%]">
                                        <Textfield name={"password"} label={"Password"} type={"password"} />
                                    </div>
                                    <div className="lg:max-w-lg w-full mt-2 md:w-[32%]">
                                        <Textfield name={"confirmPassword"} label={"Confirm Password"} type={"password"} />
                                    </div>
                                    <div className=" sm:m-0 sm:ml-auto mt-4 text-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full text-white bg-[#811630] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-primary-600 :hover:bg-primary-700 :focus:ring-primary-800"
                                        >
                                            Create an account
                                        </button>
                                        <p className="text-sm mt-2 font-light text-gray-500 :text-gray-400">
                                            Already have an account?{" "}
                                            <Link
                                                href="/"
                                                className="font-medium text-primary-600 hover:underline :text-primary-500"
                                            >
                                                Login here
                                            </Link>
                                        </p>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>

    )
}