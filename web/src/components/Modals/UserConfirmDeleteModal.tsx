import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "../Button";
import { IconWithHover } from "./IconWithHover";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserExpBack } from "./handleUserExperienceValidation";
import { UserEduBack } from "./handleUserEducationValidation";
import { useDeleteExperience } from "../../hooks/useDeleteExperience";
import { useDelteEducation } from "../../hooks/useDeleteEducation";

type UserConfirmDeleteModalProps = {
  isEducation?: boolean;
  isExperience?: boolean;
  data: UserExpBack | UserEduBack;
};

export const UserConfirmDeleteModal: React.FC<UserConfirmDeleteModalProps> = ({
  isEducation,
  children,
  isExperience,
  data,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50vw",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    mutateAsync: delExp,
    isLoading: delExpLoading,
  } = useDeleteExperience();
  // const {} = usedelet
  const { mutateAsync: delEdu, isLoading: delEduLoading } = useDelteEducation();

  return (
    <div>
      <IconWithHover
        Icon={
          <MdDelete
            size={25}
            color="red"
            onClick={() => setIsModalOpen(true)}
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
        <div className="flex justify-between">
          <p className="text-xl font-medium text-gray-600 mb-3">
            Delete {isEducation ? "Education" : "Experience"}
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
        <p className="mt-5 text-gray-700">
          Are you sure? this can't be reversed
        </p>
        <div className="flex justify-end">
          <Button
            variant="filled"
            type="submit"
            loading={delExpLoading || delEduLoading}
            onClick={async () => {
              if (isExperience) {
                await delExp(data as UserExpBack);
                setIsModalOpen(false);
              } else if (isEducation) {
                await delEdu(data as UserEduBack);
                setIsModalOpen(false);
              }
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};
