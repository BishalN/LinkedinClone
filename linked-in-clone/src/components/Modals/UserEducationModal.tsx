import React, { useState } from 'react';
import Modal from 'react-modal';
import { FiEdit2 } from 'react-icons/fi';
import { GrAdd } from 'react-icons/gr';
import { Formik } from 'formik';

import { UserInputWithLabel } from './UserInputWithLabel';
import { Button } from '../Button';
import { UserInputTextareaWithLabel } from './UserInputTextareaWithLabel';
import { IconWithHover } from './IconWithHover';
import { MonthSelector, YearSelector } from './Selectors';
import { AiOutlineClose } from 'react-icons/ai';
import { handleUserEducationValidation } from './handleUserEducationValidation';
import { useSetEducation } from '../../hooks/useSetEducation';

type UserEducationModalProps = { isEditing?: boolean };

export const UserEducationModal: React.FC<UserEducationModalProps> = ({
  isEditing = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync, isLoading, error } = useSetEducation();

  return (
    <div>
      {isEditing ? (
        <IconWithHover
          Icon={
            <FiEdit2
              size={25}
              color='#4B5563'
              onClick={() => setIsModalOpen(true)}
              className='cursor-pointer'
            />
          }
        />
      ) : (
        <IconWithHover
          Icon={
            <GrAdd
              size={20}
              color='#4B5563'
              onClick={() => setIsModalOpen(true)}
              className='cursor-pointer'
            />
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className='h-full w-full sm:h-5/6 sm:mx-auto sm:mt-10 
        p-4 sm:w-9/12 right-auto bottom-auto bg-white border-none rounded-sm overflow-y-auto'
        overlayClassName='Overlay'
        contentLabel='Edit Intro'
      >
        <div className='flex justify-between'>
          <p className='text-xl font-medium text-gray-600 mb-3'>
            {isEditing ? 'Edit education' : 'Add education'}
          </p>
          <IconWithHover
            Icon={
              <AiOutlineClose
                size={25}
                color='#4B5563'
                onClick={() => setIsModalOpen(false)}
              />
            }
          />
        </div>
        <div className='border-b-2 border-gray-100' />
        <Formik
          initialValues={{
            school: '',
            degree: '',
            fieldOfStudy: '',
            startMonth: '',
            startYear: '',
            endMonth: '',
            endYear: '',
            grade: '',
            activitiesAndSociety: '',
            description: '',
          }}
          validate={(values) => {
            const err = handleUserEducationValidation(values);
            return err;
          }}
          onSubmit={async (
            {
              startYear,
              startMonth,
              endMonth,
              activitiesAndSociety,
              degree,
              description,
              endYear,
              fieldOfStudy,
              grade,
              school,
            },
            { setSubmitting }
          ) => {
            const data = {
              degree,
              description,
              grade,
              school,
              fieldOfStudy,
              activitiesAndSociety,
              startDate: `${startMonth}, ${startYear}`,
              endDate: `${endMonth}, ${endYear}`,
            };

            await mutateAsync(data);

            if (!isLoading && !error) {
              setIsModalOpen(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className='space-y-5 mt-5' onSubmit={handleSubmit}>
              <UserInputWithLabel
                label='School'
                name='school'
                value={values.school}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.school}
                placeholder='Ex. Boston University'
                id='school'
                className='w-full'
              />
              <UserInputWithLabel
                name='degree'
                value={values.degree}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.degree}
                label='Degree'
                placeholder='E.x Bachelors'
                id='degree'
                className='w-full'
              />

              <UserInputWithLabel
                label='Field of study'
                name='fieldOfStudy'
                value={values.fieldOfStudy}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.fieldOfStudy}
                id='field'
                placeholder='Ex. Business'
                className='w-full'
              />

              <div>
                <span className='text-gray-600'>Start Date</span>
                {errors.startMonth && (
                  <span className='text-red-500 text-sm block'>
                    {errors.startMonth}
                  </span>
                )}
                <div className='flex space-x-7 '>
                  <MonthSelector
                    className='w-1/2'
                    name='startMonth'
                    value={values.startMonth}
                    onChange={handleChange}
                  />
                  <YearSelector
                    className='w-1/2'
                    name='startYear'
                    value={values.startYear}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <span className='text-gray-600'>End Date</span>
                <div className='flex space-x-7 '>
                  <MonthSelector
                    className='w-1/2'
                    name='endMonth'
                    value={values.endMonth}
                    onChange={handleChange}
                  />
                  <YearSelector
                    className='w-1/2'
                    name='endYear'
                    value={values.endYear}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <UserInputWithLabel
                label='Grade'
                placeholder=''
                id='grade'
                name='grade'
                value={values.grade}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.grade}
                className='w-full'
              />

              <UserInputTextareaWithLabel
                label='Activities and Society'
                id='activities'
                placeholder='Ex. Volleyball'
                className='w-full'
                name='activitiesAndSociety'
                value={values.activitiesAndSociety}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.activitiesAndSociety}
              />

              <UserInputTextareaWithLabel
                label='Description'
                name='description'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description}
                id='desc'
                placeholder='Describe'
                className='w-full'
              />

              <div className='flex justify-end'>
                <Button variant='filled' type='submit' loading={isSubmitting}>
                  Save
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};
