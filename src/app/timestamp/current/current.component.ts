import { Component, OnInit } from '@angular/core';
import { TimestampService } from '../timestamp.service';
import { Timestamp } from '../timestamp';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  currentTimestamp: Timestamp;
  constructor(private ts: TimestampService) { }

  ngOnInit() {
    this.getCurrentTime();
  }

  getCurrentTime() {
    this.currentTimestamp = this.ts.getCurrentTime();
  }
}
