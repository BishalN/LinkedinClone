import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit2 } from "react-icons/fi";
import { IconWithHover } from "./IconWithHover";
import { AiOutlineClose } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";

export const UserPhotoModal = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50vw",
      background: "black",
      border: "none",
      height: "70vh",
      overflow: "hidden",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <img
        src="https://lh3.googleusercontent.com/a-/AOh14GgkyzMhg3ICB-Fy1_DLGWYSKiXRicilSoaXqJz7Eg=s96-c"
        alt="Username"
        onClick={() => setIsModalOpen(true)}
        className="rounded-full h-36 w-36 -mt-20 ring-4 ring-white"
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
      >
        <div className="flex justify-between">
          <p className="text-xl font-medium text-gray-300 mb-3">
            Profile photo
          </p>
          <AiOutlineClose
            size={25}
            color="#9CA3AF"
            className="cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>

        <div className="flex justify-center h-5/6 items-center">
          <img
            src="https://lh3.googleusercontent.com/a-/AOh14GgkyzMhg3ICB-Fy1_DLGWYSKiXRicilSoaXqJz7Eg=s96-c"
            alt="Username"
            className="rounded-full h-60 w-60 -mt-20 "
          />
        </div>

        <div className="flex flex-col items-center cursor-pointer">
          <MdAddAPhoto size={25} color="white" />
          <span className="text-gray-400 ">Add Photo</span>
        </div>
      </Modal>
    </>
  );
};
