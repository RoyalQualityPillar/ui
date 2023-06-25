import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './details/life-cycle-data/data-table.component';
import { ChangePasswordComponent } from './toolbar/change-password/change-password.component';
import { ForgetPasswordComponent } from './toolbar/forget-password/forget-password.component';
import { ModuleHomePageComponent } from './toolbar/module-home-page/module-home-page.component';
import { LoginComponent } from './toolbar/login/login.component';
import { BusinessUnitComponent } from './module/business-unit/business-unit.component';
import { UserProfileManagementComponent } from './admin/user-profile-management/user-profile-management.component';
import { MasterDataManagementComponent } from './admin/master-data-management/master-data-management.component';
import {AuthGuard} from '../interceptor/auth.guard';

const routes: Routes = [
 // {path:'',redirectTo:'login'},
  { path: "login", component: LoginComponent },
  { path: "data-table", component: DataTableComponent,canActivate:[AuthGuard] },
  { path: "forget-password", component: ForgetPasswordComponent },
  { path: "change-password", component: ChangePasswordComponent,canActivate:[AuthGuard] },
  {path:  "module-home-page",component:ModuleHomePageComponent,canActivate:[AuthGuard]},
  {path:  "business-unit",component:BusinessUnitComponent,canActivate:[AuthGuard]},
  {path: "master-data-management",component:MasterDataManagementComponent,canActivate:[AuthGuard]},
  {path: "user-profile-management",component:UserProfileManagementComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
