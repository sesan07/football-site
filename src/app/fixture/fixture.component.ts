import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {RepositoryService} from '../shared/services/repository.service';
import {Fixture, FixtureGroup, FixtureLineUp, FixtureStatistic} from '../shared/models/fixture.model';
import {FixtureService} from '../shared/services/fixture.service';

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

  isLoaded = false;

  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService,
              private fixtureService: FixtureService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.fixtureId = params.id;

      this.repositoryService.getFixture(this.fixtureId).subscribe((fixture: Fixture) => {
        this.fixture = fixture;

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
            this.headToHeadFixtureGroups = this.fixtureService.getFixtureGroups(fixtures);
          });

        // Statistics
        if (fixture.statistics) {
          this.statistics = Object.entries(fixture.statistics);
        }

        this.isLoaded = true;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

}
