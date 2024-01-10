import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdAdminHomePageComponent } from "../admin-home/ad-admin-home-page/ad-admin-home-page.component";
import { AdMasterHomePageComponent } from "../admin-home/ad-master-home-page/ad-master-home-page.component";
import { MasterDataManagementComponent } from "../admin-home/master-data-management/master-data-management.component";
import { UserProfileManagementComponent } from "../admin-data/user-profile-data/user-profile-management/user-profile-management.component";
import { LifeCycleHomeComponent } from "../admin-data/life-cycle/life-cycle-home/life-cycle-home.component";
import { BusinessUnitHomePageComponent } from "../admin-master-data/business-unit/business-unit-home-page/business-unit-home-page.component";
import { RoleMasterHomePageComponent } from "../admin-master-data/role-master/role-master-home-page/role-master-home-page.component";
import { DepartmentHomePageComponent } from "../admin-master-data/department-master/department-home-page/department-home-page.component";
import { DesignationHomePageComponent } from "../admin-master-data/desigantion-master/designation-home-page/designation-home-page.component";
import { ModuleMasterHomePageComponent } from "../admin-master-data/module-master/module-home-page/module-master-home-page.component";
import { StandardReasonRegistartionHomePageComponent } from "../admin-master-data/standard-reason-registarion/standard-reason-registartion-home-page/standard-reason-registartion-home-page.component";
import { MaterialSubTypeHomePageComponent } from "../admin-master-data/material-sub-type/material-sub-type-home-page/material-sub-type-home-page.component";
import { MaterialTypeHomePageComponent } from "../admin-master-data/material-type/material-type-home-page/material-type-home-page.component";
import { SubDepartmentHomePageComponent } from "../admin-master-data/sub-department/sub-department-home-page/sub-department-home-page.component";
import { UtMasterHomePageComponent } from "../admin-master-data/ut-master/ut-master-home-page/ut-master-home-page.component";
import { BusinessUnitTypeHomePageComponent } from "../admin-master-data/business-unit-type/business-unit-type-home-page/business-unit-type-home-page.component";
import { GuidelinesHomePageComponent } from "../admin-master-data/guidelines/guidelines-home-page/guidelines-home-page.component";
import { OrganizationHomePageComponent } from "../admin-master-data/organization/organization-home-page/organization-home-page.component";
import { TaxMasterHomePageComponent } from "../admin-master-data/tax-master/tax-master-home-page/tax-master-home-page.component";
import { SecurityProfileHomePageComponent } from "../admin-master-data/security-profile-setting/security-profile-home-page/security-profile-home-page.component";
import { PackMasterHomePageComponent } from "../admin-master-data/pack-master/pack-master-home-page/pack-master-home-page.component";



const routes: Routes = [
  {path:"ad-administrator",component:AdAdminHomePageComponent},
  {path:"ad-master",component:AdMasterHomePageComponent},
  {path: "master-data-management",component:MasterDataManagementComponent},
  {path: "user-profile-management",component:UserProfileManagementComponent},
  {path: "life-cycle",component:LifeCycleHomeComponent},
  {path: "Business-unit-home-page",component:BusinessUnitHomePageComponent},
  {path: "role-master-home-page",component:RoleMasterHomePageComponent},
  {path: "department-home-page",component:DepartmentHomePageComponent},
  {path: "designation-home-page",component:DesignationHomePageComponent},
  {path: "module-master-home-page",component:ModuleMasterHomePageComponent},
  {path:"standard-reason-registartion-home-page",component:StandardReasonRegistartionHomePageComponent},
  {path:"material-sub-type-home-page",component:MaterialSubTypeHomePageComponent},
  {path:"material-type-home-page",component:MaterialTypeHomePageComponent},
  {path:"sub-department-home-page",component:SubDepartmentHomePageComponent},
  {path:"ut-master-home-page",component:UtMasterHomePageComponent},
  {path:"business-unit-type-home-page",component:BusinessUnitTypeHomePageComponent},
  {path:"guidelines-home-page",component:GuidelinesHomePageComponent}, 
  {path:"orginazation-home-page",component:OrganizationHomePageComponent},
  {path:"tax-master-home-page",component:TaxMasterHomePageComponent},
  {path:"security-profile-type-home-page",component:SecurityProfileHomePageComponent},
  {path:"pack-master-home-page",component:PackMasterHomePageComponent},
  ]
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
export class AdminRoutingModule {}