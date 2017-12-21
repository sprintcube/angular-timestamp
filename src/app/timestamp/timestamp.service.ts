import { Injectable } from "@angular/core";
import * as moment from "moment-timezone";
import { Timestamp } from "./timestamp";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

@Injectable()
export class TimestampService {
  currentTS: Timestamp;
  constructor() {
    this.setCurrent();
    // setInterval(() => {
    //   this.setCurrent();
    // }, 5000);
  }

  private setCurrent() {
    this.currentTS = this.buildTime(
      moment()
        .tz("UTC")
        .unix()
    );
  }

  private buildTime(timestamp) {
    const current = moment().set(timestamp).tz(moment.tz.guess());
    const utc = moment().set(timestamp).tz('UTC');
    return {
      current: this.getTimeObj(current),
      utc: this.getTimeObj(utc)
    };
  }

  private getTimeObj(momentObj) {
    return {
      tz: momentObj.tz(),
      current: momentObj.unix(),
      fullDate: momentObj.format("MMMM Do YYYY"),
      fullDateTime: momentObj.format("MMMM Do YYYY, h:mm:ss A"),
      iso8601: momentObj.format()
    };
  }

  getCurrentTime(): Timestamp {
    return this.currentTS;
  }

  getCurrentTimestamp(): Observable<Timestamp> {
    this.setCurrent();
    return of(this.currentTS);
  }
}
