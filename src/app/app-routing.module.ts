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
      {
        path: 'option',
        loadChildren: () =>
          import('./layout/option/option.module').then((m) => m.OptionModule),
      },
    ],
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
