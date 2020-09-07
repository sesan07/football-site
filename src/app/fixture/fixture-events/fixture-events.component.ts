import {Component, Input, OnInit} from '@angular/core';
import {FixtureEvent} from '../../shared/models/fixture.model';

@Component({
  selector: 'app-fixture-events',
  templateUrl: './fixture-events.component.html',
  styleUrls: ['./fixture-events.component.scss']
})
export class FixtureEventsComponent implements OnInit {
  @Input() fixtureEvents: FixtureEvent[];
  @Input() homeTeamId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
