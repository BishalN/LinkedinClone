import React from "react";
import { UserConnectmodal } from "./Modals/UserConnectModal";

type UserConnectCardProps = {
  fullName: string;
  headline: string;
  currentPosition: string;
  profileUrl: string;
  userId: string;
};

export const UserConnectCard: React.FC<UserConnectCardProps> = ({
  currentPosition,
  fullName,
  headline,
  profileUrl,
  userId,
}) => {
  return (
    <div
      className="bg-white hover:shadow-2xl transition-shadow
   ease-in-out duration-200 space-y-2 shadow-md  rounded-xl
    p-4 flex flex-col items-center justify-center"
    >
      <img src={profileUrl} alt={fullName} className="rounded-full h-28 w-28" />
      <p className="text-lg font-semibold text-gray-600">{fullName}</p>
      <p className="text-gray-500 text-center">
        {headline} {currentPosition}
      </p>
      <UserConnectmodal userId={userId} fullName={fullName} />
    </div>
  );
};
