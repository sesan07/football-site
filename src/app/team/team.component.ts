import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Team} from '../shared/models/team.model';
import {RepositoryService} from '../shared/services/repository.service';
import {FavoritesService} from '../shared/services/favorites.service';
import {Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';
import {FixtureType} from '../shared/components/matches/matches.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  private routeParamsSub: Subscription;

  teamId: number;
  team: Team;
  fixtureType = FixtureType.Team;
  isFavorite: boolean;
  favoritesSub: Subscription;
  isLoading: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private repositoryService: RepositoryService,
              private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.isLoading = true;
      this.teamId = params.id;
      this.titleService.setTitle(params.name + ' - ' + environment.appTitle);

      this.repositoryService.getTeam(this.teamId).subscribe((team: Team) => {
        if (team === null) {
          this.isLoading = false;
          return;
        }
        this.team = team;

        this.isFavorite = this.favoritesService.isFavoriteTeam(this.team.team_id);
        this.favoritesSub = this.favoritesService.favoriteTeamRemoved.subscribe((teamId: number) => {
          if (teamId === this.team.team_id) { this.isFavorite = false; }
        });

        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    });
  }

  onFavouriteClicked(event: Event) {
    event.stopPropagation();

    if (this.isFavorite) {
      this.isFavorite = false;
      this.favoritesService.removeTeam(this.team.team_id);
    } else {
      this.isFavorite = true;
      this.favoritesService.addTeam(this.team);
    }
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
    this.favoritesSub.unsubscribe();
  }

}
