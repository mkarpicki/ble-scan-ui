import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannersComponent } from './scanners/scanners.component';
import { ChannelInfoComponent } from './channel-info/channel-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ScannersComponent,
    ChannelInfoComponent
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
