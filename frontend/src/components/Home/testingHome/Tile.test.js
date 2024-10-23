import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For additional matchers like toBeInTheDocument
import Tile from "../Tile";

// Mock task data
const mockTask = {
  title: "Mock Task",
  fullname: "Test User",
  priority: "High",
  dueDate: "2024-10-31",
  duration: 45,
};

describe("Tile Component", () => {
  it("renders task title, due date, and duration correctly", () => {
    render(<Tile task={mockTask} />);

    // Check if task title is rendered
    expect(screen.getByText("Mock Task")).toBeInTheDocument();
    
    // Check if due date is rendered
    expect(screen.getByText("2024-10-31")).toBeInTheDocument();

    // Check if task duration is rendered
    expect(screen.getByText("45 minutes")).toBeInTheDocument();
  });

  it("renders the user's initial correctly", () => {
    render(<Tile task={mockTask} />);
    
    // Check if the first letter of the user's name is rendered
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("renders default values when task properties are missing", () => {
    const emptyTask = {};
    render(<Tile task={emptyTask} />);

    // Check if default task title is rendered
    expect(screen.getByText("Task Name")).toBeInTheDocument();

    // Check if default due date is rendered
    expect(screen.getByText("No due date")).toBeInTheDocument();

    // Check if default duration text is rendered
    expect(screen.getByText("Duration unknown")).toBeInTheDocument();
  });

  it("applies the correct priority background color", () => {
    const { container } = render(<Tile task={mockTask} />);

    // Check if the background color corresponds to the task priority
    expect(container.firstChild).toHaveStyle(`background-color: #C49191`);
  });
});
