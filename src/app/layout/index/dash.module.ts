import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { DashComponent } from './dash.component';
import { FormsModule } from '@angular/forms';
// import { AllIndexComponent } from './all-index/all-index.component';
// import { IndexOneComponent } from './index-one/index-one.component';
// import { IndexDtlComponent } from './index-dtl/index-dtl.component';
// import { SymbolDtlComponent } from './symbol-dtl/symbol-dtl.component';
import { ComponentModule } from '../../component/component.module';
@NgModule({
  declarations: [DashComponent],
  imports: [CommonModule, DashRoutingModule, FormsModule, ComponentModule],
})
export class DashModule {}
