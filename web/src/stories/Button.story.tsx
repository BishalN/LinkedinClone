import React from "react";

import { Story } from "@storybook/react";

import { Button, ButtonProps } from "../components/Button";

export default {
  title: "Button",
  component: Button,
  argTypes: { onClick: { action: "clicked" } },
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Ghost = Template.bind({});
Ghost.args = {
  variant: "ghost",
  children: "Sign in",
  size: "big",
};

export const Filled = Template.bind({});
Filled.args = {
  variant: "filled",
  size: "big",
  children: "Log in",
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "outlined",
  children: "Submit",
  size: "tiny",
};
