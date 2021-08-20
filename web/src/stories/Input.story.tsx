import React from "react";

import { Story } from "@storybook/react";

import { Input, InputProps } from "../components/Input";

export default {
  title: "Input",
  component: Input,
  argTypes: { onClick: { action: "clicked" } },
};

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const EmailField = Template.bind({});
EmailField.args = {
  placeholder: "Enter an email address",
};

export const PasswordFiled = Template.bind({});
PasswordFiled.args = {
  type: "password",
  placeholder: "password",
};
