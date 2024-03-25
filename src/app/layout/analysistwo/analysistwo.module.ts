import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysistwoRoutingModule } from './analysistwo-routing.module';
import { AnalysistwoComponent } from './analysistwo.component';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [AnalysistwoComponent, ChartComponent],
  imports: [CommonModule, AnalysistwoRoutingModule, FormsModule],
})
export class AnalysistwoModule {}
