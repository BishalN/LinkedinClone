import { useState } from "react";
import Modal from "react-modal";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Formik } from "formik";

import { UserInputWithLabel } from "./UserInputWithLabel";
import { Button } from "../Button";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { IconWithHover } from "./IconWithHover";
import {
  handleUserInfoValidation,
  UserInfoValues,
} from "./handleUserInfoValidation";
import { IndustrySelector } from "./Selectors";
import { useSetInfo } from "../../hooks/useSetInfo";
import { modalClassName } from "../../utils/modalClassName";

export const UserInfoModal: React.FC<UserInfoValues> = ({
  countryRegion,
  currentPosition,
  education,
  firstName,
  headLine,
  industry,
  lastName,
  location,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync, error, isSuccess, isLoading } = useSetInfo();

  return (
    <div>
      <IconWithHover
        Icon={
          <FiEdit2
            size={25}
            color="#4B5563"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer"
          />
        }
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
        className="h-full w-full sm:h-5/6 sm:mx-auto sm:mt-10 
        p-4 sm:w-9/12 right-auto bottom-auto bg-white border-none rounded-sm overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-gray-600 mb-3">Edit intro</p>
          <IconWithHover
            Icon={
              <AiOutlineClose
                size={25}
                color="#4B5563"
                onClick={() => setIsModalOpen(false)}
              />
            }
          />
        </div>
        <div className="border-b-2 border-gray-100" />
        <Formik
          initialValues={{
            firstName,
            lastName,
            headLine,
            currentPosition,
            education,
            countryRegion,
            location,
            industry,
          }}
          validate={(values) => {
            const err = handleUserInfoValidation(values);
            return err;
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            await mutateAsync(values);
            if (error) {
              console.log(error);
            }
            setSubmitting(false);
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
            <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
              <UserInputWithLabel
                label="First Name"
                placeholder="First Name"
                name="firstName"
                className="w-full "
                id="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={errors.firstName}
              />

              <UserInputWithLabel
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                id="firstName"
                className="w-full "
                onBlur={handleBlur}
                value={values.lastName}
                error={errors.lastName}
              />

              <UserInputTextareaWithLabel
                onChange={handleChange}
                label="Head Line"
                id="headLine"
                name="headLine"
                onBlur={handleBlur}
                placeholder="Head Line"
                className="w-full"
                value={values.headLine}
                error={errors.headLine}
              />

              <UserInputWithLabel
                label="Current Position"
                onChange={handleChange}
                name="currentPosition"
                placeholder="Current Position"
                onBlur={handleBlur}
                id="currentPosition"
                className="w-full"
                value={values.currentPosition}
                error={errors.currentPosition}
              />
              <UserInputWithLabel
                label="Education"
                onChange={handleChange}
                onBlur={handleBlur}
                name="education"
                className="w-full"
                id="education"
                placeholder="Education"
                value={values.education}
                error={errors.education}
              />
              <UserInputWithLabel
                label="Country Region"
                className="w-full"
                name="countryRegion"
                onBlur={handleBlur}
                onChange={handleChange}
                id="countryRegion"
                placeholder="Country Region"
                value={values.countryRegion}
                error={errors.countryRegion}
              />
              <UserInputWithLabel
                label="Locations in this Country/Region"
                className="w-full"
                onChange={handleChange}
                name="location"
                id="location"
                onBlur={handleBlur}
                placeholder="Location"
                value={values.location}
                error={errors.location}
              />

              <IndustrySelector
                className="w-full"
                onBlur={handleBlur}
                value={values.industry}
                onChange={handleChange}
                name="industry"
              />

              <div className="flex justify-end">
                <Button
                  variant="filled"
                  type="submit"
                  className=""
                  loading={isSubmitting}
                >
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
