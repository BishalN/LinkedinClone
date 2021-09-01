import React from 'react';
import { Button } from './Button';

type ConnectionCardProps = {
  fullName: string;
  headline: string;
  profileUrl: string;
};

export const ConnectionCard: React.FC<ConnectionCardProps> = ({
  fullName,
  headline,
  profileUrl,
}) => {
  return (
    <div className='flex justify-between'>
      <div className='flex space-x-2'>
        <img
          src={profileUrl}
          alt={fullName}
          className='rounded-full h-14 w-14  sm:h-24 sm:w-24 object-cover'
        />
        <div className=''>
          <h2 className='text-gray-800 font-semibold text-xl'>{fullName}</h2>
          <p className='text-sm text-gray-600'>{headline}</p>
        </div>
      </div>

      <Button variant='outlined' className='self-start rounded-full'>
        Message
      </Button>
    </div>
  );
};
