import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserConnectmodal } from './Modals/UserConnectModal';

type UserConnectCardProps = {
  fullName: string;
  headline: string;
  currentPosition: string;
  profileUrl: string;
  userId: string;
  username: string;
  loggedInUserUsername: string;
};

export const UserConnectCard: React.FC<UserConnectCardProps> = ({
  currentPosition,
  fullName,
  headline,
  profileUrl,
  userId,
  username,
  loggedInUserUsername,
}) => {
  const history = useHistory();
  return (
    <div
      className='bg-white hover:shadow-2xl transition-shadow
   ease-in-out duration-200 space-y-2 shadow-md  rounded-xl
    p-4 flex flex-col items-center justify-center cursor-pointer'
    >
      <img src={profileUrl} alt={fullName} className='rounded-full h-28 w-28' />
      <p
        className='text-lg font-semibold text-gray-600 cursor-pointer '
        onClick={() => history.push(`/in/${username}`)}
      >
        {fullName}
      </p>
      <p className='text-gray-500 text-center'>
        {headline} {currentPosition}
      </p>
      <UserConnectmodal
        userId={userId}
        fullName={fullName}
        username={loggedInUserUsername}
      />
    </div>
  );
};
