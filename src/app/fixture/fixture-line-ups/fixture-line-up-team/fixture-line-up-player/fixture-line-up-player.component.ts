import {Component, Input, OnInit} from '@angular/core';
import {LineUpPlayer} from '../../../../shared/models/fixture.model';

@Component({
  selector: 'app-fixture-line-up-player',
  templateUrl: './fixture-line-up-player.component.html',
  styleUrls: ['./fixture-line-up-player.component.scss']
})
export class FixtureLineUpPlayerComponent implements OnInit {
  @Input() player: LineUpPlayer;

  constructor() { }

  ngOnInit(): void {
  }

}
