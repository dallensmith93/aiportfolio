import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProjectsPage } from "../features/pages/ProjectsPage";

describe("ProjectsPage", () => {
  it("renders heading and filter chips", () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Projects" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "All" }).length).toBeGreaterThan(0);
  });
});
