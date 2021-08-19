import React from "react";
import { render } from "../../test-utils";
import { Button } from "../components/Button";

describe("Button", () => {
  it("renders the button", () => {
    const { getByText } = render(<Button title="Click me" />);
    const text = getByText("Click me");

    expect(text).toBeVisible();
  });
});
