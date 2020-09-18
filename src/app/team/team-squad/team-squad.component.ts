import {Component, Input, OnInit} from '@angular/core';
import {TeamPlayer} from '../../shared/models/team-player.model';
import {RepositoryService} from '../../shared/services/repository.service';

@Component({
  selector: 'app-team-squad',
  templateUrl: './team-squad.component.html',
  styleUrls: ['./team-squad.component.scss']
})
export class TeamSquadComponent implements OnInit {
  @Input() teamId: number;
  squad: [string, TeamPlayer[]][];

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.repositoryService.getTeamSquad(this.teamId, '2019-2020').subscribe((players: TeamPlayer[]) => {
      const playerMap = new Map<string, TeamPlayer[]>();
      players.forEach(player => {
        if (playerMap.has(player.position)) {
          playerMap.get(player.position).push(player);
        } else {
          playerMap.set(player.position, [player]);
        }
      });

      this.squad = Array.from(playerMap);
      this.squad.forEach(position => {
        position[1].sort((a, b) => a.firstname.localeCompare(b.firstname));
      });
    });
  }

}
