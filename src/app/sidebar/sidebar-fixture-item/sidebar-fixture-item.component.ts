import {Component, Input, OnInit} from '@angular/core';
import {FavoriteFixture} from '../../shared/models/fixture.model';
import {FavoritesService} from '../../shared/services/favorites.service';

@Component({
  selector: 'app-sidebar-fixture-item',
  templateUrl: './sidebar-fixture-item.component.html',
  styleUrls: ['./sidebar-fixture-item.component.scss']
})
export class SidebarFixtureItemComponent implements OnInit {
  @Input() fixture: FavoriteFixture;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
  }

  onFavouriteClicked(event: Event) {
    event.stopPropagation();
    this.favoritesService.removeFixture(this.fixture.fixtureId);
  }

}
