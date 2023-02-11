import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { DashComponent } from './dash.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashComponent],
  imports: [CommonModule, DashRoutingModule, FormsModule],
})
export class DashModule {}
