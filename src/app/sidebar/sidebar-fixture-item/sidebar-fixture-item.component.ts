import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FavoritesService} from '../../shared/services/favorites.service';
import {Router} from '@angular/router';
import {FavoriteFixture} from '../../shared/models/favorite.model';

@Component({
  selector: 'app-sidebar-fixture-item',
  templateUrl: './sidebar-fixture-item.component.html',
  styleUrls: ['./sidebar-fixture-item.component.scss']
})
export class SidebarFixtureItemComponent implements OnInit {
  @Input() fixture: FavoriteFixture;
  @Output() clicked = new EventEmitter<null>();

  constructor(private router: Router, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
  }

  onFavouriteClicked(event: Event) {
    event.stopPropagation();
    this.favoritesService.removeFixture(this.fixture.id);
  }

  onClicked() {
    this.clicked.emit();
    this.favoritesService.fixtureClicked(this.fixture.id);
  }

}
