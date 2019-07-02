import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeChartComponent } from './components/tree-chart/tree-chart.component';
import { ComingSoonComponent } from './components/tree-chart/coming-soon/coming-soon.component';
import { D3MappingComponent } from './components/d3-mapping/d3-mapping.component';

const routes: Routes = [
  { path: 'line-chart', component: ComingSoonComponent },
  { path: 'pie-chart', component: ComingSoonComponent },
  { path: 'map', component: ComingSoonComponent },
  { path: 'tree', component: TreeChartComponent },
  { path: 'chart2', component: ComingSoonComponent },
  { path: 'map-editor', component: D3MappingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
    routes = routes;
 }