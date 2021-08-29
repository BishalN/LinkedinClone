import React from "react";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { Spinner } from "./Spinner";

type PostCardProps = {
  creatorId: string;
  uuid: string;
  post: string;
  data?: any;
};

export const PostCard: React.FC<PostCardProps> = ({
  children,
  creatorId,
  post,
}) => {
  const { data, isLoading, error } = useGetUserInfo(creatorId);
  if (isLoading) {
    return <Spinner size="4" />;
  }
  return (
    <div className="px-4 py-3 w-full mt-5 shadow-sm border-2 border-gray-200 h-auto bg-white rounded-lg space-y-2">
      <div className="flex space-x-2 items-center">
        <img
          src={data?.profilePictureUrl}
          alt={data?.firstName}
          className="w-16 h-16 rounded-full"
        />
        <div className="">
          <p className="text-gray-700 font-semibold">
            {data?.firstName} {data?.lastName}
          </p>
          <p className="text-gray-500 text-xs">{data?.headLine}</p>
        </div>
        <p className="text-gray-500 -mt-4 text-xs">Following</p>
      </div>
      <div className="text-gray-600  text-sm">{post}</div>

      {/* like and comment count */}
      <div className="text-gray-500 text-xs">200 likes. 9 comments</div>

      {/* divider */}
      <div className="border-t-2 border-gray-100"></div>

      {/* like and comment box */}
      <div className="flex space-x-2 text-gray-500 text-sm ">
        <div className="flex space-x-2 items-center hover:bg-gray-200 rounded-md p-2 cursor-pointer">
          <span>Like</span>
          <AiOutlineLike size={20} color="#4B5563" />
        </div>
        <div className="flex space-x-2 items-center hover:bg-gray-200 rounded-md p-2 cursor-pointer">
          <span>Comment</span>
          <AiOutlineComment size={20} color="#4B5563" />
        </div>
      </div>
    </div>
  );
};
