import React from 'react';
import { FaHome, FaNetworkWired, FaSuitcase } from 'react-icons/fa';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { IoMdNotifications } from 'react-icons/io';
import { BsBoundingBoxCircles } from 'react-icons/bs';
import { IconWithText } from './IconWithText';
import { SearchBarWithLogo } from './SearchBarWithLogo';
import { AvatarWithDropDown } from './AvatarWithDropdown';
import { useQuery } from 'react-query';
import { getUserInfo } from '../utils/queryFunctions';
import { useHistory } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const { data } = useQuery('userInfo', getUserInfo);

  const history = useHistory();

  return (
    <nav className='bg-white mt-1 border-gray-200 border-b-2  sm:px-4 flex items-center justify-between overflow-hidden xl:px-16'>
      <SearchBarWithLogo />

      <div className='flex space-x-10'>
        <IconWithText
          text='Home'
          Icon={
            <FaHome
              size={25}
              color='#374151'
              title='Home'
              onClick={() => history.push('/')}
            />
          }
        />

        <AvatarWithDropDown
          fullName={`${data?.firstName} ${data?.lastName}`}
          headline={data?.headLine}
          profileUrl={data?.profilePictureUrl}
          username={data?.username}
        />

        <IconWithText
          text='Notifications'
          Icon={
            <IoMdNotifications
              size={25}
              color='#374151'
              onClick={() => history.push('/notifications')}
            />
          }
        />
        <IconWithText
          text='My Network'
          Icon={
            <FaNetworkWired
              size={25}
              color='#374151'
              onClick={() => history.push('/mynetwork')}
            />
          }
        />

        <IconWithText
          text='Jobs'
          className='hidden sm:flex'
          Icon={<FaSuitcase size={25} color='#374151' />}
        />

        <IconWithText
          text='Messaging'
          className='hidden sm:flex'
          Icon={<BiMessageRoundedDetail size={25} color='#374151' />}
        />

        {/* divider */}
        <div className='hidden md:inline border-l-2 border-gray-100'></div>

        <IconWithText
          text='Work'
          className='hidden md:flex'
          Icon={<BsBoundingBoxCircles size={25} color='#374151' />}
        />

        <p className='hidden md:inline self-center cursor-pointer w-20 text-center text-sm text-gray-700'>
          Try premium for free
        </p>
      </div>
    </nav>
  );
};
