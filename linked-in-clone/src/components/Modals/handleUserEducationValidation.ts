import { getMonthFromString } from './handleUserExperienceValidation';

export type UserEducationValue = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  grade: string;
  activitiesAndSociety: string;
  description: string;
};

export type UserEduBack = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  grade: string;
  activitiesAndSociety: string;
  description: string;
  startDate: string;
  endDate: string;
};

type edError = {
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  grade?: string;
  activitiesAndSociety?: string;
  description?: string;
};

export const handleUserEducationValidation = ({
  activitiesAndSociety,
  degree,
  description,
  endMonth,
  endYear,
  fieldOfStudy,
  grade,
  school,
  startMonth,
  startYear,
}: UserEducationValue): edError => {
  const error: edError = {};
  const startDate = new Date(Number(startYear), getMonthFromString(startMonth));
  const endDate = new Date(Number(endYear), getMonthFromString(endMonth));

  if (!activitiesAndSociety)
    error.activitiesAndSociety = 'please enter activitiesAndSociety';
  if (!degree) error.degree = 'Please enter your degree';
  if (!grade) error.grade = 'Please enter your grade';
  if (!fieldOfStudy) error.fieldOfStudy = 'Please enter your fieldOfStudy';
  if (!school) error.school = 'Please enter your school name';
  if (!description) error.description = 'Please enter description';
  if (!startMonth) error.startMonth = 'Please select the start month';

  if (startDate > endDate) {
    error.startMonth = 'start date should be after end date';
    error.endMonth = 'start date should be after end date';
  }
  return error;
};
