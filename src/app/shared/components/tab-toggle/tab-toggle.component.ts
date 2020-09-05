import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tab-toggle',
  templateUrl: './tab-toggle.component.html',
  styleUrls: ['./tab-toggle.component.scss']
})
export class TabToggleComponent implements OnInit {
  @Input() buttonLabels: [string, string];
  @Output() activeChanged = new EventEmitter<number>();

  activeIndex = 0;

  ngOnInit(): void {
  }

  onButtonClicked(index: number) {
    this.activeIndex = index;
    this.activeChanged.emit(index);
  }

}
