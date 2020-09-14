import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {RepositoryService} from '../shared/services/repository.service';
import {Fixture, FixtureLineUp, FixtureStatistic} from '../shared/models/fixture.model';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit, AfterViewInit, OnDestroy {
  private routeParamsSub: Subscription;

  private fixtureId: number;
  fixture: Fixture;
  homeLineUp: FixtureLineUp;
  awayLineUp: FixtureLineUp;
  statistics: [string, FixtureStatistic][];

  isLoaded = false;

  @ViewChild('container') container: ElementRef;
  readonly COMPACT_WIDTH = 640;
  isCompactView = false;

  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.fixtureId = params.id;

      this.repositoryService.getFixture(this.fixtureId).subscribe((fixture: Fixture) => {
        this.fixture = fixture;
        if (fixture.lineups) {
          if (fixture.lineups.hasOwnProperty(fixture.homeTeam.team_name)) {
            this.homeLineUp = fixture.lineups[fixture.homeTeam.team_name];
          }

          if (fixture.lineups.hasOwnProperty(fixture.awayTeam.team_name)) {
            this.awayLineUp = fixture.lineups[fixture.awayTeam.team_name];
          }
        }

        if (fixture.statistics) {
          this.statistics = Object.entries(fixture.statistics);
        }

        this.isLoaded = true;
      });
    });
  }

  ngAfterViewInit(): void {
    this.updateCompactView();
  }

  updateCompactView() {
    this.isCompactView = this.container.nativeElement.offsetWidth <= this.COMPACT_WIDTH;
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCompactView();
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

}
