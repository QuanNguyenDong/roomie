import axios from "axios";
import getHome from "../getHome";

// Mock axios
jest.mock("axios");

describe("getHome Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should successfully fetch home data and return the response", async () => {
    const mockResponse = { data: { message: "Success" } };

    // Mock the axios.get method to return a successful response
    axios.get.mockResolvedValueOnce(mockResponse);

    const result = await getHome();

    expect(axios.get).toHaveBeenCalledWith(global.route + "/home", {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle errors and log the error", async () => {
    const mockError = new Error("Network Error");
    console.error = jest.fn(); // Mock console.error

    // Mock axios.get to throw an error
    axios.get.mockRejectedValueOnce(mockError);

    const result = await getHome();

    expect(axios.get).toHaveBeenCalledWith(global.route + "/home", {
      withCredentials: true,
    });
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
