import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'table',
        loadChildren: () =>
          import('./layout/table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'dash',
        loadChildren: () =>
          import('./layout/dash/dash.module').then((m) => m.DashModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
