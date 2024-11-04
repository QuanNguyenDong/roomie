import axios from "axios";
import joinHome from "../joinHome";

// Mock axios
jest.mock("axios");

describe("joinHome Service", () => {
  const mockBody = { homeId: "12345", userId: "67890" };

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should successfully join a home and return the response", async () => {
    const mockResponse = { data: { success: true, message: "Joined successfully" } };

    // Mock the axios.post method to return a successful response
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await joinHome(mockBody);

    expect(axios.post).toHaveBeenCalledWith(global.route + "/home/join", mockBody, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponse);
  });

  it("should handle errors and return the error response data", async () => {
    const mockErrorResponse = {
      response: { data: { success: false, message: "Failed to join home" } },
    };
    console.error = jest.fn(); // Mock console.error

    // Mock axios.post to throw an error
    axios.post.mockRejectedValueOnce(mockErrorResponse);

    const result = await joinHome(mockBody);

    expect(axios.post).toHaveBeenCalledWith(global.route + "/home/join", mockBody, {
      withCredentials: true,
    });
    expect(result).toEqual(mockErrorResponse.response.data);
    expect(console.error).toHaveBeenCalledWith(mockErrorResponse);
  });
});
