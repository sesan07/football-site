import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() startDate: Date;
  @Output() dateSelected = new EventEmitter<Date>();

  isOpen = false;
  isInCalender = false;
  selectedFullDate: string;
  viewMonth: string;
  viewYear: string;
  selectedDay: number;
  daysBeforeMonth: number[] = [];
  monthDays: number[] = [];

  private viewDate: Date;
  private selectedDate: Date;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.viewDate = new Date(this.startDate);
    this.selectedDate = new Date(this.startDate);
    this.updateDatePicker();
  }

  onMainButtonClicked() {
    this.isOpen = true;
  }

  onFocusOut() {
    if (!this.isInCalender) {
      this.isOpen = false;
    }
  }

  onCalenderEnter() {
    this.isInCalender = true;
  }

  onCalenderExit() {
    this.isInCalender = false;
  }

  onNextClicked() {
    this.viewDate.setMonth(this.viewDate.getMonth() + 1);
    this.updateDatePicker();
  }

  onPrevClicked() {
    this.viewDate.setMonth(this.viewDate.getMonth() - 1);
    this.updateDatePicker();
  }

  onDayClicked(day: number) {
    this.isOpen = false;
    this.isInCalender = false;

    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), day);
    this.selectedDate = new Date(this.viewDate);
    this.updateDatePicker();

    this.dateSelected.emit(this.selectedDate);
  }

  updateDatePicker() {
    this.monthDays = [];

    this.selectedFullDate = this.datePipe.transform(this.selectedDate, 'EEE d MMM, yyyy');
    this.viewMonth = this.datePipe.transform(this.viewDate, 'LLLL');
    this.viewYear = this.datePipe.transform(this.viewDate, 'yyyy');

    if (this.selectedDate.getMonth() === this.viewDate.getMonth()) {
      this.selectedDay = +this.datePipe.transform(this.viewDate, 'd');
    } else {
      this.selectedDay = 0;
    }

    const firstDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    const firstDay = this.datePipe.transform(firstDate, 'EEE');
    switch (firstDay) {
      case 'Mon': { this.daysBeforeMonth = Array(1).fill(0); break; }
      case 'Tue': { this.daysBeforeMonth = Array(2).fill(0); break; }
      case 'Wed': { this.daysBeforeMonth = Array(3).fill(0); break; }
      case 'Thu': { this.daysBeforeMonth = Array(4).fill(0); break; }
      case 'Fri': { this.daysBeforeMonth = Array(5).fill(0); break; }
      case 'Sat': { this.daysBeforeMonth = Array(6).fill(0); break; }
    }

    // Fill cells in month
    const daysInMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      this.monthDays.push(i);
    }
  }

}
