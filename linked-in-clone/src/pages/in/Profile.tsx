import firebase from '../../utils/initFirebase';
import { LoggedInLayout } from '../../components/LoggedInLayout';
import { MdSchool, MdWork } from 'react-icons/md';
import { UserInfoModal } from '../../components/Modals/UserInfoModal';
import { UserAboutModal } from '../../components/Modals/UserAboutModal';
import { UserExperienceModal } from '../../components/Modals/UserExperienceModal';
import { UserEducationModal } from '../../components/Modals/UserEducationModal';
import { UserPhotoModal } from '../../components/Modals/UserPhotoModal';
import { Spinner } from '../../components/Spinner';
import { UserConfirmDeleteModal } from '../../components/Modals/UserConfirmDeleteModal';
import { UsernameEditModal } from '../../components/Modals/UsernameEditModal';
import { useGetUserByUsername } from '../../hooks/useGetUserByUsername';
import { useState } from 'react';
import { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useGetMyPosts } from '../../hooks/useGetMyPosts';
import { AiFillLike } from 'react-icons/ai';
import { randomGradientGen } from '../../utils/randomGradientGen';

export const Profile = () => {
  const { username }: { username: string } = useParams();
  const LoggedInUserId = firebase.auth().currentUser?.uid;
  const { data, isLoading } = useGetUserByUsername(username as string);
  const { data: mypostData, isLoading: myPostLoading } = useGetMyPosts();
  const history = useHistory();

  const [isUserProfile, setIsUserProfile] = useState(false);

  useMemo(() => {
    if (!isLoading && data?.uuid === LoggedInUserId) {
      setIsUserProfile(true);
    }
  }, [LoggedInUserId, data, isLoading]);

  return (
    <LoggedInLayout>
      {isLoading ? (
        <Spinner size='4' />
      ) : (
        <>
          {' '}
          {/* profile section */}
          <section className='border-2  mt-5  border-gray-300  drop-shadow-xl pb-2 rounded-lg'>
            <div
              className={`h-32 `}
              style={{ background: randomGradientGen() }}
            ></div>
            <div className='px-5 flex justify-center flex-col space-y-4'>
              <UserPhotoModal
                firstName={data?.firstName}
                profileUrl={data?.profilePictureUrl}
              />
              <div className='flex justify-between'>
                <div>
                  <h3 className='text-2xl text-gray-800 uppercase font-semibold'>
                    {data?.firstName} {data?.lastName}
                  </h3>
                  {/* position */}
                  <h4 className='text-base text-gray-700'>{data?.headLine}</h4>

                  {/* work place college and Location */}
                  <p className='text-sm text-gray-500 w-64'>
                    <span className='sm:hidden'>
                      {data?.experiences && data?.experiences[0]?.companyName}
                    </span>
                    <span className='sm:hidden'>
                      {' '}
                      {data?.educations && data?.educations[0]?.school}
                    </span>
                    {data?.location} {data?.countryRegion}.{' '}
                  </p>

                  {/* connection count */}
                  <span
                    className='text-blue-800 font-semibold text-base hover:underline cursor-pointer'
                    onClick={() => history.push('/mynetwork/connections')}
                  >
                    {data?.connections.length}{' '}
                    {data?.connections.length > 1
                      ? 'connections'
                      : 'connection'}
                  </span>
                </div>

                {/* work and study orgs */}
                <div className='hidden sm:block'>
                  {data?.educations.length > 0 ? (
                    <div className='flex space-x-2 font-medium text-gray-600'>
                      <MdSchool size={25} color='green' />
                      <p> {data?.educations[0]?.school}</p>
                    </div>
                  ) : (
                    ''
                  )}
                  {data?.experiences.length > 0 ? (
                    <div className='flex space-x-2 font-medium text-gray-600'>
                      <MdWork size={25} color='green' />
                      <p>{data?.experiences[0]?.companyName}</p>
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div className='flex'>
                  {isUserProfile && (
                    <UserInfoModal
                      firstName={data?.firstName}
                      lastName={data?.lastName}
                      countryRegion={data?.countryRegion}
                      currentPosition={data?.currentPosition}
                      education={data?.educations[0]?.school}
                      headLine={data?.headLine}
                      industry={data?.industry}
                      location={data?.location}
                    />
                  )}

                  {isUserProfile && (
                    <UsernameEditModal username={data?.username} />
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* about section */}
          <section className='border-2 my-10 rounded-xl bg-white  border-gray-300 drop-shadow-xl py-6 px-5  space-y-5'>
            <div className='flex justify-between'>
              <h1 className='text-xl font-medium text-gray-500'>About</h1>
              {isUserProfile && <UserAboutModal about={data?.about} />}
            </div>
            <p>{data?.about}</p>
          </section>
          {/* activity section */}
          <section className='border-2 my-10 rounded-xl bg-white  border-gray-300 drop-shadow-xl py-6 px-5  space-y-5'>
            <div className='flex flex-col'>
              <h1 className='text-xl font-medium text-gray-700'>Activity</h1>
              <span className='text-blue-600 font-semibold hover:underline cursor-pointer'>
                {data.connections.length}{' '}
                {data.connections.length > 1 ? 'followers' : 'follower'}
              </span>
            </div>

            {/* real activity */}
            <div className='flex flex-col space-y-5'>
              {myPostLoading ? (
                <Spinner />
              ) : (
                <>
                  {' '}
                  {mypostData?.map((post) => (
                    <div>
                      <h4 className='text-lg text-gray-700 font-semibold space-x-2'>
                        <span>{post.post} </span>
                        <span className='text-base text-gray-500'>
                          {post.likes.length}{' '}
                          <AiFillLike className='inline ml-1' size={20} />
                        </span>
                      </h4>
                      <span className='text-gray-400'>Bishal Shared this</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>
          {/* experience and education section */}
          <section className='border-2 my-10 rounded-xl bg-white border-gray-300 drop-shadow-xl py-8 px-5 space-y-5'>
            <div className='flex justify-between'>
              <h1 className='text-xl font-medium text-gray-500'>Experience</h1>

              {isUserProfile && <UserExperienceModal />}
            </div>

            {data?.experiences.map((item: any, index: number) => (
              <div className='flex space-x-5'>
                <MdWork size={40} color='green' />

                <div className='w-full flex justify-between'>
                  <div>
                    <h3 className='text-xl text-gray-700 font-semibold'>
                      {item.title}
                    </h3>
                    <p className='text-base text-gray-500'>
                      {item.companyName} {item.employmentType}
                    </p>
                  </div>

                  {isUserProfile && (
                    <UserConfirmDeleteModal isExperience data={item} />
                  )}
                </div>
              </div>
            ))}

            <div className='border-b-2 border-gray-200'></div>

            {/* education */}
            <div className='mt-5 flex justify-between'>
              <h1 className='text-xl font-medium text-gray-500'>Education</h1>
              {isUserProfile && <UserEducationModal />}
            </div>

            {data?.educations.map((item: any, index: number) => (
              <div className='flex space-x-5'>
                <MdSchool size={40} color='green' />

                <div className='w-full flex justify-between'>
                  <div>
                    <h3 className='text-xl text-gray-700 font-semibold'>
                      {item.school}
                    </h3>
                    <p className='text-base text-gray-500'>{item.degree}</p>
                  </div>
                  {isUserProfile && (
                    <UserConfirmDeleteModal isEducation data={item} />
                  )}
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </LoggedInLayout>
  );
};
