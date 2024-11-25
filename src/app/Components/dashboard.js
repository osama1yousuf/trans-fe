"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@uidotdev/usehooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../assets/logo.png";
import LocationModel from "./LocationModal";
export default function Dashboard({ children }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1000;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const profileSetting = () => {
    setProfileModal(!profileModal);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen flex-col bg-gray-100 text-gray-900">
      {pathname !== "/" && pathname !== "/signUp" ? (
        <>
          {showModal ? <LocationModel setShowModal={setShowModal} /> : null}

          <header className="flex items-center justify-between bg-blue-600 p-4 text-white">
            <nav className="flex justify-between p-2">
              <div className="flex items-center space-x-3 lg:pr-16 pr-6">
                <Image
                  className="sm:block hidden mr-3"
                  width={90}
                  height={90}
                  src={logo}
                  alt="logo"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white hover:bg-blue-700"
                  onClick={toggleSidebar}
                  aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                >
                  {isSidebarOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
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
          </header>
          <div className="flex flex-1 overflow-hidden">
            <div
              className={`
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 transition-transform duration-300 ease-in-out
            fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg overflow-y-auto
          `}
            >
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Transport Ease</h2>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
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
                </ul>
              </nav>
            </div>
          </div>
        </>
      ) : null}
      {pathname !== "/" ? (
        <div
          className={`p-1 ${
            sideBar
              ? "sm:ml-0"
              : pathname === "/dashboard" || pathname === "/dashboard"
              ? "sm:ml-0"
              : "sm:ml-64"
          }`}
        >
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto p-6">{children}</div>
      )}
    </div>
  );
}
