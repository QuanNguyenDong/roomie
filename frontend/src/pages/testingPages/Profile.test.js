import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import axios from "axios"; 
import Profile from "../Profile"; //  this may need adjusting
import "@testing-library/jest-dom";

// Mock axios for API call
jest.mock("axios");

describe("Profile Component", () => {
    const mockUser = {
        fullname: "Jane Doe",
        email: "janedoe@example.com",
        desc: "I love hiking and exploring the outdoors.",
        answers: [
            { question: "What’s your favorite hobby?", answer: "Hiking" },
            { question: "What’s your dream vacation?", answer: "Exploring the Swiss Alps" },
        ],
    };

    beforeEach(() => {
        // Mocking localStorage with the user's profile
        Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUser));
        Storage.prototype.setItem = jest.fn(() => {});
        
        // Mock axios call for fetching user profile
        axios.get.mockResolvedValue({ data: mockUser });
    });

    test("renders the user's profile information", async () => {
        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );

        // Ensure fullname and email are displayed
        await waitFor(() => {
            expect(screen.getByText("Jane Doe")).toBeInTheDocument();
            expect(screen.getByText("janedoe@example.com")).toBeInTheDocument();
        });

        // Ensure user description is displayed
        expect(screen.getByText("I love hiking and exploring the outdoors.")).toBeInTheDocument();
    });

    test("renders the user's answers", async () => {
        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );

        // Wait for the answers to appear
        await waitFor(() => {
            expect(screen.getByText("What’s your favorite hobby?")).toBeInTheDocument();
            expect(screen.getByText("Hiking")).toBeInTheDocument();

            expect(screen.getByText("What’s your dream vacation?")).toBeInTheDocument();
            expect(screen.getByText("Exploring the Swiss Alps")).toBeInTheDocument();
        });
    });

    test("fetches user profile if not found in localStorage", async () => {
        // Clear localStorage to simulate no stored user
        Storage.prototype.getItem = jest.fn(() => null);

        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );

        // Ensure axios API call is made and user data is fetched
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(`${global.route}/users/profile`, { withCredentials: true });
        });

        // Ensure fetched user data is displayed
        expect(screen.getByText("Jane Doe")).toBeInTheDocument();
        expect(screen.getByText("janedoe@example.com")).toBeInTheDocument();
    });

    test("renders a default email if email is missing", async () => {
        const mockUserWithoutEmail = {
            ...mockUser,
            email: null, // No email in profile data
        };
        Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserWithoutEmail));

        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("abc@gmail.com")).toBeInTheDocument(); // Default email
        });
    });
});

