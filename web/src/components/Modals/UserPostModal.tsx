import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "../Button";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { IconWithHover } from "./IconWithHover";
import { AiOutlineClose } from "react-icons/ai";
import { useCreatePost } from "../../hooks/useCreatePost";
import { v4 as uuid } from "uuid";
import firebase from "../../utils/initFirebase";
import { useRouter } from "next/dist/client/router";

type UserPostModalProps = {};

export const UserPostModal: React.FC<UserPostModalProps> = ({}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync, isLoading, error: err } = useCreatePost();

  const handleSubmit = async () => {
    const creatorId = firebase.auth().currentUser?.uid;
    setError("");
    if (post.length === 0) return setError("Please write something");
    await mutateAsync({ uuid: uuid(), creatorId: creatorId!, post: post });
    if (!err && !isLoading) {
      setIsModalOpen(false);
      setPost("");
      router.push("/dash/?postCreate=success");
    }
  };

  return (
    <div className="w-full">
      <button
        className="text-gray-500 font-semibold text-left px-4 rounded-full w-full h-12
         bg-gray-200 border-2 border-gray-300 hover:shadow-sm hover:bg-gray-300"
        onClick={() => setIsModalOpen(true)}
      >
        Start a post
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
        className="h-full w-full sm:h-1/2 sm:w-1/2 sm:mx-auto sm:mt-10 
        p-4 right-auto bottom-auto bg-white rounded-sm overflow-y-auto"
      >
        <div className="flex justify-between">
          <p className="text-xl font-medium text-gray-600 mb-3">
            Create a post
          </p>
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
            label="Post"
            id="summary"
            placeholder="What do you want to talk about?"
            className="w-full"
            error={error}
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />

          <div className="flex justify-end">
            <Button
              variant="filled"
              type="button"
              loading={isLoading}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
