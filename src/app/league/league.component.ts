import {Component, OnDestroy, OnInit} from '@angular/core';
import {League} from '../shared/models/league.model';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {RepositoryService} from '../shared/services/repository.service';
import {FavoritesService} from '../shared/services/favorites.service';
import {environment} from '../../environments/environment';
import {Title} from '@angular/platform-browser';
import {FixtureType} from '../shared/components/matches/matches.component';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit, OnDestroy {
  private routeParamsSub: Subscription;

  leagueId: number;
  league: League;
  fixtureType = FixtureType.League;
  isFavorite: boolean;
  favoritesSub: Subscription;
  isLoading: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private repositoryService: RepositoryService,
              private favoritesService: FavoritesService) { }

  private static isLeague(response: League | Observable<League>) {
    return (response as League).league_id !== undefined;
  }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.isLoading = true;
      this.leagueId = params.id;
      this.titleService.setTitle(params.name + ' - ' + environment.appTitle);

      const response = this.repositoryService.getLeague(this.leagueId);
      if (LeagueComponent.isLeague(response)) {
        this.processLeague(response as League);
        this.isLoading = false;
      } else {
        (response as Observable<League>).subscribe((league: League) => {
          this.processLeague(league);
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      }
    });
  }

  private processLeague(league: League) {
    this.league = league;

    this.isFavorite = this.favoritesService.isFavoriteLeague(this.league.league_id);
    this.favoritesSub = this.favoritesService.favoriteLeagueRemoved.subscribe((leagueId: number) => {
      if (leagueId === this.league.league_id) { this.isFavorite = false; }
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
