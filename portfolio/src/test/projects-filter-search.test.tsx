import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ProjectsPage } from "../features/pages/ProjectsPage";

describe("Projects filtering and search", () => {
  it("filters by text and tag chips", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    );

    const search = screen.getByLabelText("Search");
    await user.type(search, "spreadsheet");
    expect(screen.getByText("Spreadsheet Lite Engine")).toBeInTheDocument();
    expect(screen.queryByText("Rule Engine Studio")).not.toBeInTheDocument();

    await user.clear(search);
    await user.click(screen.getByRole("button", { name: "Rule Engine" }));
    expect(screen.getByText("Rule Engine Studio")).toBeInTheDocument();
    expect(screen.queryByText("Spreadsheet Lite Engine")).not.toBeInTheDocument();
  });
});
