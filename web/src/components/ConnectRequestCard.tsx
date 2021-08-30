import React from "react";
import { Button } from "./Button";

export const ConnectRequestCard = () => {
  return (
    <div className="bg-gray-200 mt-5 rounded-md p-4 flex justify-between">
      <div className="flex space-x-3">
        <img
          src="https://media-exp1.licdn.com/dms/image/C4D03AQFdW2hRKzIgSQ/profile-displayphoto-shrink_200_200/0/1625998139102?e=1635984000&v=beta&t=U99zF0WLPttEBPaMjepcrCJY5zBawlN_65sVP318zek"
          alt="Adog"
          className="h-20 w-20 rounded-full"
        />
        <div className="">
          <p className="text-gray-800 font-semibold text-lg">Bishal Neupane</p>
          <p className="text-gray-500 text-xs">Web and App developer</p>
          <p className="text-gray-800 text-xs italic">
            message: Hey please add me into your network
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0  self-center sm:space-x-4">
        <Button variant="filled">Accept</Button>
        <Button variant="filled">Reject</Button>
      </div>
    </div>
  );
};
