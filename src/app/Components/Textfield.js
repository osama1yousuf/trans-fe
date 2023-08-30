import { ErrorMessage, Field } from "formik";

export default function Textfield ({name , label , type}){
    return(
        <> <label
        htmlFor={name}
        className="block mb-2 text-xs font-sm text-gray-700 dark:text-white"
      >
        {label}
      </label>
      <Field
        type={type}
        name={name}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="03*********"
      // required=""
      />
      {/* <ErrorMessage className="text-sm" name="phoneNumber" /> */}
      <ErrorMessage name={name}>
        {errorMsg => <span className="text-red-500 text-xs">{errorMsg}</span>}
      </ErrorMessage>
        </>
    )
}