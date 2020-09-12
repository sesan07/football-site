import {Component, Input, OnInit} from '@angular/core';
import {FavoriteTeam} from '../../shared/models/team.model';
import {FavoritesService} from '../../shared/services/favorites.service';

@Component({
  selector: 'app-sidebar-team-item',
  templateUrl: './sidebar-team-item.component.html',
  styleUrls: ['./sidebar-team-item.component.scss']
})
export class SidebarTeamItemComponent implements OnInit {
  @Input() team: FavoriteTeam;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
  }

  onFavouriteClicked(event: Event) {
    event.stopPropagation();
    this.favoritesService.removeTeam(this.team.teamId);
  }

}
