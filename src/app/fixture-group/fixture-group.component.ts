import {Component, Input, OnInit} from '@angular/core';
import {FixtureGroup} from '../shared/fixture.model';

@Component({
  selector: 'app-fixture-group',
  templateUrl: './fixture-group.component.html',
  styleUrls: ['./fixture-group.component.scss']
})
export class FixtureGroupComponent implements OnInit {
  @Input() fixtureGroup: FixtureGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
