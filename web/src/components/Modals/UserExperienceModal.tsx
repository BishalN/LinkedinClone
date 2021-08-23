import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit2 } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { UserInputWithLabel } from "./UserInputWithLabel";
import { Button } from "../Button";
import { IconWithHover } from "./IconWithHover";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { EmploymentSelector, MonthSelector, YearSelector } from "./Selectors";
import { AiOutlineClose } from "react-icons/ai";

type UserExperienceModalProps = { isEditing?: boolean };

export const UserExperienceModal: React.FC<UserExperienceModalProps> = ({
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
            {isEditing ? "Edit experience" : "Add experience"}
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
            label="Title"
            placeholder="Ex. Product Manager"
            id="title"
            className="w-full"
          />

          <div>
            <span className="text-gray-500">Employment Type</span>
            <EmploymentSelector className="w-full" />
          </div>

          <UserInputWithLabel
            label="Company Name"
            id="companyName"
            placeholder="Ex. Microsoft"
            className="w-full"
          />
          <UserInputWithLabel
            label="Location"
            placeholder="Ex. London United Kingdom"
            id="location"
            className="w-full"
          />
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="workStatus"
              className="rounded text-blue-500 h-6 w-6 checked:outline-none"
            />
            <label htmlFor="workStatus">
              I'm currently working in this role
            </label>
          </div>

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
            label="Head Line"
            placeholder="E.x Software architect"
            id="headLine"
            className="w-full"
          />
          <UserInputWithLabel
            label="Industry"
            placeholder="E.g Software development"
            id="Industry"
            className="w-full"
          />
          <UserInputTextareaWithLabel
            label="Description"
            id="description"
            placeholder="Desribe your role"
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
