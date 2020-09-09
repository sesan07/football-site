import {Component, Input, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/repository/repository.service';
import {LeagueTopScorer} from '../../shared/models/league-top-scorer.model';

@Component({
  selector: 'app-league-top-scorers',
  templateUrl: './league-top-scorers.component.html',
  styleUrls: ['./league-top-scorers.component.scss']
})
export class LeagueTopScorersComponent implements OnInit {
  @Input() leagueId: number;
  topScorers: LeagueTopScorer[] = [];

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {

    this.repositoryService.getLeagueTopScorers(this.leagueId).subscribe((topScorers: LeagueTopScorer[]) => {
      this.topScorers = topScorers;
    });

  }

}