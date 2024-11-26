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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
  const [sideBar, setSideBar] = useState(false);
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
    <div className="flex h-screen flex-col bg-gray-100">
      {pathname !== "/" && pathname !== "/signUp" && (
        <>
          {showModal && <LocationModel setShowModal={setShowModal} />}

          <header className="bg-white flex items-center sticky top-0 h-[12vh] border-b-2 p-4">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={toggleSidebar}
                >
                  {isSidebarOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
                <Link href="/dashboard">
                  <Image
                    className="hidden sm:block"
                    width={90}
                    height={90}
                    src={logo}
                    alt="logo"
                  />
                </Link>
              </div>

              <div className="relative">
                <Button
                  variant="ghost"
                  className="p-1"
                  onClick={() => setProfileModal(!profileModal)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.firstName}%20${user?.lastName}`}
                      alt={`${user?.firstName} ${user?.lastName}`}
                    />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0).toUpperCase()}
                      {user?.lastName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>

                {profileModal && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <Button
                        variant="ghost"
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setProfileModal(false);
                          router.push("/setting");
                        }}
                      >
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          localStorage.clear();
                          setProfileModal(false);
                          router.push("/");
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
          <div className="flex w-full">
            <div
              className={`
            ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-auto"}
            lg:translate-x-0 transition-transform duration-300 ease-in-out
            sticky h-[88vh] lg:static inset-y-0 left-0 z-10 shadow-lg overflow-y-auto
          `}
            >
              <aside
                className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed top-[64px] left-0 z-40 h-[calc(100vh-64px)] w-64 
          transform overflow-y-auto bg-white shadow-lg transition-transform duration-300 
          lg:static lg:top-0 lg:h-screen lg:translate-x-0
        `}
              >
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Transport Ease</h2>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {openTabs?.map((item, index) => (
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
              </aside>
            </div>
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
              <div className="container mx-auto">{children}</div>
            </main>
          </div>
        </>
      )}
      {pathname === "/" && (
        <main className="flex-1  bg-gray-100 overflow-auto p-6">
          {children}
        </main>
      )}
    </div>
  );
}
