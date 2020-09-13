import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
  @Input() options: string[];
  @Output() itemClicked = new EventEmitter<number>();

  @ViewChild('dropdownList', {static: false}) dropdownListRef: ElementRef;

  activeButtonLabel: string;
  lastIndex: number;

  constructor() { }

  ngOnInit(): void {
    this.activeButtonLabel = this.options[0];
    this.lastIndex = this.options.length - 1;
  }

  onItemClicked(index: number) {
    this.activeButtonLabel = this.options[index];
    this.itemClicked.emit(index);
  }
}
