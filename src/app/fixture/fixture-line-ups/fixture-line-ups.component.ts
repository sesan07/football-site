import {Component, Input, OnInit} from '@angular/core';
import {FixtureLineUp, FixtureTeam} from '../../shared/models/fixture.model';

@Component({
  selector: 'app-fixture-line-ups',
  templateUrl: './fixture-line-ups.component.html',
  styleUrls: ['./fixture-line-ups.component.scss']
})
export class FixtureLineUpsComponent implements OnInit {
  @Input() homeTeam: FixtureTeam;
  @Input() awayTeam: FixtureTeam;
  @Input() homeLineUp: FixtureLineUp;
  @Input() awayLineUp: FixtureLineUp;

  constructor() { }

  ngOnInit(): void {
  }

}
