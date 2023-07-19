import { render, waitFor, screen } from "@testing-library/react";
import UpdateChannel from "../components/channelPop/update.component";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const mock = new MockAdapter(axios);

const mockChannel = {
  channelName: "Test Channel",
  population: "1000",
};

describe("UpdateChannel", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should fetch and populate data on mount", async () => {
    mock.onGet("http://localhost:8000/api/channels/1").reply(200, {
      channel: mockChannel,
    });

    render(
        <MemoryRouter initialEntries={["/1"]}>
          <Routes>
            <Route path="/:id" element={<UpdateChannel />} />
          </Routes>
        </MemoryRouter>
      );

    await waitFor(() => {
      expect(screen.getByLabelText("Nazwa kanału")).toHaveValue(mockChannel.channelName);
    });
    await waitFor(() => {
        expect(screen.getByLabelText("Ilość")).toHaveValue(mockChannel.population);
    })
  });
})