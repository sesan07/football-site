import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {Fixture, FixtureGroup} from '../../shared/models/fixture.model';
import {Subscription} from 'rxjs';
import {DatePipe} from '@angular/common';
import {FixtureService} from '../../shared/services/fixture.service';

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
  readonly COMPACT_WIDTH = 720;
  isCompactView = false;

  allFixturesDate = new Date();

  private allFixturesSubscription: Subscription;
  private liveFixturesSubscription: Subscription;

  constructor(private repositoryService: RepositoryService, private fixtureService: FixtureService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.repositoryService.getAllFixtures(this.datePipe.transform(this.allFixturesDate, 'yyyy-MM-dd'));
    this.repositoryService.getLiveFixtures();

    this.allFixturesSubscription = this.repositoryService.allFixturesSubject.subscribe((allFixtures: Fixture[]) => {
      this.allFixtureGroups = this.fixtureService.getFixtureGroups(allFixtures);
    });

    this.liveFixturesSubscription = this.repositoryService.liveFixturesSubject.subscribe((liveFixtures: Fixture[]) => {
      this.liveFixtureGroups = this.fixtureService.getFixtureGroups(liveFixtures);
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

  onDateSelected(date: Date) {
    this.allFixturesDate = date;
    this.repositoryService.getAllFixtures(this.datePipe.transform(this.allFixturesDate, 'yyyy-MM-dd'));
  }

  getAllFixturesDate() {
    return this.allFixturesDate;
  }

  getLiveDate() {
    return new Date();
  }

  ngOnDestroy(): void {
    this.allFixturesSubscription.unsubscribe();
    this.liveFixturesSubscription.unsubscribe();
  }

}
