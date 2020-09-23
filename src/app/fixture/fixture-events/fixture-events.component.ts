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
  @Input() isFullTime: boolean;

  constructor() { }

  ngOnInit(): void {
    if (!this.fixtureEvents) {
      this.fixtureEvents = [];
    }
  }

}
