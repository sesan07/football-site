import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FixturesApiResponse} from '../models/fixture.model';
import {TeamApiResponse} from '../models/team.model';
import {TeamPlayersApiResponse} from '../models/team-player.model';
import {LeaguesApiResponse} from '../models/league.model';
import {TeamStatisticsApiResponse} from '../models/team-statistic.model';
import {LeagueTopScorersApiResponse} from '../models/league-top-scorer.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = 'https://v2.api-football.com';

  constructor(private http: HttpClient) { }

  getAllFixtures(date: string) {
    return this.http.get<FixturesApiResponse>(
      this.BASE_URL + '/fixtures/date/' + date
    );
  }

  getAllFixturesTest() {
    return this.http.get<FixturesApiResponse>(
      'assets/test-data/all-fixtures.json'
    );
  }

  getLiveFixtures() {
    return this.http.get<FixturesApiResponse>(
      this.BASE_URL + '/fixtures/live'
    );
  }

  getLiveFixturesTest() {
    return this.http.get<FixturesApiResponse>(
      'assets/test-data/live-fixtures.json'
    );
  }

  getTeam(id: number) {
    return this.http.get<TeamApiResponse>(
      this.BASE_URL + '/teams/team/' + id
    );
  }

  getTeamTest() {
    return this.http.get<TeamApiResponse>(
      'assets/test-data/team.json'
    );
  }

  getSquad(teamId: number, season: string) {
    return this.http.get<TeamPlayersApiResponse>(
      this.BASE_URL + '/players/squad/' + teamId + '/' + season
    );
  }

  getSquadTest() {
    return this.http.get<TeamPlayersApiResponse>(
      'assets/test-data/team-players.json'
    );
  }

  getTeamLeagues(teamId: number) {
    return this.http.get<LeaguesApiResponse>(
      this.BASE_URL + '/leagues/team/' + teamId
    );
  }

  getTeamLeaguesTest() {
    return this.http.get<LeaguesApiResponse>(
      'assets/test-data/team-leagues.json'
    );
  }

  getTeamStatistics(teamId: number, leagueId: number) {
    return this.http.get<TeamStatisticsApiResponse>(
      this.BASE_URL + '/statistics/' + leagueId + '/' + teamId
    );
  }

  getTeamStatisticsTest() {
    return this.http.get<TeamStatisticsApiResponse>(
      'assets/test-data/team-statistics.json'
    );
  }

  getTeamFixtures(teamId: number) {
    return this.http.get<FixturesApiResponse>(
      this.BASE_URL + '/fixtures/team/' + teamId
    );
  }

  getTeamFixturesTest() {
    return this.http.get<FixturesApiResponse>(
      'assets/test-data/team-fixtures.json'
    );
  }

  getLeague(leagueId: number) {
    return this.http.get<LeaguesApiResponse>(
      this.BASE_URL + '/leagues/league/' + leagueId
    );
  }

  getLeagueTest() {
    return this.http.get<LeaguesApiResponse>(
      'assets/test-data/league.json'
    );
  }

  getLeagueFixtures(leagueId: number, count: number, isNextFixtures: boolean) {
    const option = isNextFixtures ? '/next/' : '/last/';
    return this.http.get<FixturesApiResponse>(
      this.BASE_URL + '/fixtures/league/' + leagueId + option + count
    );
  }

  getLeagueFixturesTest(isNextFixtures: boolean) {
    const url = isNextFixtures ? 'assets/test-data/next-league-fixtures.json' : 'assets/test-data/prev-league-fixtures.json';
    return this.http.get<FixturesApiResponse>(
      url
    );
  }

  getLeagueTopScorers(leagueId: number) {
    return this.http.get<LeagueTopScorersApiResponse>(
      this.BASE_URL + '/topscorers/' + leagueId
    );
  }

  getLeagueTopScorersTest() {
    return this.http.get<LeagueTopScorersApiResponse>(
      'assets/test-data/league-top-scorers.json'
    );
  }

  getFixture(fixtureId: number) {
    return this.http.get<FixturesApiResponse>(
      this.BASE_URL + '/fixtures/id/' + fixtureId
    );
  }

  getFixtureTest() {
    return this.http.get<FixturesApiResponse>(
      'assets/test-data/fixture.json'
    );
  }

  getFixtureHeadToHead(homeTeamId: number, awayTeamId: number) {
    return this.http.get<FixturesApiResponse>(
      this.BASE_URL + '/fixtures/h2h/' + homeTeamId + '/' + awayTeamId
    );
  }

  getFixtureHeadToHeadTest() {
    return this.http.get<FixturesApiResponse>(
      'assets/test-data/fixture-head-to-head.json'
    );
  }
}
