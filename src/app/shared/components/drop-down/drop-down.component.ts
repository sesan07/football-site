import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
  @Input() options: string[];
  @Output() indexItemClicked = new EventEmitter<number>();
  @Output() textItemClicked = new EventEmitter<string>();

  isOpen = false;
  isInList = false;
  activeButtonLabel: string;
  lastIndex: number;

  constructor() { }

  ngOnInit(): void {
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
    this.indexItemClicked.emit(index);
    this.textItemClicked.emit(text);
  }
}
