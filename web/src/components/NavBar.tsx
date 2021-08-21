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
    <nav className="flex px-4 items-center justify-between">
      <SearchBarWithLogo />

      <div className="flex space-x-10">
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
          Icon={<FaSuitcase size={25} color="#374151" />}
        />

        <IconWithText
          text="Messaging"
          Icon={<BiMessageRoundedDetail size={25} color="#374151" />}
        />

        <IconWithText
          text="Notifications"
          Icon={<IoMdNotifications size={25} color="#374151" />}
        />

        <AvatarWithDropDown />

        {/* divider */}
        <div className="border-l-2"></div>

        <IconWithText
          text="Work"
          Icon={<BsBoundingBoxCircles size={25} color="#374151" />}
        />

        <p className="self-center cursor-pointer w-20 text-center text-sm text-gray-700">
          Try premium for free
        </p>
      </div>
    </nav>
  );
};
