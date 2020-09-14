import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {Fixture, FixtureGroup} from '../../shared/models/fixture.model';
import {Subscription} from 'rxjs';
import {FixtureHelper} from '../../shared/helpers/fixture.helper';
import {DatePipe} from '@angular/common';

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
  readonly COMPACT_WIDTH = 640;
  isCompactView = false;

  private allFixturesSubscription: Subscription;
  private liveFixturesSubscription: Subscription;

  constructor(private repositoryService: RepositoryService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.repositoryService.getAllFixtures(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
    this.repositoryService.getLiveFixtures();

    this.allFixturesSubscription = this.repositoryService.allFixturesSubject.subscribe((allFixtures: Fixture[]) => {
      this.allFixtureGroups = FixtureHelper.getFixtureGroups(allFixtures);
    });

    this.liveFixturesSubscription = this.repositoryService.liveFixturesSubject.subscribe((liveFixtures: Fixture[]) => {
      this.liveFixtureGroups = FixtureHelper.getFixtureGroups(liveFixtures);
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

  getDate() {
    return new Date();
  }

  ngOnDestroy(): void {
    this.allFixturesSubscription.unsubscribe();
    this.liveFixturesSubscription.unsubscribe();
  }

}
