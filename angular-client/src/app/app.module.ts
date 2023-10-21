import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannersComponent } from './scanners/scanners.component';
import { ChannelInfoComponent } from './channel-info/channel-info.component';
import { ScanResultsComponent } from './scan-results/scan-results.component';

import { DatePipe } from './pipes/date.pipe';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ScannersComponent,
    ChannelInfoComponent,
    ScanResultsComponent,

    DatePipe,
    TimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
