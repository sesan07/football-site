import {Component, Input, OnInit} from '@angular/core';
import {Fixture} from '../../../models/fixture.model';

@Component({
  selector: 'app-fixture-item',
  templateUrl: './fixture-item.component.html',
  styleUrls: ['./fixture-item.component.scss']
})
export class FixtureItemComponent implements OnInit {
  @Input() fixture: Fixture;

  hasError = false;
  errorCode = '';
  showTime = false;
  showScore = false;

  constructor() { }

  ngOnInit(): void {
    const statusCode = this.fixture.statusShort;

    this.showTime = statusCode === 'NS';

    this.showScore = statusCode === '1H' ||
      statusCode === 'HT' ||
      statusCode === '2H' ||
      statusCode === 'ET' ||
      statusCode === 'P' ||
      statusCode === 'FT' ||
      statusCode === 'AET' ||
      statusCode === 'PEN' ||
      statusCode === 'BT';

    if (statusCode === 'TBD' ||
      statusCode === 'INT' ||
      statusCode === 'PST' ||
      statusCode === 'CANC' ||
      statusCode === 'ABD' ||
      statusCode === 'AWD' ||
      statusCode === 'WO') {

      this.hasError = true;
      this.errorCode = statusCode;

      // TODO Show error code in html
    }
  }

}
