export interface Team {
  team_id: number;
  name: string;
  code: string;
  logo: string;
  is_national: boolean;
  country: string;
  founded: number;
  venue_name: string;
  venue_surface: string;
  venue_address: string;
  venue_city: string;
  venue_capacity: number;
}

interface Api {
  results: number;
  teams: Team[];
}

export interface TeamApiResponse {
  api: Api;
}

export interface FavoriteTeam {
  teamId: number;
  teamName: string;
  teamLogo: string;
}
