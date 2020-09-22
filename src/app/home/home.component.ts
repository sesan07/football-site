import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Fixture, FixtureGroup} from '../shared/models/fixture.model';
import {RepositoryService} from '../shared/services/repository.service';
import {FixtureService} from '../shared/services/fixture.service';
import {DatePipe} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  toggleOptions: [string, string] = ['All Fixtures', 'Live Fixtures'];
  activeToggleIndex = 0;
  allFixtureGroups: FixtureGroup[] = [];
  liveFixtureGroups: FixtureGroup[] = [];
  isAllLoading = false;
  isLiveLoading = false;
  minExpandedFixtureGroups = 5;

  @ViewChild('container') container: ElementRef;
  readonly COMPACT_WIDTH = 720;
  isCompactView = false;

  allFixturesDate: Date;

  constructor(private titleService: Title,
              private repositoryService: RepositoryService,
              private fixtureService: FixtureService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.titleService.setTitle('Home - ' + environment.appTitle);

    const currDate = new Date();
    this.allFixturesDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
    this.loadAllFixtures(false);
  }

  ngAfterViewInit(): void {
    this.updateCompactView();
  }

  loadAllFixtures(isNewDate: boolean) {
    if (!isNewDate && this.allFixtureGroups.length > 0) {
      return;
    }

    if (!this.isAllLoading) {
      this.isAllLoading = true;
      this.repositoryService.getAllFixtures(this.datePipe.transform(this.allFixturesDate, 'yyyy-MM-dd'))
        .subscribe((allFixtures: Fixture[]) => {
          this.allFixtureGroups = this.fixtureService.getFixtureGroups(allFixtures);
          this.isAllLoading = false;
        });
    }
  }

  loadLiveFixtures() {
    if (this.liveFixtureGroups.length === 0 && !this.isLiveLoading) {
      this.isLiveLoading = true;
      this.repositoryService.getLiveFixtures()
        .subscribe((liveFixtures: Fixture[]) => {
          this.liveFixtureGroups = this.fixtureService.getFixtureGroups(liveFixtures);
          this.isLiveLoading = false;
        });
    }
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
    if (this.activeToggleIndex === 0) {
      this.loadAllFixtures(false);
    } else {
      this.loadLiveFixtures();
    }
  }

  onDateSelected(date: Date) {
    const isNewDate = date.getTime() !== this.allFixturesDate.getTime();
    if (isNewDate) { this.allFixturesDate = date; }
    this.loadAllFixtures(isNewDate);
  }

  getAllFixturesDate() {
    return this.allFixturesDate;
  }

  getLiveDate() {
    return new Date();
  }

  ngOnDestroy(): void {
  }

}
