import {Component, Input, OnInit} from '@angular/core';
import {Fixture} from '../../shared/models/fixture.model';

@Component({
  selector: 'app-fixture-header-compact',
  templateUrl: './fixture-header-compact.component.html',
  styleUrls: ['./fixture-header-compact.component.scss']
})
export class FixtureHeaderCompactComponent implements OnInit {
  @Input() fixture: Fixture;

  showScore: boolean;
  showVs: boolean;
  showElapsed: boolean;
  showStatus: boolean;

  constructor() { }

  ngOnInit(): void {
    const statusCode = this.fixture.statusShort;

    this.showScore = this.fixture.goalsHomeTeam != null && this.fixture.goalsAwayTeam != null;
    this.showVs = !this.showScore;
    this.showElapsed = this.fixture.elapsed && statusCode !== 'FT';
    this.showStatus = statusCode !== 'NS';
  }

}
