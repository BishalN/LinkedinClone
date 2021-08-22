import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { ImSearch } from "react-icons/im";

export const SearchBarWithLogo = () => {
  return (
    <div className="flex space-x-2">
      <FaLinkedin size={40} color="#3B82F6" />
      <div className="bg-gray-200 hidden items-center rounded-md lg:flex">
        <ImSearch size={30} color="#6B7280" className="inline ml-2 py-2" />
        <input
          type="text"
          className="w-40 transition-transform duration-1000
        ease-in-out bg-gray-200 focus:outline-none focus:w-screen lg:focus:w-96 rounded-md"
          placeholder="Search"
        />
      </div>
    </div>
  );
};
