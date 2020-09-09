import {Component, Input, OnInit} from '@angular/core';
import {FixtureLineUp, FixtureTeam} from '../../../shared/models/fixture.model';

@Component({
  selector: 'app-fixture-line-up-team',
  templateUrl: './fixture-line-up-team.component.html',
  styleUrls: ['./fixture-line-up-team.component.scss']
})
export class FixtureLineUpTeamComponent implements OnInit {
  @Input() team: FixtureTeam;
  @Input() lineUp: FixtureLineUp;

  constructor() { }

  ngOnInit(): void {
  }

}
