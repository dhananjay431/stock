import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysistwoComponent } from './analysistwo.component';

const routes: Routes = [{ path: '', component: AnalysistwoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysistwoRoutingModule { }
