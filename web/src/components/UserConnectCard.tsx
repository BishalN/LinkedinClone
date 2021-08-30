import React from "react";
import { Button } from "./Button";

export const UserConnectCard = () => {
  return (
    <div
      className="bg-white hover:shadow-2xl transition-shadow
   ease-in-out duration-200 space-y-2 shadow-md  rounded-lg
    p-4 flex flex-col items-center justify-center"
    >
      <img
        src="https://media-exp1.licdn.com/dms/image/C4D03AQFdW2hRKzIgSQ/profile-displayphoto-shrink_200_200/0/1625998139102?e=1635984000&v=beta&t=U99zF0WLPttEBPaMjepcrCJY5zBawlN_65sVP318zek"
        alt="pic"
        className="rounded-full h-28 w-28"
      />
      <p className="text-lg font-semibold text-gray-600">Bishal Neupane</p>
      <p className="text-gray-500 text-center">Freelance Developer at upwork</p>
      <Button variant="outlined" className="w-full rounded-full">
        Connect
      </Button>
    </div>
  );
};
