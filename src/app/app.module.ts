import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TreeChartComponent } from './components/tree-chart/tree-chart.component';
import { ComingSoonComponent } from './components/tree-chart/coming-soon/coming-soon.component';
import { D3MappingComponent } from './components/d3-mapping/d3-mapping.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, TreeChartComponent, ComingSoonComponent, D3MappingComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
