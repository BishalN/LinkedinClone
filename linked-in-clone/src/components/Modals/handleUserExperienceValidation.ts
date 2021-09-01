export type UserExperienceValues = {
  title: string;
  employmentType: string;
  companyName: string;
  location: string;
  isStillOnRole: boolean;
  startYear: string;
  startMonth: string;
  endMonth: string;
  endYear: string;
  headLine: string;
  Industry: string;
  description: string;
};

export type UserExpInital = {
  title?: string;
  employmentType?: string;
  companyName?: string;
  location?: string;
  isStillOnRole?: boolean;
  startYear?: string;
  startMonth?: string;
  endMonth?: string;
  endYear?: string;
  headLine?: string;
  Industry?: string;
  description?: string;
};

export type UserExpBack = {
  title: string;
  employmentType: string;
  companyName: string;
  location: string;
  isStillOnRole: boolean;
  headLine: string;
  industry: string;
  description: string;
  startDate: string;
  endDate: string;
};

type ExpError = {
  title?: string;
  employmentType?: string;
  companyName?: string;
  location?: string;
  isStillOnRole?: string;
  headLine?: string;
  Industry?: string;
  description?: string;
  startMonth?: string;
  endMonth?: string;
  startYear?: string;
  endYear?: string;
};

export const handleUserExperienceValidation = ({
  location,
  Industry,
  companyName,
  description,
  employmentType,
  endMonth,
  endYear,
  headLine,
  isStillOnRole,
  startMonth,
  startYear,
  title,
}: UserExperienceValues) => {
  const error: ExpError = {};

  const startDate = new Date(Number(startYear), getMonthFromString(startMonth));
  const endDate = new Date(Number(endYear), getMonthFromString(endMonth));

  if (!isStillOnRole && startDate > endDate) {
    error.endMonth = 'End date should be after start date';
    error.startMonth = 'End date should be after start date';
  }

  if (startMonth?.length === 0)
    error.startMonth = 'Please select the start month';
  if (startYear?.length === 0) error.startYear = 'Please select the start year';
  if (!isStillOnRole && endYear?.length === 0)
    error.endYear = 'Please select the end year';
  if (!isStillOnRole && endMonth?.length === 0)
    error.endMonth = 'Please select the end month';
  if (location?.length === 0) error.location = 'Please enter your location';
  if (Industry?.length === 0) error.Industry = 'Please enter your Industry';
  if (headLine?.length === 0) error.headLine = 'Please enter your head line';
  if (title?.length === 0) error.title = 'Please enter your title';
  if (description?.length === 0)
    error.description = 'Please enter your description';
  if (employmentType?.length === 0)
    error.employmentType = 'Please enter your employmentType';
  if (companyName?.length === 0)
    error.companyName = 'Please enter your company name';
  if (isStillOnRole && endMonth)
    error.isStillOnRole =
      'You are still on role so end date should not be there';

  return error;
};

export function getMonthFromString(mon: string) {
  let d = Date.parse(mon + '1, 2012');
  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
  return -1;
}
