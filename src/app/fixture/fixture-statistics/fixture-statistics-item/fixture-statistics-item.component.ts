import {Component, Input, OnInit} from '@angular/core';
import {FixtureStatistic} from '../../../shared/models/fixture.model';

@Component({
  selector: 'app-fixture-statistics-item',
  templateUrl: './fixture-statistics-item.component.html',
  styleUrls: ['./fixture-statistics-item.component.scss']
})
export class FixtureStatisticsItemComponent implements OnInit {
  @Input() statistic: [string, FixtureStatistic];

  constructor() { }

  ngOnInit(): void {
  }

  getStatName(): string {
    const statName = this.statistic[0];
    switch (statName) {
      case 'Shots on Goal': return 'Shots On Target';
      case 'Shots off Goal': return 'Shots Off Target';
      case 'Shots insidebox': return 'Shots Inside Box';
      case 'Shots outsidebox': return 'Shots Outside Box';
      case 'Total passes': return 'Total Passes';
      case 'Passes accurate': return 'Accurate Passes';
      default: return statName;
    }
  }

  getWidth(isHome: boolean) {
    const statName = this.statistic[0];
    const stat = this.statistic[1];

    let homeStat: number;
    let awayStat: number;

    if (statName === 'Ball Possession' || statName === 'Passes %') {
      homeStat = +stat.home.replace('%', '');
      awayStat = +stat.away.replace('%', '');
    } else {
      homeStat = +stat.home;
      awayStat = +stat.away;
    }

    const total = homeStat + awayStat;
    if (total === 0) {
      return '0%';
    }

    if (isHome) {
        const percentage = (homeStat / total * 100).toFixed(0);
        return percentage + '%';
      } else {
        const percentage = (awayStat / total * 100).toFixed(0);
        return percentage + '%';
      }
  }

}
