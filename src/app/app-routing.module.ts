import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ActiveGuard } from './active.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ActiveGuard],
    children: [
      {
        path: 'table',
        loadChildren: () =>
          import('./layout/table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'index',
        loadChildren: () =>
          import('./layout/index/dash.module').then((m) => m.DashModule),
      },
      {
        path: 'option',
        loadChildren: () =>
          import('./layout/option/option.module').then((m) => m.OptionModule),
      },
      {
        path: 'option_history',
        loadChildren: () =>
          import('./layout/option_history/option.module').then(
            (m) => m.OptionModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./layout/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [ActiveGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
