// createAnswers.test.js
import axios from "axios";
import createAnswers from "../createAnswers";

jest.mock("axios");

describe("createAnswers", () => {
  const mockBody = { questionId: 1, answer: "Sample answer" };
  const mockResponse = { data: { success: true, message: "Answer created successfully" } };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should post data to the API and return the response", async () => {
    // Arrange: Set up mock to resolve with mockResponse
    axios.post.mockResolvedValueOnce(mockResponse);

    // Act: Call createAnswers with the mock body
    const result = await createAnswers(mockBody);

    // Assert: Check that axios.post was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith(global.route + `/answers`, mockBody, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponse.data);
  });

  test("should throw an error if the API call fails", async () => {
    // Arrange: Set up mock to reject with an error
    const mockError = new Error("API call failed");
    axios.post.mockRejectedValueOnce(mockError);

    // Act and Assert: Expect createAnswers to throw an error
    await expect(createAnswers(mockBody)).rejects.toThrow("API call failed");
  });
});
