import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CreateChannelPop from "../components/channelPop/create.component";
import { BrowserRouter } from "react-router-dom";

test("renders the component without errors", () => {
    render(
      <BrowserRouter>
        <CreateChannelPop />
      </BrowserRouter>
    );
  });

  test("submits the form with valid data", async () => {
    render(<BrowserRouter>
        <CreateChannelPop />
      </BrowserRouter>);
  
    const channelNameInput = screen.getByLabelText("Channel Name");
    const populationInput = screen.getByLabelText("Population");
    const saveButton = screen.getByText("Save");
  
    fireEvent.change(channelNameInput, { target: { value: "Test Channel" } });
    fireEvent.change(populationInput, { target: { value: 1 } });
  
    fireEvent.click(saveButton);
  
    // Wait for the form submission and success message
    await screen.findByText("Channel has been created.");
  });

test("shows error message for invalid data", async () => {
  render(<BrowserRouter>
    <CreateChannelPop />
  </BrowserRouter>);

  const channelNameInput = screen.getByLabelText("Channel Name");
  const populationInput = screen.getByLabelText("Population");
  const saveButton = screen.getByText("Save");

  fireEvent.change(channelNameInput, { target: { value: "Test Channel" } });
    fireEvent.change(populationInput, { target: { value: "A4" } });

  fireEvent.click(saveButton);

  // Wait for the validation error message
  await screen.findByText("An error occurred. Channel not created.");
});
