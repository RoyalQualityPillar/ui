import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './toolbar/life-cycle-data/data-table.component';
import { ChangePasswordComponent } from './toolbar/change-password/change-password.component';
import { ForgetPasswordComponent } from './toolbar/forget-password/forget-password.component';
import { ModuleHomePageComponent } from './toolbar/module-home-page/module-home-page.component';
import { LoginComponent } from './toolbar/login/login.component';
import { AuthGuard } from '../interceptor/auth.guard';

import { PageNotFoundComponent } from './toolbar/page-not-found/page-not-found.component';
import { MmModule } from './rqp-mm-module/mm/mm.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //  {path:"",component:LoginComponent},
  {
    path: 'admin',
    loadChildren: () =>
      import('./rqp-admin-module/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'sd',
    loadChildren: () =>
      import('./rqp-sd-module/sd/sd.module').then((m) => m.SdModule),
  },
  {
    path: 'dms',
    loadChildren: () =>
      import('./rqp-dms-module/dms/dms.module').then((m) => m.DmsModule),
  },
  {
    path: 'lms',
    loadChildren: () =>
      import('./rqp-lms-module/lms/lms.module').then((m) => m.LmsModule),
  },
  {
    path: 'qms',
    loadChildren: () =>
      import('./rqp-qms-module/qms/qms.module').then((m) => m.QmsModule),
  },

  {
    path: 'mm',
    loadChildren: () =>
      import('./rqp-mm-module/mm/mm.module').then((m) => MmModule),
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'data-table',
    component: DataTableComponent,
    canActivate: [AuthGuard],
  },
  { path: 'forget-password', component: ForgetPasswordComponent },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'module-home-page',
    component: ModuleHomePageComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
