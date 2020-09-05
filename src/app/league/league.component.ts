import {Component, OnDestroy, OnInit} from '@angular/core';
import {League} from '../shared/models/league.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {RepositoryService} from '../shared/repository/repository.service';
import {Fixture, FixtureGroup} from '../shared/models/fixture.model';
import {FixturesManager} from '../shared/managers/fixtures.manager';
import {LeagueTopScorer} from '../shared/models/league-top-scorer.model';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit, OnDestroy {
  private readonly PREVIOUS_FIXTURE_COUNT = 10;
  private readonly NEXT_FIXTURE_COUNT = 10;

  private leagueId: number;
  league: League;
  fixtures: Fixture[] = [];
  fixtureGroups: FixtureGroup[] = [];
  topScorers: LeagueTopScorer[] = [];

  private routeParamsSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.leagueId = params.id;

      this.repositoryService.getLeague(this.leagueId).subscribe((league: League) => {
        this.league = league;
      });

      this.fixtures = [];
      this.getLeagueFixtures(this.NEXT_FIXTURE_COUNT, true);
      this.getLeagueFixtures(this.PREVIOUS_FIXTURE_COUNT, false);

      this.repositoryService.getLeagueTopScorers(this.leagueId).subscribe((topScorers: LeagueTopScorer[]) => {
        this.topScorers = topScorers;
      });
    });
  }

  getLeagueFixtures(count: number, isNextFixtures) {
    this.repositoryService.getLeagueFixtures(this.leagueId, count, isNextFixtures).subscribe((fixtures: Fixture[]) => {
      this.fixtures.push(...fixtures);

      this.fixtureGroups = [];
      const fixtureGroups = FixturesManager.getFixtureGroups(this.fixtures);
      this.fixtureGroups.push(...fixtureGroups);

      // console.log('TeamComponent received fixtures: ' + fixtures.length);
      // console.log(fixtures);
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

}
