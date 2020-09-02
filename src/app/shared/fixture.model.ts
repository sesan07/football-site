export interface Fixture {
  fixture_id: number;
  league_id: number;
}

interface Api {
  results: number;
  fixtures: Fixture[];
}

export interface FixturesApiResponse {
  api: Api;
}
