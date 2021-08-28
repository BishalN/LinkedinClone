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
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "90vh",
      // width: "70vw",
    },
  };
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
        className=""
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

{
  /* <div
  className="ReactModal__Content ReactModal__Content--after-open"
  tabIndex={-1}
  role="dialog"
  aria-label="Edit Intro"
  aria-modal="true"
  style={{
    position: "absolute",
    inset: "50% auto auto 50%",
    border: "1px solid rgb(204, 204, 204)",
    background: "rgb(255, 255, 255)",
    overflow: "auto",
    borderRadius: 4,
    outline: "none",
    padding: 20,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "90vh",
  }}
>
  <div className="flex items-center justify-between">
    <p className="text-xl font-medium text-gray-600 mb-3">Edit intro</p>
    <div className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-200">
      <span>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 1024 1024"
          color="#4B5563"
          height={25}
          width={25}
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: "rgb(75, 85, 99)" }}
        >
          <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
        </svg>
      </span>
    </div>
  </div>
  <div className="border-b-2 border-gray-100" />
  <form className="space-y-5 mt-5">
    <div className="flex space-x-10">
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-gray-500">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          className="undefined w-96 rounded-sm"
          name="firstName"
          defaultValue="Bishal "
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-gray-500">
          Last Name
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="Last Name"
          className="undefined w-96 rounded-sm"
          name="lastName"
          defaultValue="Neupane"
        />
      </div>
    </div>
    <div className="flex flex-col">
      <label htmlFor="headLine" className="text-gray-500">
        Head Line
      </label>
      <textarea
        id="headLine"
        placeholder="Head Line"
        className="w-full w-96  rounded-sm"
        name="headLine"
        style={{ marginTop: 0, marginBottom: 0, height: 79 }}
        defaultValue={"Web and App developer"}
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="currentPosition" className="text-gray-500">
        Current Position
      </label>
      <input
        type="text"
        id="currentPosition"
        placeholder="Current Position"
        className="w-full w-96 rounded-sm"
        name="currentPosition"
        defaultValue="Freelancer"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="education" className="text-gray-500">
        Education
      </label>
      <input
        type="text"
        id="education"
        placeholder="Education"
        className="w-full w-96 rounded-sm"
        name="education"
        defaultValue
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="countryRegion" className="text-gray-500">
        Country Region
      </label>
      <input
        type="text"
        id="countryRegion"
        placeholder="Country Region"
        className="w-full w-96 rounded-sm"
        name="countryRegion"
        defaultValue="Nepal"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="location" className="text-gray-500">
        Locations in this Country/Region
      </label>
      <input
        type="text"
        id="location"
        placeholder="Location"
        className="w-full w-96 rounded-sm"
        name="location"
        defaultValue="Butwal"
      />
    </div>
    <select name="industry" className="w-full">
      <option value>Choose an industry…</option>
      <option value="Computer Games">Computer Games</option>
      <option value="Computer Hardware">Computer Hardware</option>
      <option value="Computer Networking">Computer Networking</option>
      <option value="Computer Networking">Computer Networking</option>
      <option value="others">others</option>
    </select>
    <div className="flex justify-end">
      <button
        className=" flex justify-center outline-none focus:ring-1 focus:ring-blue-500 
py-2 px-4 rounded-lg text-sm  bg-blue-500 hover:bg-blue-700 text-white  border-blue-500  "
        data-testid="button"
        type="submit"
      >
        <span className="flex items-center">Save</span>
      </button>
    </div>
  </form>
</div>; */
}
