"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../assets/logo.png";
import LocationModel from "./LocationModal";
import Header from "./Header";
export default function Dashboard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [expandedItems, setExpandedItems] = useState({});
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openTabs, setOpenTabs] = useState([]);
  const [activeUserType, setActiveUserType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleExpand = (name) => {
    setExpandedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  let sideBarOption = [
    {
      name: "Dashboard",
      url: "dashboard",
      type: "SUPERADMIN",
      active: false,
    },
    {
      name: "Driver",
      url: "driver",
      type: "SUPERADMIN",
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
    {
      name: "Dashboard",
      url: "member/dashboard",
      type: "CUSTOMER",
      active: false,
    },
    {
      name: "Dashboard",
      url: "dashboard",
      type: "DRIVER",
      active: false,
    },
    {
      name: "Attendance",
      url: "driver/attendance",
      type: "DRIVER",
      active: false,
    },
    {
      name: "Profile Setting",
      url: "setting",
      active: false,
    },
    {
      name: "Member",
      url: "member",
      type: "SUPERADMIN",
      active: false,
      Content: [
        {
          name: "Create Member",
          endpoints: "admin/createmember",
        },
        {
          name: "Active Member",
          endpoints: "admin/activemember",
        },
        {
          name: "InActive Member",
          endpoints: "admin/inactivemember",
        },
      ],
    },
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
  /// for setting currentUserTypeSideBarOption
  useEffect(() => {
    if (localStorage.getItem("token")) {
      let userType = localStorage.getItem("userType");
      if (userType) {
        let filterCurrentOpt = sideBarOption.filter((e) => e.type === userType);
        setOpenTabs(filterCurrentOpt || []);
      } else {
        localStorage.clear();
        router.push("/");
      }
    } else {
      localStorage.clear();
      router.push("/");
    }
  }, [pathname]);

  /// check window resize screen
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

  /// use to set user and userType
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setActiveUserType(localStorage.getItem("userType"));
  }, []);
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {pathname !== "/" && pathname !== "/signUp" && (
        <>
          {showModal && <LocationModel setShowModal={setShowModal} />}

          <div className="flex h-screen">
            {/* Sidebar */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={toggleSidebar}
              ></div>
            )}
            <div
              className={`${
                isSidebarOpen
                  ? "translate-x-0 w-64"
                  : "-translate-x-full w-auto"
              } fixed lg:static inset-y-0 left-0 z-50 bg-white shadow-lg lg:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
              <aside className="h-full overflow-y-auto">
                <div className="p-4">
                  <Link href="/dashboard">
                    <Image width={90} height={90} src={logo} alt="logo" />
                  </Link>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {openTabs?.map((item, index) => (
                      <div key={index} className="mb-2">
                        <Link
                          href={!item.Content ? `/${item.url}` : "#"}
                          onClick={() => {
                            if (item.Content) toggleExpand(item.name);
                            if (isMobile && !item.Content) toggleSidebar();
                          }}
                          className={`flex items-center w-full p-2 text-base font-medium text-gray-900 rounded-lg transition-colors duration-150 ease-in-out ${
                            pathname === `/${item.url}` &&
                            item.type === activeUserType
                              ? "bg-gray-100 text-gray-600"
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
                                  onClick={() => {
                                    if (isMobile) toggleSidebar();
                                  }}
                                  className={`flex items-center w-full p-2 text-sm font-medium text-gray-700 transition-colors duration-150 ease-in-out rounded-md pl-11 ${
                                    pathname === `/${subItem.endpoints}` &&
                                    item.type === activeUserType
                                      ? "bg-gray-100 text-gray-600"
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
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <Header
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isSidebarOpen={isSidebarOpen}
              />

              {/* Main content */}
              <main className="flex-1 h-fit top-[12vh] overflow-auto bg-gray-100 px-2 pt-4 pb-12">
                <div className="">{children}</div>
              </main>
            </div>
          </div>
        </>
      )}
      {pathname === "/" && (
        <main className="flex-1 overflow-auto bg-gray-100 p-4">{children}</main>
      )}
    </div>
  );
}
