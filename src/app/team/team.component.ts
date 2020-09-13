import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Team} from '../shared/models/team.model';
import {RepositoryService} from '../shared/services/repository.service';
import {FavoritesService} from '../shared/services/favorites.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  private routeParamsSub: Subscription;

  teamId: number;
  team: Team;

  isFavorite: boolean;
  favoritesSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService,
              private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.teamId = params.id;

      this.repositoryService.getTeam(this.teamId).subscribe((team: Team) => {
        this.team = team;

        this.isFavorite = this.favoritesService.isFavoriteTeam(this.team.team_id);
        this.favoritesSub = this.favoritesService.favoriteTeamRemoved.subscribe((teamId: number) => {
          if (teamId === this.team.team_id) { this.isFavorite = false; }
        });
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
