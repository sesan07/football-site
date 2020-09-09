import {Component, Input, OnInit} from '@angular/core';
import {LeagueTopScorer} from '../../../shared/models/league-top-scorer.model';

@Component({
  selector: 'app-league-top-scorer',
  templateUrl: './league-top-scorer.component.html',
  styleUrls: ['./league-top-scorer.component.scss']
})
export class LeagueTopScorerComponent implements OnInit {
  @Input() topScorer: LeagueTopScorer;
  playerName: string;

  constructor() { }

  ngOnInit(): void {
    const names = this.topScorer.player_name.split(' ');
    this.playerName = names.slice()[0] + ' ' + names.slice(-1)[0];
  }

}
