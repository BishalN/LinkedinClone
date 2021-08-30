import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "../Button";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { IconWithHover } from "./IconWithHover";
import { AiOutlineClose } from "react-icons/ai";
import { useSendConnectionRequest } from "../../hooks/useSendConnectionRequest";
import firebase from "../../utils/initFirebase";
import { useQuery } from "react-query";
import { getUserInfo } from "../../utils/queryFunctions";
import { useMemo } from "react";
import { TiTick } from "react-icons/ti";

type UserConnectmodalProps = {
  userId: string;
  fullName: string;
};

export const UserConnectmodal: React.FC<UserConnectmodalProps> = ({
  userId,
  fullName,
}) => {
  const loggedInUserId = firebase.auth().currentUser?.uid;
  const { data: loggedInUser, isLoading: loggedInUserDataLoading } = useQuery(
    "userInfo",
    getUserInfo
  );

  const [isConnectionRequestSent, setIsConnectionRequestSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("Please add me to your connections");
  const {
    mutateAsync: sendConnectionRequest,
    isLoading,
    error,
  } = useSendConnectionRequest();

  useMemo(() => {
    if (!loggedInUserDataLoading && loggedInUser?.connectionRequestsSent) {
      const foundIndex = loggedInUser.connectionRequestsSent.findIndex(
        (id: string) => id === userId
      );

      if (foundIndex >= 0) {
        return setIsConnectionRequestSent(true);
      }

      return;
    }
  }, [loggedInUser]);

  const handleSubmit = async () => {
    await sendConnectionRequest({
      message,
      profileUrl: loggedInUser?.profilePictureUrl,
      headline: loggedInUser?.headLine,
      //this userId is of the person to whom we are sending connection request to
      userId,
      fullName: `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
    });
    if (!isLoading && !error) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        variant="outlined"
        className="w-full rounded-full"
        disabled={isConnectionRequestSent}
        icon={isConnectionRequestSent ? <TiTick size={15} color="green" /> : ""}
        onClick={() => setIsModalOpen(true)}
      >
        {isConnectionRequestSent ? "Request sent" : "Connect"}
      </Button>

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
            Connect Request to {fullName}
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
        <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
          <div className="flex space-x-10"></div>

          <UserInputTextareaWithLabel
            label="Message"
            id="Message"
            placeholder="Message"
            className="w-full"
            onChange={(e) => setMessage(e.target.value)}
            error={error as string}
            value={message}
          />

          <div className="flex justify-end">
            <Button
              variant="filled"
              type="button"
              loading={isLoading}
              onClick={handleSubmit}
            >
              Send Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
