import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import { LoggedInLayout } from '../../components/LoggedInLayout';
import { Spinner } from '../../components/Spinner';
import { UserConnectCard } from '../../components/UserConnectCard';
import { useGetAllUsers } from '../../hooks/useGetAllUsers';
import { useRedirectIfNotLoggedIn } from '../../hooks/useRedirectIfNotLoggedIn';
import { getUserInfo } from '../../utils/queryFunctions';

export const Mynetwork: React.FC = () => {
  useRedirectIfNotLoggedIn();
  const history = useHistory();
  const { data: usersData, isLoading: usersDataLoading } = useGetAllUsers();
  const { data: loggedInUser, isLoading: loggedInUserDataLoading } = useQuery(
    'userInfo',
    getUserInfo
  );

  if (usersDataLoading || loggedInUserDataLoading) {
    return <Spinner size='4' />;
  }
  return (
    <LoggedInLayout>
      <Button
        variant='filled'
        className='mt-5'
        onClick={() => history.push('/mynetwork/connections')}
      >
        See people in your network
      </Button>
      <h5 className='my-5 text-gray-600 text-xl font-medium'>
        People you may know
      </h5>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-2'>
        {usersData?.map((userInfo) => {
          return (
            <UserConnectCard
              headline={userInfo.headLine}
              userId={userInfo.uuid}
              profileUrl={userInfo.profilePictureUrl}
              currentPosition={userInfo.currentPosition}
              fullName={`${userInfo.firstName} ${userInfo.lastName}`}
              username={userInfo.username}
              loggedInUserUsername={loggedInUser?.username}
            />
          );
        })}
      </div>
    </LoggedInLayout>
  );
};
