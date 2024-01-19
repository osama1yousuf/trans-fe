'use client'
import { useUserValidator } from "@/interceptor/userValidate"

export default function example(){
  useUserValidator("driver")
  return(
    <div className="w-full">
    Driver Dashboard
    </div>
  )
}