'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup';
export default function SignIn() {
  const pathname =usePathname()
  const router = useRouter()


  const validateLoginSchema = Yup.object().shape({
    phoneNumber: Yup.string().length(11, "Phone Number Invalid").required("Phone Number required"),
    password: Yup.string().min(8, "Password Length is greater than 8").required('Password is required'),
  })
  const initialValues = {
    phoneNumber: '',
    password: '',
  };
  const handleSubmit = (values, { setSubmitting }) => {
    // setTimeout(() => {
      // alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      router.push("/dashboard")
    // }, 400);
  }
  return (
    (
      pathname === "/Driver-Portal-SignIn" || pathname === "/Member-Portal-SignIn" || "/Admin-Portal-SignIn") ?
     ( <section className="bg-gray-50 dark:bg-gray-900">
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
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Phone Number
                    </label>
                    <Field
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="03*********"
                    // required=""
                    />
                    {/* <ErrorMessage className="text-sm" name="phoneNumber" /> */}
                    <ErrorMessage name="phoneNumber">
                      {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                    </ErrorMessage>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // required=""
                    />
                    <ErrorMessage name="password">
                      {errorMsg => <span className="text-red-500 text-sm">{errorMsg}</span>}
                    </ErrorMessage>
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
                    className="w-full text-white bg-red-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      href='/signUp'
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>) : null
  )
}