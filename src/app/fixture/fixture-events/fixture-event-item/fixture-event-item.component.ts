import {Component, Input, OnInit} from '@angular/core';
import {FixtureEvent} from '../../../shared/models/fixture.model';

@Component({
  selector: 'app-fixture-event-item',
  templateUrl: './fixture-event-item.component.html',
  styleUrls: ['./fixture-event-item.component.scss']
})
export class FixtureEventItemComponent implements OnInit {
  @Input() fixtureEvent: FixtureEvent;
  @Input() isHomeTeam: boolean;

  // TODO hasStarted, hasFinished

  constructor() { }

  ngOnInit(): void {
  }

}
