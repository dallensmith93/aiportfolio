import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { projects } from "../data/projects";
import { CommandPalette } from "../features/components/CommandPalette";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

describe("Command palette", () => {
  it("opens with Ctrl+K and navigates to selected project", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CommandPalette projects={projects} />
      </MemoryRouter>
    );

    await user.keyboard("{Control>}k{/Control}");
    const input = screen.getByPlaceholderText("Search projects or routes...");
    await user.type(input, "spreadsheet");
    await user.keyboard("{Enter}");

    expect(navigateMock).toHaveBeenCalledWith("/projects/spreadsheet-lite-engine");
  });
});
