// "use client";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import axiosInstance from "@/interceptor/axios_inteceptor";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import Textfield2 from "./TextField2";

// export default function LocationModel({ setShowModal }) {
//   const {
//     register,
//     setFocus,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       location: "",
//     },
//     resolver: yupResolver(
//       Yup.object().shape({
//         location: Yup.string().required("Name required"),
//       })
//     ),
//   });

//   const onSubmit = async (values) => {
//     console.log("work");
//     console.log("va", values);
//     try {
//       let response = await axiosInstance.post("/locations", values);
//       toast.success("locationName added sucessfully");
//       setShowModal(false);
//     } catch (e) {
//       console.log(e.message);
//       toast.error(e.message);
//     }
//   };
//   return (
//     <>
//       <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//         <div className="relative w-auto my-6 mx-auto max-w-3xl">
//           {/*content*/}
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
//           >
//             {/*header*/}
//             <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//               <h3 className="text-3xl font-semibold">Add location</h3>
//               <button
//                 className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                 onClick={() => setShowModal(false)}
//               >
//                 <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                   ×
//                 </span>
//               </button>
//             </div>
//             {/*body*/}
//             <div className="relative p-6 flex-auto">
//               <Textfield2
//                 error={errors.location}
//                 label={"Name"}
//                 name={"location"}
//                 register={register}
//                 type={"text"}
//                 setFocus={setFocus}
//               />
//             </div>
//             {/*footer*/}
//             <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//               <button
//                 className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                 type="button"
//                 onClick={() => setShowModal(false)}
//               >
//                 Close
//               </button>
//               <button
//                 className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                 type="submit"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//     </>
//   );
// }

"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FaAlignLeft } from "react-icons/fa"
import { useWindowSize } from "@uidotdev/usehooks"
import { toast } from "react-toastify"
import axiosInstance from "@/interceptor/axios_inteceptor"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"



export default function Dashboard({ children }) {
  const size = useWindowSize()
  const router = useRouter()
  const pathname = usePathname()

  const [openTabs, setOpenTabs] = useState([])
  const [locationName, setLocationName] = useState("")
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)

  const adminTab = [
    { name: "Dashboard", url: "dashboard", active: false },
    {
      name: "Driver",
      url: "driver",
      active: false,
      Content: [
        { name: "Create Driver", endpoints: "admin/createdriver" },
        { name: "Active Driver", endpoints: "admin/activedriver" },
        { name: "InActive Driver", endpoints: "admin/inactivedriver" },
        { name: "Attendance", endpoints: "admin/attendance" },
      ],
    },
    // { name: "Location", url: "admin/location", active: false },
  ]

  const memberTab= [
    { name: "Dashboard", url: "member/dashboard", active: false },
  ]

  const driverTab = [
    { name: "Dashboard", url: "dashboard", active: false },
    { name: "Attendance", url: "driver/attendance", active: false },
  ]

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      const userType = localStorage.getItem("userType")
      let initialTabs = []

      switch (userType) {
        case "DRIVER":
          initialTabs = driverTab
          break
        case "CUSTOMER":
          initialTabs = memberTab
          break
        case "SUPERADMIN":
          initialTabs = adminTab
          break
        default:
          localStorage.clear()
          router.push("/")
      }

      setOpenTabs(initialTabs)
    }
  }, [pathname])

  const handleActive = (tabName) => {
    setActiveTab(tabName)
    setSidebarOpen(false)
  }

 
  const handleTabClick = (tab) => {
    if (tab.name !== "Location") {
      setOpenTabs((prevTabs) =>
        prevTabs.map((t) =>
          t.name === tab.name ? { ...t, active: !t.active } : t
        )
      )
      if (!tab.Content) {
        setActiveTab(tab.name)
        setSidebarOpen(false)
      }
    } else {
      setShowLocationModal(true)
    }
  }

  const isAuthPage =
    pathname === "/" ||
    pathname === "/signUp" ||
    pathname === "/member_signin" ||
    pathname === "/driver_signin" ||
    pathname === "/admin_signin"

  if (isAuthPage) {
    return <div className="bg-background">{children}</div>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-4">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            <nav className="space-y-2 px-2">
              {openTabs.map((tab, index) => (
                <div key={index}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab.name}
                    {tab.Content && (
                      <svg
                        className="w-4 h-4 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Button>
                  {tab.Content && tab.active && (
                    <div className="ml-4 mt-2 space-y-1">
                      {tab.Content.map((subItem, subIndex) => (
                        <Button
                          key={subIndex}
                          variant="ghost"
                          className="w-full justify-start pl-4"
                          onClick={() => handleActive(subItem.name)}
                          asChild
                        >
                          <Link href={`/${subItem.endpoints}`}>
                            {subItem.name}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-4 py-2 bg-white border-b">
          <div className="flex items-center space-x-4">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <FaAlignLeft />
              </Button>
            </SheetTrigger>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <h1 className="text-xl font-bold">Transport Ease</h1>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold">
                  J
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/setting")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  localStorage.clear()
                  router.push("/")
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children}
        </main>
      </div>

    
    </div>
  )
}