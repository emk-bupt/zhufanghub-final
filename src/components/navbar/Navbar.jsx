"use client";
import { AiOutlineUser } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);

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

        {/* Hamburger menu for mobile, now with white color */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-2xl text-white" // Set the color to white
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Navbar Links for Desktop */}
        <div className="hidden md:flex items-center gap-4 relative">
          <div onClick={toggleModal} className="cursor-pointer relative">
            <AiOutlineUser
              size={30}
              color={`${isScrolled ? "rgba(37, 99, 235, 1)" : "#cec7c7"}`}
            />
            {/* Modal for User Actions (Positioned under the icon) */}
            {showModal && (
              <div
                className="absolute top-12 right-0 shadow-md flex flex-col items-center gap-4 p-4 bg-white rounded-xl transition-all ease-in-out duration-300 transform origin-top"
                style={{
                  opacity: showModal ? 1 : 0,
                  transform: showModal ? "scaleY(1)" : "scaleY(0)",
                  width: "150px", // Set a fixed width or use "auto" for content-based width
                }}
              >
                {session?.user?.isAdmin && (
                  <Link
                    className="bg-red-500 text-white px-4 py-2 rounded-xl w-full text-center hover:bg-red-600 transition-all duration-300"
                    href={"/admin/dashboard"}
                  >
                    管理仪表板
                  </Link>
                )}
                <Link
                  href={"/reservations"}
                  className="text-slate-500 text-center w-full hover:bg-slate-100 hover:text-blue-600 transition-all duration-300"
                >
                  预订
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setShowModal(false);
                  }}
                  className="text-slate-500 text-center w-full hover:bg-slate-100 hover:text-blue-600 transition-all duration-300"
                >
                  登出
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col items-center gap-4">
            {session?.user?.isAdmin && (
              <Link
                className="bg-red-500 text-white px-4 py-2 rounded-xl w-full text-center hover:bg-red-600 transition-all duration-300"
                href={"/admin/dashboard"}
              >
                管理仪表板
              </Link>
            )}
            <Link
              href={"/reservations"}
              className="text-slate-500 text-center w-full hover:bg-slate-100 hover:text-blue-600 transition-all duration-300"
              onClick={toggleMenu}
            >
              预订
            </Link>
            <button
              onClick={() => {
                signOut();
                toggleMenu(); // Close menu on sign out
              }}
              className="text-slate-500 text-center w-full hover:bg-slate-100 hover:text-blue-600 transition-all duration-300"
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
