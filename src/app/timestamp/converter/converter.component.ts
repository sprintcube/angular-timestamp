import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as moment from 'moment-timezone';
import { TimestampService } from '../timestamp.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  tsForm: FormGroup;
  dtForm: FormGroup;
  isSubmitted = false;
  dataInput;
  inputTime;
  convertedTimestamp;
  minDate = new Date(1970, 1, 1, 0, 0, 0);

  constructor(private ts: TimestampService) { }

  ngOnInit() {
    this.tsForm = new FormGroup({
      'timestamp': new FormControl(null, [Validators.required, this.isValidTimestamp.bind(this)])
    });
    this.dtForm = new FormGroup({
      'datetime': new FormControl(null, [Validators.required, this.isValidDatetime.bind(this)])
    });
  }

  onTsSubmit() {
    if (!this.tsForm.valid) {
      this.isSubmitted = false;
      this.tsForm.reset();
    } else {
      this.dtForm.reset();
      this.inputTime = this.tsForm.value.timestamp;
      this.dataInput = this.inputTime;
      this.convertedTimestamp = this.ts.getConvertedUnixTime(this.inputTime);
      this.isSubmitted = true;
    }
  }

  onDtSubmit() {
    if (!this.dtForm.valid) {
      this.isSubmitted = false;
      this.dtForm.reset();
    } else {
      this.tsForm.reset();
      this.inputTime = moment(this.dtForm.value.datetime).unix();
      this.dataInput = moment(this.dtForm.value.datetime).format('M/D/YYYY, h:mm A');
      this.convertedTimestamp = this.ts.getConvertedUnixTime(this.inputTime);
      this.isSubmitted = true;
    }
  }

  isValidTimestamp(control: FormControl): {[s: string]: boolean} {
    if (!moment.unix(control.value).isValid()) {
      return {invalidTimestamp: true};
    }
    return null;
  }

  isValidDatetime(control: FormControl): {[s: string]: boolean} {
    if (!moment(control.value).isValid()) {
      return {invalidDatetime: true};
    }
    return null;
  }
}
