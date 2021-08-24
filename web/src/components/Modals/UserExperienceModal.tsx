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
  UserExperienceValues,
} from "./handleUserExperienceValidation";
import firebase from "../../utils/initFirebase";

type UserExperienceModalProps = { isEditing?: boolean };

export const UserExperienceModal: React.FC<UserExperienceModalProps> = ({
  isEditing = false,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "90vh",
      width: "50vw",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (
    {
      title,
      location,
      headLine,
      employmentType,
      description,
      companyName,
      Industry,
      endMonth,
      endYear,
      isStillOnRole,
      startMonth,
      startYear,
    }: UserExperienceValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const uid = firebase.auth().currentUser?.uid;
    const userExpRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("userExperiences")
      .doc(uid);

    await userExpRef.set(
      {
        title,
        location,
        headline: headLine,
        description,
        employmentType,
        companyName,
        industry: Industry,
        isStillOnRole,
        startDate: `${startMonth}, ${startYear}`,
        endDate: `${endMonth}, ${endYear}`,
      },
      { merge: true }
    );
    setSubmitting(false);
  };

  return (
    <div>
      {isEditing ? (
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
      ) : (
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
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
      >
        <div className="flex justify-between">
          <p className="text-xl font-medium text-gray-600 mb-3">
            {isEditing ? "Edit experience" : "Add experience"}
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
            return err;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log("object");
            handleSubmit(values, setSubmitting);
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
                  checked={values.isStillOnRole}
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
                    disabled={values.isStillOnRole}
                    onChange={handleChange}
                  />
                  <YearSelector
                    className="w-1/2"
                    name="endYear"
                    value={values.endYear}
                    disabled={values.isStillOnRole}
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
