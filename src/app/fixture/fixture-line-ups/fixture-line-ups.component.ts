import {Component, Input, OnInit} from '@angular/core';
import {FixtureLineUp} from '../../shared/models/fixture.model';

@Component({
  selector: 'app-fixture-line-ups',
  templateUrl: './fixture-line-ups.component.html',
  styleUrls: ['./fixture-line-ups.component.scss']
})
export class FixtureLineUpsComponent implements OnInit {
  @Input() homeLineUp: FixtureLineUp;
  @Input() awayLineUp: FixtureLineUp;
  @Input() homeTeamName: string;
  @Input() awayTeamName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
