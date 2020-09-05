import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Fixture, FixtureGroup} from '../fixture.model';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {Team} from '../team.model';
import {TeamPlayer} from '../team-player.model';
import {League} from '../league.model';
import {TeamStatistic} from '../team-statistic.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private isLoadingFixtures = false;
  private hasLoadedFixtures = false;

  allFixturesSubject = new BehaviorSubject<FixtureGroup[]>([]);
  liveFixtures = new BehaviorSubject<FixtureGroup[]>([]);

  constructor(private apiService: ApiService) { }

  getAllFixtures(date: string) {
    if (this.isLoadingFixtures) {
      console.log('Already loading all fixtures');
      return;
    }
    if (this.hasLoadedFixtures) {
      console.log('All fixtures have already been loaded');
      return;
    }

    this.isLoadingFixtures = true;

    // this.apiService.getAllFixtures(date)
    this.apiService.getAllFixturesTest(date)
      .pipe(map((responseJsonData => {
        let fixtures: Fixture[] = [];
        if (responseJsonData.api && responseJsonData.api.fixtures) {
          fixtures = responseJsonData.api.fixtures;
        }

        return fixtures;
      })))
      .subscribe(allFixtures => {
        const allFixtureGroupsMap = new Map<string, FixtureGroup>();

        allFixtures.forEach((fixture: Fixture, index: number) => {
          // Ignore fixture is missing required values
          if (!(fixture.league.country && fixture.league.name)) {
            return;
          }

          // TODO Remove fixtures with TDB status code?

          const key = fixture.league.country + '-' + fixture.league.name;
          if (allFixtureGroupsMap.has(key)) {
            allFixtureGroupsMap.get(key).fixtures.push(fixture);
          } else {
            allFixtureGroupsMap.set(key, new FixtureGroup(
              fixture.league.country,
              fixture.league.name,
              [fixture]
            ));
          }
        });

        // console.log(allFixtures);
        this.allFixturesSubject.next([...allFixtureGroupsMap.values()]);  // Iterable to array

        this.isLoadingFixtures = false;
        this.hasLoadedFixtures = true;
      }, error => {
        console.log(error);
        this.isLoadingFixtures = false;
      });
  }

  getTeam(id: number) {
    // return this.apiService.getTeam(id)
    return this.apiService.getTeamTest(id)
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
      return this.apiService.getSquadTest(teamId, season)
      .pipe(map((responseJsonData => {
        let teamPlayers: TeamPlayer[] = [];
        if (responseJsonData.api && responseJsonData.api.players) {
          teamPlayers = responseJsonData.api.players;
        }

        return teamPlayers;
      })));
  }

  getLeagues(teamId: number, season: string) {
    // return this.apiService.getLeagues(teamId, season)
    return this.apiService.getLeaguesTest(teamId, season)
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
    return this.apiService.getTeamStatisticsTest(teamId, leagueId)
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
}
