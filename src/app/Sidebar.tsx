"use client";

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
import { useTheme } from "./context/ThemeContext";
import { BsMoon, BsSun } from "react-icons/bs";

interface SidebarProps {
  activeRoute: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeRoute }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  const navItems = [
    { href: "/", label: "Dashboard", icon: FaRegCompass },
    { href: "/my-projects", label: "My Projects", icon: FaRegFolderOpen },
    { href: "/my-teams", label: "My Teams", icon: FaUsers },
    { href: "/favorites", label: "Favorites", icon: CiHeart },
  ];

  const generalItems = [
    { href: "/settings", label: "Settings", icon: IoSettingsOutline },
    { href: "/help", label: "Help", icon: IoIosInformationCircleOutline },
    { href: "/report", label: "Report", icon: LuFlagTriangleRight },
    { href: "/payment", label: "Payment", icon: GoCreditCard },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-sidebar-bg text-custom-text min-h-screen py-8 relative transition-all duration-300 sm:block hidden border-r border-border-color`}
    >
      <button
        onClick={toggleCollapse}
        className="absolute top-4 right-4 sm:hidden text-custom-text hover:text-primary"
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
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.href;
            return (
              <li
                key={item.href}
                className={`mb-4 flex items-center ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <Link
                  href={item.href}
                  className={`flex items-center w-full ${
                    isActive
                      ? "text-primary"
                      : "text-custom-text hover:text-primary"
                  } transition-colors`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-bold ml-4">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-border-color mb-4">
          {!isCollapsed && (
            <h6 className="px-8 pt-4 font-bold text-md text-gray-400 dark:text-gray-500">
              General
            </h6>
          )}
        </div>
        <ul className="px-4">
          {generalItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.href;
            return (
              <li
                key={item.href}
                className={`mb-4 flex items-center ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <Link
                  href={item.href}
                  className={`flex items-center w-full ${
                    isActive
                      ? "text-primary"
                      : "text-custom-text hover:text-primary"
                  } transition-colors`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-bold ml-4">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <button
              onClick={toggleTheme}
              className="flex items-center w-full text-custom-text hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <BsSun className="h-5 w-5 flex-shrink-0" />
              ) : (
                <BsMoon className="h-5 w-5 flex-shrink-0" />
              )}
              {!isCollapsed && (
                <span className="font-bold ml-4">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              )}
            </button>
          </li>
          <li
            className={`mb-4 flex items-center ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Link
              href="/login"
              className="flex items-center w-full text-custom-text hover:text-red-500 transition-colors"
            >
              <AiOutlineLogout className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-bold ml-4">Logout</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
