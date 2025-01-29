import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const ModalLayout = ({
    isCreating = false,
    document,
    handleHideModal,
    children
}) => {
    return (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center">
            <div className="bg-slate-100 w-full sm:w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg p-4 shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-semibold text-2xl">
                        {isCreating ? "创造" : "编辑"}
                        {document}
                    </h3>
                    <AiOutlineClose
                        onClick={handleHideModal}
                        className="cursor-pointer"
                        size={20}
                    />
                </div>
                <>
                    {children}
                </>
            </div>
        </div>
    )
}

export default ModalLayout;
