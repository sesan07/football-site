export class TeamStatistic {
  constructor(public name: string,
              public home: string,
              public away: string,
              public total: string) {}
}

class Statistic {
  home: string;
  away: string;
  total: string;
}

interface Api {
  results: number;
  statistics: Statistics;
}

interface Statistics {
  matchs: Matches;
  goals: Goals;
  goalsAvg: GoalsAverage;
}

interface Matches {
  matchsPlayed: Statistic;
  wins: Statistic;
  draws: Statistic;
  loses: Statistic;
}

interface Goals {
  goalsFor: Statistic;
  goalsAgainst: Statistic;
}

interface GoalsAverage {
  goalsFor: Statistic;
  goalsAgainst: Statistic;
}

export interface TeamStatisticsApiResponse {
  api: Api;
}
