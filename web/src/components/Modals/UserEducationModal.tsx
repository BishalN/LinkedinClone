import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit2 } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { UserInputWithLabel } from "./UserInputWithLabel";
import { Button } from "../Button";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { IconWithHover } from "./IconWithHover";
import { MonthSelector, YearSelector } from "./Selectors";
import { AiOutlineClose } from "react-icons/ai";

type UserEducationModalProps = { isEditing?: boolean };

export const UserEducationModal: React.FC<UserEducationModalProps> = ({
  isEditing = false,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "90vh",
      width: "50vw",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {isEditing ? (
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
      ) : (
        <IconWithHover
          Icon={
            <GrAdd
              size={20}
              color="#4B5563"
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer"
            />
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
      >
        <div className="flex justify-between">
          <p className="text-xl font-medium text-gray-600 mb-3">
            {isEditing ? "Edit education" : "Add education"}
          </p>
          <IconWithHover
            Icon={
              <AiOutlineClose
                size={25}
                color="#4B5563"
                onClick={() => setIsModalOpen(false)}
              />
            }
          />
        </div>
        <div className="border-b-2 border-gray-100" />
        <form className="space-y-5 mt-5">
          <UserInputWithLabel
            label="School"
            placeholder="Ex. Boston University"
            id="school"
            className="w-full"
          />
          <UserInputWithLabel
            label="Degree"
            placeholder="E.x Bachelors"
            id="degree"
            className="w-full"
          />

          <UserInputWithLabel
            label="Field of study"
            id="field"
            placeholder="Ex. Business"
            className="w-full"
          />

          <div>
            <span className="text-gray-600">Start Date</span>
            <div className="flex space-x-7 ">
              <MonthSelector className="w-1/2" />
              <YearSelector className="w-1/2" />
            </div>
          </div>

          <div>
            <span className="text-gray-600">End Date</span>
            <div className="flex space-x-7 ">
              <MonthSelector className="w-1/2" />
              <YearSelector className="w-1/2" />
            </div>
          </div>

          <UserInputWithLabel
            label="Grade"
            placeholder=""
            id="grade"
            className="w-full"
          />

          <UserInputTextareaWithLabel
            label="Activities and Society"
            id="activities"
            placeholder="Ex. Volleyball"
            className="w-full"
          />

          <UserInputTextareaWithLabel
            label="Description"
            id="desc"
            placeholder="Describe"
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
