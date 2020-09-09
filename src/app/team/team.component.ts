import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
export class TeamComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly PREVIOUS_FIXTURE_COUNT = 10;
  private readonly NEXT_FIXTURE_COUNT = 10;

  teamId: number;
  team: Team;
  teamPlayers: TeamPlayer[] = [];
  leagues: League[] = [];
  teamStatisticsMap: Map<number, TeamStatistic[]> = new Map();  // <leagueId, teamStatistics>
  activeTeamStatistics: TeamStatistic[] = [];
  fixtures: Fixture[] = [];
  fixtureGroups: FixtureGroup[] = [];
  toggleOptions: [string, string] = ['Fixtures', 'Stats'];
  activeToggleIndex = 0;

  @ViewChild('fixturesContainer') fixturesContainer: ElementRef;
  readonly COMPACT_WIDTH = 520;
  isCompactView = false;

  private routeParamsSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.teamId = params.id;

      this.repositoryService.getTeam(this.teamId).subscribe((team: Team) => {
        this.team = team;
      });

      this.repositoryService.getTeamLeagues(this.teamId, '2020').subscribe((leagues: League[]) => {
        this.leagues = leagues;

        this.teamStatisticsMap.clear();
        this.activeTeamStatistics = [];
        leagues.forEach((league: League) => {
          this.repositoryService.getTeamStatistics(this.teamId, league.league_id).subscribe((teamStatistics: TeamStatistic[]) => {
            this.teamStatisticsMap.set(league.league_id, teamStatistics);

            if (this.activeTeamStatistics.length === 0) {
              this.activeTeamStatistics.push(...teamStatistics);
            }
          });
        });
      });

      this.fixtures = [];
      this.updateTeamFixtures(this.NEXT_FIXTURE_COUNT, true);
      this.updateTeamFixtures(this.PREVIOUS_FIXTURE_COUNT, false);
    });
  }

  updateTeamFixtures(count: number, isNextFixtures) {
    this.repositoryService.getTeamFixtures(this.teamId, count, isNextFixtures).subscribe((fixtures: Fixture[]) => {
      this.fixtures.push(...fixtures);

      this.fixtureGroups = [];
      const fixtureGroups = FixturesManager.getFixtureGroups(this.fixtures);
      this.fixtureGroups.push(...fixtureGroups);
    });
  }

  ngAfterViewInit(): void {
    this.updateCompactView();
  }

  updateCompactView() {
    this.isCompactView = this.fixturesContainer.nativeElement.offsetWidth <= this.COMPACT_WIDTH;
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCompactView();
  }

  onToggleButtonClicked(index: number) {
    this.activeToggleIndex = index;
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

}
