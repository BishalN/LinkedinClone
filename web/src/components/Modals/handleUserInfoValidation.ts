export type UserInfoValues = {
  firstName: string;
  lastName: string;
  headLine: string;
  currentPosition: string;
  education: string;
  countryRegion: string;
  location: string;
  industry: string;
};

type Error = {
  firstName?: string;
  lastName?: string;
  headLine?: string;
  currentPosition?: string;
  education?: string;
  countryRegion?: string;
  location?: string;
  industry?: string;
};

export const handleUserInfoValidation = ({
  countryRegion,
  currentPosition,
  education,
  firstName,
  headLine,
  lastName,
  location,
}: UserInfoValues): Error => {
  const error: Error = {};
  if (!firstName) error.firstName = "Please enter your first name";
  if (!lastName) error.lastName = "Please enter your last name";
  if (!location) error.location = "Please enter your location";
  if (!headLine) error.headLine = "Please enter your headline";
  if (!education) error.education = "Please enter your education";
  if (!currentPosition)
    error.currentPosition = "Please enter your currentPosition";
  if (!countryRegion) error.countryRegion = "Please enter your country name";

  return error;
};
