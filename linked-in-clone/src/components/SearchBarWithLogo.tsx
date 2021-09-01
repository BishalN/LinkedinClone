import React, { useState } from 'react';
import firebase from '../utils/initFirebase';
import { FaLinkedin } from 'react-icons/fa';
import { ImSearch } from 'react-icons/im';
import { useQuery } from 'react-query';
import { Popover } from 'react-tiny-popover';
import { Spinner } from './Spinner';
import { ConnectionCard } from './ConnectionCard';
import { Link } from 'react-router-dom';

export const SearchBarWithLogo = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { data: foundUsers, isLoading } = useQuery(
    ['user', searchText],
    async () => {
      let users: Array<firebase.firestore.DocumentData> = [];
      const usersnapshots = await firebase
        .firestore()
        .collection('users')
        .where('username', '>=', searchText)
        .where('username', '<=', searchText + '\uf8ff')
        .get();
      usersnapshots.forEach((doc) => users.push(doc.data()));
      return users;
    },
    { enabled: searchText.length > 1, refetchOnMount: false }
  );

  console.log(foundUsers);

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['bottom', 'left', 'right', 'top']}
      reposition={false}
      padding={10}
      onClickOutside={() => setIsPopoverOpen(false)}
      content={() => (
        <div className='bg-white w-full  rounded-md border-2 drop-shadow-sm '>
          {isLoading && <Spinner size='4' />}
          <div className='space-y-2 p-4'>
            {foundUsers?.map((user) => (
              <ConnectionCard
                fullName={`${user.firstName} ${user.lastName}`}
                profileUrl={user.profilePictureUrl}
                headline={user.headLine}
                username={user.username}
                isSearchBar
              />
            ))}
            {foundUsers?.length === 0 && (
              <p>Sorry we could not found any user with that username</p>
            )}
          </div>
        </div>
      )}
    >
      <div className='flex space-x-2'>
        <Link to='/'>
          <FaLinkedin size={40} color='#3B82F6' className='cursor-pointer' />
        </Link>
        <div className='bg-gray-200 hidden items-center rounded-md lg:flex'>
          <ImSearch size={30} color='#6B7280' className='inline ml-2 py-2' />
          <input
            type='text'
            className='w-40 transition-transform border-none duration-1000
        ease-in-out bg-gray-200 focus:ring-0 focus:outline-none focus:w-screen lg:focus:w-96 rounded-md'
            placeholder='Search'
            onChange={(e) => setSearchText(e.target.value)}
            onClick={() => setIsPopoverOpen(true)}
          />
        </div>
      </div>
    </Popover>
  );
};
