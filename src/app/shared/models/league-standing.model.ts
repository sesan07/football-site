export interface LeagueStanding {
  matchsPlayed: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface LeagueTeamStanding {
  rank: number;
  team_id: number;
  teamName: string;
  logo: string;
  group: string;
  forme: string;
  status: string;
  description: string;
  all: LeagueStanding;
  home: LeagueStanding;
  away: LeagueStanding;
  goalsDiff: number;
  points: number;
  lastUpdate: string;
}

interface Api {
  results: number;
  standings: LeagueTeamStanding[][];
}

export interface LeagueStandingsApiResponse {
  api: Api;
}
