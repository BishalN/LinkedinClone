import React, { useState } from "react";
import Modal from "react-modal";
import firebase from "../../utils/initFirebase";
import { Button } from "../Button";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { IconWithHover } from "./IconWithHover";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { useEditComment } from "../../hooks/useEditComment";

type EditCommentModalProps = {
  comment: firebase.firestore.DocumentData;
  postId: string;
};

export const EditCommentModal: React.FC<EditCommentModalProps> = ({
  postId,
  comment,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comnt, setComnt] = useState(comment.comment);
  const [commentError, setCommentError] = useState("");
  const {
    mutateAsync: editComment,
    isLoading: editCommentLoading,
    error: editCommentError,
  } = useEditComment();

  const handleEditComment = async () => {
    setCommentError("");
    if (comnt.length === 0) return setCommentError("Please write a comment");
    await editComment({ comment: comnt, commentId: comment.uuid, postId });
    if (!editCommentLoading && !editCommentError) {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <IconWithHover
        Icon={
          <AiFillEdit
            size={20}
            className="cursor-pointer"
            color="#6B7280"
            onClick={() => setIsModalOpen(true)}
          />
        }
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
        className="h-full w-full sm:h-2/5 sm:w-1/2 sm:mx-auto sm:mt-10 
        p-4 right-auto bottom-auto bg-white border-none rounded-sm overflow-y-auto"
      >
        <div className="flex justify-between">
          <p className="text-xl font-medium text-gray-600 mb-3">Edit Comment</p>
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
        <form className="space-y-5 mt-5">
          <div className="flex space-x-10"></div>

          <UserInputTextareaWithLabel
            label="comment"
            id="comment"
            placeholder="comment"
            className="w-full"
            onChange={(e) => setComnt(e.target.value)}
            error={commentError}
            value={comnt}
          />

          <div className="flex justify-end">
            <Button
              variant="filled"
              type="button"
              loading={editCommentLoading}
              onClick={handleEditComment}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
