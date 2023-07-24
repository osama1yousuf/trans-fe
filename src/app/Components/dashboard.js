'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaAlignLeft , FaRegTimesCircle } from "react-icons/fa";
export default function dashboard() {
  const [openTabs, setOpenTabs] = useState([
    {
      name: "Dashboard",
      active: false,

    },
    {
      name: "Driver",
      active: false,
      Content: [
        {
          name: "Active Driver",
          endpoints: '/activedriver'
        },
        {
          name: "InActive Driver",
          endpoints: '/inActivedriver'
        }
      ]
    }, {
      name: "Member",
      active: false,
      Content: [
        {
          name: "Active Member",
          endpoints: '/activemember'
        },
        {
          name: "InActive Member",
          endpoints: '/inActivemember'
        }
      ]
    }
  ])
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [sideBar, setSideBar] = useState(true)

  const handleActive = (e) => {
    for (let i = 0; i < openTabs.length; i++) {
      const element = openTabs[i];
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
  };
const handletoggle = ()=>{
  setSideBar(!sideBar)
}
  return (
    <>
      {/* {console.log("activeTab" , sideBar)} */}
      <div className="2xl:container 2xl:mx-auto">
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
                !sideBar ? <FaRegTimesCircle size={24}/> :<FaAlignLeft size={24} />
              }
              </div>
              {/* <h2 className="font-normal text-2xl leading-6 text-gray-800">OvonRueden</h2> */}
            </div>
          </nav>
        </div>
      </div>
      <aside
        id="sidebar-multi-level-sidebar"
        className={` fixed top-18 left-0 z-40 w-64 h-screen transition-transform ${sideBar ? "-translate-x-full": "translate-x-0"}  `}
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
                      href={'#'}
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
                            <a
                              href="#"
                              className={`flex items-center w-full p-1 text-sm text-black transition ${activeTab == e.name ? "bg-gray-100" : "hover:bg-gray-100"} duration-75 rounded-lg pl-8 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                            >
                              {e.name}
                            </a>
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
      <div className={`p-2 ${sideBar ? "sm:ml-0": "sm:ml-64"}  `}>
        <div className="p-4 border-2 border-gray-200 border-transparent rounded-lg bg-white">
          {/* {props.childern} */}
          {/* <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}