import React from "react";
import { LoggedInLayout } from "../../components/LoggedInLayout";
import { MdSchool, MdWork } from "react-icons/md";
import { UserInfoModal } from "../../components/Modals/UserInfoModal";
import { UserAboutModal } from "../../components/Modals/UserAboutModal";
import { UserExperienceModal } from "../../components/Modals/UserExperienceModal";
import { UserEducationModal } from "../../components/Modals/UserEducationModal";
import { UserPhotoModal } from "../../components/Modals/UserPhotoModal";
import { useQuery } from "react-query";
import { getUserInfo } from "../../utils/queryFunctions";
import { Spinner } from "../../components/Spinner";
import { UserConfirmDeleteModal } from "../../components/Modals/UserConfirmDeleteModal";

const Profile = () => {
  const { data, isLoading } = useQuery("userInfo", getUserInfo);

  if (isLoading) {
    return <Spinner size="4" />;
  }

  return (
    <LoggedInLayout>
      {/* profile section */}
      <section className="border-2  mt-5  border-gray-300  drop-shadow-xl pb-2 rounded-lg">
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 h-32 "></div>
        <div className="px-5 flex justify-center flex-col space-y-4">
          <UserPhotoModal
            firstName={data?.firstName}
            profileUrl={data?.profilePictureUrl}
          />
          <div className="flex justify-between">
            <div>
              <h3 className="text-2xl text-gray-800 uppercase font-semibold">
                {data?.firstName} {data?.lastName}
              </h3>
              {/* position */}
              <h4 className="text-base text-gray-700">{data?.headLine}</h4>

              {/* work place college and Location */}
              <p className="text-sm text-gray-500 w-64">
                <span className="sm:hidden">
                  {data?.experiences[0]?.companyName}
                </span>
                <span className="sm:hidden">
                  {" "}
                  {data?.educations[0]?.school}
                </span>
                {data?.location} {data?.countryRegion}.{" "}
                <span className="text-blue-800 inline font-semibold text-base hover:underline cursor-pointer">
                  Contact Info
                </span>
              </p>

              {/* connection count */}
              <span className="text-blue-800 font-semibold text-base hover:underline cursor-pointer">
                194 connections
              </span>
            </div>

            {/* work and study orgs */}
            <div className="hidden sm:block">
              {data?.educations.length > 0 ? (
                <div className="flex space-x-2 font-medium text-gray-600">
                  <MdSchool size={25} color="green" />
                  <p> {data?.educations[0]?.school}</p>
                </div>
              ) : (
                ""
              )}
              {data?.experiences.length > 0 ? (
                <div className="flex space-x-2 font-medium text-gray-600">
                  <MdWork size={25} color="green" />
                  <p>{data?.experiences[0]?.companyName}</p>
                </div>
              ) : (
                ""
              )}
            </div>

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
          </div>
        </div>
      </section>

      {/* about section */}
      <section className="border-2 my-10 rounded-xl bg-white  border-gray-300 drop-shadow-xl py-6 px-5  space-y-5">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium text-gray-500">About</h1>
          <UserAboutModal about={data?.about} />
        </div>
        <p>{data?.about}</p>
      </section>

      {/* activity section */}
      <section className="border-2 my-10 rounded-xl bg-white  border-gray-300 drop-shadow-xl py-6 px-5  space-y-5">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium text-gray-700">Activity</h1>
          <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
            192 followers
          </span>
        </div>

        {/* real activity */}
        <div className="flex space-x-2">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="a cat"
            className="h-20 w-20 object-cover"
          />
          <div>
            <h4 className="text-lg text-gray-700 font-semibold">
              Just finished working on new project with my friend bob
            </h4>
            <span className="text-gray-400">Bishal Shared this</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="a cat"
            className="h-20 w-20 object-cover"
          />
          <div>
            <h4 className="text-lg text-gray-700 font-semibold">
              Just finished working on new project with my friend bob
            </h4>
            <span className="text-gray-400">Bishal Shared this</span>
          </div>
        </div>
      </section>

      {/* experience and education section */}
      <section className="border-2 my-10 rounded-xl bg-white border-gray-300 drop-shadow-xl py-8 px-5 space-y-5">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium text-gray-500">Experience</h1>

          <UserExperienceModal />
        </div>

        {data?.experiences.map((item: any, index: number) => (
          <div className="flex space-x-5">
            <MdWork size={40} color="green" />

            <div className="w-full flex justify-between">
              <div>
                <h3 className="text-xl text-gray-700 font-semibold">
                  {item.title}
                </h3>
                <p className="text-base text-gray-500">
                  {item.companyName} {item.employmentType}
                </p>
              </div>

              <UserConfirmDeleteModal isExperience data={item} />
            </div>
          </div>
        ))}

        <div className="border-b-2 border-gray-200"></div>

        {/* education */}
        <div className="mt-5 flex justify-between">
          <h1 className="text-xl font-medium text-gray-500">Education</h1>
          <UserEducationModal />
        </div>

        {data?.educations.map((item: any, index: number) => (
          <div className="flex space-x-5">
            <MdSchool size={40} color="green" />

            <div className="w-full flex justify-between">
              <div>
                <h3 className="text-xl text-gray-700 font-semibold">
                  {item.school}
                </h3>
                <p className="text-base text-gray-500">{item.degree}</p>
              </div>
              <UserConfirmDeleteModal isEducation data={item} />
            </div>
          </div>
        ))}
      </section>
    </LoggedInLayout>
  );
};

export default Profile;
