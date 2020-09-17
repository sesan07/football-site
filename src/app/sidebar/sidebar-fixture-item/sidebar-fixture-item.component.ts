import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FavoriteFixture} from '../../shared/models/fixture.model';
import {FavoritesService} from '../../shared/services/favorites.service';
import {Router} from '@angular/router';

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
    this.favoritesService.removeFixture(this.fixture.fixtureId);
  }

  onClicked() {
    this.clicked.emit();
    this.router.navigate(['/fixture', this.fixture.fixtureId]);
  }

}
