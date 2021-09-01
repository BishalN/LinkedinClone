import firebase from '../utils/initFirebase';
import React from 'react';
import { useQuery } from 'react-query';
import { Alert } from '../components/Alert';
import { LoggedInLayout } from '../components/LoggedInLayout';
import { UserPostModal } from '../components/Modals/UserPostModal';
import { PostCard } from '../components/PostCard';
import { Spinner } from '../components/Spinner';
import { useGetAllPosts } from '../hooks/useGetAllPost';
import { useIsAuth } from '../hooks/useIsAuthenticated';
import { getUserInfo } from '../utils/queryFunctions';
import { useParams } from 'react-router-dom';

export const Landing: React.FC = () => {
  useIsAuth();
  const param = useParams();

  const { data, isLoading } = useQuery('userInfo', getUserInfo);
  const { data: posts, isLoading: postsLoading } = useGetAllPosts();

  console.log(firebase.auth().currentUser?.uid);

  if (isLoading || postsLoading) {
    return <Spinner size='4' />;
  }

  return (
    <LoggedInLayout>
      {(param as any).postCreate === 'success' && (
        <Alert
          className='mt-5'
          variant='sucess'
          message='Post successfully published'
        />
      )}
      <div className='h-full mb-10'>
        <div className='px-2 py-3 w-full mt-5 shadow-sm border-2 border-gray-200 h-24 bg-white rounded-lg'>
          <div className='flex space-x-2 items-center'>
            <img
              src={data?.profilePictureUrl}
              alt={data?.firstName}
              className='w-16 h-16 rounded-full object-cover'
            />
            <UserPostModal />
          </div>
        </div>
        {posts?.map((post) => (
          <PostCard
            key={post?.uuid}
            creatorId={post?.creatorId}
            loggedInUserFullName={`${data?.firstName} ${data?.lastName}`}
            loggedInUserProfile={data?.profilePictureUrl}
            loggedInUsername={data?.username}
            post={post?.post}
            uuid={post?.uuid}
            likes={post?.likes}
          />
        ))}
      </div>
    </LoggedInLayout>
  );
};
