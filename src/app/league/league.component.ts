import {Component, OnDestroy, OnInit} from '@angular/core';
import {League} from '../shared/models/league.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {RepositoryService} from '../shared/services/repository.service';
import {Fixture, FixtureGroup} from '../shared/models/fixture.model';
import {FixtureHelper} from '../shared/helpers/fixture.helper';
import {FavoritesService} from '../shared/services/favorites.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit, OnDestroy {
  private routeParamsSub: Subscription;

  private readonly PREVIOUS_FIXTURE_COUNT = 10;
  private readonly NEXT_FIXTURE_COUNT = 10;

  leagueId: number;
  league: League;
  fixtures: Fixture[] = [];
  fixtureGroups: FixtureGroup[] = [];

  isFavorite: boolean;
  favoritesSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService,
              private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.leagueId = params.id;

      this.repositoryService.getLeague(this.leagueId).subscribe((league: League) => {
        this.league = league;

        this.isFavorite = this.favoritesService.isFavoriteLeague(this.league.league_id);
        this.favoritesSub = this.favoritesService.favoriteLeagueRemoved.subscribe((leagueId: number) => {
          if (leagueId === this.league.league_id) { this.isFavorite = false; }
        });
      });

      this.fixtures = [];
      this.getLeagueFixtures(this.NEXT_FIXTURE_COUNT, true);
      this.getLeagueFixtures(this.PREVIOUS_FIXTURE_COUNT, false);
    });
  }

  getLeagueFixtures(count: number, isNextFixtures) {
    this.repositoryService.getLeagueFixtures(this.leagueId, count, isNextFixtures).subscribe((fixtures: Fixture[]) => {
      this.fixtures.push(...fixtures);

      this.fixtureGroups = [];
      const fixtureGroups = FixtureHelper.getFixtureGroups(this.fixtures);
      this.fixtureGroups.push(...fixtureGroups);
    });
  }

  onFavouriteClicked(event: Event) {
    event.stopPropagation();

    if (this.isFavorite) {
      this.isFavorite = false;
      this.favoritesService.removeLeague(this.league.league_id);
    } else {
      this.isFavorite = true;
      this.favoritesService.addLeague(this.league);
    }
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
    this.favoritesSub.unsubscribe();
  }

}
