import React from "react";
import { useQuery } from "react-query";
import { LoggedInLayout } from "../components/LoggedInLayout";
import { UserPostModal } from "../components/Modals/UserPostModal";
import { Spinner } from "../components/Spinner";
import { useIsAuth } from "../hooks/useIsAuthenticated";
import { getUserInfo } from "../utils/queryFunctions";

const dash = () => {
  useIsAuth();

  const { data, isLoading } = useQuery("userInfo", getUserInfo);
  if (isLoading) {
    return <Spinner size="4" />;
  }

  return (
    <LoggedInLayout>
      <div className="h-screen">
        <div className="px-2 py-3 w-full mt-5 shadow-sm border-2 border-gray-200 h-24 bg-white rounded-lg">
          <div className="flex space-x-2 items-center">
            <img
              src={data?.profilePictureUrl}
              alt={data?.firstName}
              className="w-16 h-16 rounded-full"
            />
            <UserPostModal />
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
};

export default dash;
