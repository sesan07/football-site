import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Team} from '../shared/models/team.model';
import {RepositoryService} from '../shared/services/repository.service';
import {League} from '../shared/models/league.model';
import {TeamStatistic} from '../shared/models/team-statistic.model';
import {Fixture, FixtureGroup} from '../shared/models/fixture.model';
import {FixtureHelper} from '../shared/helpers/fixture.helper';
import {FavoritesService} from '../shared/services/favorites.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  private routeParamsSub: Subscription;

  private readonly PREVIOUS_FIXTURE_COUNT = 10;
  private readonly NEXT_FIXTURE_COUNT = 10;

  teamId: number;
  team: Team;
  leagues: League[] = [];
  teamStatisticsMap: Map<number, TeamStatistic[]> = new Map();  // <leagueId, teamStatistics>
  activeTeamStatistics: TeamStatistic[] = [];
  fixtures: Fixture[] = [];
  fixtureGroups: FixtureGroup[] = [];
  toggleOptions: [string, string] = ['Fixtures', 'Stats'];
  activeToggleIndex = 0;

  isFavorite: boolean;
  favoritesSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService,
              private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.teamId = params.id;

      this.repositoryService.getTeam(this.teamId).subscribe((team: Team) => {
        this.team = team;

        this.isFavorite = this.favoritesService.isFavoriteTeam(this.team.team_id);
        this.favoritesSub = this.favoritesService.favoriteTeamRemoved.subscribe((teamId: number) => {
          if (teamId === this.team.team_id) { this.isFavorite = false; }
        });
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
      const fixtureGroups = FixtureHelper.getFixtureGroups(this.fixtures);
      this.fixtureGroups.push(...fixtureGroups);
    });
  }

  onToggleButtonClicked(index: number) {
    this.activeToggleIndex = index;
  }

  onFavouriteClicked(event: Event) {
    event.stopPropagation();

    if (this.isFavorite) {
      this.isFavorite = false;
      this.favoritesService.removeTeam(this.team.team_id);
    } else {
      this.isFavorite = true;
      this.favoritesService.addTeam(this.team);
    }
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
    this.favoritesSub.unsubscribe();
  }

}
