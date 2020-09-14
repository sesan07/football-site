import {Component, OnDestroy, OnInit} from '@angular/core';
import {League} from '../shared/models/league.model';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {RepositoryService} from '../shared/services/repository.service';
import {Fixture} from '../shared/models/fixture.model';
import {FavoritesService} from '../shared/services/favorites.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit, OnDestroy {
  private routeParamsSub: Subscription;

  leagueId: number;
  league: League;
  fixtures: Fixture[];

  isFavorite: boolean;
  favoritesSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService,
              private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.leagueId = params.id;

      const response = this.repositoryService.getLeague(this.leagueId);
      if (this.isLeague(response)) {
        this.processLeague(response as League);
      } else {
        (response as Observable<League>).subscribe((league: League) => {
          this.processLeague(league);
        });
      }
    });
  }

  processLeague(league: League) {
    this.league = league;

    this.isFavorite = this.favoritesService.isFavoriteLeague(this.league.league_id);
    this.favoritesSub = this.favoritesService.favoriteLeagueRemoved.subscribe((leagueId: number) => {
      if (leagueId === this.league.league_id) { this.isFavorite = false; }
    });

    this.repositoryService.getLeagueFixtures(this.leagueId).subscribe((fixtures: Fixture[]) => {
      this.fixtures = fixtures;
    });
  }

  isLeague(response: League | Observable<League>) {
    return (response as League).league_id !== undefined;
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
