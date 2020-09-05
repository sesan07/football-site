import {Component, Input, OnInit} from '@angular/core';
import {TeamPlayer} from '../../shared/models/team-player.model';

@Component({
  selector: 'app-team-player',
  templateUrl: './team-player.component.html',
  styleUrls: ['./team-player.component.scss']
})
export class TeamPlayerComponent implements OnInit {
  @Input() teamPlayer: TeamPlayer;

  constructor() { }

  ngOnInit(): void {
  }

}
