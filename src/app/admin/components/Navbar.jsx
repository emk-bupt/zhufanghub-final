"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import CreateModal from "../modals/create-modal/CreateModal";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();

  // Dark/light mode support
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleHideModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky top-0 left-0 w-full flex justify-between items-center z-40 px-4 py-2">
      <Link href="/admin/dashboard" className="flex items-center gap-2 transition-all">
        <h1 className="text-blue-600 text-2xl font-bold">住房Hub管理系统</h1>
      </Link>
      <div className="flex items-center gap-6">
        {/* Dark/Light Toggle Button */}
        <button onClick={toggleTheme} className="text-2xl cursor-pointer text-gray-600 dark:text-gray-200">
          {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>

        <button
          onClick={handleShowModal}
          className="bg-[#4522f4] px-2 py-1 cursor-pointer rounded-xl transition hover:bg-[#5738f2]"
        >
          <IoCreateOutline size={20} color="#fff" />
        </button>
        <div className="relative">
          <button onClick={toggleDropdown} className="cursor-pointer">
            <FaUser size={22} color="rgb(37 99 235)" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md shadow-lg w-32">
              <Link
                href="/"
                className="block px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowDropdown(false)}
              >
                回到首页
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                登出
              </button>
            </div>
          )}
        </div>
        {showModal && <CreateModal handleHideModal={handleHideModal} />}
      </div>
    </div>
  );
};

export default Navbar;
