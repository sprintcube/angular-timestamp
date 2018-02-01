import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CurrentComponent } from './timestamp/current/current.component';
import { ConverterComponent } from './timestamp/converter/converter.component';
import { TimestampService } from './timestamp/timestamp.service';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CurrentComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [TimestampService],
  bootstrap: [AppComponent]
})
export class AppModule { }
