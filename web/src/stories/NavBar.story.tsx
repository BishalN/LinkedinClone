import React from "react";

import { Story } from "@storybook/react";
import { NavBar } from "../components/NavBar";

export default {
  title: "NavBar",
  component: NavBar,
  argTypes: { onClick: { action: "clicked" } },
};

const Template: Story = (args) => <NavBar {...args} />;

export const NavBarGeneral = Template.bind({});
NavBarGeneral.args = {
  message: "Successfully uploaded",
  variant: "sucess",
};
