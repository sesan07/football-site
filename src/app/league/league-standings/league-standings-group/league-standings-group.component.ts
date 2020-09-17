import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LeagueTeamStanding} from '../../../shared/models/league-standing.model';

@Component({
  selector: 'app-league-standings-group',
  templateUrl: './league-standings-group.component.html',
  styleUrls: ['./league-standings-group.component.scss'],
})
export class LeagueStandingsGroupComponent implements OnInit, OnChanges {
  @Input() groupStandings: LeagueTeamStanding[];

  private qualificationColors: string[] = ['#248EE5', '#156EB7', '#0F4D80', '#092C49'];
  private relegationColors: string[] = ['#F55200', '#B83D00', '#7A2900'];
  private qualificationIndex = 0;
  private relegationIndex = 0;
  private descriptions: Map<string, string> = new Map();
  private nullFound = false;

  groupName: string;
  descriptionPairs: [string, string][] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.groupName = this.groupStandings[0].group;
  }

  getRankColor(rankDescription?: string) {
    let rankColor;

    if (this.descriptions.has(rankDescription)) {
      rankColor = this.descriptions.get(rankDescription);
    } else {
      if (rankDescription === null) {
        this.nullFound = true;
        rankColor = '';
      }
      else if (this.nullFound) {
        rankColor = this.relegationColors[this.relegationIndex];
        this.relegationIndex++;
      }
      else {
        rankColor = this.qualificationColors[this.qualificationIndex];
        this.qualificationIndex++;
      }

      this.descriptions.set(rankDescription, rankColor);
      if (rankDescription !== null) { this.descriptionPairs.push([rankDescription, rankColor]); }
    }

    return rankColor;
  }

  setUpValues() {
    this.groupName = this.groupStandings[0].group;
    this.qualificationIndex = 0;
    this.relegationIndex = 0;
    this.descriptions = new Map();
    this.descriptionPairs = [];
    this.nullFound = false;

    this.changeDetectorRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setUpValues();
  }


}
