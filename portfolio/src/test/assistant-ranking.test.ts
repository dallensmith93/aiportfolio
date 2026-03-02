import { LocalProjectAssistant } from "../domain/assistant";
import { projects } from "../data/projects";

describe("LocalProjectAssistant", () => {
  it("returns ranked citations for question", () => {
    const assistant = new LocalProjectAssistant();
    const result = assistant.answer(
      "Which project handles feature flags rollout and testing?",
      projects
    );

    expect(result.citations.length).toBeGreaterThan(0);
    expect(result.citations[0].slug).toBe("feature-flags-control-plane");
    expect(result.answer.toLowerCase()).toContain("feature flags");
  });
});
