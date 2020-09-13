import {Component, Input, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {League} from '../../shared/models/league.model';
import {TeamStatistic} from '../../shared/models/team-statistic.model';

@Component({
  selector: 'app-team-statistics',
  templateUrl: './team-statistics.component.html',
  styleUrls: ['./team-statistics.component.scss']
})
export class TeamStatisticsComponent implements OnInit {
  @Input() teamId: number;

  leagues: League[] = [];
  teamStatisticsMap: Map<number, TeamStatistic[]> = new Map();  // <leagueId, teamStatistics>
  activeTeamStatistics: TeamStatistic[] = [];

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.repositoryService.getTeamLeagues(this.teamId, '2020').subscribe((leagues: League[]) => {  // TODO remove season
      this.leagues = leagues;

      this.teamStatisticsMap.clear();
      this.activeTeamStatistics = [];
      leagues.forEach((league: League) => {
        this.repositoryService.getTeamStatistics(this.teamId, league.league_id).subscribe((teamStatistics: TeamStatistic[]) => {
          this.teamStatisticsMap.set(league.league_id, teamStatistics);

          if (this.activeTeamStatistics.length === 0) {
            this.activeTeamStatistics.push(...teamStatistics);
          }
        });
      });
    });
  }

}
