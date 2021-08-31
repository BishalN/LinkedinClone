import React, { useState } from "react";
import Modal from "react-modal";
import firebase from "../../utils/initFirebase";
import { FiEdit2 } from "react-icons/fi";
import { Button } from "../Button";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { IconWithHover } from "./IconWithHover";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { useSetAbout } from "../../hooks/useSetAbout";
import { UserInputWithLabel } from "./UserInputWithLabel";
import { useEditUsername } from "../../hooks/useEditUsername";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

type UsernameEditModalProps = { username: string };

export const UsernameEditModal: React.FC<UsernameEditModalProps> = ({
  username,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usrname, setUsrname] = useState(username);
  const { error, isLoading, mutate: editUsername, status } = useEditUsername();
  const [usernameError, setUsernameError] = useState("");

  const userId = firebase.auth().currentUser?.uid;

  const handleEditUsername = async () => {
    setUsernameError("");
    if (username.length < 3)
      return setUsernameError("username must atleast be 3 character long");

    editUsername({ username: usrname, userId: userId! });
  };

  useEffect(() => {
    if (status === "success") {
      setIsModalOpen(false);
      router.push(`/in/${usrname}`);
    }
  }, [status]);

  return (
    <div>
      <IconWithHover
        Icon={
          <AiOutlineUser
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
          <p className="text-xl font-medium text-gray-600 mb-3">
            Edit Username
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
          <div className="flex space-x-10"></div>

          <UserInputWithLabel
            label="Username"
            id="username"
            placeholder="Username"
            className="w-full"
            onChange={(e) => {
              setUsrname(e.target.value);
            }}
            error={usernameError || (error as any)?.message}
            value={usrname}
          />
          <span className="text-sm italic ">
            your current profile url: https://linkedin.com/in/{usrname}
          </span>
          <p className="text-sm italic">
            username must be unique it was what identifies you uniquely on the
            url address as https://linkedin.com/in/yourusername
          </p>

          <div className="flex justify-end">
            <Button
              variant="filled"
              type="button"
              disabled={username === usrname}
              onClick={handleEditUsername}
              loading={isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
