import { runMusicPlayerDemo } from "../domain/playground";

describe("runMusicPlayerDemo", () => {
  it("ranks matching tracks and returns a queue summary", () => {
    const result = runMusicPlayerDemo({
      search: "Beaver Creek",
      preferredArtist: "Aso",
      mood: "focus"
    });

    expect(result.output).toContain("Now playing: Beaver Creek");
    expect(result.trace).toContain("library size: 8 tracks");
    expect(result.trace.some((line) => line.startsWith("next up: "))).toBe(true);
  });
});
