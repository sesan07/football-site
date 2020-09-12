import {Component, Input, OnInit} from '@angular/core';
import {FavoriteLeague} from '../../shared/models/league.model';
import {FavoritesService} from '../../shared/services/favorites.service';

@Component({
  selector: 'app-sidebar-league-item',
  templateUrl: './sidebar-league-item.component.html',
  styleUrls: ['./sidebar-league-item.component.scss']
})
export class SidebarLeagueItemComponent implements OnInit {
  @Input() league: FavoriteLeague;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
  }

  onFavouriteClicked(event: Event) {
    event.stopPropagation();
    this.favoritesService.removeLeague(this.league.leagueId);
  }

}
