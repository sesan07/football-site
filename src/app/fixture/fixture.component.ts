import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {RepositoryService} from '../shared/services/repository.service';
import {Fixture, FixtureGroup, FixtureLineUp, FixtureStatistic} from '../shared/models/fixture.model';
import {FixtureService} from '../shared/services/fixture.service';
import {environment} from '../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit, OnDestroy {
  private routeParamsSub: Subscription;

  private fixtureId: number;
  fixture: Fixture;
  homeLineUp: FixtureLineUp;
  awayLineUp: FixtureLineUp;
  statistics: [string, FixtureStatistic][];
  headToHeadFixtureGroups: FixtureGroup[];
  isLoading: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private repositoryService: RepositoryService,
              private fixtureService: FixtureService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.isLoading = true;
      this.fixtureId = params.id;
      this.titleService.setTitle('Fixture' + ' - ' + environment.appTitle);

      this.repositoryService.getFixture(this.fixtureId).subscribe((fixture: Fixture) => {
        this.fixture = fixture;
        this.titleService.setTitle(fixture.homeTeam.team_name + ' vs ' + fixture.awayTeam.team_name + ' - ' + environment.appTitle);

        // Line Ups
        if (fixture.lineups) {
          if (fixture.lineups.hasOwnProperty(fixture.homeTeam.team_name)) {
            this.homeLineUp = fixture.lineups[fixture.homeTeam.team_name];
          }

          if (fixture.lineups.hasOwnProperty(fixture.awayTeam.team_name)) {
            this.awayLineUp = fixture.lineups[fixture.awayTeam.team_name];
          }
        }

        // Head to head
        this.repositoryService.getFixtureHeadToHead(fixture.homeTeam.team_id, fixture.awayTeam.team_id)
          .subscribe((fixtures: Fixture[]) => {
            this.headToHeadFixtureGroups = this.fixtureService.getFixtureGroups(fixtures.reverse());
          });

        // Statistics
        if (fixture.statistics) {
          this.statistics = Object.entries(fixture.statistics);
        }

        this.isLoading = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

}
