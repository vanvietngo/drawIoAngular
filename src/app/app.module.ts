import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrawIOComponent } from './components/draw-io/draw-io.component';
import { ShowDataCellsComponent } from './components/show-data-cells/show-data-cells.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawIOComponent,
    ShowDataCellsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
