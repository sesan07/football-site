export interface LeagueTopScorer {
  player_id: string;
  player_name: string;
  firstname: string;
  lastname: string;
  position: string;
  nationality: string;
  team_id: number;
  team_name: string;
  goals: Goals;
}

interface Goals {
  total: number;
  assists: number;
}

interface Api {
  results: number;
  topscorers: LeagueTopScorer[];
}

export interface LeagueTopScorersApiResponse {
  api: Api;
}
