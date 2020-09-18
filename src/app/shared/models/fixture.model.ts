export interface Fixture {
  fixture_id: number;
  league_id: number;
  league: League;
  event_date: string;
  event_timestamp: number;
  firstHalfStart: number;
  secondHalfStart: number;
  round: string;
  status: string;
  statusShort: string;
  elapsed: number;
  venue: string;
  referee: string;
  homeTeam: FixtureTeam;
  awayTeam: FixtureTeam;
  goalsHomeTeam: number;
  goalsAwayTeam: number;
  score: Score;
  events: FixtureEvent[];
  lineups: any;
  statistics: any;
}

export class FixtureGroup {
  constructor(public country: string,
              public leagueName: string,
              public leagueId: number,
              public logo: string,
              public isFavorite: boolean,
              public fixtures: Fixture[]) {}
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

export interface FixtureTeam {
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

export interface FixtureEvent {
  elapsed: number;
  elapsed_plus: string;
  team_id: number;
  teamName: string;
  player_id: number;
  player: string;
  assist_id: string;
  assist: string;
  type: string;
  detail: string;
  comments: string;
}

export interface FixtureLineUp {
  coach: string;
  coach_id: number;
  formation: string;
  startXI: LineUpPlayer[];
  substitutes: LineUpPlayer[];
}

export interface LineUpPlayer {
  team_id: number;
  player_id: number;
  player: number;
  number: number;
  pos: number;
}

export interface FixtureStatistic {
  home: string;
  away: string;
}

export interface FixturesApiResponse {
  api: Api;
}
