export interface Favorite {
  id: number;
  clickCount: number;
}

export interface FavoriteLeague extends Favorite{
  leagueName: string;
  leagueLogo: string;
}

export interface FavoriteTeam extends Favorite {
  teamName: string;
  teamLogo: string;
}

export interface FavoriteFixture extends Favorite {
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
}
