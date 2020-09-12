import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Fixture} from '../../../models/fixture.model';
import {Router} from '@angular/router';
import {FavoritesService} from '../../../services/favorites.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-fixture-item',
  templateUrl: './fixture-item.component.html',
  styleUrls: ['./fixture-item.component.scss']
})
export class FixtureItemComponent implements OnInit, OnDestroy {
  @Input() fixture: Fixture;
  @Input() isCompactView: boolean;
  @Input() showDate: boolean;

  showElapsed: boolean;
  showScore: boolean;
  showStatus: boolean;
  showTime = false;

  isFavorite: boolean;
  favoritesSub: Subscription;

  constructor(private router: Router, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    const statusCode = this.fixture.statusShort;

    this.showElapsed = this.fixture.elapsed && statusCode !== 'FT';
    this.showScore = this.fixture.goalsHomeTeam != null && this.fixture.goalsAwayTeam != null;
    this.showStatus = statusCode !== 'NS';
    this.showTime = statusCode === 'NS' || !this.showScore;

    this.isFavorite = this.favoritesService.isFavoriteFixture(this.fixture.fixture_id);
    this.favoritesSub = this.favoritesService.favoriteFixtureRemoved.subscribe((fixtureId: number) => {
      if (fixtureId === this.fixture.fixture_id) { this.isFavorite = false; }
    });
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

  onFavouriteClicked(event: Event) {
    event.stopPropagation();

    if (this.isFavorite) {
      this.isFavorite = false;
      this.favoritesService.removeFixture(this.fixture.fixture_id);
    } else {
      this.isFavorite = true;
      this.favoritesService.addFixture(this.fixture);
    }
  }

  ngOnDestroy(): void {
    this.favoritesSub.unsubscribe();
  }

}
