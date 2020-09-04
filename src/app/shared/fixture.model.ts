export interface Fixture {
  fixture_id: number;
  league_id: number;
  league: League;
  event_date: string;
  event_timestamp: string;
  firstHalfStart: string;
  secondHalfStart: string;
  round: string;
  status: string;
  statusShort: string;
  elapsed: string;
  venue: string;
  referee: string;
  homeTeam: Team;
  awayTeam: Team;
  goalsHomeTeam: string;
  goalsAwayTeam: string;
  score: Score;
}

export class FixtureGroup {
  constructor(public country: string, public league: string, public fixtures: Fixture[]) {}
}

interface Api {
  results: number;
  fixtures: Fixture[];
}

interface League {
  name: string;
  country: string;
  logo: string;
  flag: string;
}

interface Team {
  team_id: number;
  team_name: string;
  logo: string;
}

interface Score {
  halftime: string;
  fulltime: string;
  extratime: string;
  penalty: string;
}

export interface FixturesApiResponse {
  api: Api;
}
