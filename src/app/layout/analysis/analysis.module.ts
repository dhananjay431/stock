import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [CommonModule, AnalysisRoutingModule, FormsModule],
})
export class AnalysisModule {}
