import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit2 } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { Formik } from "formik";

import { UserInputWithLabel } from "./UserInputWithLabel";
import { Button } from "../Button";
import { IconWithHover } from "./IconWithHover";
import { UserInputTextareaWithLabel } from "./UserInputTextareaWithLabel";
import { EmploymentSelector, MonthSelector, YearSelector } from "./Selectors";
import { AiOutlineClose } from "react-icons/ai";
import {
  handleUserExperienceValidation,
  UserExpBack,
} from "./handleUserExperienceValidation";
import { useSetExperience } from "../../hooks/useSetExperience";

export const UserExperienceModal: React.FC = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync, isLoading, isSuccess, error } = useSetExperience();

  return (
    <div>
      <IconWithHover
        Icon={
          <GrAdd
            size={20}
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
        <div className="flex justify-between">
          <p className="text-xl font-medium text-gray-600 mb-3">
            Add experience
          </p>
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
            title: "",
            employmentType: "",
            companyName: "",
            location: "",
            isStillOnRole: false,
            startYear: "",
            startMonth: "",
            endMonth: "",
            endYear: "",
            headLine: "",
            Industry: "",
            description: "",
          }}
          validate={(values) => {
            const err = handleUserExperienceValidation(values);
            console.log(err);
            return err;
          }}
          onSubmit={async (
            {
              title,
              Industry,
              companyName,
              description,
              employmentType,
              endMonth,
              endYear,
              headLine,
              isStillOnRole,
              location,
              startMonth,
              startYear,
            },
            { setSubmitting }
          ) => {
            const data = {
              title,
              industry: Industry,
              companyName,
              description,
              employmentType,
              headLine,
              isStillOnRole,
              location,
              startDate: `${startMonth}, ${startYear}`,
              endDate: `${endMonth}, ${endYear}`,
            };

            await mutateAsync(data as UserExpBack);
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
                label="Title"
                name="title"
                placeholder="Ex. Product Manager"
                id="title"
                className="w-full"
                value={values.title}
                onChange={handleChange}
                error={errors.title}
                onBlur={handleBlur}
              />

              <div>
                <span className="text-gray-500">Employment Type</span>
                <EmploymentSelector
                  className="w-full"
                  value={values.employmentType}
                  onChange={handleChange}
                  name="employmentType"
                  onBlur={handleBlur}
                />
              </div>

              <UserInputWithLabel
                label="Company Name"
                name="companyName"
                value={values.companyName}
                onChange={handleChange}
                id="companyName"
                placeholder="Ex. Microsoft"
                className="w-full"
                onBlur={handleBlur}
                error={errors.companyName}
              />
              <UserInputWithLabel
                label="Location"
                placeholder="Ex. London United Kingdom"
                name="location"
                value={values.location}
                onChange={handleChange}
                id="location"
                className="w-full"
                onBlur={handleBlur}
                error={errors.location}
              />
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isStillOnRole"
                  checked={values.isStillOnRole as boolean}
                  onChange={handleChange}
                  id="workStatus"
                  className="rounded text-blue-500 h-6 w-6 checked:outline-none"
                />
                <label htmlFor="workStatus">
                  I'm currently working in this role
                </label>
              </div>

              <div>
                <span className="text-gray-600">Start Date</span>
                {errors.startMonth && (
                  <span className="text-red-500 block">
                    {errors.startMonth}
                  </span>
                )}
                <div className="flex space-x-7 ">
                  <MonthSelector
                    className="w-1/2"
                    name="startMonth"
                    value={values.startMonth}
                    onChange={handleChange}
                  />
                  <YearSelector
                    className="w-1/2"
                    name="startYear"
                    value={values.startYear}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div
                className={
                  values.isStillOnRole ? "bg-gray-200 rounded-xl p-2" : ""
                }
              >
                <span className="text-gray-600">End Date</span>
                <div className="flex space-x-7 ">
                  <MonthSelector
                    className="w-1/2"
                    name="endMonth"
                    value={values.endMonth}
                    disabled={values.isStillOnRole as boolean}
                    onChange={handleChange}
                  />
                  <YearSelector
                    className="w-1/2"
                    name="endYear"
                    value={values.endYear}
                    disabled={values.isStillOnRole as boolean}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <UserInputWithLabel
                label="Head Line"
                placeholder="E.x Software architect"
                id="headLine"
                className="w-full"
                name="headLine"
                value={values.headLine}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.headLine}
              />
              <UserInputWithLabel
                label="Industry"
                placeholder="E.g Software development"
                id="Industry"
                className="w-full"
                value={values.Industry}
                name="Industry"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.Industry}
              />
              <UserInputTextareaWithLabel
                label="Description"
                id="description"
                placeholder="Desribe your role"
                className="w-full"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description}
              />
              <div className="flex justify-end">
                <Button variant="filled" type="submit" loading={isSubmitting}>
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
