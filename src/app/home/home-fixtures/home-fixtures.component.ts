import {Component, OnDestroy, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/repository/repository.service';
import {Fixture, FixtureGroup} from '../../shared/models/fixture.model';
import {Subscription} from 'rxjs';
import {FixturesManager} from '../../shared/managers/fixtures.manager';

@Component({
  selector: 'app-home-fixtures',
  templateUrl: './home-fixtures.component.html',
  styleUrls: ['./home-fixtures.component.scss']
})
export class HomeFixturesComponent implements OnInit, OnDestroy {

  toggleOptions: [string, string] = ['All Fixtures', 'Live Fixtures'];
  activeToggleIndex = 0;
  allFixtureGroups: FixtureGroup[] = [];
  liveFixtureGroups: FixtureGroup[] = [];

  private allFixturesSubscription: Subscription;
  private liveFixturesSubscription: Subscription;

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.repositoryService.getAllFixtures('2020-09-04');
    this.repositoryService.getLiveFixtures();

    this.allFixturesSubscription = this.repositoryService.allFixturesSubject.subscribe((allFixtures: Fixture[]) => {
      this.allFixtureGroups = FixturesManager.getFixtureGroups(allFixtures);

      // console.log('HomeFixturesComponent received all fixtures: ' + allFixtures.length);
      // console.log(this.allFixtureGroups);
    });

    this.liveFixturesSubscription = this.repositoryService.liveFixturesSubject.subscribe((liveFixtures: Fixture[]) => {
      this.liveFixtureGroups = FixturesManager.getFixtureGroups(liveFixtures);

      // console.log('HomeFixturesComponent received live fixtures: ' + liveFixtures.length);
      // console.log(this.liveFixtures);
    });
  }

  onToggleButtonClicked(index: number) {
    this.activeToggleIndex = index;
  }

  ngOnDestroy(): void {
    this.allFixturesSubscription.unsubscribe();
    this.liveFixturesSubscription.unsubscribe();
  }

}
