import React from 'react';
import { NavBar } from '../components/NavBar';

export const LoggedInLayout: React.FC = ({ children }) => {
  return (
    <main className='bg-gray-100 h-full pb-20'>
      <NavBar />
      <div className='h-full sm:mx-10 md:mx-20 lg:mx-40 xl:mx-80'>
        {children}
      </div>
    </main>
  );
};
