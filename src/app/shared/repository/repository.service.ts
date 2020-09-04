import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Fixture, FixtureGroup} from '../fixture.model';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private allFixtures: Fixture[] = [];
  private isLoadingFixtures = false;
  private hasLoadedFixtures = false;

  allFixturesSubject = new Subject<FixtureGroup[]>();
  liveFixtures = new Subject<FixtureGroup[]>();

  constructor(private apiService: ApiService) { }

  getAllFixtures(date: string) {
    if (this.isLoadingFixtures) {
      console.log('Already loading all fixtures');
      return;
    }
    if (this.hasLoadedFixtures) {
      console.log('All fixtures have already been loaded');
      return;
    }

    this.isLoadingFixtures = true;

    // this.apiService.getAllFixtures(date)
    this.apiService.getAllFixturesTest(date)
      .pipe(map((responseJsonData => {
        let fixtures: Fixture[] = [];
        if (responseJsonData.api && responseJsonData.api.fixtures) {
          fixtures = responseJsonData.api.fixtures;
        }

        return fixtures;
      })))
      .subscribe(allFixtures => {
        this.allFixtures = allFixtures;
        const allFixtureGroupsMap = new Map<string, FixtureGroup>();

        allFixtures.forEach((fixture: Fixture, index: number) => {
          // Ignore fixture is missing required values
          if (!(fixture.league.country && fixture.league.name)) {
            return;
          }

          // TODO Remove fixtures with TDB status code?

          const key = fixture.league.country + '-' + fixture.league.name;
          if (allFixtureGroupsMap.has(key)) {
            allFixtureGroupsMap.get(key).fixtures.push(fixture);
          } else {
            allFixtureGroupsMap.set(key, new FixtureGroup(
              fixture.league.country,
              fixture.league.name,
              [fixture]
            ));
          }
        });

        // console.log(allFixtures);
        this.allFixturesSubject.next([...allFixtureGroupsMap.values()]);  // Iterable to array

        this.isLoadingFixtures = false;
        this.hasLoadedFixtures = true;
      }, error => {
        console.log(error);
        this.isLoadingFixtures = false;
      });
  }
}
