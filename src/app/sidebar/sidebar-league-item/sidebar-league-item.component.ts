import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FavoritesService} from '../../shared/services/favorites.service';
import {Router} from '@angular/router';
import {FavoriteLeague} from '../../shared/models/favorite.model';

@Component({
  selector: 'app-sidebar-league-item',
  templateUrl: './sidebar-league-item.component.html',
  styleUrls: ['./sidebar-league-item.component.scss']
})
export class SidebarLeagueItemComponent implements OnInit {
  @Input() league: FavoriteLeague;
  @Output() clicked = new EventEmitter<null>();

  constructor(private router: Router, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
  }

  onFavouriteClicked(event: Event) {
    event.stopPropagation();
    this.favoritesService.removeLeague(this.league.id);
  }

  onClicked() {
    this.clicked.emit();
    this.favoritesService.leagueClicked(this.league.id);
    this.router.navigate(['/league', this.league.leagueName, this.league.id]);
  }

}
