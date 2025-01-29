"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { IoCreateOutline } from "react-icons/io5"
import { FaUser } from 'react-icons/fa'
import { signOut, useSession } from "next-auth/react"
import CreateModal from '../modals/create-modal/CreateModal'

const Navbar = () => {
    const [showModal, setShowModal] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const { data: session } = useSession()

    const handleHideModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)
    const toggleDropdown = () => setShowDropdown(!showDropdown)

    return (
        <div className="sticky top-0 left-0 w-full flex justify-between items-center z-40">
            <Link href="/admin/dashboard" className="flex items-center gap-2 transition-all">
                <h1 className="text-blue-600 text-2xl font-bold">
                    住房Hub管理系统
                </h1>
            </Link>
            <div className="flex items-center gap-6">
                <button onClick={handleShowModal} className="bg-[#4522f4] px-2 py-1 cursor-pointer rounded-xl transition hover:bg-[#5738f2]">
                    <IoCreateOutline
                        size={20}
                        color="#fff"
                    />
                </button>
                <div className="relative">
                    <button onClick={toggleDropdown} className="cursor-pointer">
                        <FaUser size={22} color="rgb(37 99 235)" />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-32">
                            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                回到首页
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                登出
                            </button>
                        </div>
                    )}
                </div>
                {showModal && (
                    <CreateModal
                        handleHideModal={handleHideModal}
                    />
                )}
            </div>
        </div>
    )
}

export default Navbar
