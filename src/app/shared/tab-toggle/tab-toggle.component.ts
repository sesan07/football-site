import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tab-toggle',
  templateUrl: './tab-toggle.component.html',
  styleUrls: ['./tab-toggle.component.scss']
})
export class TabToggleComponent implements OnInit {
  @Input() buttonLabels: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
