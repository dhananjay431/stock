import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandlestickRoutingModule } from './candlestick-routing.module';
import { CandlestickComponent } from './candlestick.component';


@NgModule({
  declarations: [
    CandlestickComponent
  ],
  imports: [
    CommonModule,
    CandlestickRoutingModule
  ]
})
export class CandlestickModule { }
