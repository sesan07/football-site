import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FixturesApiResponse} from '../models/fixture.model';
import {TeamApiResponse} from '../models/team.model';
import {TeamPlayersApiResponse} from '../models/team-player.model';
import {LeaguesApiResponse} from '../models/league.model';
import {TeamStatisticsApiResponse} from '../models/team-statistic.model';
import {LeagueTopScorersApiResponse} from '../models/league-top-scorer.model';
import {LeagueStandingsApiResponse} from '../models/league-standing.model';
import {SeasonApiResponse} from '../models/season.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = 'https://v2.api-football.com';
  private readonly TEST_MODE = false;

  constructor(private http: HttpClient) { }

  getAllFixtures(date: string) {
    const url = this.TEST_MODE ? 'assets/test-data/all-fixtures.json' : this.BASE_URL + '/fixtures/date/' + date;
    return this.http.get<FixturesApiResponse>(
      url
    );
  }

  getLiveFixtures() {
    const url = this.TEST_MODE ? 'assets/test-data/live-fixtures.json' : this.BASE_URL + '/fixtures/live';
    return this.http.get<FixturesApiResponse>(
      url
    );
  }

  getSeasons() {
    const url = this.TEST_MODE ? 'assets/test-data/seasons.json' : this.BASE_URL + '/seasons';
    return this.http.get<SeasonApiResponse>(
      url
    );
  }

  getTeam(id: number) {
    const url = this.TEST_MODE ? 'assets/test-data/team.json' : this.BASE_URL + '/teams/team/' + id;
    return this.http.get<TeamApiResponse>(
      url
    );
  }

  getSquad(teamId: number, season: string) {
    const url = this.TEST_MODE ? 'assets/test-data/team-players.json' : this.BASE_URL + '/players/squad/' + teamId + '/' + season;
    return this.http.get<TeamPlayersApiResponse>(
      url
    );
  }

  getTeamLeagues(teamId: number) {
    const url = this.TEST_MODE ? 'assets/test-data/team-leagues.json' : this.BASE_URL + '/leagues/team/' + teamId;
    return this.http.get<LeaguesApiResponse>(
      url
    );
  }

  getTeamStatistics(teamId: number, leagueId: number) {
    const url = this.TEST_MODE ? 'assets/test-data/team-statistics.json' : this.BASE_URL + '/statistics/' + leagueId + '/' + teamId;
    return this.http.get<TeamStatisticsApiResponse>(
      url
    );
  }

  getTeamFixtures(teamId: number) {
    const url = this.TEST_MODE ? 'assets/test-data/team-fixtures.json' : this.BASE_URL + '/fixtures/team/' + teamId;
    return this.http.get<FixturesApiResponse>(
      url
    );
  }

  getLeagues() {
    const url = this.TEST_MODE ? 'assets/test-data/leagues.json' : this.BASE_URL + '/leagues';
    return this.http.get<LeaguesApiResponse>(
      url
    );
  }

  getLeagueStandings(leagueId: number) {
    const url = this.TEST_MODE ? 'assets/test-data/league-standings.json' : this.BASE_URL + '/leagueTable/' + leagueId;
    return this.http.get<LeagueStandingsApiResponse>(
      url
    );
  }

  getLeagueFixtures(leagueId: number) {
    const url = this.TEST_MODE ? 'assets/test-data/league-fixtures.json' : this.BASE_URL + '/fixtures/league/' + leagueId;
    return this.http.get<FixturesApiResponse>(
      url
    );
  }

  getLeagueTopScorers(leagueId: number) {
    const url = this.TEST_MODE ? 'assets/test-data/league-top-scorers.json' : this.BASE_URL + '/topscorers/' + leagueId;
    return this.http.get<LeagueTopScorersApiResponse>(
      url
    );
  }

  getFixture(fixtureId: number) {
    const url = this.TEST_MODE ? 'assets/test-data/fixture.json' : this.BASE_URL + '/fixtures/id/' + fixtureId;
    return this.http.get<FixturesApiResponse>(
      url
    );
  }

  getFixtureHeadToHead(homeTeamId: number, awayTeamId: number) {
    const url = this.TEST_MODE ? 'assets/test-data/fixture-head-to-head.json' :
      this.BASE_URL + '/fixtures/h2h/' + homeTeamId + '/' + awayTeamId;
    return this.http.get<FixturesApiResponse>(
      url
    );
  }
}
