import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../Button';
import { IconWithHover } from './IconWithHover';
import { MdDelete } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { UserExpBack } from './handleUserExperienceValidation';
import { UserEduBack } from './handleUserEducationValidation';
import { useDeleteExperience } from '../../hooks/useDeleteExperience';
import { useDelteEducation } from '../../hooks/useDeleteEducation';
import { useDeleteComment } from '../../hooks/useDeleteComment';

type UserConfirmDeleteModalProps = {
  isEducation?: boolean;
  isExperience?: boolean;
  isComment?: boolean;
  data: UserExpBack | UserEduBack | { postId: string; commentId: string };
};

export const UserConfirmDeleteModal: React.FC<UserConfirmDeleteModalProps> = ({
  isEducation,
  children,
  isExperience,
  isComment,
  data,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync: delExp, isLoading: delExpLoading } =
    useDeleteExperience();
  // const {} = usedelet
  const { mutateAsync: delEdu, isLoading: delEduLoading } = useDelteEducation();
  const { mutateAsync: delCmnt, isLoading: delCmntLoading } =
    useDeleteComment();

  return (
    <div>
      <IconWithHover
        Icon={
          <MdDelete
            size={25}
            color='#F87171'
            onClick={() => setIsModalOpen(true)}
          />
        }
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        overlayClassName='Overlay'
        contentLabel='Confirm Deletion'
        className='h-full w-full sm:h-1/4 sm:w-1/2 sm:mx-auto sm:mt-10 
        p-4 right-auto bottom-auto bg-white border-none rounded-sm overflow-y-auto'
      >
        <div className='flex justify-between'>
          <p className='text-xl font-medium text-gray-600 mb-3'>
            Delete {isEducation && 'Education'} {isExperience && 'Experience'}{' '}
            {isComment && 'Comment'}
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
        <p className='mt-5 text-gray-700'>
          Are you sure? this can't be reversed
        </p>
        <div className='flex justify-end'>
          <Button
            variant='filled'
            type='submit'
            loading={delExpLoading || delEduLoading || delCmntLoading}
            onClick={async () => {
              if (isExperience) {
                await delExp(data as UserExpBack);
                setIsModalOpen(false);
              } else if (isEducation) {
                await delEdu(data as UserEduBack);
                setIsModalOpen(false);
              } else if (isComment) {
                //delete the comment
                await delCmnt({
                  commentId: (data as any).commentId!,
                  postId: (data as any).postId!,
                });
                setIsModalOpen(false);
              }
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};
