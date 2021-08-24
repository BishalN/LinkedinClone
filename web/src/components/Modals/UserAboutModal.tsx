import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit2 } from "react-icons/fi";
import { Button } from "../Button";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { IconWithHover } from "./IconWithHover";
import { AiOutlineClose } from "react-icons/ai";
import firebase from "../../utils/initFirebase";

export const UserAboutModal = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50vw",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (summary.length === 0)
      return setError("Please write something about yourself");

    setError("");
    setIsloading(true);

    const uid = firebase.auth().currentUser?.uid;

    const ref = firebase.firestore().collection("users").doc(uid);

    await ref.set({ about: summary }, { merge: true });

    setIsloading(false);
  };

  return (
    <div>
      <IconWithHover
        Icon={
          <FiEdit2
            size={25}
            color="#4B5563"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer"
          />
        }
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
      >
        <div className="flex justify-between">
          <p className="text-xl font-medium text-gray-600 mb-3">Edit About</p>
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
        <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
          <div className="flex space-x-10"></div>

          <UserInputTextareaWithLabel
            label="Summary"
            id="summary"
            placeholder="Summary"
            className="w-full"
            onChange={(e) => setSummary(e.target.value)}
            error={error}
            value={summary}
          />

          <div className="flex justify-end">
            <Button variant="filled" type="submit" loading={isLoading}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
