import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FavoritesService} from '../shared/services/favorites.service';
import {FavoriteTeam} from '../shared/models/team.model';
import {FavoriteLeague} from '../shared/models/league.model';
import {FavoriteFixture} from '../shared/models/fixture.model';


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
    this.teams = this.favoritesService.getTeams();
  }

  private updateLeagues() {
    this.leagues = this.favoritesService.getLeagues();
  }

  private updateFixtures() {
    this.fixtures = this.favoritesService.getFixtures();
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
