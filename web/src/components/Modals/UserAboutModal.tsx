import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit2 } from "react-icons/fi";
import { Button } from "../Button";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { IconWithHover } from "./IconWithHover";
import { AiOutlineClose } from "react-icons/ai";
import { useSetAbout } from "../../hooks/useSetAbout";

type UserAboutModalProps = { about: string };

export const UserAboutModal: React.FC<UserAboutModalProps> = ({ about }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const { mutateAsync, isLoading, error, isSuccess } = useSetAbout();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync(summary);
    if (!isLoading && !error) {
      setIsModalOpen(false);
    }
  };

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
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
        className="h-full w-full sm:h-1/2 sm:w-1/2 sm:mx-auto sm:mt-10 
        p-4 right-auto bottom-auto bg-white border-none rounded-sm overflow-y-auto"
      >
        <div className="flex justify-between">
          <p className="text-xl font-medium text-gray-600 mb-3">Edit About</p>
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
        <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
          <div className="flex space-x-10"></div>

          <UserInputTextareaWithLabel
            label="Summary"
            id="summary"
            placeholder="Summary"
            className="w-full"
            onChange={(e) => setSummary(e.target.value)}
            error={error as string}
            value={summary || about}
          />

          <div className="flex justify-end">
            <Button variant="filled" type="submit" loading={isLoading}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
