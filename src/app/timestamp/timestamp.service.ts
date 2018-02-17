import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { Timestamp } from './timestamp';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TimestampService {
  private currentTS = new BehaviorSubject<Timestamp>(null);

  constructor() {
    this.currentTS.next(this.setCurrent());
    setInterval(() => {
      this.currentTS.next(this.setCurrent());
    }, 5000);
  }

  private setCurrent(): Timestamp {
    return this.buildTime(
      moment()
        .tz('UTC')
        .unix()
    );
  }

  private buildTime(timestamp) {
    const current = moment()
      .set(timestamp)
      .tz(moment.tz.guess());
    const utc = moment()
      .set(timestamp)
      .tz('UTC');
    return {
      current: this.getTimeObj(current),
      utc: this.getTimeObj(utc)
    };
  }

  private getTimeObj(momentObj) {
    return {
      tz: momentObj.tz(),
      current: momentObj.unix(),
      fullDate: momentObj.format('MMMM Do YYYY'),
      fullDateTime: momentObj.format('MMM Do YYYY, h:mm:ss A'),
      iso8601: momentObj.format()
    };
  }

  getCurrentTime(): Observable<Timestamp> {
    return this.currentTS.asObservable();
  }

  getConvertedUnixTime(timestamp): Timestamp {
    const utc = moment.unix(timestamp)
      .tz('UTC');
    const current = utc
      .clone()
      .tz(moment.tz.guess());
    return {
      current: this.getTimeObj(current),
      utc: this.getTimeObj(utc)
    };
  }
}
