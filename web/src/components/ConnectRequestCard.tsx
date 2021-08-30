import React from "react";
import { useAcceptConnection } from "../hooks/useAcceptConnection";
import { useRejectConnection } from "../hooks/useRejectConnection";
import { Button } from "./Button";

type ConnectRequestCardProps = {
  fullName: string;
  headline: string;
  message: string;
  profileUrl: string;
  userId: string;
  currentUserFullName: string;
  currentUserHeadline: string;
  currentUserId: string;
  currentUserProfileUrl: string;
};

export const ConnectRequestCard: React.FC<ConnectRequestCardProps> = ({
  headline,
  message,
  fullName,
  profileUrl,
  userId,
  currentUserFullName,
  currentUserProfileUrl,
  currentUserId,
  currentUserHeadline,
}) => {
  const {
    mutateAsync: acceptConnection,
    isLoading: acceptConnectionLoading,
  } = useAcceptConnection();

  const {
    mutateAsync: rejectConnection,
    isLoading: rejectConnectionLoading,
  } = useRejectConnection();

  const handleRejectConnection = async () => {
    await rejectConnection({ fullName, userId, profileUrl, message, headline });
  };

  const handleAcceptConnection = async () => {
    await acceptConnection({
      fullName,
      currentUserFullName,
      currentUserHeadline,
      currentUserId,
      currentUserProfileUrl,
      headline,
      message,
      profileUrl,
      userId,
    });
  };

  return (
    <div className="bg-gray-200 mt-5 rounded-md p-4 flex justify-between">
      <div className="flex space-x-3">
        <img
          src={profileUrl}
          alt={fullName}
          className="h-20 w-20 rounded-full"
        />
        <div className="">
          <p className="text-gray-800 font-semibold text-lg">{fullName}</p>
          <p className="text-gray-500 text-xs">{headline}</p>
          <p className="text-gray-800 text-xs italic">message: {message}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0  self-center sm:space-x-4">
        <Button
          variant="filled"
          onClick={handleAcceptConnection}
          loading={acceptConnectionLoading}
          type="button"
        >
          Accept
        </Button>
        <Button
          variant="filled"
          type="button"
          onClick={() => {
            console.log("we got rejected");
            handleRejectConnection();
          }}
          loading={rejectConnectionLoading}
        >
          Reject
        </Button>
      </div>
    </div>
  );
};
