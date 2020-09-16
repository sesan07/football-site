import {Component, Input, OnInit} from '@angular/core';
import {FixtureGroup} from '../../models/fixture.model';

@Component({
  selector: 'app-fixture-group',
  templateUrl: './fixture-group.component.html',
  styleUrls: ['./fixture-group.component.scss']
})
export class FixtureGroupComponent implements OnInit {
  @Input() fixtureGroup: FixtureGroup;
  @Input() isCompactView: boolean;
  @Input() date;
  @Input() showFixtureDates = false;
  @Input() isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
