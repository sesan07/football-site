import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {RepositoryService} from '../shared/repository/repository.service';
import {Fixture, FixtureGroup, FixtureLineUp, FixtureStatistic} from '../shared/models/fixture.model';
import {FixturesManager} from '../shared/managers/fixtures.manager';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit, OnDestroy {

  private fixtureId: number;
  fixture: Fixture;
  homeLineUp: FixtureLineUp;
  awayLineUp: FixtureLineUp;
  headToHeadFixtureGroups: FixtureGroup[];
  statistics: [string, FixtureStatistic][];

  private routeParamsSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.fixtureId = params.id;

      this.repositoryService.getFixture(this.fixtureId).subscribe((fixture: Fixture) => {
        this.fixture = fixture;

        if (fixture.lineups.hasOwnProperty(fixture.homeTeam.team_name)) {
          this.homeLineUp = fixture.lineups[fixture.homeTeam.team_name];
        }

        if (fixture.lineups.hasOwnProperty(fixture.awayTeam.team_name)) {
          this.awayLineUp = fixture.lineups[fixture.awayTeam.team_name];
        }

        this.repositoryService.getFixtureHeadToHead(fixture.homeTeam.team_id, fixture.awayTeam.team_id).subscribe((fixtures: Fixture[]) => {
          this.headToHeadFixtureGroups = FixturesManager.getFixtureGroups(fixtures);
        });

        if (fixture.statistics) {
          this.statistics = Object.entries(fixture.statistics);
          console.log(this.statistics);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

}
