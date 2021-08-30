import React from "react";
import { ConnectRequestCard } from "../../components/ConnectRequestCard";
import { LoggedInLayout } from "../../components/LoggedInLayout";
import { Spinner } from "../../components/Spinner";
import { UserConnectCard } from "../../components/UserConnectCard";
import { useGetAllUsers } from "../../hooks/useGetAllUsers";

const mynetwork = () => {
  const { data: usersData, isLoading: usersDataLoading } = useGetAllUsers();
  if (usersDataLoading) {
    return <Spinner size="4" />;
  }
  return (
    <LoggedInLayout>
      <h3 className="mt-5 text-gray-800 text-xl font-semibold">
        You have 3 connection requests
      </h3>
      {/* <ConnectRequestCard />
      <ConnectRequestCard />
      <ConnectRequestCard /> */}

      <h5 className="my-5 text-gray-600 text-lg font-medium">
        People you may know from your circle
      </h5>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-2">
        {usersData?.map((userInfo) => (
          <UserConnectCard
            headline={userInfo.headLine}
            userId={userInfo.uuid}
            profileUrl={userInfo.profilePictureUrl}
            currentPosition={userInfo.currentPosition}
            fullName={`${userInfo.firstName} ${userInfo.lastName}`}
          />
        ))}
      </div>
    </LoggedInLayout>
  );
};

export default mynetwork;
