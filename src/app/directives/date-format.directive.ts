import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[appFormatDateInput]'
})
export class FormatDateInputDirective {
  constructor(private el: ElementRef,
    private control: NgControl,
  ) {}

  @HostListener('keyup', ['$event']) onKeyUp(event: any) {
    console.log(event.target?.value);
    if (event.target?.value.length <  8) {
      return ;
    }
    const parsedDate = moment(event.target?.value, 'DDMMYYYY', true);
    //if (!parsedDate.isValid()) this.control.control?.setValue(null, {emitEvent: false})
    // Input date string
    let dateString = parsedDate.format('DD/MM/YYYY');
    // Split the date string into day, month, and year parts
    let parts = dateString.split('/');
    let day = Number(parts[0]);
    let month = Number(parts[1]);
    let year = Number(parts[2]);
    // Create a new Date object by passing year, month (zero-indexed), and day
    // Note: Months in JavaScript's Date object are zero-indexed (0 = January, 11 = December)
    let dateObject = new Date(year, month - 1, day);
    if (parsedDate.isValid()) {
      this.control.control?.setValue(dateObject, {emitEvent: false})
    }
  }
}