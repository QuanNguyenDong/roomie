import axios from "axios";
import leaveHome from "../leaveHome";

// Mock axios
jest.mock("axios");

describe("leaveHome Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should successfully leave a home and return the response data", async () => {
    const mockResponse = { data: { success: true, message: "Left home successfully" } };

    // Mock the axios.delete method to return a successful response
    axios.delete.mockResolvedValueOnce(mockResponse);

    const result = await leaveHome();

    expect(axios.delete).toHaveBeenCalledWith(global.route + "/home/leave", {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle errors and log the error", async () => {
    const mockError = new Error("Network Error");
    console.error = jest.fn(); // Mock console.error

    // Mock axios.delete to throw an error
    axios.delete.mockRejectedValueOnce(mockError);

    const result = await leaveHome();

    expect(axios.delete).toHaveBeenCalledWith(global.route + "/home/leave", {
      withCredentials: true,
    });
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
