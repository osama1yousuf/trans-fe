'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaAlignLeft, FaRegTimesCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Textfield from "./Textfield";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { toast } from "react-toastify";
export default function Dashboard({ children , sideBarValue }) {

  
  const pathname = usePathname()
  const [openTabs, setOpenTabs] = useState(sideBarValue)
  const [showModal, setShowModal] = React.useState(false);
  const [locationName, setLocationName] = React.useState('');
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [sideBar, setSideBar] = useState(true)

  const handleActive = (e) => {
    for (let i = 0; i < openTabs.length; i++) {
      const element = openTabs[i];
      // console.log("element");
      if (element.Content) {
        // console.log("element" , element.Content);
        let found = element.Content.find((val) => val.name === e)
        if (found) {
          console.log("found", found.name);
          setActiveTab(e)
        }
      }
    }
  }
  const handleClick = (e) => {
    console.log(e);
    if (e.name == "Location") {
      setShowModal(!showModal)
    }else{
      let result = openTabs.find((v) => v.name == e.name)
      if (result && !e.Content) {
        setActiveTab(e.name)
      }
      setOpenTabs(prevTabs => {
        const updatedTabs = prevTabs.map(tab => {
          if (tab.name === e.name) {
            return {
              ...tab,
              active: !tab.active
            };
          }
          return tab;
        });
  
        return updatedTabs;
      });
    }
  };
  const handletoggle = () => {
    setSideBar(!sideBar)
  }
  useEffect(()=>{
   
  },[])

  const handleLocation = async ()=>{
    console.log("object" , locationName);
    if(locationName != ''){
      try{
        let body = {
          location : locationName
        }
       let response = await  axiosInstance.post('/locations' , body)
       toast.success("Location added sucessfully")
       setLocationName('')
       setShowModal(false)
      }catch(e){
        console.log(e.message);
        toast.error(e.message)
      }
    }else{
      setShowModal(false)
    }
  }
  return (
    <>
      {pathname !== '/' && pathname !== '/signUp' && pathname !== '/member_signin' && pathname !== '/driver_signin' && pathname !== '/admin_signin' ? <>

 
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Location
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <label  className="block mb-2 text-xs font-sm text-gray-700 dark:text-white" for="">Name</label>
               <input type="text" value={locationName} onChange={(e)=> setLocationName(e.target.value)}    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Location" />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleLocation}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
 
        <div className="sticky top-0 z-40 left-0 2xl:container 2xl:mx-auto">
          <div className="bg-white rounded shadow-lg py-4 px-6">
            <nav className="flex justify-between">
              <div className="flex items-center space-x-3 lg:pr-16 pr-6">


                <img
                  className="w-36 h-14 mr-2"
                  src="https://muhammaditransport.com/wp-content/uploads/2023/03/cropped-logo-1.png"
                  alt="logo"
                />
                <div onClick={handletoggle} className="p-4 cursor-pointer">
                  {
                    !sideBar ? <FaRegTimesCircle size={24} /> : <FaAlignLeft size={24} />
                  }
                </div>
                {/* <h2 className="font-normal text-2xl leading-6 text-gray-800">OvonRueden</h2> */}
              </div>
            </nav>
          </div>
        </div>
        <aside
          id="sidebar-multi-level-sidebar"
          className={`fixed top-18 left-0 z-40 w-64 h-screen transition-transform ${sideBar ? "-translate-x-full" : "translate-x-0"}  `}
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">

            {/* <img
          className="w-26 h-12 mr-2"
          src="https://muhammaditransport.com/wp-content/uploads/2023/03/cropped-logo-1.png"
          alt="logo"
        /> */}
            <ul className="space-y-2 pt-4 font-medium">
              {
                openTabs.map((val, index) => {
                  return (
                    <li>
                      <Link
                        href={`${!val.Content && val.name != "Location" ? `/${val.url}` : ''}`}
                        onClick={(e) => handleClick(val)}
                        key={index}
                        type="button"
                        className={`flex items-center w-full p-1 text-sm ${activeTab == val.name ? "bg-gray-100" : "hover:bg-gray-100"}  text-black transition duration-75 rounded-lg group  dark:text-black dark:hover:bg-gray-700`}
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 21"
                        >
                          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          {val.name}
                        </span>
                        {
                          val.Content &&
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        }
                      </Link>
                      {val.Content && <ul id="dropdown-example" className={`${val.active ? `py-1 space-y-1` : "hidden py-1 space-y-1"}`}>
                        {val.Content && val.Content.map((e, i) => {
                          return (
                            <li key={i} onClick={(v) => handleActive(e.name)}>
                              <Link
                                href={`${`/${e.endpoints}`}`}
                                className={`flex items-center w-full p-1 text-sm text-black transition ${activeTab == e.name ? "bg-gray-100" : "hover:bg-gray-100"} duration-75 rounded-lg pl-8 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                              >
                                {e.name}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>}

                    </li>
                  )
                })
              }

            </ul>
          </div>
        </aside>
      </> : null}
      {pathname !== '/' && pathname !== '/signUp' && pathname !== '/member_signin' && pathname !== '/driver_signin' && pathname !== '/admin_signin' ?
        <div className={`p-2 ${sideBar ? "sm:ml-0" : "sm:ml-64"}  `}>
          <div className="p-4 border-2 border-gray-200 border-transparent rounded-lg bg-white">
            {children}
          </div>
        </div>
        :
        <div className="border-gray-200  bg-white">
          {children}
        </div>
      }
      {/* <div className={`p-2 ${sideBar ? "sm:ml-0": "sm:ml-64"}  `}>
        <div className="p-4 border-2 border-gray-200 border-transparent rounded-lg bg-white">
          {children}
        </div>
      </div> */}
    </>
  )
}