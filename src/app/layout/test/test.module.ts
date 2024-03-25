import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, TestRoutingModule, FormsModule],
})
export class TestModule {}
