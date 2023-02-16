import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllIndexComponent } from './all-index/all-index.component';
import { IndexOneComponent } from './index-one/index-one.component';
import { IndexDtlComponent } from './index-dtl/index-dtl.component';
import { SymbolDtlComponent } from './symbol-dtl/symbol-dtl.component';

@NgModule({
  declarations: [
    AllIndexComponent,
    IndexOneComponent,
    IndexDtlComponent,
    SymbolDtlComponent,
  ],
  imports: [CommonModule],
  exports: [
    AllIndexComponent,
    IndexOneComponent,
    IndexDtlComponent,
    SymbolDtlComponent,
  ],
})
export class ComponentModule {}
