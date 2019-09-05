interface CompetitionInfo {
  id: string;
  name: string;
  creatorId: string;
  creatorName: string;
}

interface CompetitionProblem {
  id: string;
  name: string;
}

interface CompetitionStandingsRecord {
  userId: string;
  name: string;
  score: number;
}

interface CompetitionDetails {
  id: string;
  name: string;
  problems: CompetitionProblem[]
  creatorId: string;
  creatorName: string;
  submitions: number;
}

interface CompetitionSearch {
  search: string;
}

interface CompetitionEntry {
  score: number;
}
