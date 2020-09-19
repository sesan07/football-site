import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FavoritesService} from '../shared/services/favorites.service';
import {FavoriteFixture, FavoriteLeague, FavoriteTeam} from '../shared/models/favorite.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isCollapsed = true;
  teams: FavoriteTeam[];
  leagues: FavoriteLeague[];
  fixtures: FavoriteFixture[];
  isTeamsOpen = true;
  isLeaguesOpen = true;
  isFixturesOpen = false;

  constructor(private router: Router, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.updateTeams();
    this.updateLeagues();
    this.updateFixtures();

    this.favoritesService.favoriteTeamAdded.subscribe(() => { this.updateTeams(); });
    this.favoritesService.favoriteLeagueAdded.subscribe(() => { this.updateLeagues(); });
    this.favoritesService.favoriteFixtureAdded.subscribe(() => { this.updateFixtures(); });

    this.favoritesService.favoriteTeamRemoved.subscribe(() => { this.updateTeams(); });
    this.favoritesService.favoriteLeagueRemoved.subscribe(() => { this.updateLeagues(); });
    this.favoritesService.favoriteFixtureRemoved.subscribe(() => { this.updateFixtures(); });
  }

  private updateTeams() {
    this.teams = this.favoritesService.getTeams()
      .sort((a, b) => b.clickCount - a.clickCount);
  }

  private updateLeagues() {
    this.leagues = this.favoritesService.getLeagues()
      .sort((a, b) => b.clickCount - a.clickCount);
  }

  private updateFixtures() {
    this.fixtures = this.favoritesService.getFixtures()
      .sort((a, b) => b.clickCount - a.clickCount);
  }

  onFavoriteClicked() {
    this.isCollapsed = true;
  }

  onHomeClicked() {
    this.isCollapsed = true;
    this.router.navigate(['']);
  }

  onMenuClicked(event: Event) {
    event.stopPropagation();
    this.isCollapsed = !this.isCollapsed;
  }

}
