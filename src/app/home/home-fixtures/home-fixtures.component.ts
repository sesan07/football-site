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

  allFixtureGroups: FixtureGroup[] = [];
  liveFixtures: FixtureGroup[] = [];

  private allFixturesSubscription: Subscription;
  private liveFixturesSubscription: Subscription;

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.allFixturesSubscription = this.repositoryService.allFixturesSubject.subscribe((allFixtures: Fixture[]) => {
      this.allFixtureGroups = FixturesManager.getFixtureGroups(allFixtures);

      // console.log('HomeFixturesComponent received all fixtures: ' + allFixtures.length);
      // console.log(this.allFixtureGroups);
    });

    this.liveFixturesSubscription = this.repositoryService.liveFixtures.subscribe((liveFixtures: Fixture[]) => {
      this.liveFixtures = FixturesManager.getFixtureGroups(liveFixtures);

      // console.log('HomeFixturesComponent received live fixtures: ' + liveFixtures.length);
      // console.log(this.liveFixtures);
    });
  }

  ngOnDestroy(): void {
    this.allFixturesSubscription.unsubscribe();
    this.liveFixturesSubscription.unsubscribe();
  }

}
