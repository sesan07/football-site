import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FavoritesService} from '../../shared/services/favorites.service';
import {Router} from '@angular/router';
import {FavoriteTeam} from '../../shared/models/favorite.model';

@Component({
  selector: 'app-sidebar-team-item',
  templateUrl: './sidebar-team-item.component.html',
  styleUrls: ['./sidebar-team-item.component.scss']
})
export class SidebarTeamItemComponent implements OnInit {
  @Input() team: FavoriteTeam;
  @Output() clicked = new EventEmitter<null>();

  constructor(private router: Router, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
  }

  onFavouriteClicked(event: Event) {
    event.stopPropagation();
    this.favoritesService.removeTeam(this.team.id);
  }

  onClicked() {
    this.clicked.emit();
    this.favoritesService.teamClicked(this.team.id);
  }

}
