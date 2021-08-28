import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import { IconWithHover } from "./IconWithHover";
import { Button } from "../Button";
import firebase from "../../utils/initFirebase";
import { useQueryClient } from "react-query";

type UserPhotoModalProps = {
  profileUrl: string;
  firstName: string;
};

export const UserPhotoModal: React.FC<UserPhotoModalProps> = ({
  children,
  firstName,
  profileUrl,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50vw",
      background: "black",
      border: "none",
      height: "70vh",
      overflow: "hidden",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <img
        src={profileUrl}
        alt={firstName}
        onClick={() => setIsModalOpen(true)}
        className="rounded-full h-36 w-36 -mt-20 ring-4 ring-white"
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
      >
        <div className="flex justify-between">
          <p className="text-xl font-medium text-gray-300 mb-3">
            Profile photo
          </p>
          <AiOutlineClose
            size={25}
            color="#9CA3AF"
            className="cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>

        <div className="flex justify-center h-5/6 items-center">
          <img
            src={profileUrl}
            alt={firstName}
            className="rounded-full h-44 w-44 -mt-20 "
          />
        </div>

        <UserPhotoUploadModal profileUrl={profileUrl} firstName={firstName} />
      </Modal>
    </>
  );
};

type UserPhotoUploadModalProps = {
  firstName: string;
  profileUrl: string;
};

const UserPhotoUploadModal: React.FC<UserPhotoUploadModalProps> = ({
  firstName,
  profileUrl,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50vw",
      border: "none",
      height: "70vh",
      overflow: "hidden",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imgFile, setImgFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleUpload = async () => {
    setLoading(true);
    const uid = firebase.auth().currentUser?.uid;
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child("images");
    const profileRef = imageRef.child(imgFile?.name!);
    await profileRef.put(imgFile!);
    const profileUrl = await profileRef.getDownloadURL();
    // update the user profile Picture url
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set({ profilePictureUrl: profileUrl }, { merge: true });
    setLoading(false);
    //update the cache to use new Image
    queryClient.invalidateQueries("userInfo");
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <MdAddAPhoto size={25} color="white" />
        <span className="text-gray-400 ">Add Photo</span>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
      >
        <div className="flex justify-between">
          <p className="text-xl font-medium mb-3 text-gray-500">Change Photo</p>
          <IconWithHover
            Icon={
              <AiOutlineClose
                size={25}
                color="#9CA3AF"
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            }
          />
        </div>
        <div className="border-b-2 border-gray-50"></div>

        <div className="flex space-y-10 flex-col justify-center items-center">
          <h3 className="text-2xl mt-5">{firstName} Keep your profile fresh</h3>
          <img
            src={imageUrl || profileUrl}
            alt="Username"
            className="rounded-full h-32 w-32"
          />
        </div>

        <div className="flex flex-col items-center mt-10">
          {imageUrl ? (
            <Button
              variant="filled"
              loading={loading}
              onClick={() => handleUpload()}
            >
              Save the photo
            </Button>
          ) : (
            <label
              htmlFor="fileUpload"
              className="border-2 rounded-full text-center border-blue-500 w-40 p-2 hover:bg-gray-200"
            >
              {imageUrl ? "Save Changes" : "Upload photo"}
            </label>
          )}

          <input
            type="file"
            onChange={(e) => {
              const url = URL.createObjectURL(e.target.files![0]);
              setImageUrl(url);
              setImgFile(e.target.files![0]);
            }}
            id="fileUpload"
            className="appearance-none invisible"
            placeholder="Upload photo"
          />
        </div>
      </Modal>
    </>
  );
};
