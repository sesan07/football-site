import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Fixture, FixtureGroup} from '../../shared/models/fixture.model';
import {FixturesManager} from '../../shared/managers/fixtures.manager';
import {RepositoryService} from '../../shared/repository/repository.service';

@Component({
  selector: 'app-fixture-head-to-head',
  templateUrl: './fixture-head-to-head.component.html',
  styleUrls: ['./fixture-head-to-head.component.scss']
})
export class FixtureHeadToHeadComponent implements OnInit, AfterViewInit {
  @Input() homeTeamId: number;
  @Input() awayTeamId: number;
  fixtureGroups: FixtureGroup[];

  @ViewChild('container') container: ElementRef;
  readonly COMPACT_WIDTH = 520;
  isCompactView = false;

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.repositoryService.getFixtureHeadToHead(this.homeTeamId, this.awayTeamId).subscribe((fixtures: Fixture[]) => {
      this.fixtureGroups = FixturesManager.getFixtureGroups(fixtures);
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

}
