import React from "react";
import { FaHome, FaNetworkWired, FaSuitcase } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { IconWithText } from "./IconWithText";
import { SearchBarWithLogo } from "./SearchBarWithLogo";
import { AvatarWithDropDown } from "./AvatarWithDropdown";

export const NavBar: React.FC = () => {
  return (
    <nav className="h-24 bg-white  border-b-2 border-gray-100  sm:px-4 flex items-center justify-between overflow-hidden">
      <SearchBarWithLogo />

      <div className="flex space-x-10">
        <AvatarWithDropDown />
        <IconWithText
          text="Home"
          Icon={<FaHome size={25} color="#374151" title="Home" />}
        />

        <IconWithText
          text="My Network"
          Icon={<FaNetworkWired size={25} color="#374151" />}
        />

        <IconWithText
          text="Jobs"
          className="hidden sm:flex"
          Icon={<FaSuitcase size={25} color="#374151" />}
        />

        <IconWithText
          text="Messaging"
          className="hidden sm:flex"
          Icon={<BiMessageRoundedDetail size={25} color="#374151" />}
        />

        <IconWithText
          text="Notifications"
          Icon={<IoMdNotifications size={25} color="#374151" />}
        />

        {/* divider */}
        <div className="hidden md:inline border-l-2 border-gray-100"></div>

        <IconWithText
          text="Work"
          className="hidden md:flex"
          Icon={<BsBoundingBoxCircles size={25} color="#374151" />}
        />

        <p className="hidden md:inline self-center cursor-pointer w-20 text-center text-sm text-gray-700">
          Try premium for free
        </p>
      </div>
    </nav>
  );
};
