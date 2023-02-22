import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionRoutingModule } from './option-routing.module';
import { OptionComponent } from './option.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OptionComponent],
  imports: [CommonModule, OptionRoutingModule, FormsModule],
})
export class OptionModule {}
