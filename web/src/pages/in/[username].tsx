import React from "react";
import { LoggedInLayout } from "../../components/LoggedInLayout";
import firebase from "../../utils/initFirebase";
import { FiEdit2 } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { SiUpwork } from "react-icons/si";
import { MdSchool } from "react-icons/md";

const Profile = () => {
  const imageUrl = firebase.auth().currentUser?.photoURL;
  return (
    <LoggedInLayout>
      {/* profile section */}
      <section className="border-2 my-3 rounded-md  border-gray-400 drop-shadow-sm pb-2  w-full ">
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 h-32 w-full"></div>
        <div className="px-2 flex justify-center flex-col space-y-4">
          <img
            src={imageUrl || ""}
            alt="Username"
            className="rounded-full h-36 w-36 mt-2"
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
              <p className="text-sm text-gray-500 w-60">
                Upwork.Kalika Manavgyan Rupandehi District Nepal.{" "}
                <span className="text-blue-800 font-semibold text-base hover:underline cursor-pointer">
                  Contact Info
                </span>
              </p>

              {/* connection count */}
              <span className="text-blue-800 font-semibold text-base hover:underline cursor-pointer">
                194 connections
              </span>
            </div>
            <FiEdit2 size={25} color="#4B5563" />
          </div>
        </div>
      </section>

      {/* about section */}
      <section className="border-2 my-3 rounded-md bg-white  border-gray-400 drop-shadow-sm py-2 px-4 w-full space-y-5">
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
      <section className="border-2 my-3 rounded-md bg-white  border-gray-400 drop-shadow-sm py-2 px-4 w-full space-y-5">
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
      <section className="border-2 my-3 rounded-md bg-white  border-gray-400 drop-shadow-sm py-4 px-4 w-full space-y-5">
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

        <div className="border-b-2 border-gray-200 "></div>

        {/* education */}
        <div className="flex justify-between">
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
