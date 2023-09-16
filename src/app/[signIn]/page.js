'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Textfield from "../Components/Textfield";
export default function SignIn() {
  let url = process.env.BASE_URL
  const pathname =usePathname()
  const router = useRouter()

  const [userType , setUserType] = useState('')

  useEffect(()=>{
    if (pathname == "/member_signin") {
      setUserType('member');
    }else if (pathname == "/admin_signin") {
      setUserType('superadmin');
    }else if (pathname == "/driver_signin") {
      setUserType('driver');
    }
  },[])

  const validateLoginSchema = Yup.object().shape({
    contactOne: Yup.string().length(11, "Phone Number Invalid").required("Phone Number required"),
    password: Yup.string().min(8, "Password Length is greater than 8").required('Password is required'),
  })
  const initialValues = {
    contactOne: '',
    password: '',
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log(values);
    try{
    const responsne = await axios.post(`${url}/${userType}/login` , values)
    console.log(responsne);
    if (responsne.status == 201) {
       localStorage.setItem('token' , responsne.data.token)
       toast.success("Login successfully" , { autoClose : 1000 })
       if (userType == 'superadmin') {
         router.push('/admin/dashboard')
       }else if (userType == 'member') {
        router.push('/member/dashboard')
       }else if (userType == 'driver') {
        router.push('/driver/dashboard')
       }
    }
    }catch(e){
        console.log("error" , e);
        toast.error(e.message, { autoClose : 1000 })
    }
  }
  return (
     <section className="bg-gray-50 min-h-screen dark:bg-gray-900">
      {console.log(userType)}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex flex-col items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-32 h-16 mr-2"
            src="https://muhammaditransport.com/wp-content/uploads/2023/03/cropped-logo-1.png"
            alt="logo"
          />
          MUHAMMADI TRANSPORT
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validateLoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 md:space-y-6" >
                  <div>
                    <Textfield name={"contactOne"} label={"Contact"} type={"text"}  />   
                  </div>
                  <div>
                    <Textfield name={"password"} label={"Password"} type={"password"} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    {/* <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a> */}
                  </div>
                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full text-white bg-[#811630] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                { 
                  pathname.includes('/admin') &&
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      href='/signUp'
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                  }
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}