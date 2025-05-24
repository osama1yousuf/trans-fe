// import {  useRouter } from "next/navigation";
// export const userValidator = (type) =>{
//     let router = useRouter()
//    let token = localStorage.getItem('token')
//    if (token) {
//     let userType = localStorage.getItem('userType')
//     if (userType === type) {
//       // console.log('valid user')   
//     }else{
//       router.push(`/${userType}/dashboard`)
//     }
//    }else{
//     router.push("/")
//    }

// }
// userValidator.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useUserValidator = (type) => {
  const router = useRouter();

  // useEffect(() => {
  //   let token = localStorage.getItem('token');
  //   // console.log("token" , token)
  //   if (token) {
  //     let userType = localStorage.getItem('userType');
  //     // console.log("user Type" , userType)
  //     if (userType === type) {
  //       // console.log('valid user');
  //     } else {
  //       if (userType == "superadmin") {
  //           router.push(`/admin/dashboard`);
  //       }else{
  //           router.push(`/${userType}/dashboard`);
  //       }
  //     }
  //   } else {
  //       // console.log("no token")
  //     router.push("/");
  //   }
  // }, [router, type]);
};
