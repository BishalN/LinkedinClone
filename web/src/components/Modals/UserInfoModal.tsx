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
import firebase from "firebase";

export const UserInfoModal = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "90vh",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (
    values: UserInfoValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const uid = firebase.auth().currentUser?.uid;
    const userRef = firebase.firestore().collection("users").doc(uid);
    const userInfoRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("userInfo")
      .doc(uid);
    await userRef.set(
      {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      { merge: true }
    );
    await userInfoRef.set({
      education: values.education,
      headline: values.headLine,
      countryRegion: values.countryRegion,
      currentPosition: values.currentPosition,
      location: values.location,
      industry: values.industry,
    });

    setSubmitting(false);
  };

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
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Edit Intro"
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
        {/* form here */}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            headLine: "",
            currentPosition: "",
            education: "",
            countryRegion: "",
            location: "",
            industry: "",
          }}
          validate={(values) => {
            const err = handleUserInfoValidation(values);
            return err;
          }}
          onSubmit={(values, { setSubmitting }) => {
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
              <div className="flex space-x-10">
                <UserInputWithLabel
                  label="First Name"
                  placeholder="First Name"
                  name="firstName"
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
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={errors.lastName}
                />
              </div>

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
