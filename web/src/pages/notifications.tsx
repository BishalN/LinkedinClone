import React from "react";
import { useQuery } from "react-query";
import { ConnectRequestCard } from "../components/ConnectRequestCard";
import { LoggedInLayout } from "../components/LoggedInLayout";
import { Spinner } from "../components/Spinner";
import { getUserInfo } from "../utils/queryFunctions";

const notifications = () => {
  const { data: userData, isLoading } = useQuery("userInfo", getUserInfo);
  if (isLoading) {
    return <Spinner size="4" />;
  }
  return (
    <LoggedInLayout>
      <h3 className="mt-5 text-gray-800 text-xl font-semibold">
        You have {userData?.connectionRequestsReceived.length} connection{" "}
        {userData?.connectionRequestsReceived.length > 1
          ? "requests"
          : "request"}
      </h3>
      {userData?.connectionRequestsReceived.map((req: any) => (
        <ConnectRequestCard
          userId={req?.userId}
          fullName={req?.fullName}
          profileUrl={req?.profileUrl}
          headline={req?.headline}
          message={req?.message}
          currentUserFullName={`${userData.firstName} ${userData.lastName}`}
          currentUserId={userData.uuid}
          currentUserHeadline={userData.headLine}
          currentUserProfileUrl={userData.profilePictureUrl}
        />
      ))}
    </LoggedInLayout>
  );
};

export default notifications;
