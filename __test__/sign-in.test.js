import { render, waitFor } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "next-router-mock";
import Dashboard from "@/app/dashboard"; // Adjust the import path as necessary
import { getUserFromCookie } from "@/app/actions"; // Adjust the import path as necessary

// Mock `getUserFromCookie` to simulate an unauthenticated user
jest.mock("@/app/actions", () => ({
  getUserFromCookie: jest.fn(),
}));

describe("Dashboard", () => {
  it("redirects unauthenticated users to the login page", async () => {
    // Mock `getUserFromCookie` to return null (unauthenticated)
    getUserFromCookie.mockResolvedValue(null);

    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Dashboard />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/sign-in");
    });
  });
});
