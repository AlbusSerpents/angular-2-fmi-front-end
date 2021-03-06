interface ProblemInfo {
  id: string;
  name: string;
  creatorId: string;
  creatorName: string;
}

interface ProblemDetails {
  id: string;
  name: string;
  creatorId: string;
  creatorName: string;
  description: string;
}

interface ProblemTest {
  input: string;
  expected: string;
  points: number;
}

interface CreateProblemRequest {
  name: string;
  description: string;
  tests: [ProblemTest];
}

interface CreateProblemResponse {
  id: string;
  name: string;
}

interface ProblemSearch {
  search: string;
}

interface SolutionRequest {
  code: string;
}

interface SolutionResults {
  points: number;
  results: boolean[];
}

interface CompetitionResult {
  score: number;
  userId: string;
  name: string;
}

interface ProblemSubmition {
  user: string;
  submittedAt: string;
  points: number;
}
