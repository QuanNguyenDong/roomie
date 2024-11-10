import "@testing-library/jest-dom";
import mockAxios from "jest-mock-axios"; // Import jest-mock-axios

// Mocking react-router-dom’s useNavigate function
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

// Adding matchMedia polyfill for legacy support
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {},
  };
};

// Mocking gapi-script to prevent errors during Jest tests
jest.mock('gapi-script', () => ({
  gapi: {
    load: jest.fn(),
    auth2: {
      getAuthInstance: jest.fn(() => ({
        signIn: jest.fn(),
      })),
    },
    client: {
      init: jest.fn(),
      calendar: {
        events: {
          list: jest.fn(() => ({
            result: {
              items: [], // Mock empty items or add sample events for testing
            },
          })),
        },
      },
    },
  },
}));

// Ensure each test starts with a fresh mock setup
afterEach(() => {
  mockAxios.reset();      // Reset Axios mocks after each test
  jest.clearAllMocks();    // Clear all other mocks after each test
});

export default mockAxios;
