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
export default function Dashboard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const profileRef = useRef(null);

  const [expandedItems, setExpandedItems] = useState({});
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openTabs, setOpenTabs] = useState([]);
  const [activeUserType, setActiveUserType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

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

  // Close profile setting modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /// use to set user and userType
  useEffect(() => {
    console.log("User", localStorage.getItem("user"));

    setUser(JSON.parse(localStorage.getItem("user")));
    setActiveUserType(localStorage.getItem("userType"));
  }, []);
  console.log("pathname", pathname);
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
              <header className="bg-white flex items-center sticky top-0 h-[12vh] border-b-2 p-4 z-30">
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
                    <h2 className="text-lg font-semibold">Transport Ease</h2>
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      className="p-1"
                      onClick={() => setProfileModal(!profileModal)}
                    >
                      <Avatar className="h-10 w-10 sm:h-14 sm:w-14">
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
                      <div
                        ref={profileRef}
                        className="absolute right-0 mt-2 mr-2 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
                      >
                        <div className="p-4 bg-[#811630] text-white">
                          <div className="flex items-center space-x-4">
                            <div className="relative h-10 w-10 sm:h-14 sm:w-14 rounded-full overflow-hidden">
                              {user?.image ? (
                                <Image
                                  src={user?.image}
                                  alt={userName}
                                  layout="fill"
                                  objectFit="cover"
                                />
                              ) : (
                                <Avatar className="h-10 w-10 sm:h-14 sm:w-14">
                                  <AvatarImage
                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.firstName}%20${user?.lastName}`}
                                    alt={`${user?.firstName} ${user?.lastName}`}
                                  />
                                  <AvatarFallback>
                                    {user?.firstName?.charAt(0).toUpperCase()}
                                    {user?.lastName?.charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{user?.firstName}</p>
                              <p className="text-sm opacity-75">
                                {user?.contactOne}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <button
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setProfileModal(!profileModal);
                              router.push("/setting");
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            Settings
                          </button>
                          <button
                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            onClick={() => {
                              localStorage.clear();
                              setProfileModal(!profileModal);
                              router.push("/");
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </header>

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
