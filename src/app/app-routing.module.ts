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

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "data-table", component: DataTableComponent },
  { path: "forget-password", component: ForgetPasswordComponent },
  { path: "change-password", component: ChangePasswordComponent },
  {path:  "module-home-page",component:ModuleHomePageComponent},
  {path:  "business-unit",component:BusinessUnitComponent},
  {path: "master-data-management",component:MasterDataManagementComponent},
  {path: "user-profile-management",component:UserProfileManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
