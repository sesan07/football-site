import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Fixture} from '../models/fixture.model';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {Team} from '../models/team.model';
import {TeamPlayer} from '../models/team-player.model';
import {League} from '../models/league.model';
import {TeamStatistic} from '../models/team-statistic.model';
import {LeagueTopScorer} from '../models/league-top-scorer.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private isLoadingAllFixtures = false;
  private isLoadingLiveFixtures = false;

  allFixturesSubject = new BehaviorSubject<Fixture[]>([]);
  liveFixturesSubject = new BehaviorSubject<Fixture[]>([]);

  constructor(private apiService: ApiService) { }

  getAllFixtures(date: string) {
    if (this.isLoadingAllFixtures) {
      console.log('Already loading all fixtures');
      return;
    }

    this.isLoadingAllFixtures = true;

    // this.apiService.getAllFixtures(date)
    this.apiService.getAllFixturesTest()
      .pipe(map((responseJsonData => {
        let fixtures: Fixture[] = [];
        if (responseJsonData.api && responseJsonData.api.fixtures) {
          fixtures = responseJsonData.api.fixtures;
        }

        return fixtures;
      })))
      .subscribe(allFixtures => {
        this.allFixturesSubject.next(allFixtures);

        this.isLoadingAllFixtures = false;
      }, error => {
        console.log(error);
        this.isLoadingAllFixtures = false;
      });
  }

  getLiveFixtures() {
    if (this.isLoadingLiveFixtures) {
      console.log('Already loading live fixtures');
      return;
    }

    this.isLoadingLiveFixtures = true;

    // this.apiService.getLiveFixtures()
    this.apiService.getLiveFixturesTest()
      .pipe(map((responseJsonData => {
        let fixtures: Fixture[] = [];
        if (responseJsonData.api && responseJsonData.api.fixtures) {
          fixtures = responseJsonData.api.fixtures;
        }

        return fixtures;
      })))
      .subscribe(liveFixtures => {
        this.liveFixturesSubject.next(liveFixtures);

        this.isLoadingLiveFixtures = false;
      }, error => {
        console.log(error);
        this.isLoadingLiveFixtures = false;
      });
  }

  getTeam(id: number) {
    // return this.apiService.getTeam(id)
    return this.apiService.getTeamTest()
      .pipe(map((responseJsonData => {
        let teams: Team[] = [];
        if (responseJsonData.api && responseJsonData.api.teams) {
          teams = responseJsonData.api.teams;
        }

        return teams.length > 0 ? teams[0] : null;
      })));
  }

  getSquad(teamId: number, season: string) {
    // return this.apiService.getSquad(teamId, season)
      return this.apiService.getSquadTest()
      .pipe(map((responseJsonData => {
        let teamPlayers: TeamPlayer[] = [];
        if (responseJsonData.api && responseJsonData.api.players) {
          teamPlayers = responseJsonData.api.players;
        }

        return teamPlayers;
      })));
  }

  getTeamLeagues(teamId: number, season: string) {
    // return this.apiService.getTeamLeagues(teamId, season)
    return this.apiService.getTeamLeaguesTest()
      .pipe(map((responseJsonData => {
        let leagues: League[] = [];
        if (responseJsonData.api && responseJsonData.api.leagues) {
          leagues = responseJsonData.api.leagues;
        }

        return leagues;
      })));
  }

  getTeamStatistics(teamId: number, leagueId: number) {
    // return this.apiService.getTeamStatistics(teamId, leagueId)
    return this.apiService.getTeamStatisticsTest()
      .pipe(map((responseJsonData => {
        const teamStatistics: TeamStatistic[] = [];
        if (responseJsonData.api && responseJsonData.api.statistics) {
          const matchesPlayed = responseJsonData.api.statistics.matchs.matchsPlayed;
          teamStatistics.push(new TeamStatistic('Matches Played', matchesPlayed.home, matchesPlayed.away, matchesPlayed.total));
          const wins = responseJsonData.api.statistics.matchs.wins;
          teamStatistics.push(new TeamStatistic('Matches Won', wins.home, wins.away, wins.total));
          const draws = responseJsonData.api.statistics.matchs.draws;
          teamStatistics.push(new TeamStatistic('Matches Drawn', draws.home, draws.away, draws.total));
          const loses = responseJsonData.api.statistics.matchs.loses;
          teamStatistics.push(new TeamStatistic('Matches Lost', loses.home, loses.away, loses.total));
          const goalsFor = responseJsonData.api.statistics.goals.goalsFor;
          teamStatistics.push(new TeamStatistic('Goals For', goalsFor.home, goalsFor.away, goalsFor.total));
          const goalsAgainst = responseJsonData.api.statistics.goals.goalsAgainst;
          teamStatistics.push(new TeamStatistic('Goals Against', goalsAgainst.home, goalsAgainst.away, goalsAgainst.total));
          const goalsForAvg = responseJsonData.api.statistics.goalsAvg.goalsFor;
          teamStatistics.push(new TeamStatistic('Goals For (Avg)', goalsForAvg.home, goalsForAvg.away, goalsForAvg.total));
          const goalsAgainstAvg = responseJsonData.api.statistics.goalsAvg.goalsAgainst;
          teamStatistics.push(new TeamStatistic('Goals Against (Avg)', goalsAgainstAvg.home, goalsAgainstAvg.away, goalsAgainstAvg.total));
        }

        return teamStatistics;
      })));
  }

  getTeamFixtures(teamId: number, count: number, isNextFixtures: boolean) {
    // return this.apiService.getTeamFixtures(teamId, count, isNextFixtures)
    return this.apiService.getTeamFixturesTest(isNextFixtures)
      .pipe(map((responseJsonData => {
        let fixtures: Fixture[] = [];
        if (responseJsonData.api && responseJsonData.api.fixtures) {
          fixtures = responseJsonData.api.fixtures;
        }

        return fixtures;
      })));
  }

  getLeague(leagueId: number) {
    // return this.apiService.getLeague(leagueId)
    return this.apiService.getLeagueTest()
      .pipe(map((responseJsonData => {
        let leagues: League[] = [];
        if (responseJsonData.api && responseJsonData.api.leagues) {
          leagues = responseJsonData.api.leagues;
        }

        return leagues.length > 0 ? leagues[0] : null;
      })));
  }

  getLeagueFixtures(leagueId: number, count: number, isNextFixtures: boolean) {
    // return this.apiService.getLeagueFixtures(leagueId, count, isNextFixtures)
    return this.apiService.getLeagueFixturesTest(isNextFixtures)
      .pipe(map((responseJsonData => {
        let fixtures: Fixture[] = [];
        if (responseJsonData.api && responseJsonData.api.fixtures) {
          fixtures = responseJsonData.api.fixtures;
        }

        return fixtures;
      })));
  }

  getLeagueTopScorers(leagueId: number) {
    // return this.apiService.getLeagueTopScorers(leagueId)
    return this.apiService.getLeagueTopScorersTest()
      .pipe(map((responseJsonData => {
        let topScorers: LeagueTopScorer[] = [];
        if (responseJsonData.api && responseJsonData.api.topscorers) {
          topScorers = responseJsonData.api.topscorers;
        }

        return topScorers;
      })));
  }

  getFixture(fixtureId: number) {
    // return this.apiService.getFixture(fixtureId)
    return this.apiService.getFixtureTest()
      .pipe(map((responseJsonData => {
        let fixtures: Fixture[] = [];
        if (responseJsonData.api && responseJsonData.api.fixtures) {
          fixtures = responseJsonData.api.fixtures;
        }

        return fixtures.length > 0 ? fixtures[0] : null;
      })));
  }

  getFixtureHeadToHead(homeTeamId: number, awayTeamId: number) {
    // return this.apiService.getFixtureHeadToHead(homeTeamId, awayTeamId)
    return this.apiService.getFixtureHeadToHeadTest()
      .pipe(map((responseJsonData => {
        let fixtures: Fixture[] = [];
        if (responseJsonData.api && responseJsonData.api.fixtures) {
          fixtures = responseJsonData.api.fixtures;
        }

        return fixtures;
      })));
  }
}
