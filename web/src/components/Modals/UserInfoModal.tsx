import { useState } from "react";
import Modal from "react-modal";
import { FiEdit2 } from "react-icons/fi";
import { UserInputWithLabel } from "./UserInputWithLabel";
import { Button } from "../Button";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { IconWithHover } from "./IconWithHover";

export const UserInfoModal = () => {
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
        <div>
          <p className="text-xl font-medium text-gray-600 mb-3">Edit intro</p>
          <div className="border-b-2 border-gray-100" />
        </div>
        <form className="space-y-5 mt-5">
          <div className="flex space-x-10">
            <UserInputWithLabel
              label="First Name"
              placeholder="First Name"
              id="firstName"
            />
            <UserInputWithLabel
              label="Last Name"
              placeholder="Last Name"
              id="firstName"
            />
          </div>

          <UserInputTextareaWithLabel
            label="Head Line"
            id="headLine"
            placeholder="Head Line"
            className="w-full"
          />

          <UserInputWithLabel
            label="Current Position"
            placeholder="Current Position"
            id="currentPosition"
            className="w-full"
          />
          <UserInputWithLabel
            label="Education"
            className="w-full"
            id="education"
            placeholder="Education"
          />
          <UserInputWithLabel
            label="Country Region"
            className="w-full"
            id="countryRegion"
            placeholder="Country Region"
          />
          <UserInputWithLabel
            label="Locations in this Country/Region"
            className="w-full"
            id="location"
            placeholder="Location"
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
