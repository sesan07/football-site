import {Component, Input, OnInit} from '@angular/core';
import {Fixture, FixtureGroup} from '../../shared/models/fixture.model';
import {FixtureHelper} from '../../shared/helpers/fixture.helper';
import {RepositoryService} from '../../shared/services/repository.service';

@Component({
  selector: 'app-fixture-head-to-head',
  templateUrl: './fixture-head-to-head.component.html',
  styleUrls: ['./fixture-head-to-head.component.scss']
})
export class FixtureHeadToHeadComponent implements OnInit {
  @Input() homeTeamId: number;
  @Input() awayTeamId: number;
  fixtureGroups: FixtureGroup[];

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.repositoryService.getFixtureHeadToHead(this.homeTeamId, this.awayTeamId).subscribe((fixtures: Fixture[]) => {
      this.fixtureGroups = FixtureHelper.getFixtureGroups(fixtures);
    });
  }

}
