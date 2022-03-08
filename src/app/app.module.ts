import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import {HttpClientModule} from "@angular/common/http";
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DataViewerComponent } from './data-viewer/data-viewer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DataBodyComponent } from './data-body/data-body.component';

PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    DataViewerComponent,
    QuickSearchComponent,
    DataBodyComponent
  ],
  imports: [
    BrowserModule,
    PlotlyModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
