import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BkTableModule } from 'bk-angular-table';

import { ActiveAuditTrailComponent } from './../../admin/active-audit-trail/active-audit-trail.component';
import { LifeCycleHomeComponent } from './../../admin/life-cycle/life-cycle-home/life-cycle-home.component';
import { UserListComponent } from './../../admin/life-cycle/user-list/user-list.component';
import { SelectedUserListComponent } from './../../admin/life-cycle/selected-user-list/selected-user-list.component';
import { CreateActiveLifeCycleComponent } from './../../admin/life-cycle/create-active-life-cycle/create-active-life-cycle.component';
import { CreateAllLifeCycleComponent } from './../../admin/life-cycle/create-all-life-cycle/create-all-life-cycle.component';
import { ActiveUserListComponent } from './../../admin/life-cycle/active-user-list/active-user-list.component';
import { ActiveUserLifeCycleListComponent } from './../../admin/life-cycle/active-user-life-cycle-list/active-user-life-cycle-list.component';
import { UpdateLifeCycleComponent } from './../../admin/update-life-cycle/update-life-cycle.component';
import { BusinessUnitComponent } from './../../module/business-unit/business-unit.component';
import { MasterDataManagementComponent } from './../../admin/master-data-management/master-data-management.component';
import { UserProfileManagementComponent } from './../../admin/user-profile-management/user-profile-management.component';
import { UserProfileCreateComponent } from './../../admin/user-profile-create/user-profile-create.component';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReviewCommentsHistoryComponent } from '../review-comments-history/review-comments-history.component';
import { BusinessUnitHomePageComponent } from '../business-unit/business-unit-home-page/business-unit-home-page.component';
import { RoleMasterHomePageComponent } from '../role-master/role-master-home-page/role-master-home-page.component';
import { BusinessUnitTypeCreateUpdateComponent } from '../business-unit-type/business-unit-type-create-update/business-unit-type-create-update.component';
import { BusinessUnitTypeHomePageComponent } from '../business-unit-type/business-unit-type-home-page/business-unit-type-home-page.component';
import { DepartmentCreateUpdateComponent } from '../department-master/department-create-update/department-create-update.component';
import { DepartmentHomePageComponent } from '../department-master/department-home-page/department-home-page.component';
import { DesignationCreateUpdateComponent } from '../desigantion-master/designation-create-update/designation-create-update.component';
import { DesignationHomePageComponent } from '../desigantion-master/designation-home-page/designation-home-page.component';
import { MaterialSubTypeCreateUpdateComponent } from '../material-sub-type/material-sub-type-create-update/material-sub-type-create-update.component';
import { MaterialSubTypeHomePageComponent } from '../material-sub-type/material-sub-type-home-page/material-sub-type-home-page.component';
import { MaterialTypeCreateUpdateComponent } from '../material-type/material-type-create-update/material-type-create-update.component';
import { MaterialTypeHomePageComponent } from '../material-type/material-type-home-page/material-type-home-page.component';
import { ModuleCreateUpdateComponent } from '../module-master/module-create-update/module-create-update.component';
import { ModuleMasterHomePageComponent } from '../module-master/module-home-page/module-master-home-page.component';
import { OrganizationCreateUpdateComponent } from '../organization/organization-create-update/organization-create-update.component';
import { OrganizationHomePageComponent } from '../organization/organization-home-page/organization-home-page.component';
import { PackMasterCreateUpdateComponent } from '../pack-master/pack-master-create-update/pack-master-create-update.component';
import { PackMasterHomePageComponent } from '../pack-master/pack-master-home-page/pack-master-home-page.component';
import { RoleMasterCreateUpdateComponent } from '../role-master/role-master-create-update/role-master-create-update.component';
import { SecurityProfileCreateUpdateComponent } from '../security-profile-setting/security-profile-create-update/security-profile-create-update.component';
import { SecurityProfileHomePageComponent } from '../security-profile-setting/security-profile-home-page/security-profile-home-page.component';
import { StandardReasonRegistartionCreateUpdateComponent } from '../standard-reason-registarion/standard-reason-registartion-create-update/standard-reason-registartion-create-update.component';
import { StandardReasonRegistartionHomePageComponent } from '../standard-reason-registarion/standard-reason-registartion-home-page/standard-reason-registartion-home-page.component';
import { SubDepartmentCreateUpdateComponent } from '../sub-department/sub-department-create-update/sub-department-create-update.component';
import { SubDepartmentHomePageComponent } from '../sub-department/sub-department-home-page/sub-department-home-page.component';
import { TaxMasterCreateUpdateComponent } from '../tax-master/tax-master-create-update/tax-master-create-update.component';
import { TaxMasterHomePageComponent } from '../tax-master/tax-master-home-page/tax-master-home-page.component';
import { UtMasterCreateUpdateComponent } from '../ut-master/ut-master-create-update/ut-master-create-update.component';
import { UtMasterHomePageComponent } from '../ut-master/ut-master-home-page/ut-master-home-page.component';
import { AllRoleAuditTrailComponent } from '../role-master/all-role-audit-trail/all-role-audit-trail.component';
import { ActiveRoleAuditTrailComponent } from '../role-master/active-role-audit-trail/active-role-audit-trail.component';
import { AllBusinessUnitAuditTrailComponent } from '../business-unit/all-business-unit-audit-trail/all-business-unit-audit-trail.component';
import { ActiveBusinessUnitAuditTrailComponent } from '../business-unit/active-business-unit-audit-trail/active-business-unit-audit-trail.component';
import { AllDepartmentAuditTrailComponent } from '../department-master/all-department-audit-trail/all-department-audit-trail.component';
import { ActiveDepartmentAuditTrailComponent } from '../department-master/active-department-audit-trail/active-department-audit-trail.component';
import { AllModuleAuditTrailComponent } from '../module-master/all-module-audit-trail/all-module-audit-trail.component';
import { ActiveModuleAuditTrailComponent } from '../module-master/active-module-audit-trail/active-module-audit-trail.component';
import { AllDesigantionAuditTrailComponent } from '../desigantion-master/all-desigantion-audit-trail/all-desigantion-audit-trail.component';
import { ActiveDesigantionAuditTrailComponent } from '../desigantion-master/active-desigantion-audit-trail/active-desigantion-audit-trail.component';
import { AllSrrAuditTrailComponent } from '../standard-reason-registarion/all-srr-audit-trail/all-srr-audit-trail.component';
import { ActiveButAuditTrailComponent } from '../business-unit-type/active-but-audit-trail/active-but-audit-trail.component';
import { AllButAuditTrailComponent } from '../business-unit-type/all-but-audit-trail/all-but-audit-trail.component';
import { ActiveSubMaterialAuditTrailComponent } from '../material-sub-type/active-sub-material-audit-trail/active-sub-material-audit-trail.component';
import { AllSubMaterialAuditTrailComponent } from '../material-sub-type/all-sub-material-audit-trail/all-sub-material-audit-trail.component';
import { ActiveMaterialTypeAuditTrailComponent } from '../material-type/active-material-type-audit-trail/active-material-type-audit-trail.component';
import { AllMaterialTypeAuditTrailComponent } from '../material-type/all-material-type-audit-trail/all-material-type-audit-trail.component';
import { ActiveOrgMasterAuditTrailComponent } from '../organization/active-org-master-audit-trail/active-org-master-audit-trail.component';
import { AllOrgMasterAuditTrailComponent } from '../organization/all-org-master-audit-trail/all-org-master-audit-trail.component';
import { ActivePackMasterAuditTrailComponent } from '../pack-master/active-pack-master-audit-trail/active-pack-master-audit-trail.component';
import { AllPackMasterAuditTrailComponent } from '../pack-master/all-pack-master-audit-trail/all-pack-master-audit-trail.component';
import { ActiveSpsAuditTrailComponent } from '../security-profile-setting/active-sps-audit-trail/active-sps-audit-trail.component';
import { AllSpsAuditTrailComponent } from '../security-profile-setting/all-sps-audit-trail/all-sps-audit-trail.component';
import { ActiveSrrAuditTrailComponent } from '../standard-reason-registarion/active-srr-audit-trail/active-srr-audit-trail.component';
import { ActiveSubdepartmentAuditTrailComponent } from '../sub-department/active-subdepartment-audit-trail/active-subdepartment-audit-trail.component';
import { AllSubdepartmentAuditTrailComponent } from '../sub-department/all-subdepartment-audit-trail/all-subdepartment-audit-trail.component';
import { ActiveTaxMasterAuditTrailComponent } from '../tax-master/active-tax-master-audit-trail/active-tax-master-audit-trail.component';
import { AllTaxMasterAuditTrailComponent } from '../tax-master/all-tax-master-audit-trail/all-tax-master-audit-trail.component';
import { ActiveUnitMasterAuditTrailComponent } from '../ut-master/active-unit-master-audit-trail/active-unit-master-audit-trail.component';
import { AllUnitMasterAuditTrailComponent } from '../ut-master/all-unit-master-audit-trail/all-unit-master-audit-trail.component';

