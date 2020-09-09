import {Component, Input, OnInit} from '@angular/core';
import {TeamPlayer} from '../../shared/models/team-player.model';
import {RepositoryService} from '../../shared/repository/repository.service';

@Component({
  selector: 'app-team-squad',
  templateUrl: './team-squad.component.html',
  styleUrls: ['./team-squad.component.scss']
})
export class TeamSquadComponent implements OnInit {
  @Input() teamId: number;
  teamPlayers: TeamPlayer[] = [];

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.repositoryService.getSquad(this.teamId, '2019-2020').subscribe((teamPlayers: TeamPlayer[]) => {
      this.teamPlayers = teamPlayers;

      // console.log('TeamComponent received teamPlayers: ' + teamPlayers.length);
      // console.log(this.teamPlayers);
    });
  }

}
