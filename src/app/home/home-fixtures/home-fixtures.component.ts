import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RepositoryService} from '../../shared/repository/repository.service';
import {Fixture, FixtureGroup} from '../../shared/models/fixture.model';
import {Subscription} from 'rxjs';
import {FixturesManager} from '../../shared/managers/fixtures.manager';

@Component({
  selector: 'app-home-fixtures',
  templateUrl: './home-fixtures.component.html',
  styleUrls: ['./home-fixtures.component.scss']
})
export class HomeFixturesComponent implements OnInit, AfterViewInit, OnDestroy {

  toggleOptions: [string, string] = ['All Fixtures', 'Live Fixtures'];
  activeToggleIndex = 0;
  allFixtureGroups: FixtureGroup[] = [];
  liveFixtureGroups: FixtureGroup[] = [];

  @ViewChild('container') container: ElementRef;
  readonly COMPACT_WIDTH = 520;
  isCompactView = false;

  private allFixturesSubscription: Subscription;
  private liveFixturesSubscription: Subscription;

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.repositoryService.getAllFixtures('2020-09-06');
    this.repositoryService.getLiveFixtures();

    this.allFixturesSubscription = this.repositoryService.allFixturesSubject.subscribe((allFixtures: Fixture[]) => {
      this.allFixtureGroups = FixturesManager.getFixtureGroups(allFixtures);
    });

    this.liveFixturesSubscription = this.repositoryService.liveFixturesSubject.subscribe((liveFixtures: Fixture[]) => {
      this.liveFixtureGroups = FixturesManager.getFixtureGroups(liveFixtures);
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

  onToggleButtonClicked(index: number) {
    this.activeToggleIndex = index;
  }

  ngOnDestroy(): void {
    this.allFixturesSubscription.unsubscribe();
    this.liveFixturesSubscription.unsubscribe();
  }

}
