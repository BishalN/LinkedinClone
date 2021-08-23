import { useState } from "react";
import Modal from "react-modal";
import { FiEdit2 } from "react-icons/fi";
import { Button } from "../Button";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { IconWithHover } from "./IconWithHover";

export const UserAboutModal = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <IconWithHover
        Icon={
          <FiEdit2
            size={25}
            color="#4B5563"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer"
          />
        }
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
      >
        <div className="">
          <p className="text-xl font-medium text-gray-600 mb-3">Edit About</p>
          <div className="border-b-2 border-gray-100" />
        </div>
        <form className="space-y-5 mt-5">
          <div className="flex space-x-10"></div>

          <UserInputTextareaWithLabel
            label="Summary"
            id="summary"
            placeholder="Summary"
            className="w-full"
          />

          <div className="flex justify-end">
            <Button variant="filled" type="button" className="">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
