import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { requestForToken } from "@/config/firebase";
const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const router = useRouter();

  let url = process.env.BASE_URL;

  const [user, setUser] = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const profileRef = useRef(null);

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
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleLogout = async () => {
    const fcmToken = await requestForToken();
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = localStorage.getItem("userType");
    const response = await axios.post(`${url}/api/logout`, {
      _id: user?._id,
      userType: userType,
      fcmToken: fcmToken
    });
    localStorage.clear();
    setProfileModal(!profileModal);
    router.push("/");
  }

  return (
    <header className="bg-white flex items-center sticky top-0 h-[8vh] border-b-2 px-4 z-30">
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
          <div>
            <h2 className="text-lg font-semibold">Transport Ease</h2>
            {/* <h6 className="text-xs font-semibold">Transport Ease</h6> */}
          </div>
        </div>

        <div>
          <Button
            variant="ghost"
            className="p-1"
            onClick={() => setProfileModal(!profileModal)}
          >
            <Avatar className="md:h-10 md:w-10 sm:h-8 sm:w-8">
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
                  <div className="relative md:h-10 md:w-10 sm:h-8 sm:w-8 rounded-full overflow-hidden">
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        alt={user.firstName}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <Avatar className="md:h-10 md:w-10 sm:h-8 sm:w-8">
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
                    <p className="text-sm opacity-75">{user?.contactOne}</p>
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
                  onClick={handleLogout}
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
  );
};

export default Header;
