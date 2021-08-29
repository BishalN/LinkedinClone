import React from "react";
import firebase from "../utils/initFirebase";
import { AiFillLike, AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { Spinner } from "./Spinner";
import { useState } from "react";
import { useMemo } from "react";
import { useToggleLikePost } from "../hooks/useToggleLikePost";

type PostCardProps = {
  creatorId: string;
  uuid: string;
  post: string;
  data?: any;
  likes: Array<string>;
};

export const PostCard: React.FC<PostCardProps> = ({
  creatorId,
  post,
  likes,
  uuid,
}) => {
  //information about the user who posted the post
  const { data, isLoading, error } = useGetUserInfo(creatorId);
  const { mutate: toggleLike } = useToggleLikePost();
  const userId = firebase.auth().currentUser?.uid;
  const [isLiked, setIsLiked] = useState(false);

  console.log(isLiked);

  useMemo(() => {
    const index = likes?.findIndex((val) => val === userId);
    if (index >= 0) return setIsLiked(true);
    return setIsLiked(false);
  }, [userId, likes]);

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
      <div className="text-gray-500 text-xs">
        {likes.length} {likes.length > 1 ? "likes" : "like"}. 9 comments
      </div>

      {/* divider */}
      <div className="border-t-2 border-gray-100"></div>

      {/* like and comment box */}
      <div className="flex space-x-2 text-gray-500 text-sm ">
        <div
          className="flex space-x-2 items-center hover:bg-gray-200 rounded-md p-2 cursor-pointer"
          onClick={() => {
            //optimistic update does not really matter if we rollback or not if failed
            setIsLiked(!isLiked);
            toggleLike(uuid);
          }}
        >
          <span>Like</span>
          {isLiked ? (
            <AiFillLike size={20} color="#4B5563" />
          ) : (
            <AiOutlineLike size={20} color="#4B5563" />
          )}
        </div>
        <div className="flex space-x-2 items-center hover:bg-gray-200 rounded-md p-2 cursor-pointer">
          <span>Comment</span>
          <AiOutlineComment size={20} color="#4B5563" />
        </div>
      </div>
    </div>
  );
};
