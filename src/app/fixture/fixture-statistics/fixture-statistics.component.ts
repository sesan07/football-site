import {Component, Input, OnInit} from '@angular/core';
import {FixtureStatistic} from '../../shared/models/fixture.model';

@Component({
  selector: 'app-fixture-statistics',
  templateUrl: './fixture-statistics.component.html',
  styleUrls: ['./fixture-statistics.component.scss']
})
export class FixtureStatisticsComponent implements OnInit {
  @Input() statistics: [string, FixtureStatistic][];

  constructor() { }

  ngOnInit(): void {
  }

}
