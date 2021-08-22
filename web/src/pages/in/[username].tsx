import React from "react";
import Modal from "react-modal";

import { LoggedInLayout } from "../../components/LoggedInLayout";
import firebase from "../../utils/initFirebase";
import { FiEdit2 } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { SiUpwork } from "react-icons/si";
import { MdSchool } from "react-icons/md";
import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const InputWithLabel = ({ label }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="firstName" className="text-gray-500">
        First Name
      </label>
      <input
        type="text"
        id="firstName"
        placeholder="First Name"
        className="border-2 p-1 w-96 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
      />
    </div>
  );
};

const MyModal = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
      >
        <div>
          <p className="text-xl font-medium text-gray-600 mb-3">Edit intro</p>
          <div className="border-b-2 border-gray-100" />
        </div>
        <form className="space-y-5 mt-5">
          <div className="flex space-x-10">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-gray-500">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                className="border-2 p-1 w-96 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-gray-500">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                className="border-2 p-1 w-96 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="headLine" className="text-gray-500">
              Head Line
            </label>
            <textarea
              id="headLine"
              placeholder="Head Line"
              className="border-2 p-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="currentPosition" className="text-gray-500">
              Current Postion
            </label>
            <input
              type="text"
              id="currentPosition"
              placeholder="Current Postion"
              className="border-2 p-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="education" className="text-gray-500">
              Education
            </label>
            <input
              type="text"
              id="education"
              placeholder="Education"
              className="border-2 p-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="country" className="text-gray-500">
              Country Region
            </label>
            <input
              type="text"
              id="country"
              placeholder="Country"
              className="border-2 p-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="location" className="text-gray-500">
              Locations in this Country/Region
            </label>
            <input
              type="text"
              id="location"
              placeholder="Location"
              className="border-2 p-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
            />
          </div>
          <Button variant="filled" type="button">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
};

const Profile = () => {
  const imageUrl = firebase.auth().currentUser?.photoURL;
  return (
    <LoggedInLayout>
      <MyModal />
      {/* profile section */}
      <section className="border-2  mt-5  border-gray-300  drop-shadow-xl pb-2 rounded-lg">
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 h-32 "></div>
        <div className="px-5 flex justify-center flex-col space-y-4">
          <img
            src={imageUrl || ""}
            alt="Username"
            className="rounded-full h-36 w-36 -mt-20 ring-4 ring-white"
          />
          <div className="flex justify-between">
            <div>
              {/* name */}
              <h3 className="text-2xl text-gray-800 uppercase font-semibold">
                Bishal Neupane
              </h3>
              {/* position */}
              <h4 className="text-base text-gray-700">Web and App developer</h4>

              {/* work place college and Location */}
              <p className="text-sm text-gray-500 w-64">
                <span className="sm:hidden">Upwork.</span>
                <span className="sm:hidden">Kalika Manavgyan</span>
                Rupandehi District Nepal.{" "}
                <span className="text-blue-800 inline font-semibold text-base hover:underline cursor-pointer">
                  Contact Info
                </span>
              </p>

              {/* connection count */}
              <span className="text-blue-800 font-semibold text-base hover:underline cursor-pointer">
                194 connections
              </span>
            </div>

            {/* work and study orgs */}
            <div className="hidden sm:block">
              <div className="flex space-x-2 font-medium text-gray-600">
                <MdSchool size={25} color="green" />
                <p>Kalika Manavgyan</p>
              </div>
              <div className="flex space-x-2 font-medium text-gray-600">
                <SiUpwork size={25} color="green" />
                <p>Upwork</p>
              </div>
            </div>

            <FiEdit2 size={25} color="#4B5563" />
          </div>
        </div>
      </section>

      {/* about section */}
      <section className="border-2 my-10 rounded-xl bg-white  border-gray-300 drop-shadow-xl py-6 px-5  space-y-5">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium text-gray-500">About</h1>
          <FiEdit2 size={25} color="#4B5563" />
        </div>
        <p>
          Web & App developer. ML & DL learner. Great interest in acquiring and
          improving skills. "Tech-enthusiast"
        </p>
      </section>

      {/* activity section */}
      <section className="border-2 my-10 rounded-xl bg-white  border-gray-300 drop-shadow-xl py-6 px-5  space-y-5">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium text-gray-700">Activity</h1>
          <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
            192 followers
          </span>
        </div>

        {/* real activity */}
        <div className="flex space-x-2">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="a cat"
            className="h-20 w-20 object-cover"
          />
          <div>
            <h4 className="text-lg text-gray-700 font-semibold">
              Just finished working on new project with my friend bob
            </h4>
            <span className="text-gray-400">Bishal Shared this</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="a cat"
            className="h-20 w-20 object-cover"
          />
          <div>
            <h4 className="text-lg text-gray-700 font-semibold">
              Just finished working on new project with my friend bob
            </h4>
            <span className="text-gray-400">Bishal Shared this</span>
          </div>
        </div>
      </section>

      {/* experience and education section */}
      <section className="border-2 my-10 rounded-xl bg-white border-gray-300 drop-shadow-xl py-8 px-5 space-y-5">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium text-gray-500">Experience</h1>
          <div className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-200">
            <GrAdd size={20} color="#4B5563" />
          </div>
        </div>

        {/* experience details */}
        <div className="flex space-x-5">
          {/* company image */}
          {/* <img src="" alt="" /> */}
          <SiUpwork size={40} color="green" />
          <div>
            {/* title */}
            <h3 className="text-xl text-gray-700 font-semibold">
              Freelance Web developer
            </h3>
            {/* description */}
            <p className="text-base text-gray-500">Upwork part time</p>
          </div>
        </div>

        <div className="border-b-2 border-gray-200"></div>

        {/* education */}
        <div className="mt-5 flex justify-between">
          <h1 className="text-xl font-medium text-gray-500">Education</h1>
          <div className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-200">
            <GrAdd size={20} color="#4B5563" />
          </div>
        </div>

        {/* education details */}
        <div className="flex space-x-5">
          {/* company image */}
          {/* <img src="" alt="" /> */}
          <MdSchool size={40} color="green" />
          <div>
            {/* title */}
            <div className="flex justify-between">
              <h3 className="text-xl text-gray-700 font-semibold">
                Kalika Manavgyan
              </h3>
              <FiEdit2 size={25} color="#4B5563" />
            </div>
            {/* description */}
            <p className="text-base text-gray-500">
              High school diploma, computer engineering
            </p>
          </div>
        </div>
      </section>
    </LoggedInLayout>
  );
};

export default Profile;