@NgModule({
  declarations: [
    ActiveAuditTrailComponent,
    LifeCycleHomeComponent,
    UserListComponent,
    SelectedUserListComponent,
    CreateActiveLifeCycleComponent,
    CreateAllLifeCycleComponent,
    ActiveUserListComponent,
    ActiveUserLifeCycleListComponent,
    UpdateLifeCycleComponent,
    BusinessUnitComponent,
    MasterDataManagementComponent,
    UserProfileManagementComponent,
    UserProfileCreateComponent,
    ReviewCommentsHistoryComponent,
    BusinessUnitHomePageComponent,

    
    RoleMasterHomePageComponent,
    RoleMasterCreateUpdateComponent,
    DepartmentHomePageComponent,
    DepartmentCreateUpdateComponent,
    ModuleCreateUpdateComponent,
    ModuleMasterHomePageComponent,
    DesignationHomePageComponent,
    DesignationCreateUpdateComponent,
    StandardReasonRegistartionHomePageComponent,
    StandardReasonRegistartionCreateUpdateComponent,
    SubDepartmentHomePageComponent,
    SubDepartmentCreateUpdateComponent,
    MaterialTypeHomePageComponent,
    MaterialTypeCreateUpdateComponent,
    MaterialSubTypeHomePageComponent,
    MaterialSubTypeCreateUpdateComponent,
    UtMasterHomePageComponent,
    UtMasterCreateUpdateComponent,
    PackMasterHomePageComponent,
    PackMasterCreateUpdateComponent,
    TaxMasterHomePageComponent,
    TaxMasterCreateUpdateComponent,
    OrganizationHomePageComponent,
    OrganizationCreateUpdateComponent,
    BusinessUnitTypeHomePageComponent,
    BusinessUnitTypeCreateUpdateComponent,
    SecurityProfileHomePageComponent,
    SecurityProfileCreateUpdateComponent,

    AllRoleAuditTrailComponent,
    ActiveRoleAuditTrailComponent,
    AllBusinessUnitAuditTrailComponent,
    ActiveBusinessUnitAuditTrailComponent,
    AllDepartmentAuditTrailComponent,
    ActiveDepartmentAuditTrailComponent,
    AllModuleAuditTrailComponent,
    ActiveModuleAuditTrailComponent,
    AllDesigantionAuditTrailComponent,
    ActiveDesigantionAuditTrailComponent,
    AllSrrAuditTrailComponent,
    ActiveSrrAuditTrailComponent,
    ActiveSubdepartmentAuditTrailComponent,
    AllSubdepartmentAuditTrailComponent,
    ActiveMaterialTypeAuditTrailComponent,
    AllMaterialTypeAuditTrailComponent,
    ActiveSubMaterialAuditTrailComponent,
    AllSubMaterialAuditTrailComponent,
    AllUnitMasterAuditTrailComponent,
    ActiveUnitMasterAuditTrailComponent,
    AllPackMasterAuditTrailComponent,
    ActivePackMasterAuditTrailComponent,
    AllTaxMasterAuditTrailComponent,
    ActiveTaxMasterAuditTrailComponent,
    AllOrgMasterAuditTrailComponent,
    ActiveOrgMasterAuditTrailComponent,
    ActiveButAuditTrailComponent,
    AllButAuditTrailComponent,
    ActiveSpsAuditTrailComponent,
    AllSpsAuditTrailComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    BkTableModule
  ]
})
export class AdminModule { }
