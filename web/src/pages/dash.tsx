import { useRouter } from "next/dist/client/router";
import React from "react";
import { useQuery } from "react-query";
import { Alert } from "../components/Alert";
import { LoggedInLayout } from "../components/LoggedInLayout";
import { UserPostModal } from "../components/Modals/UserPostModal";
import { PostCard } from "../components/PostCard";
import { Spinner } from "../components/Spinner";
import { useGetAllPosts } from "../hooks/useGetAllPost";
import { useIsAuth } from "../hooks/useIsAuthenticated";
import { getUserInfo } from "../utils/queryFunctions";

const dash = () => {
  useIsAuth();
  const router = useRouter();

  const { data, isLoading } = useQuery("userInfo", getUserInfo);
  const { data: posts, isLoading: postsLoading } = useGetAllPosts();
  if (isLoading || postsLoading) {
    return <Spinner size="4" />;
  }

  return (
    <LoggedInLayout>
      {router.query?.postCreate === "success" && (
        <Alert
          className="mt-5"
          variant="sucess"
          message="Post successfully published"
        />
      )}
      <div className="h-auto mb-10">
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
        {posts?.map((post) => (
          <PostCard
            key={post?.uuid}
            creatorId={post?.creatorId}
            loggedInUserFullName={`${data?.firstName} ${data?.lastName}`}
            loggedInUserProfile={data?.profilePictureUrl}
            post={post?.post}
            uuid={post?.uuid}
            likes={post?.likes}
          />
        ))}
      </div>
    </LoggedInLayout>
  );
};

export default dash;
