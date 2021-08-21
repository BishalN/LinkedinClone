import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Popover } from "react-tiny-popover";

import { Button } from "./Button";

export const AvatarWithDropDown = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom", "left"]} // if you'd like, you can limit the positions
      padding={10} // adjust padding here!
      reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
      onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
      content={(
        { position, nudgedLeft, nudgedTop } // you can also provide a render function that injects some useful stuff!
      ) => (
        <div className="bg-white rounded-md border-2 drop-shadow-sm">
          <div className="flex justify-center items-center space-x-2 px-2 py-2">
            <img
              src="https://scontent.fbwa2-1.fna.fbcdn.net/v/t1.6435-9/212727956_1448825962144387_1421109588417766857_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gi1jS-mhinkAX8FimBR&_nc_oc=AQlMKhfmWNpzYDO2pTBUaNi6Pt9UaCgvpgeSJ0dgIzVzUOh7VfY917pGEHh_3500HA8&_nc_ht=scontent.fbwa2-1.fna&oh=18a30dd351a118b80ee9eb6f1164ca3d&oe=614542B9"
              alt="MyPic"
              className="rounded-full h-16 w-16"
            />
            <div>
              <h4 className="font-semibold text-gray-600 text-lg uppercase">
                Bishal Neupane
              </h4>
              <p className="text-sm">Web and App developer</p>
            </div>
          </div>

          <div className="px-3 space-y-1">
            <Button variant="outlined" className="h-10 w-full rounded-full">
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
          src="https://scontent.fbwa2-1.fna.fbcdn.net/v/t1.6435-9/212727956_1448825962144387_1421109588417766857_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gi1jS-mhinkAX8FimBR&_nc_oc=AQlMKhfmWNpzYDO2pTBUaNi6Pt9UaCgvpgeSJ0dgIzVzUOh7VfY917pGEHh_3500HA8&_nc_ht=scontent.fbwa2-1.fna&oh=18a30dd351a118b80ee9eb6f1164ca3d&oe=614542B9"
          alt="MyPic"
          className="rounded-full h-10 w-10"
        />

        <div className="flex text-xs space-x-1 justify-center">
          <span>Me</span>
          <FiChevronDown size={20} />
        </div>
      </div>
    </Popover>
  );
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
