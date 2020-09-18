import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Fixture} from '../../shared/models/fixture.model';
import {FavoritesService} from '../../shared/services/favorites.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-fixture-header',
  templateUrl: './fixture-header.component.html',
  styleUrls: ['./fixture-header.component.scss']
})
export class FixtureHeaderComponent implements OnInit, OnDestroy {
  @Input() fixture: Fixture;

  showScore: boolean;
  showVs: boolean;
  showElapsed: boolean;
  showStatus: boolean;

  isFavorite: boolean;
  favoritesSub: Subscription;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    const statusCode = this.fixture.statusShort;

    this.showScore = this.fixture.goalsHomeTeam != null && this.fixture.goalsAwayTeam != null;
    this.showVs = !this.showScore;
    this.showElapsed = this.fixture.elapsed && statusCode !== 'FT';
    this.showStatus = statusCode !== 'NS';

    this.isFavorite = this.favoritesService.isFavoriteFixture(this.fixture.fixture_id);
    this.favoritesSub = this.favoritesService.favoriteFixtureRemoved.subscribe((fixtureId: number) => {
      if (fixtureId === this.fixture.fixture_id) { this.isFavorite = false; }
    });
  }

  onFavouriteClicked() {
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
