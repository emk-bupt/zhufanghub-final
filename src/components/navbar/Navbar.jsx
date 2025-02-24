"use client";
import { AiOutlineUser } from "react-icons/ai";
import { MdDarkMode, MdLightMode } from "react-icons/md"; // Theme icons
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ref for dropdown modal
  const modalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleModal = () => setShowModal((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
      return () => (window.onscroll = null);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Close the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) return null;

  console.log(session);

  return (
    <div
      className={`z-50 h-16 w-full fixed top-0 left-0 transition-all ${
        isScrolled ? "shadow-md backdrop-blur" : ""
      }`}
    >
      <div className="h-full w-full md:w-2/3 mx-auto flex items-center justify-between px-4 md:px-0">
        <Link href="/" className="flex items-center gap-2 transition-all">
          <h1
            className={`${
              isScrolled ? "text-blue-600" : "text-[#cec7c7]"
            } text-2xl font-bold`}
          >
            住房Hub
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl text-white">
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Navbar Links for Desktop */}
        <div className="hidden md:flex items-center gap-4 relative">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="text-2xl cursor-pointer text-[#cec7c7] dark:text-[#f5f5f5]"
          >
            {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </button>

          <div
            onClick={toggleModal}
            className="cursor-pointer relative"
            ref={modalRef}
          >
            <AiOutlineUser
              size={30}
              color={isScrolled ? "rgba(37, 99, 235, 1)" : "#cec7c7"}
            />
            {showModal && (
              <div
                className="absolute top-12 right-0 shadow-md flex flex-col items-center gap-4 p-4 bg-white dark:bg-black rounded-xl transition-all ease-in-out duration-300 transform origin-top"
                style={{
                  opacity: showModal ? 1 : 0,
                  transform: showModal ? "scaleY(1)" : "scaleY(0)",
                  width: "150px",
                }}
              >
                {session?.user?.isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="w-full text-center px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300"
                  >
                    管理仪表板
                  </Link>
                )}

                {/* Company Dashboard Link */}
                {session?.user?.isCompany && (
                  <Link
                    href="/company/dashboard"
                    className="w-full text-center px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300"
                  >
                    公司仪表板
                  </Link>
                )}

                <Link
                  href="/reservations"
                  className="w-full text-center px-4 py-2 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300"
                >
                  预订
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setShowModal(false);
                  }}
                  className="w-full text-center px-4 py-2 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300"
                >
                  登出
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-black shadow-md p-4 flex flex-col items-center gap-4">
            {/* Theme Toggle Button Inside Mobile Menu */}
            <button
              onClick={toggleTheme}
              className="text-4xl cursor-pointer text-gray-600 dark:text-gray-200"
            >
              {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
            </button>

            {session?.user?.isAdmin && (
              <Link
                href="/admin/dashboard"
                className="w-full text-center px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300"
                onClick={toggleMenu}
              >
                管理仪表板
              </Link>
            )}

            {/* Company Dashboard Link for Mobile */}
            {session?.user?.isCompany && (
              <Link
                href="/company/dashboard"
                className="w-full text-center px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300"
                onClick={toggleMenu}
              >
                公司仪表板
              </Link>
            )}

            <Link
              href="/reservations"
              className="w-full text-center px-4 py-2 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300"
              onClick={toggleMenu}
            >
              预订
            </Link>
            <button
              onClick={() => {
                signOut();
                toggleMenu();
              }}
              className="w-full text-center px-4 py-2 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300"
            >
              登出
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
