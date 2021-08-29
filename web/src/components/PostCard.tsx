import React from "react";
import firebase from "../utils/initFirebase";
import { AiFillLike, AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { Spinner } from "./Spinner";
import { useState } from "react";
import { useMemo } from "react";
import { useToggleLikePost } from "../hooks/useToggleLikePost";
import { Button } from "./Button";
import { useCreateComment } from "../hooks/useCreateComment";
import { v4 as uuidGen } from "uuid";
import { useGetAllComments } from "../hooks/useGetAllComments";
import { EditCommentModal } from "./Modals/editCommentModal";
import { UserConfirmDeleteModal } from "./Modals/UserConfirmDeleteModal";

type PostCardProps = {
  creatorId: string;
  //this is the postId
  uuid: string;
  post: string;
  likes: Array<string>;
  loggedInUserProfile: string;
  loggedInUserFullName: string;
};

export const PostCard: React.FC<PostCardProps> = ({
  creatorId,
  post,
  likes,
  uuid,
  loggedInUserProfile,
  loggedInUserFullName,
}) => {
  //information about the user who posted the post
  const { data: postCreator, isLoading, error } = useGetUserInfo(creatorId);
  const {
    data: commentsArr,
    isLoading: commentsArrLoading,
  } = useGetAllComments(uuid);
  const { mutate: toggleLike } = useToggleLikePost();
  const {
    mutateAsync: createComment,
    isLoading: createCommentLoading,
    error: createCommentError,
  } = useCreateComment();
  const userId = firebase.auth().currentUser?.uid;
  const [isLiked, setIsLiked] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");

  const loggedInUserId = firebase.auth().currentUser?.uid;

  useMemo(() => {
    const index = likes?.findIndex((val) => val === userId);
    if (index >= 0) return setIsLiked(true);
    return setIsLiked(false);
  }, [userId, likes]);

  const handleCreateComment = async () => {
    if (comment.length === 0) return setCommentError("Please write a comment");
    await createComment({
      comment,
      commenterId: loggedInUserId!,
      commenterProfile: loggedInUserProfile!,
      postId: uuid,
      uuid: uuidGen(),
    });
    setComment("");
  };

  if (isLoading) {
    return <Spinner size="4" />;
  }

  return (
    <div className="px-4 py-3 w-full mt-5 shadow-sm border-2 border-gray-200 h-auto bg-white rounded-lg space-y-2">
      <div className="flex space-x-2 items-center">
        <img
          src={postCreator?.profilePictureUrl}
          alt={postCreator?.firstName}
          className="w-16 h-16 rounded-full"
        />
        <div className="">
          <p className="text-gray-700 font-semibold">
            {postCreator?.firstName} {postCreator?.lastName}
          </p>
          <p className="text-gray-500 text-xs">{postCreator?.headLine}</p>
        </div>
        <p className="text-gray-500 -mt-4 text-xs">Following</p>
      </div>
      <div className="text-gray-600  text-sm">{post}</div>

      {/* like and comment count */}
      <div className="text-gray-500 text-xs">
        {likes.length} {likes.length > 1 ? "likes" : "like"}.{" "}
        {commentsArr?.length}
        {commentsArr && commentsArr.length > 1 ? "comments" : "comment"}
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
        <div
          className="flex space-x-2 items-center hover:bg-gray-200 rounded-md p-2 cursor-pointer"
          onClick={() => {
            //toggle the commentshow boolean
            setCommentShow(!commentShow);
          }}
        >
          <span>Comment</span>
          <AiOutlineComment size={20} color="#4B5563" />
        </div>
      </div>
      {commentShow && (
        <div className="">
          <div className="flex space-x-2 items-center">
            <img
              src={loggedInUserProfile}
              alt={loggedInUserFullName}
              className="w-12 h-12 rounded-full"
            />
            <input
              type="text"
              className="text-gray-500 text-sm w-full rounded-full"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {commentError ||
              (createCommentError && (
                <span className="text-red-500 text-sm">
                  {commentError} {createCommentError}
                </span>
              ))}
            {comment.length > 3 && (
              <Button
                variant="filled"
                onClick={handleCreateComment}
                loading={createCommentLoading}
              >
                Post
              </Button>
            )}
          </div>

          {/* show other comments here */}
          <div className="space-y-3 my-5">
            {commentsArr?.map((comment) => (
              <div className="flex space-x-3">
                <img
                  src={comment.commenterProfile}
                  alt={comment.comment}
                  className="h-12 w-12 rounded-full"
                />
                {/* comment box  */}
                <div className="bg-gray-100 rounded-md p-2 w-full h-auto text-gray-700 text-base flex justify-between">
                  <div>{comment.comment}</div>
                  <div className="flex">
                    {comment.commenterId === loggedInUserId && (
                      <EditCommentModal comment={comment} postId={uuid} />
                    )}

                    {comment.commenterId === loggedInUserId ||
                    creatorId === loggedInUserId ? (
                      <UserConfirmDeleteModal
                        isComment
                        data={{ commentId: comment.uuid, postId: uuid }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
