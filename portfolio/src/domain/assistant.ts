import type { PortfolioProject } from "./projects";

export type AssistantCitation = {
  slug: string;
  score: number;
  reasons: string[];
};

export type AssistantAnswer = {
  answer: string;
  citations: AssistantCitation[];
};

export type ProjectAssistantProvider = {
  answer(question: string, projects: PortfolioProject[]): AssistantAnswer;
};

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1);
}

function rankProjects(question: string, projects: PortfolioProject[]): AssistantCitation[] {
  const terms = tokenize(question);
  return projects
    .map((project) => {
      let score = 0;
      const reasons: string[] = [];
      const haystack = `${project.title} ${project.shortDescription} ${project.longDescription}`.toLowerCase();

      for (const term of terms) {
        if (project.tags.some((tag) => tag.toLowerCase().includes(term))) {
          score += 4;
          reasons.push(`tag:${term}`);
        }
        if (project.tech.some((tech) => tech.toLowerCase().includes(term))) {
          score += 2;
          reasons.push(`tech:${term}`);
        }
        if (haystack.includes(term)) {
          score += 1;
          reasons.push(`text:${term}`);
        }
      }

      if (question.toLowerCase().includes(project.slug)) {
        score += 6;
        reasons.push("slug-match");
      }

      return { slug: project.slug, score, reasons };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export class LocalProjectAssistant implements ProjectAssistantProvider {
  answer(question: string, projects: PortfolioProject[]): AssistantAnswer {
    const citations = rankProjects(question, projects);
    if (citations.length === 0) {
      return {
        answer:
          "I could not find a direct match. Try asking about rule engines, feature flags, spreadsheet formulas, testing, or architecture.",
        citations: []
      };
    }

    const topProjects = citations
      .map((citation) => projects.find((project) => project.slug === citation.slug))
      .filter((project): project is PortfolioProject => Boolean(project));

    const answer = topProjects
      .map(
        (project) =>
          `${project.title} (${project.slug}) is relevant for ${project.category.toLowerCase()} work. ${project.shortDescription}`
      )
      .join(" ");

    return { answer, citations };
  }
}

export class OpenAIProjectAssistant implements ProjectAssistantProvider {
  answer(question: string, projects: PortfolioProject[]): AssistantAnswer {
    const fallback = new LocalProjectAssistant().answer(question, projects);
    return {
      answer: `[OpenAI provider stub] ${fallback.answer}`,
      citations: fallback.citations
    };
  }
}

export function getProjectAssistant(): ProjectAssistantProvider {
  const provider = import.meta.env.VITE_PROJECT_ASSISTANT_PROVIDER;
  if (provider?.toLowerCase() === "openai") {
    return new OpenAIProjectAssistant();
  }
  return new LocalProjectAssistant();
}
