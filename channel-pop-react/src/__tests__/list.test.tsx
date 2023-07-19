import { render, screen, waitFor,  } from "@testing-library/react";
import List from "../components/channelPop/list.component";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

jest.mock("axios");
jest.mock('sweetalert2', () => ({
    fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
  }));
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("renders List component without errors", () => {
  render(
    <BrowserRouter>
      <List />
    </BrowserRouter>
  );
});
test('renders "Create Channel" button', () => {
  render(
    <BrowserRouter>
      <List />
    </BrowserRouter>
  );
  const createButton = screen.getByText(/Create Channel/i);
  expect(createButton).toBeInTheDocument();
});

test('initial state of channels should be an empty array', () => {
    render(<BrowserRouter>
        <List />
      </BrowserRouter>);
    const channelElements = screen.queryAllByRole('row');
    expect(channelElements).toHaveLength(1);
  });

  test('channels should be rendered after data fetching', async () => {
    const mockedData = [
      { id: 1, channelName: 'Channel 1', population: 100 },
      { id: 2, channelName: 'Channel 2', population: 200 },
    ];
    mockedAxios.get.mockResolvedValue({ data: mockedData });
  
    render(<BrowserRouter>
        <List />
      </BrowserRouter>);
    
    await waitFor(() => {
      const channelElements = screen.getAllByRole('row');
      expect(channelElements).toHaveLength(3);
    });
  });
 