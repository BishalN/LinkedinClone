import React from 'react';
import { ConnectionCard } from '../../components/ConnectionCard';
import { LoggedInLayout } from '../../components/LoggedInLayout';
import { Spinner } from '../../components/Spinner';
import { useGetMyConnections } from '../../hooks/useGetMyConnections';
import { useRedirectIfNotLoggedIn } from '../../hooks/useRedirectIfNotLoggedIn';

export const Connection: React.FC = () => {
  useRedirectIfNotLoggedIn();
  const { data, isLoading } = useGetMyConnections();
  if (isLoading) return <Spinner size='4' />;

  return (
    <LoggedInLayout>
      <div className='bg-white p-2 rounded-lg border-2 border-gray-200 space-y-7'>
        <h2 className='text-xl text-gray-600'>
          {data?.length} {data && data.length > 1 && 'Connections'}
          {data && data.length <= 1 && 'Connection'}
        </h2>
        {data?.map((connection) => (
          <ConnectionCard
            fullName={`${connection.firstName} ${connection.lastName}`}
            profileUrl={connection.profilePictureUrl}
            headline={connection.headLine}
            username={connection.username}
          />
        ))}
      </div>
    </LoggedInLayout>
  );
};
