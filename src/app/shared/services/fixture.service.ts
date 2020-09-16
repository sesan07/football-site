import { Injectable } from '@angular/core';
import {Fixture, FixtureGroup} from '../models/fixture.model';
import {FavoritesService} from './favorites.service';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  constructor(private favoritesService: FavoritesService) { }

  getFixtureGroups(fixtures: Fixture[]): FixtureGroup[] {
    const fixtureGroupMap = new Map<string, FixtureGroup>();

    fixtures.forEach((fixture: Fixture) => {
      // Ignore fixture if missing required values
      if (!(fixture.league.country && fixture.league.name)) {
        return;
      }

      // TODO Remove fixtures with TDB status code?
      const isFavorite =
        this.favoritesService.isFavoriteLeague(fixture.league_id) ||
        this.favoritesService.isFavoriteTeam(fixture.homeTeam.team_id) ||
        this.favoritesService.isFavoriteTeam(fixture.awayTeam.team_id) ||
        this.favoritesService.isFavoriteFixture(fixture.fixture_id);

      const key = fixture.league.country + '-' + fixture.league.name;
      if (fixtureGroupMap.has(key)) {
        const fixtureGroup = fixtureGroupMap.get(key);

        if (isFavorite) { fixtureGroup.isFavorite = true; }
        fixtureGroup.fixtures.push(fixture);
      } else {
        fixtureGroupMap.set(key, new FixtureGroup(
          fixture.league.country,
          fixture.league.name,
          fixture.league_id,
          fixture.league.logo,
          isFavorite,
          [fixture]
        ));
      }
    });

    const fixtureGroups: FixtureGroup[] = [];
    const nonFavorites: FixtureGroup[] = [];
    for (const fixtureGroup of fixtureGroupMap.values()) {
      if (fixtureGroup.isFavorite) {
        fixtureGroups.push(fixtureGroup);
      } else {
        nonFavorites.push(fixtureGroup);
      }
    }

    fixtureGroups.sort((a, b) => a.country.localeCompare(b.country));
    nonFavorites.sort((a, b) => a.country.localeCompare(b.country));

    fixtureGroups.push(...nonFavorites);

    return fixtureGroups;  // Iterable (values) to array
  }
}
