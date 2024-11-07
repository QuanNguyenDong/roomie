import axios from "axios";
import getUserProfile from "../getUserProfile";

jest.mock("axios");

describe("getUserProfile", () => {
  it("should fetch and return user profile data", async () => {
    const mockUserData = { id: 1, name: "Test User" };
    axios.get.mockResolvedValueOnce({ data: mockUserData });

    const result = await getUserProfile();

    expect(result).toEqual(mockUserData);
    expect(axios.get).toHaveBeenCalledWith(global.route + "/users/profile", {
      withCredentials: true,
    });
  });

  it("should handle errors and return undefined", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    const result = await getUserProfile();

    expect(result).toBeUndefined();
    expect(axios.get).toHaveBeenCalledWith(global.route + "/users/profile", {
      withCredentials: true,
    });
  });
});













