import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-team-stat',
  templateUrl: './team-stat.component.html',
  styleUrls: ['./team-stat.component.scss']
})
export class TeamStatComponent implements OnInit {
  @Input() statName: string;
  @Input() homeValue: string;
  @Input() awayValue: string;
  @Input() totalValue: string;

  constructor() { }

  ngOnInit(): void {
  }

}
