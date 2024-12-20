// Unit tests for: Userlisting

import React from "react";
import axios from "axios";
import { Userlisting } from "../Userlisting";

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

// Mock axios
jest.mock("axios");

describe("Userlisting() Userlisting method", () => {
  // Happy Path Tests
  describe("Happy Paths", () => {
    it('should render the component with the "List" header', () => {
      // Test to ensure the component renders the "List" header
      render(<Userlisting />);
      const headerElement = screen.getByText(/List/i);
      expect(headerElement).toBeInTheDocument();
    });

    it("should fetch and display user data correctly", async () => {
      // Test to ensure the component fetches and displays user data
      const mockData = {
        data: {
          data: [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" },
          ],
        },
      };

      axios.get.mockResolvedValueOnce(mockData);

      render(<Userlisting />);

      // Wait for the data to be rendered
      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      });
    });

    it("should call the API endpoint once", async () => {
      // Test to ensure the API endpoint is called exactly once
      const mockData = {
        data: {
          data: [{ id: 1, name: "John Doe" }],
        },
      };

      axios.get.mockResolvedValueOnce(mockData);

      render(<Userlisting />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
          "http://localhost:3030/api/v1/student/getall"
        );
      });
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle an empty data array gracefully", async () => {
      // Test to ensure the component handles an empty data array
      const mockData = {
        data: {
          data: [],
        },
      };

      axios.get.mockResolvedValueOnce(mockData);

      render(<Userlisting />);

      // Wait for the component to finish rendering
      await waitFor(() => {
        const listItems = screen.queryAllByRole("heading");
        expect(listItems).toHaveLength(0);
      });
    });

    it("should handle API errors gracefully", async () => {
      // Test to ensure the component handles API errors
      axios.get.mockRejectedValueOnce(new Error("API Error"));

      render(<Userlisting />);

      // Wait for the component to finish rendering
      await waitFor(() => {
        const listItems = screen.queryAllByRole("heading");
        expect(listItems).toHaveLength(0);
      });
    });

    it("should handle null or undefined data gracefully", async () => {
      // Test to ensure the component handles null or undefined data
      const mockData = {
        data: {
          data: null,
        },
      };

      axios.get.mockResolvedValueOnce(mockData);

      render(<Userlisting />);

      // Wait for the component to finish rendering
      await waitFor(() => {
        const listItems = screen.queryAllByRole("heading");
        expect(listItems).toHaveLength(0);
      });
    });

    it('should handle data with missing "id" or "name" fields gracefully', async () => {
      // Test to ensure the component handles data with missing fields
      const mockData = {
        data: {
          data: [
            { id: 1, name: "John Doe" },
            { id: null, name: "Jane Smith" },
            { id: 3, name: null },
          ],
        },
      };

      axios.get.mockResolvedValueOnce(mockData);

      render(<Userlisting />);

      // Wait for the component to finish rendering
      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
        expect(screen.queryByText("null")).not.toBeInTheDocument();
      });
    });
  });
});

// End of unit tests for: Userlisting
