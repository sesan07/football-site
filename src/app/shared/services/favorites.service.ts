import { Injectable } from '@angular/core';
import {League} from '../models/league.model';
import {Fixture} from '../models/fixture.model';
import {Subject} from 'rxjs';
import {FavoriteFixture, FavoriteLeague, FavoriteTeam} from '../models/favorite.model';
import {Team} from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly teams = new Map<string, FavoriteTeam>();
  private readonly leagues = new  Map<string, FavoriteLeague>();
  private readonly fixtures = new  Map<string, FavoriteFixture>();

  favoriteTeamAdded = new Subject();
  favoriteLeagueAdded = new Subject();
  favoriteFixtureAdded = new Subject();

  favoriteTeamRemoved = new Subject<number>();
  favoriteLeagueRemoved = new Subject<number>();
  favoriteFixtureRemoved = new Subject<number>();

  constructor() {
    // localStorage.clear()

    const isFirstLaunch = localStorage.getItem('isFirstLaunch');
    if (isFirstLaunch === null) {
      FavoritesService.populateStartingFavorites();
      localStorage.setItem('isFirstLaunch', 'false');
    }

    const teams: [string, FavoriteTeam][] = JSON.parse(localStorage.getItem('teams'));
    const leagues: [string, FavoriteLeague][] = JSON.parse(localStorage.getItem('leagues'));
    const fixtures: [string, FavoriteFixture][] = JSON.parse(localStorage.getItem('fixtures'));

    if (teams) {
      teams.forEach(value => { this.teams.set(value[0], value[1]); });
    }

    if (leagues) {
      leagues.forEach(value => { this.leagues.set(value[0], value[1]); });
    }

    if (fixtures) {
      fixtures.forEach(value => { this.fixtures.set(value[0], value[1]); });
    }
  }

  private static populateStartingFavorites() {
    const teams: Map<string, FavoriteTeam> = new Map([
      ['49',
        {
          id: 49,
          teamName: 'Chelsea',
          teamLogo: 'https://media.api-sports.io/football/teams/49.png',
          clickCount: 0
        }],
      ['541',
        {
          id: 541,
          teamName: 'Real Madrid',
          teamLogo: 'https://media.api-sports.io/football/teams/541.png',
          clickCount: 0
        }]
    ]);

    const leagues: Map<string, FavoriteLeague> = new Map([
      ['2790',
        {
          id: 2790,
          leagueName: 'Premier League',
          leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
          clickCount: 0
        }],
      ['1264',
        {
          id: 1264,
          leagueName: 'Major League Soccer',
          leagueLogo: 'https://media.api-sports.io/football/leagues/253.png',
          clickCount: 0
        }],
      ['2833',
        {
          id: 2833,
          leagueName: 'Primera Division',
          leagueLogo: 'https://media.api-sports.io/football/leagues/140.png',
          clickCount: 0
        }]
    ]);

    const fixtures: Map<string, FavoriteFixture> = new Map([
      ['568714',
        {
          id: 568714,
          homeTeamName: 'Reno 1868',
          awayTeamName: 'Tacoma Defiance',
          homeTeamLogo: 'https://media.api-sports.io/football/teams/4013.png',
          awayTeamLogo: 'https://media.api-sports.io/football/teams/4020.png',
          clickCount: 0
        }],
      ['589665',
        {
          id: 589665,
          homeTeamName: 'Tampico Madero',
          awayTeamName: 'Monarcas',
          homeTeamLogo: 'https://media.api-sports.io/football/teams/2304.png',
          awayTeamLogo: 'https://media.api-sports.io/football/teams/2284.png',
          clickCount: 0
        }]
    ]);

    localStorage.setItem('teams', JSON.stringify(Array.from(teams)));
    localStorage.setItem('leagues', JSON.stringify(Array.from(leagues)));
    localStorage.setItem('fixtures', JSON.stringify(Array.from(fixtures)));
  }

  addTeam(team: Team) {
    const favoriteTeam: FavoriteTeam = {
      id: team.team_id,
      teamName: team.name,
      teamLogo: team.logo,
      clickCount: 0
    };

    this.teams.set(favoriteTeam.id.toString(), favoriteTeam);
    this.favoriteTeamAdded.next(favoriteTeam);
    localStorage.setItem('teams', JSON.stringify(Array.from(this.teams)));
  }

  addLeague(league: League) {
    const favoriteLeague: FavoriteLeague = {
      id: league.league_id,
      leagueName: league.name,
      leagueLogo: league.logo,
      clickCount: 0
    };

    this.leagues.set(favoriteLeague.id.toString(), favoriteLeague);
    this.favoriteLeagueAdded.next(favoriteLeague);
    localStorage.setItem('leagues', JSON.stringify(Array.from(this.leagues)));
  }

  addFixture(fixture: Fixture) {
    const favoriteFixture: FavoriteFixture = {
      id: fixture.fixture_id,
      homeTeamName: fixture.homeTeam.team_name,
      awayTeamName: fixture.awayTeam.team_name,
      homeTeamLogo: fixture.homeTeam.logo,
      awayTeamLogo: fixture.awayTeam.logo,
      clickCount: 0
    };

    this.fixtures.set(favoriteFixture.id.toString(), favoriteFixture);
    this.favoriteFixtureAdded.next(favoriteFixture);

    localStorage.setItem('fixtures', JSON.stringify(Array.from(this.fixtures)));
  }

  removeTeam(teamId: number) {
    this.teams.delete(teamId.toString());
    this.favoriteTeamRemoved.next(teamId);

    localStorage.setItem('teams', JSON.stringify(Array.from(this.teams)));
  }

  removeLeague(leagueId: number) {
    this.leagues.delete(leagueId.toString());
    this.favoriteLeagueRemoved.next(leagueId);

    localStorage.setItem('leagues', JSON.stringify(Array.from(this.leagues)));
  }

  removeFixture(fixtureId: number) {
    this.fixtures.delete(fixtureId.toString());
    this.favoriteFixtureRemoved.next(fixtureId);

    localStorage.setItem('fixtures', JSON.stringify(Array.from(this.fixtures)));
  }

  getTeams(): FavoriteTeam[] {
    return [...this.teams.values()];
  }

  getLeagues(): FavoriteLeague[] {
    return [...this.leagues.values()];
  }

  getFixtures(): FavoriteFixture[] {
    return [...this.fixtures.values()];
  }

  isFavoriteTeam(teamId: number) {
    return this.teams.has(teamId.toString());
  }

  isFavoriteLeague(leagueId: number) {
    return this.leagues.has(leagueId.toString());
  }

  isFavoriteFixture(fixtureId: number) {
    return this.fixtures.has(fixtureId.toString());
  }

  teamClicked(teamId: number) {
    this.teams.get(teamId.toString()).clickCount++;
    localStorage.setItem('teams', JSON.stringify(Array.from(this.teams)));
  }

  leagueClicked(leagueId: number) {
    this.leagues.get(leagueId.toString()).clickCount++;
    localStorage.setItem('leagues', JSON.stringify(Array.from(this.leagues)));
  }

  fixtureClicked(fixtureId: number) {
    this.fixtures.get(fixtureId.toString()).clickCount++;
    localStorage.setItem('fixtures', JSON.stringify(Array.from(this.fixtures)));
  }
}
