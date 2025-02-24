import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ModalLayout = ({ isCreating = false, document, handleHideModal, children }) => {
  return (
    <div className="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center">
      <div className="bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 w-full sm:w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg p-4 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-600 pb-4">
          <h3 className="font-semibold text-2xl">
            {isCreating ? "创造" : "编辑"} {document}
          </h3>
          <AiOutlineClose
            onClick={handleHideModal}
            className="cursor-pointer hover:text-red-500 transition"
            size={20}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
