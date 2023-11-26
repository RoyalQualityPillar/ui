import { Component, NgModule } from '@angular/core';
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
import { LifeCycleHomeComponent } from './admin/life-cycle/life-cycle-home/life-cycle-home.component';
import { GuidelinesComponent } from './home-page-menubar/guidelines/guidelines.component';
import { BusinessUnitHomePageComponent } from './admin/business-unit/business-unit-home-page/business-unit-home-page.component';
import { RoleMasterHomePageComponent } from './admin/role-master/role-master-home-page/role-master-home-page.component';
import { DepartmentHomePageComponent } from './admin/department-master/department-home-page/department-home-page.component';
import { ModuleMasterHomePageComponent } from './admin/module-master/module-home-page/module-master-home-page.component';
import { DesignationHomePageComponent } from './admin/desigantion-master/designation-home-page/designation-home-page.component';
import { StandardReasonRegistartionHomePageComponent } from './admin/standard-reason-registarion/standard-reason-registartion-home-page/standard-reason-registartion-home-page.component';
import { SubDepartmentHomePageComponent } from './admin/sub-department/sub-department-home-page/sub-department-home-page.component';
import { MaterialTypeHomePageComponent } from './admin/material-type/material-type-home-page/material-type-home-page.component';
import { MaterialSubTypeHomePageComponent } from './admin/material-sub-type/material-sub-type-home-page/material-sub-type-home-page.component';
import { UtMasterHomePageComponent } from './admin/ut-master/ut-master-home-page/ut-master-home-page.component';
import { PackMasterHomePageComponent } from './admin/pack-master/pack-master-home-page/pack-master-home-page.component';
import { TaxMasterHomePageComponent } from './admin/tax-master/tax-master-home-page/tax-master-home-page.component';
import { OrganizationHomePageComponent } from './admin/organization/organization-home-page/organization-home-page.component';
import { BusinessUnitTypeHomePageComponent } from './admin/business-unit-type/business-unit-type-home-page/business-unit-type-home-page.component';
import { SecurityProfileHomePageComponent } from './admin/security-profile-setting/security-profile-home-page/security-profile-home-page.component';
import { GuidelinesHomePageComponent } from './admin/guidelines/guidelines-home-page/guidelines-home-page.component';
import { QuotationHomePageComponent } from './rqp-sd/quotation-home-page/quotation-home-page.component';
import { RqpSdHomePageComponent } from './rqp-sd/rqp-sd-home-page/rqp-sd-home-page.component';
import { AdAdminHomePageComponent } from './admin/ad-admin-home-page/ad-admin-home-page.component';
import { SdAdminHomePageComponent } from './admin/sd-admin-home-page/sd-admin-home-page.component';
import { AdMasterHomePageComponent } from './admin/ad-master-home-page/ad-master-home-page.component';

const routes: Routes = [
 // {path:'',redirectTo:'login'},
  { path: "login", component: LoginComponent },
  { path: "data-table", component: DataTableComponent,canActivate:[AuthGuard] },
  { path: "forget-password", component: ForgetPasswordComponent },
  { path: "change-password", component: ChangePasswordComponent,canActivate:[AuthGuard] },
  {path:  "module-home-page",component:ModuleHomePageComponent,canActivate:[AuthGuard]},
  {path:  "business-unit",component:BusinessUnitComponent,canActivate:[AuthGuard]},
  {path: "master-data-management",component:MasterDataManagementComponent,canActivate:[AuthGuard]},
  {path: "user-profile-management",component:UserProfileManagementComponent,canActivate:[AuthGuard]},
  {path: "life-cycle",component:LifeCycleHomeComponent,canActivate:[AuthGuard]},
  {path: "Business-unit-home-page",component:BusinessUnitHomePageComponent,canActivate:[AuthGuard]},
  {path: "role-master-home-page",component:RoleMasterHomePageComponent,canActivate:[AuthGuard]},
  {path: "module-master-home-page",component:ModuleMasterHomePageComponent,canActivate:[AuthGuard]},
  {path: "department-home-page",component:DepartmentHomePageComponent,canActivate:[AuthGuard]},
  {path: "designation-home-page",component:DesignationHomePageComponent,canActivate:[AuthGuard]},
  {path:"standard-reason-registartion-home-page",component:StandardReasonRegistartionHomePageComponent,canActivate:[AuthGuard]},
  {path:"sub-department-home-page",component:SubDepartmentHomePageComponent,canActivate:[AuthGuard]},
  {path:"material-type-home-page",component:MaterialTypeHomePageComponent,canActivate:[AuthGuard]},
  {path:"material-sub-type-home-page",component:MaterialSubTypeHomePageComponent,canActivate:[AuthGuard]},
  {path:"ut-master-home-page",component:UtMasterHomePageComponent,canActivate:[AuthGuard]},
  {path:"pack-master-home-page",component:PackMasterHomePageComponent,canActivate:[AuthGuard]},
  {path:"tax-master-home-page",component:TaxMasterHomePageComponent,canActivate:[AuthGuard]},
  {path:"orginazation-home-page",component:OrganizationHomePageComponent,canActivate:[AuthGuard]}, 
  {path:"business-unit-type-home-page",component:BusinessUnitTypeHomePageComponent,canActivate:[AuthGuard]},  
  {path:"security-profile-type-home-page",component:SecurityProfileHomePageComponent,canActivate:[AuthGuard]}, 
  {path:"guidelines-home-page",component:GuidelinesHomePageComponent,canActivate:[AuthGuard]}, 
  {path: "guidelines", component:GuidelinesComponent},

  
  {path:"rqp-sd-module",component:RqpSdHomePageComponent,canActivate:[AuthGuard]}, 
  {path:"quotation-home-page",component:QuotationHomePageComponent,canActivate:[AuthGuard]}, 

  {path:"ad-administrator",component:AdAdminHomePageComponent,canActivate:[AuthGuard]},
  {path:"ad-master",component:AdMasterHomePageComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
