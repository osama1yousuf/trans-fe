"use client";
import { useUserValidator } from "@/interceptor/userValidate";

export default function Example() {
  useUserValidator("driver");
  return <div className="w-full">Driver Dashboard</div>;
}
