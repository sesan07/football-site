export interface TeamPlayer {
  player_id: string;
  player_name: string;
  firstname: string;
  lastname: string;
  number: number;
  position: string;
  age: number;
  birth_date: string;
  birth_place: string;
  birth_country: string;
  nationality: string;
  height: string;
  weight: string;
}

interface Api {
  results: number;
  players: TeamPlayer[];
}

export interface TeamPlayersApiResponse {
  api: Api;
}
