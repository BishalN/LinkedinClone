import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { ImSearch } from "react-icons/im";

export const SearchBarWithLogo = () => {
  return (
    <div className="flex space-x-2">
      <FaLinkedin size={40} color="#3B82F6" />
      <div className="bg-gray-200 flex items-center rounded-md">
        <ImSearch size={30} color="#6B7280" className="inline ml-2 py-2" />
        <input
          type="text"
          className="h-9 w-60 transition-transform duration-1000
        ease-in-out bg-gray-200 focus:outline-none focus:w-72 rounded-md"
          placeholder="Search"
        />
      </div>
    </div>
  );
};
