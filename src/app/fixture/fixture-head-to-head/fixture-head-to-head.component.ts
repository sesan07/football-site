import {Component, Input, OnInit} from '@angular/core';
import {FixtureGroup} from '../../shared/models/fixture.model';

@Component({
  selector: 'app-fixture-head-to-head',
  templateUrl: './fixture-head-to-head.component.html',
  styleUrls: ['./fixture-head-to-head.component.scss']
})
export class FixtureHeadToHeadComponent implements OnInit {
  @Input() fixtureGroups: FixtureGroup[];

  constructor() { }

  ngOnInit(): void {
    if (!this.fixtureGroups) {
      this.fixtureGroups = [];
    }
  }

}
