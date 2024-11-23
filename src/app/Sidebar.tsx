import Link from "next/link";
import Logo from "../app/assets/logo.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaRegCompass, FaRegFolderOpen, FaUsers } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuFlagTriangleRight } from "react-icons/lu";
import { GoCreditCard } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

interface SidebarProps {
  activeRoute: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeRoute, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white text-black min-h-screen py-8 relative transition-all duration-300 sm:block hidden`}
    >
      <button
        onClick={toggleCollapse}
        className="absolute top-4 right-4 sm:hidden"
      >
        {isCollapsed ? <FiMenu /> : <RxCross2 />}
      </button>
      <div
        className={`mb-8 ${isCollapsed ? "flex justify-center" : "px-8 py-2"}`}
      >
        <Image
          src={Logo}
          alt="logo"
          width={isCollapsed ? 40 : 100}
          height={isCollapsed ? 40 : 100}
        />
      </div>
      <nav>
        <ul className="px-4">
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            } ${activeRoute === "/" ? "text-blue-500" : ""}`}
          >
            <FaRegCompass className="h-5 w-5 text-custom-text" />
            {!isCollapsed && (
              <Link
                href="/"
                className="hover:text-gray-400 text-custom-text font-bold ml-4"
              >
                Dashboard
              </Link>
            )}
          </li>
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            } ${activeRoute === "/my-projects" ? "text-blue-500" : ""}`}
          >
            <FaRegFolderOpen className="h-5 w-5 text-custom-text" />
            {!isCollapsed && (
              <Link
                href="/my-projects"
                className="hover:text-gray-400 text-custom-text font-bold ml-4"
              >
                My Projects
              </Link>
            )}
          </li>
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            } ${activeRoute === "/my-teams" ? "text-blue-500" : ""}`}
          >
            <FaUsers className="h-5 w-5 text-custom-text" />
            {!isCollapsed && (
              <Link
                href="/my-teams"
                className="hover:text-gray-400 text-custom-text font-bold ml-4"
              >
                My Teams
              </Link>
            )}
          </li>
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            } ${activeRoute === "/favorites" ? "text-blue-500" : ""}`}
          >
            <CiHeart className="h-5 w-5 text-custom-text" />
            {!isCollapsed && (
              <Link
                href="/favorites"
                className="hover:text-gray-400 text-custom-text font-bold ml-4"
              >
                Favorites
              </Link>
            )}
          </li>
        </ul>
        <div className="border-t border-gray-300 mb-4">
          {!isCollapsed && (
            <h6 className="px-8 pt-4 font-bold text-md text-gray-400">
              General
            </h6>
          )}
        </div>
        <ul className="px-4">
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            } ${activeRoute === "/settings" ? "text-blue-500" : ""}`}
          >
            <IoSettingsOutline className="h-5 w-5 text-custom-text" />
            {!isCollapsed && (
              <Link
                href="/settings"
                className="hover:text-gray-400 text-custom-text font-bold ml-4"
              >
                Settings
              </Link>
            )}
          </li>
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            } ${activeRoute === "/help" ? "text-blue-500" : ""}`}
          >
            <IoIosInformationCircleOutline className="h-5 w-5 text-custom-text" />
            {!isCollapsed && (
              <Link
                href="/help"
                className="hover:text-gray-400 text-custom-text font-bold ml-4"
              >
                Help
              </Link>
            )}
          </li>
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <LuFlagTriangleRight className="h-5 w-5 text-custom-text" />
            {!isCollapsed && (
              <button
                onClick={onLogout}
                className="hover:text-gray-400 text-custom-text font-bold ml-4"
              >
                Report
              </button>
            )}
          </li>
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <GoCreditCard className="h-5 w-5 text-custom-text" />
            {!isCollapsed && (
              <button
                onClick={onLogout}
                className="hover:text-gray-400 text-custom-text font-bold ml-4"
              >
                Payment
              </button>
            )}
          </li>
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <AiOutlineLogout className="h-5 w-5 text-custom-text" />
            {!isCollapsed && (
              <button
                onClick={onLogout}
                className="hover:text-gray-400 text-custom-text font-bold ml-4"
              >
                Logout
              </button>
            )}
          </li>
        </ul>
        {!isCollapsed && (
          <div className="fixed bottom-0 left-0 bg-[#F0F0F0] p-4 w-64">
            <h5 className="inline-block text-custom-text text-sm border-b-[1px] border-dashed border-custom-text">
              Free Trial
            </h5>
            <p className="text-custom-text text-sm">
              Expiring December 21st, 2024
            </p>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
