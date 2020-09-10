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

  // isGoal: boolean;
  isNormalGoal: boolean;
  isOwnGoal: boolean;
  isPenalty: boolean;
  isMissedPenalty: boolean;

  isCard: boolean;
  isYellowCard: boolean;
  isRedCard: boolean;
  isSubstitution: boolean;

  playerOne: string = null;
  playerTwo: string = null;

  // TODO hasStarted, hasFinished

  constructor() { }

  ngOnInit(): void {
    if (this.fixtureEvent.type === 'Goal') {
      // this.isGoal = true;
      this.isNormalGoal = this.fixtureEvent.detail === 'Normal Goal';
      this.isOwnGoal = this.fixtureEvent.detail === 'Own Goal';
      this.isPenalty = this.fixtureEvent.detail === 'Penalty';
      this.isMissedPenalty = this.fixtureEvent.detail === 'Missed Penalty';

      this.playerOne = this.fixtureEvent.player;
      this.playerTwo = this.fixtureEvent.assist;
    }
    else if (this.fixtureEvent.type === 'subst') {
      this.isSubstitution = true;

      this.playerOne = this.fixtureEvent.player;
      this.playerTwo = this.fixtureEvent.detail;
    }
    else if (this.fixtureEvent.type === 'Card') {
      this.isYellowCard = this.fixtureEvent.detail === 'Yellow Card';
      this.isRedCard = this.fixtureEvent.detail === 'Red Card';

      this.playerOne = this.fixtureEvent.player;
    }
  }

}
