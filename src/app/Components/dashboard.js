"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaAlignLeft, FaRegTimesCircle } from "react-icons/fa";
import { useWindowSize } from "@uidotdev/usehooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import axiosInstance from "@/interceptor/axios_inteceptor";
import Image from "next/image";
import logo from "../../assets/logo.png";
import Loader from "./Loader";
import LocationModel from "./LocationModal";
export default function Dashboard({ children }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [user, setUser] = useState(null);
  const toggleExpand = (name) => {
    setExpandedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const size = useWindowSize();
  const router = useRouter();
  let adminTab = [
    {
      name: "Dashboard",
      url: "dashboard",
      active: false,
    },
    {
      name: "Driver",
      url: "driver",
      active: false,
      Content: [
        {
          name: "Create Driver",
          endpoints: "admin/createdriver",
        },
        {
          name: "Active Driver",
          endpoints: "admin/activedriver",
        },
        {
          name: "InActive Driver",
          endpoints: "admin/inactivedriver",
        },
        {
          name: "Attendance",
          endpoints: "admin/attendance",
        },
      ],
    },
    // {
    //   name: "Member",
    //   url: "member",
    //   active: false,
    //   Content: [
    //     {
    //       name: "Create Member",
    //       endpoints: "admin/createmember",
    //     },
    //     {
    //       name: "Active Member",
    //       endpoints: "admin/activemember",
    //     },
    //     {
    //       name: "InActive Member",
    //       endpoints: "admin/inactivemember",
    //     },
    //   ],
    // },
    // {
    //   name: "Location",
    //   url: "admin/location",
    //   active: false,
    // },
    // {
    //   name: "Financial",
    //   url: "financial",
    //   active: false,
    //   Content: [
    //     {
    //       name: "Challan / PaySlip",
    //       endpoints: "admin/challan",
    //       // active: false,
    //     },
    //     {
    //       name: "Collection",
    //       endpoints: "admin/collection",
    //       // active: false,
    //     },
    //     {
    //       name: "Payment",
    //       endpoints: "admin/payment",
    //       // active: false,
    //     },
    //   ],
    // },
  ];
  let memberTab = [
    {
      name: "Dashboard",
      url: "member/dashboard",
      active: false,
    },
  ];
  let driverTab = [
    {
      name: "Dashboard",
      url: "dashboard",
      active: false,
    },
    {
      name: "Attendance",
      url: "driver/attendance",
      active: false,
    },
  ];
  const pathname = usePathname();
  const [openTabs, setOpenTabs] = useState([]);

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sideBar, setSideBar] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const handleActive = (e) => {
    for (let i = 0; i < openTabs.length; i++) {
      const element = openTabs[i];
      // console.log("element");
      if (element.Content) {
        // console.log("element" , element.Content);
        let found = element.Content.find((val) => val.name === e);
        if (found) {
          console.log("found", found.name);
          setActiveTab(e);
          setSideBar(!sideBar);
        }
      }
    }
  };

  const handletoggle = () => {
    setSideBar(!sideBar);
  };

  const handleClick = (e) => {
    console.log(e);
    if (e.name !== "Location") {
      let result = openTabs.find((v) => v.name == e.name);
      if (result && !e.Content) {
        setActiveTab(e.name);
        setSideBar(!sideBar);
      }
      setOpenTabs((prevTabs) => {
        const updatedTabs = prevTabs.map((tab) => {
          if (tab.name === e.name) {
            return {
              ...tab,
              active: !tab.active,
            };
          }
          return tab;
        });

        return updatedTabs;
      });
    } else {
      setShowModal(!showModal);
    }
  };
  useEffect(() => {
    let initialTabs = [];
    if (localStorage.getItem("token")) {
      let userType = localStorage.getItem("userType");
      if (userType == "DRIVER") {
        initialTabs = driverTab;
      } else if (userType == "CUSTOMER") {
        initialTabs = memberTab;
      } else if (userType == "SUPERADMIN") {
        initialTabs = adminTab;
      } else {
        localStorage.clear();
        router.push("/");
      }
      setOpenTabs(initialTabs || []);
    }
  }, [pathname]);
  const profileSetting = () => {
    setProfileModal(!profileModal);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <>
      {pathname !== "/" && pathname !== "/signUp" ? (
        <>
          {showModal ? <LocationModel setShowModal={setShowModal} /> : null}
          <div className="sticky top-0 z-40 left-0 w-full">
            <div className="bg-white rounded shadow-lg">
              <nav className="flex justify-between p-2">
                <div className="flex items-center space-x-3 lg:pr-16 pr-6">
                  <Image
                    className="sm:block hidden mr-3"
                    width={90}
                    height={90}
                    src={logo}
                    alt="logo"
                  />

                  <div onClick={handletoggle} className="p-4 cursor-pointer">
                    {!sideBar ? (
                      <FaRegTimesCircle size={24} />
                    ) : (
                      <FaAlignLeft size={24} />
                    )}
                  </div>
                  <div>
                    <h1 className="text-xl font-extrabold">Transport Ease</h1>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={profileSetting}
                    className="relative inline-flex mt-1 justify-end  cursor-pointer "
                  >
                    <Avatar className="w-14 h-14">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.firstName}%20${user?.lastName}`}
                        alt={`${user?.firstName} ${user?.lastName}`}
                      />
                      <AvatarFallback>
                        {user?.firstName.charAt(0).toUpperCase()}
                        {user?.lastName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>

                  {profileModal && (
                    <div className="right-0 mt-0 w-fit px-10 absolute bg-gray-100 rounded shadow-lg z-50">
                      <ul className="py-2">
                        <li
                          onClick={() => {
                            setProfileModal(false);
                            router.push("/setting");
                          }}
                          className="block px-3 py-1 text-gray-900 cursor-pointer hover:bg-gray-200"
                        >
                          Settings
                        </li>
                        <li
                          onClick={() => {
                            localStorage.clear();
                            setProfileModal(false);
                            router.push("/");
                          }}
                          className="block px-3 py-1 text-gray-900 cursor-pointer hover:bg-gray-200"
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>

          {/* <aside
            id="sidebar-multi-level-sidebar"
            className={`fixed top-18 left-0 z-40 w-fit h-screen transition-transform ${
              sideBar ? "-translate-x-full" : "translate-x-0"
            }  `}
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-white">
              <ul className="space-y-2 pt-4 font-medium">
                {openTabs &&
                  openTabs.map((val, index) => {
                    return (
                      <li key={index}>
                        <Link
                          href={
                            !val.Content && val.name !== "Location"
                              ? `/${val.url}`
                              : ""
                          }
                          onClick={(e) => handleClick(val)}
                          key={index}
                          type="button"
                          className={`flex items-start w-full p-1 text-sm ${
                            activeTab == val.name
                              ? "bg-gray-100"
                              : "hover-bg-gray-100"
                          } text-black transition duration-75 px-10 py-4 rounded-lg group  :text-black :hover:bg-gray-700`}
                        >
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 :text-gray-400 :group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 21"
                          >
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                          </svg>
                          <span className="flex-1 ml-3 text-md text-left whitespace-nowrap">
                            {val.name}
                          </span>
                          {val.Content && (
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
                          )}
                        </Link>
                        {val.Content && (
                          <ul
                            id="dropdown-example"
                            className={`${
                              val.active
                                ? `py-1 space-y-1`
                                : "hidden py-1 space-y-1"
                            }`}
                          >
                            {val.Content &&
                              val.Content.map((e, i) => {
                                return (
                                  <li
                                    key={i}
                                    onClick={(v) => handleActive(e.name)}
                                  >
                                    <Link
                                      href={`${`/${e.endpoints}`}`}
                                      className={`flex items-center w-full p-1 text-sm text-black transition ${
                                        activeTab == e.name
                                          ? "bg-gray-100"
                                          : "hover:bg-gray-100"
                                      } duration-75 rounded-lg pl-8 group hover:bg-gray-100 :text-white :hover:bg-gray-700`}
                                    >
                                      {e.name}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </aside> */}
          <aside
            className={`fixed top-18 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
              sideBar ? "-translate-x-full" : "translate-x-0"
            } bg-white shadow-lg`}
          >
            <div className="h-full px-3 py-4 overflow-y-auto">
              <nav className="space-y-1">
                {openTabs &&
                  openTabs.map((item, index) => (
                    <div key={index} className="mb-2">
                      <Link
                        href={
                          !item.Content && item.name !== "Location"
                            ? `/${item.url}`
                            : "#"
                        }
                        onClick={() => {
                          handleClick(item);
                          if (item.Content) toggleExpand(item.name);
                        }}
                        className={`flex items-center w-full p-2 text-base font-medium text-gray-900 rounded-lg transition-colors duration-150 ease-in-out ${
                          activeTab === item.name
                            ? "bg-gray-100 text-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center justify-center w-8 h-8 text-lg text-gray-400">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                          </svg>
                        </span>
                        <span className="ml-3 flex-1">{item.name}</span>
                        {item.Content &&
                          (expandedItems[item.name] ? (
                            <ChevronDownIcon className="w-5 h-5" />
                          ) : (
                            <ChevronRightIcon className="w-5 h-5" />
                          ))}
                      </Link>
                      {item.Content && expandedItems[item.name] && (
                        <ul className="mt-2 space-y-1">
                          {item.Content.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={`/${subItem.endpoints}`}
                                onClick={() => handleActive(subItem.name)}
                                className={`flex items-center w-full p-2 text-sm font-medium text-gray-700 transition-colors duration-150 ease-in-out rounded-md pl-11 ${
                                  activeTab === subItem.name
                                    ? "bg-gray-100 text-blue-600"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </nav>
            </div>
          </aside>
        </>
      ) : null}
      {pathname !== "/" && pathname !== "/signUp" ? (
        <div
          className={`p-1 ${
            sideBar
              ? "sm:ml-0"
              : pathname === "/dashboard" || pathname === "/dashboard"
              ? "sm:ml-0"
              : "sm:ml-64"
          }`}
        >
          <div className=" border-transparent rounded-md min-h-[84vh] bg-white w-full">
            {children}
          </div>
        </div>
      ) : (
        <div className="border-gray-200  bg-white">{children}</div>
      )}
    </>
  );
}
