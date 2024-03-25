import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecodeRoutingModule } from './decode-routing.module';
import { DecodeComponent } from './decode.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DecodeComponent],
  imports: [CommonModule, DecodeRoutingModule, FormsModule],
})
export class DecodeModule {}
