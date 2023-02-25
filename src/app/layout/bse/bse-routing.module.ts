import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BseComponent } from './bse.component';

const routes: Routes = [{ path: '', component: BseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BseRoutingModule { }
