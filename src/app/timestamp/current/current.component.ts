import { Component, OnInit } from '@angular/core';
import { TimestampService } from '../timestamp.service';
import { Timestamp } from '../timestamp';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit, OnDestroy {
  currentTimestamp: Timestamp;
  subscription: Subscription;
  constructor(private ts: TimestampService) { }

  ngOnInit() {
    this.getCurrentTime();
  }

  getCurrentTime() {
    this.subscription = this.ts.getCurrentTime().subscribe((timestamp) => {
      this.currentTimestamp = timestamp;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
