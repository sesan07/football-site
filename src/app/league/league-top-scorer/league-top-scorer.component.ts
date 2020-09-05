import {Component, Input, OnInit} from '@angular/core';
import {LeagueTopScorer} from '../../shared/models/league-top-scorer.model';

@Component({
  selector: 'app-league-top-scorer',
  templateUrl: './league-top-scorer.component.html',
  styleUrls: ['./league-top-scorer.component.scss']
})
export class LeagueTopScorerComponent implements OnInit {
  @Input() topScorer: LeagueTopScorer;

  constructor() { }

  ngOnInit(): void {
  }

}
