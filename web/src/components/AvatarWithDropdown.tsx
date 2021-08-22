import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Popover } from "react-tiny-popover";
import { isServer } from "../utils/isServer";
import firebase from "../utils/initFirebase";

import { Button } from "./Button";
import { useRouter } from "next/dist/client/router";

export const AvatarWithDropDown = () => {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const imageUrl = firebase.auth().currentUser?.photoURL;
  if (!isServer) {
    return (
      <Popover
        isOpen={isPopoverOpen}
        positions={["bottom", "left", "right", "top"]}
        reposition={false}
        padding={10}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={() => (
          <div className="bg-white rounded-md border-2 drop-shadow-sm ">
            <div className="flex justify-center items-center space-x-2 px-2 py-2">
              <img
                src={imageUrl || "https://picsum.photos/id/237/200/300"}
                alt="MyPic"
                className="rounded-full h-14 w-14"
              />
              <div>
                <h4 className="font-semibold text-gray-600 text-lg uppercase">
                  Bishal Neupane
                </h4>
                <p className="text-sm">Web and App developer</p>
              </div>
            </div>

            <div className="px-3 space-y-1">
              <Button
                variant="outlined"
                className="h-10 w-full rounded-full"
                onClick={() => router.push("/in/username")}
              >
                View Profile
              </Button>
              <Divider />
              <div className="">
                <p className="text-gray-800 font-semibold text-lg  cursor-pointer ">
                  Account
                </p>
                <MenuText text="Settings & Privacy" />
                <MenuText text="Help" />
                <MenuText text="Language" />
              </div>
              <Divider />
              <div className="">
                <p className="text-gray-800 font-semibold text-lg cursor-pointer">
                  Manage
                </p>
                <MenuText text="Posts & Activity" />
                <MenuText text="Job Posting Account" />
                <Divider />
                <MenuText text="Sign Out" classNames="mb-2" />
              </div>
            </div>
          </div>
        )}
      >
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <img
            src={imageUrl || "https://picsum.photos/id/237/200/300"}
            alt="MyPic"
            className="rounded-full h-10 w-10"
          />

          <div className="hidden lg:flex  text-xs space-x-1 justify-center">
            <span>Me</span>
            <FiChevronDown size={20} />
          </div>
        </div>
      </Popover>
    );
  } else return <div>loading...</div>;
};

type MenuTextProps = {
  text: string;
  classNames?: string;
};

const MenuText: React.FC<MenuTextProps> = ({ text, classNames }) => {
  return (
    <p
      className={` ${classNames} text-gray-500 cursor-pointer hover:underline`}
    >
      {text}
    </p>
  );
};

const Divider = () => {
  return <div className="border-b-2 border-gray-100"></div>;
};
