import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {GridsterModule} from 'angular-gridster2';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GridsterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
