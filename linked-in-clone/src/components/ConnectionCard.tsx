import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from './Button';

type ConnectionCardProps = {
  fullName: string;
  headline: string;
  profileUrl: string;
  username: string;
  isSearchBar?: boolean;
};

export const ConnectionCard: React.FC<ConnectionCardProps> = ({
  fullName,
  headline,
  profileUrl,
  username,
  isSearchBar = false,
}) => {
  const history = useHistory();
  return (
    <div className='flex justify-between'>
      <div className='flex space-x-2'>
        <Link to={`/in/${username}`}>
          <img
            src={profileUrl}
            alt={fullName}
            className={`${
              isSearchBar
                ? 'h-10 w-10 rounded-full object-cover'
                : 'h-14 w-14 sm:h-24 sm:w-24 object-cover'
            }`}
          />
        </Link>
        <div className=''>
          <h2
            className='text-gray-800 font-semibold text-xl hover:underline cursor-pointer'
            onClick={() => history.push(`/in/${username}`)}
          >
            {fullName}
          </h2>
          <p className='text-sm text-gray-600'>{headline}</p>
        </div>
      </div>

      {!isSearchBar && (
        <Button variant='outlined' className='self-start rounded-full'>
          Message
        </Button>
      )}
    </div>
  );
};
