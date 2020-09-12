import { Injectable } from '@angular/core';
import {FavoriteTeam, Team} from '../models/team.model';
import {FavoriteLeague, League} from '../models/league.model';
import {FavoriteFixture, Fixture} from '../models/fixture.model';
import {Subject} from 'rxjs';

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

  addTeam(team: Team) {
    const favoriteTeam: FavoriteTeam = {
      teamId: team.team_id,
      teamName: team.name,
      teamLogo: team.logo
    };

    this.teams.set(favoriteTeam.teamId.toString(), favoriteTeam);
    this.favoriteTeamAdded.next(favoriteTeam);
    localStorage.setItem('teams', JSON.stringify(Array.from(this.teams)));
  }

  addLeague(league: League) {
    const favoriteLeague: FavoriteLeague = {
      leagueId: league.league_id,
      leagueName: league.name,
      leagueLogo: league.logo
    };

    this.leagues.set(favoriteLeague.leagueId.toString(), favoriteLeague);
    this.favoriteLeagueAdded.next(favoriteLeague);
    localStorage.setItem('leagues', JSON.stringify(Array.from(this.leagues)));
  }

  addFixture(fixture: Fixture) {
    const favoriteFixture: FavoriteFixture = {
      fixtureId: fixture.fixture_id,
      homeTeamName: fixture.homeTeam.team_name,
      awayTeamName: fixture.awayTeam.team_name,
      homeTeamLogo: fixture.homeTeam.logo,
      awayTeamLogo: fixture.awayTeam.logo
    };

    this.fixtures.set(favoriteFixture.fixtureId.toString(), favoriteFixture);
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
}
