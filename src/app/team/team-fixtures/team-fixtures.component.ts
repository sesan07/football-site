import {Component, Input, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {Fixture, FixtureGroup} from '../../shared/models/fixture.model';
import {FixtureHelper} from '../../shared/helpers/fixture.helper';

/*enum FixturePeriod {
  OneMonth = '1 Month',
  SixMonths = '6 Months',
  OneYear = '1 Year',
  All = 'All'
}*/

@Component({
  selector: 'app-team-fixtures',
  templateUrl: './team-fixtures.component.html',
  styleUrls: ['./team-fixtures.component.scss']
})
export class TeamFixturesComponent implements OnInit {
  @Input() teamId: number;

  nextFixtures: Fixture[] = [];
  prevFixtures: Fixture[] = [];

  nextFixtureGroups: FixtureGroup[] = [];
  prevFixtureGroups: FixtureGroup[] = [];

  toggleOptions = ['Fixtures', 'Results'];
  toggleIndex = 0;

  fixturePeriodOptions = ['1 Month', '6 Months', '1 Year', 'All'];
  fixturesPeriod = this.fixturePeriodOptions[0];
  nextFixturesPeriod = this.fixturePeriodOptions[0];
  prevFixturesPeriod = this.fixturePeriodOptions[0];

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.repositoryService.getTeamFixtures(this.teamId).subscribe((fixtures: Fixture[]) => {
      fixtures.forEach(fixture => {

        if (Date.parse(fixture.event_date) > Date.now()) {
          this.nextFixtures.push(fixture);
        } else {
          this.prevFixtures.push(fixture);
        }
      });

      this.updateFixtureGroups(true);
      this.updateFixtureGroups(false);
    });
  }

  onToggleButtonClicked(index: number) {
    this.toggleIndex = index;
    this.checkFixtureGroups();
  }

  onPeriodOptionClicked(index: number) {
    this.fixturesPeriod = this.fixturePeriodOptions[index];
    this.checkFixtureGroups();
  }

  checkFixtureGroups() {
    if (this.toggleIndex === 0 && this.fixturesPeriod !== this.nextFixturesPeriod) {
      this.nextFixturesPeriod = this.fixturesPeriod;
      this.updateFixtureGroups(true);
    }
    else if (this.toggleIndex === 1 && this.fixturesPeriod !== this.prevFixturesPeriod) {
      this.prevFixturesPeriod = this.fixturesPeriod;
      this.updateFixtureGroups(false);
    }
  }

  updateFixtureGroups(isNextFixtures: boolean) {

    if (this.fixturesPeriod === 'All') {
      if (isNextFixtures) {
        this.nextFixtureGroups = FixtureHelper.getFixtureGroups(this.nextFixtures);
      } else {
        this.prevFixtureGroups = FixtureHelper.getFixtureGroups(this.prevFixtures);
      }

      return;
    }

    const currDate = new Date();
    let periodDateMilliSeconds: number;
    const dayMultiplier = isNextFixtures ? 1 : -1; // Add or subtract days
    switch (this.fixturesPeriod) {
      case '1 Month':
        periodDateMilliSeconds = currDate.setDate(currDate.getDate() + 30 * dayMultiplier);  // Add or subtract 30 days
        break;
      case '6 Months':
        periodDateMilliSeconds = currDate.setDate(currDate.getDate() + 180 * dayMultiplier);
        break;
      case '1 Year':
        periodDateMilliSeconds = currDate.setDate(currDate.getDate() + 365 * dayMultiplier);
        break;
    }

    const fixtures: Fixture[] = [];
    if (isNextFixtures) {
      this.nextFixtures.forEach(fixture => {
        if (Date.parse(fixture.event_date) < periodDateMilliSeconds) {
          fixtures.push(fixture);
        }
      });

      this.nextFixtureGroups = FixtureHelper.getFixtureGroups(fixtures);
    } else {
      this.prevFixtures.forEach(fixture => {
        if (Date.parse(fixture.event_date) > periodDateMilliSeconds) {
          fixtures.push(fixture);
        }
      });

      this.prevFixtureGroups = FixtureHelper.getFixtureGroups(fixtures);
    }
  }

}
