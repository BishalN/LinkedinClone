import React from "react";

import { Story } from "@storybook/react";
import { Alert, AlertProps } from "../components/Alert";

export default {
  title: "Alert",
  component: Alert,
  argTypes: { onClick: { action: "clicked" } },
};

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const AlertSuccess = Template.bind({});
AlertSuccess.args = {
  message: "Successfully uploaded",
  variant: "sucess",
};

export const AlertFailure = Template.bind({});
AlertFailure.args = {
  message: "Email already in use",
  variant: "failure",
};
