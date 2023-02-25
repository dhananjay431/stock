import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BseRoutingModule } from './bse-routing.module';
import { BseComponent } from './bse.component';


@NgModule({
  declarations: [
    BseComponent
  ],
  imports: [
    CommonModule,
    BseRoutingModule
  ]
})
export class BseModule { }
