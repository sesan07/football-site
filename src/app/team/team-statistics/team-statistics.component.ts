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

  isLoading = true;

  private readonly MAX_SEASONS = 5;
  private leagueSeasonIds = new Map<string, Map<number, number>>();  // Map<leagueName, Map<seasonNumber, leagueId>>
  private activeLeagueKey = '';
  private activeSeasonKey = 0;
  private teamStatisticsMap: Map<number, TeamStatistic[]> = new Map();  // <leagueId, teamStatistics>

  leagueOptions: string[];
  seasonOptions: string[];
  activeTeamStatistics: TeamStatistic[] = [];

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.repositoryService.getTeamLeagues(this.teamId).subscribe((leagues: League[]) => {
      leagues.forEach(league => {
        if (this.leagueSeasonIds.has(league.name)) {
          const seasonIds = this.leagueSeasonIds.get(league.name);
          if (seasonIds.size < this.MAX_SEASONS) {
            seasonIds.set(league.season, league.league_id);
          }
        } else {
          const seasons = new Map<number, number>([[league.season, league.league_id]]);
          this.leagueSeasonIds.set(league.name, seasons);
        }
      });

      if (this.leagueSeasonIds.size > 0) {
        this.activeLeagueKey = [...this.leagueSeasonIds.keys()][0];
        this.activeSeasonKey = [...this.leagueSeasonIds.get(this.activeLeagueKey).keys()]
          .sort(((a, b) => b - a))[0];
        this.updateData(true, true);
      }

      this.isLoading = false;
    });
  }

  updateData(updateLeagueOptions: boolean, updateSeasonOptions: boolean) {
    if (updateLeagueOptions) {
      this.leagueOptions = [...this.leagueSeasonIds.keys()];
    }
    if (updateSeasonOptions) {
      this.seasonOptions = [...this.leagueSeasonIds.get(this.activeLeagueKey).keys()]
        .sort(((a, b) => b - a))
        .map(String);
    }

    const activeLeagueId = this.leagueSeasonIds.get(this.activeLeagueKey).get(this.activeSeasonKey);
    if (this.teamStatisticsMap.has(activeLeagueId)) {
      this.activeTeamStatistics = this.teamStatisticsMap.get(activeLeagueId);
    }
    else {
      this.repositoryService.getTeamStatistics(this.teamId, activeLeagueId).subscribe((teamStatistics: TeamStatistic[]) => {
        this.teamStatisticsMap.set(activeLeagueId, teamStatistics);
        this.activeTeamStatistics = teamStatistics;
      });
    }

  }

  onLeagueOptionClicked(text: string) {
    this.activeLeagueKey = text;
    this.activeSeasonKey = [...this.leagueSeasonIds.get(this.activeLeagueKey).keys()]
      .sort(((a, b) => b - a))[0];
    this.updateData(false, true);
  }

  onSeasonOptionClicked(text: string) {
    this.activeSeasonKey = +text;
    this.updateData(false, false);
  }
}
