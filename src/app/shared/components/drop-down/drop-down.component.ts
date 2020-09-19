import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit, OnChanges {
  @Input() options: string[];
  @Input() isListPositionRight = false;
  @Output() ItemClickedIndex = new EventEmitter<number>();
  @Output() ItemClickedValue = new EventEmitter<string>();

  isOpen = false;
  isInList = false;
  activeButtonLabel: string;
  lastIndex: number;

  constructor() { }

  ngOnInit(): void {
    this.setUpValues();
  }

  setUpValues() {
    this.activeButtonLabel = this.options[0];
    this.lastIndex = this.options.length - 1;
  }

  onMainButtonClicked() {
    this.isOpen = true;
  }

  onFocusOut() {
    if (!this.isInList) {
      this.isOpen = false;
    }
  }

  onListEnter() {
    this.isInList = true;
  }

  onListExit() {
    this.isInList = false;
  }

  onItemClicked(index: number, text: string) {
    this.isOpen = false;
    this.isInList = false;

    this.activeButtonLabel = this.options[index];
    this.ItemClickedIndex.emit(index);
    this.ItemClickedValue.emit(text);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setUpValues();
  }
}
