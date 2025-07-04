"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../assets/logo.png";
import LocationModel from "./LocationModal";
import Header from "./Header";
import { ResetPasswordForm } from "./ResetPasswordForm";
import ChatButton from "./ChatButton";
import { twMerge } from "tailwind-merge";

export default function Dashboard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [expandedItems, setExpandedItems] = useState({});
  const [hasPasswordChange, setHasPasswordChange] = useState();
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
      url: "admin/driver",
      type: "SUPERADMIN",
      active: false,
    },
    {
      name: "Dashboard",
      url: "dashboard",
      type: "CUSTOMER",
      active: false,
    },
    {
      name: "Fees",
      url: "member/fees",
      type: "CUSTOMER",
      active: false,
    },
    {
      name: "Attendance",
      url: "admin/attendance",
      type: "SUPERADMIN",
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
      url: "admin/member",
      type: "SUPERADMIN",
      active: false,
      Content: [
        {
          name: "List",
          endpoints: "admin/member",
          // active: false,
        },
        {
          name: "Challan",
          endpoints: "admin/challan",
          // active: false,
        },
        {
          name: "Collection",
          endpoints: "admin/collection",
          // active: false,
        },
        // {
        //   name: "Payment",
        //   endpoints: "admin/payment",
        //   // active: false,
        // },
      ],
    },
    {
      name: "Locations",
      url: "admin/location",
      type: "SUPERADMIN",
      active: false,
    },
    // {
    //   name: "Financial",
    //   url: "financial",
    //   type: "SUPERADMIN",
    //   active: false,
    //   Content: [
    //     {
    //       name: "Member Challan",
    //       endpoints: "admin/challan",
    //       // active: false,
    //     },
    //     {
    //       name: "Member Collection",
    //       endpoints: "admin/collection",
    //       // active: false,
    //     },
    //     // {
    //     //   name: "Payment",
    //     //   endpoints: "admin/payment",
    //     //   // active: false,
    //     // },
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
    setHasPasswordChange(
      JSON.parse(localStorage.getItem("user"))?.hasPasswordChange
    );
    setActiveUserType(localStorage.getItem("userType"));
  }, [pathname]);

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {hasPasswordChange && pathname !== "/" && (
        <>
          {showModal && <LocationModel setShowModal={setShowModal} />}
          {pathname !== "/chat" && <ChatButton />}
          <div className="flex h-screen">
            {/* Sidebar */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={toggleSidebar}
              ></div>
            )}
            <div
              className={`${isSidebarOpen
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
                          className={`flex items-center w-full p-2 text-base font-medium text-gray-900 rounded-lg transition-colors duration-150 ease-in-out ${pathname === `/${item.url}` &&
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
                                  className={`flex items-center w-full p-2 text-sm font-medium text-gray-700 transition-colors duration-150 ease-in-out rounded-md pl-11 ${pathname === `/${subItem.endpoints}` &&
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
              <main className={twMerge("flex-1 h-fit top-[12vh] overflow-auto bg-gray-100 px-2",
                !pathname.includes('chat') && 'pt-4 mb-4'
              )}>
                <div className="h-full">{children}</div>
              </main>
            </div>
          </div>
        </>
      )}
      {pathname === "/" && (
        <main className="flex-1 overflow-auto bg-gray-100 p-4">{children}</main>
      )}
      {!hasPasswordChange &&
        hasPasswordChange !== undefined &&
        pathname !== "/" && (
          <main className="h-full my-auto">
            <ResetPasswordForm
              isIntialChange={true}
              setHasPasswordChange={setHasPasswordChange}
            />
          </main>
        )}
    </div>
  );
}
