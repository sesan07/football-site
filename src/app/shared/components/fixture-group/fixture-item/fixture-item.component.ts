import {Component, Input, OnInit} from '@angular/core';
import {Fixture} from '../../../models/fixture.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fixture-item',
  templateUrl: './fixture-item.component.html',
  styleUrls: ['./fixture-item.component.scss']
})
export class FixtureItemComponent implements OnInit {
  @Input() fixture: Fixture;
  @Input() isCompactView: boolean;
  @Input() showDate: boolean;

  showElapsed: boolean;
  showScore: boolean;
  showStatus: boolean;
  showTime = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const statusCode = this.fixture.statusShort;

    this.showElapsed = this.fixture.elapsed && statusCode !== 'FT';
    this.showScore = this.fixture.goalsHomeTeam != null && this.fixture.goalsAwayTeam != null;
    this.showStatus = statusCode !== 'NS';
    this.showTime = statusCode === 'NS' || !this.showScore;
  }

  onTeamClicked(event: Event, isHome: boolean) {
    event.stopPropagation();  // Prevent clicking fixture underneath team

    const teamName = isHome ? this.fixture.homeTeam.team_name : this.fixture.awayTeam.team_name;
    const teamId = isHome ? this.fixture.homeTeam.team_id : this.fixture.awayTeam.team_id;
    this.router.navigate(['/team', teamName, teamId]);

  }

  onFixtureClicked() {
    this.router.navigate(['/fixture', this.fixture.fixture_id]);
  }

}
