import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Team} from '../shared/models/team.model';
import {RepositoryService} from '../shared/repository/repository.service';
import {TeamPlayer} from '../shared/models/team-player.model';
import {League} from '../shared/models/league.model';
import {TeamStatistic} from '../shared/models/team-statistic.model';
import {Fixture, FixtureGroup} from '../shared/models/fixture.model';
import {FixturesManager} from '../shared/managers/fixtures.manager';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  private readonly PREVIOUS_FIXTURE_COUNT = 10;
  private readonly NEXT_FIXTURE_COUNT = 10;

  private teamId: number;
  team: Team;
  teamPlayers: TeamPlayer[] = [];
  leagues: League[] = [];
  teamStatisticsMap: Map<number, TeamStatistic[]> = new Map();  // <leagueId, teamStatistics>
  activeTeamStatistics: TeamStatistic[] = [];
  fixtures: Fixture[] = [];
  fixtureGroups: FixtureGroup[] = [];
  toggleOptions: [string, string] = ['Fixtures', 'Stats'];
  activeToggleIndex = 0;

  private routeParamsSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.teamId = params.id;

      this.repositoryService.getTeam(this.teamId).subscribe((team: Team) => {
        this.team = team;

        // console.log('TeamComponent received team: ' + team.name);
        // console.log(this.team);
      });

      this.repositoryService.getSquad(this.teamId, '2019-2020').subscribe((teamPlayers: TeamPlayer[]) => {
        this.teamPlayers = teamPlayers;

        // console.log('TeamComponent received teamPlayers: ' + teamPlayers.length);
        // console.log(this.teamPlayers);
      });

      this.repositoryService.getTeamLeagues(this.teamId, '2020').subscribe((leagues: League[]) => {
        this.leagues = leagues;

        // console.log('TeamComponent received leagues: ' + leagues.length);
        // console.log(this.leagues);

        this.teamStatisticsMap.clear();
        this.activeTeamStatistics = [];
        leagues.forEach((league: League) => {
          this.repositoryService.getTeamStatistics(this.teamId, league.league_id).subscribe((teamStatistics: TeamStatistic[]) => {
            this.teamStatisticsMap.set(league.league_id, teamStatistics);

            if (this.activeTeamStatistics.length === 0) {
              this.activeTeamStatistics.push(...teamStatistics);
            }

            // console.log('TeamComponent received team statistics: ' + teamStatistics.length);
            // console.log(teamStatistics);
          });
        });
      });

      this.fixtures = [];
      this.getTeamFixtures(this.NEXT_FIXTURE_COUNT, true);
      this.getTeamFixtures(this.PREVIOUS_FIXTURE_COUNT, false);
    });
  }

  getTeamFixtures(count: number, isNextFixtures) {
    this.repositoryService.getTeamFixtures(this.teamId, count, isNextFixtures).subscribe((fixtures: Fixture[]) => {
      this.fixtures.push(...fixtures);

      this.fixtureGroups = [];
      const fixtureGroups = FixturesManager.getFixtureGroups(this.fixtures);
      this.fixtureGroups.push(...fixtureGroups);

      // console.log('TeamComponent received fixtures: ' + fixtures.length);
      // console.log(fixtures);
    });
  }

  onToggleButtonClicked(index: number) {
    this.activeToggleIndex = index;
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

}
