import { ErrorMessage, Field } from "formik";

export default function Textfield ({name , label , type}){
    return(
        <> <label
        htmlFor={name}
        className="block mb-2 text-xs font-sm text-gray-700 :text-white"
      >
        {label}
      </label>
      <Field
        type={type}
        name={name}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
        // placeholder="03*********"
      // required=""
      />
      {/* <ErrorMessage className="text-sm" name="phoneNumber" /> */}
      <ErrorMessage name={name}>
        {errorMsg => <span className="text-red-500 text-xs">{errorMsg}</span>}
      </ErrorMessage>
        </>
    )
}