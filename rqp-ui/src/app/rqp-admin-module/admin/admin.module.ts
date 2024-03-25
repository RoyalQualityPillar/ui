import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BkTableModule } from 'bk-angular-table';


import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import {MatGridListModule} from '@angular/material/grid-list';

import { AdminRoutingModule } from './admin.routing.module';
import { AdMasterHomePageComponent } from '../admin-home/ad-master-home-page/ad-master-home-page.component';
import { AdAdminHomePageComponent } from '../admin-home/ad-admin-home-page/ad-admin-home-page.component';
import { MasterDataManagementComponent } from '../admin-home/master-data-management/master-data-management.component';
import { UserProfileManagementComponent } from '../admin-data/user-profile-data/user-profile-management/user-profile-management.component';
import { ActiveAuditTrailComponent } from '../admin-data/user-profile-data/active-audit-trail/active-audit-trail.component';
import { ReviewCommentsHistoryComponent } from '../admin-data/user-profile-data/review-comments-history/review-comments-history.component';
import { UserProfileCreateComponent } from '../admin-data/user-profile-data/user-profile-create/user-profile-create.component';
import { LifeCycleHomeComponent } from '../admin-data/life-cycle/life-cycle-home/life-cycle-home.component';
import { ActiveUserLifeCycleListComponent } from '../admin-data/life-cycle/active-user-life-cycle-list/active-user-life-cycle-list.component';
import { ActiveUserListComponent } from '../admin-data/life-cycle/active-user-list/active-user-list.component';
import { CreateActiveLifeCycleComponent } from '../admin-data/life-cycle/create-active-life-cycle/create-active-life-cycle.component';
import { CreateAllLifeCycleComponent } from '../admin-data/life-cycle/create-all-life-cycle/create-all-life-cycle.component';
import { SelectedUserListComponent } from '../admin-data/life-cycle/selected-user-list/selected-user-list.component';
import { UpdateLifeCycleComponent } from '../admin-data/life-cycle/update-life-cycle/update-life-cycle.component';
import { UserListComponent } from '../admin-data/life-cycle/user-list/user-list.component';
import { ActiveBusinessUnitAuditTrailComponent } from '../admin-master-data/business-unit/active-business-unit-audit-trail/active-business-unit-audit-trail.component';
import { AllBusinessUnitAuditTrailComponent } from '../admin-master-data/business-unit/all-business-unit-audit-trail/all-business-unit-audit-trail.component';
import { BusinessUnitHomePageComponent } from '../admin-master-data/business-unit/business-unit-home-page/business-unit-home-page.component';
import { CreateBusinessUnitComponent } from '../admin-master-data/business-unit/create-business-unit/create-business-unit.component';
import { RoleMasterHomePageComponent } from '../admin-master-data/role-master/role-master-home-page/role-master-home-page.component';
import { RoleMasterCreateUpdateComponent } from '../admin-master-data/role-master/role-master-create-update/role-master-create-update.component';
import { AllRoleAuditTrailComponent } from '../admin-master-data/role-master/all-role-audit-trail/all-role-audit-trail.component';
import { ActiveRoleAuditTrailComponent } from '../admin-master-data/role-master/active-role-audit-trail/active-role-audit-trail.component';
import { DepartmentHomePageComponent } from '../admin-master-data/department-master/department-home-page/department-home-page.component';
import { DepartmentCreateUpdateComponent } from '../admin-master-data/department-master/department-create-update/department-create-update.component';
import { AllDepartmentAuditTrailComponent } from '../admin-master-data/department-master/all-department-audit-trail/all-department-audit-trail.component';
import { ActiveDepartmentAuditTrailComponent } from '../admin-master-data/department-master/active-department-audit-trail/active-department-audit-trail.component';
import { DesignationHomePageComponent } from '../admin-master-data/desigantion-master/designation-home-page/designation-home-page.component';
import { DesignationCreateUpdateComponent } from '../admin-master-data/desigantion-master/designation-create-update/designation-create-update.component';
import { AllDesigantionAuditTrailComponent } from '../admin-master-data/desigantion-master/all-desigantion-audit-trail/all-desigantion-audit-trail.component';
import { ActiveDesigantionAuditTrailComponent } from '../admin-master-data/desigantion-master/active-desigantion-audit-trail/active-desigantion-audit-trail.component';
import { ActiveSrrAuditTrailComponent } from '../admin-master-data/standard-reason-registarion/active-srr-audit-trail/active-srr-audit-trail.component';
import { AllSrrAuditTrailComponent } from '../admin-master-data/standard-reason-registarion/all-srr-audit-trail/all-srr-audit-trail.component';
import { StandardReasonRegistartionCreateUpdateComponent } from '../admin-master-data/standard-reason-registarion/standard-reason-registartion-create-update/standard-reason-registartion-create-update.component';
import { StandardReasonRegistartionHomePageComponent } from '../admin-master-data/standard-reason-registarion/standard-reason-registartion-home-page/standard-reason-registartion-home-page.component';
import { ModuleMasterHomePageComponent } from '../admin-master-data/module-master/module-home-page/module-master-home-page.component';
import { ModuleCreateUpdateComponent } from '../admin-master-data/module-master/module-create-update/module-create-update.component';
import { AllModuleAuditTrailComponent } from '../admin-master-data/module-master/all-module-audit-trail/all-module-audit-trail.component';
import { ActiveModuleAuditTrailComponent } from '../admin-master-data/module-master/active-module-audit-trail/active-module-audit-trail.component';
import { ActiveSubMaterialAuditTrailComponent } from '../admin-master-data/material-sub-type/active-sub-material-audit-trail/active-sub-material-audit-trail.component';
import { AllSubMaterialAuditTrailComponent } from '../admin-master-data/material-sub-type/all-sub-material-audit-trail/all-sub-material-audit-trail.component';
import { MaterialSubTypeCreateUpdateComponent } from '../admin-master-data/material-sub-type/material-sub-type-create-update/material-sub-type-create-update.component';
import { MaterialSubTypeHomePageComponent } from '../admin-master-data/material-sub-type/material-sub-type-home-page/material-sub-type-home-page.component';
import { ActiveMaterialTypeAuditTrailComponent } from '../admin-master-data/material-type/active-material-type-audit-trail/active-material-type-audit-trail.component';
import { AllMaterialTypeAuditTrailComponent } from '../admin-master-data/material-type/all-material-type-audit-trail/all-material-type-audit-trail.component';
import { MaterialTypeCreateUpdateComponent } from '../admin-master-data/material-type/material-type-create-update/material-type-create-update.component';
import { MaterialTypeHomePageComponent } from '../admin-master-data/material-type/material-type-home-page/material-type-home-page.component';
import { ActiveSubdepartmentAuditTrailComponent } from '../admin-master-data/sub-department/active-subdepartment-audit-trail/active-subdepartment-audit-trail.component';
import { AllSubdepartmentAuditTrailComponent } from '../admin-master-data/sub-department/all-subdepartment-audit-trail/all-subdepartment-audit-trail.component';
import { SubDepartmentCreateUpdateComponent } from '../admin-master-data/sub-department/sub-department-create-update/sub-department-create-update.component';
import { SubDepartmentHomePageComponent } from '../admin-master-data/sub-department/sub-department-home-page/sub-department-home-page.component';
import { ActiveUnitMasterAuditTrailComponent } from '../admin-master-data/ut-master/active-unit-master-audit-trail/active-unit-master-audit-trail.component';
import { AllUnitMasterAuditTrailComponent } from '../admin-master-data/ut-master/all-unit-master-audit-trail/all-unit-master-audit-trail.component';
import { UtMasterCreateUpdateComponent } from '../admin-master-data/ut-master/ut-master-create-update/ut-master-create-update.component';
import { UtMasterHomePageComponent } from '../admin-master-data/ut-master/ut-master-home-page/ut-master-home-page.component';
import { AllButAuditTrailComponent } from '../admin-master-data/business-unit-type/all-but-audit-trail/all-but-audit-trail.component';
import { BusinessUnitTypeCreateUpdateComponent } from '../admin-master-data/business-unit-type/business-unit-type-create-update/business-unit-type-create-update.component';
import { BusinessUnitTypeHomePageComponent } from '../admin-master-data/business-unit-type/business-unit-type-home-page/business-unit-type-home-page.component';
import { GuidelinesCreateUpdateComponent } from '../admin-master-data/guidelines/guidelines-create-update/guidelines-create-update.component';
import { GuidelinesHomePageComponent } from '../admin-master-data/guidelines/guidelines-home-page/guidelines-home-page.component';
import { ActiveOrgMasterAuditTrailComponent } from '../admin-master-data/organization/active-org-master-audit-trail/active-org-master-audit-trail.component';
import { AllOrgMasterAuditTrailComponent } from '../admin-master-data/organization/all-org-master-audit-trail/all-org-master-audit-trail.component';
import { OrganizationCreateUpdateComponent } from '../admin-master-data/organization/organization-create-update/organization-create-update.component';
import { OrganizationHomePageComponent } from '../admin-master-data/organization/organization-home-page/organization-home-page.component';
import { ActiveButAuditTrailComponent } from '../admin-master-data/business-unit-type/active-but-audit-trail/active-but-audit-trail.component';
import { ActiveTaxMasterAuditTrailComponent } from '../admin-master-data/tax-master/active-tax-master-audit-trail/active-tax-master-audit-trail.component';
import { AllTaxMasterAuditTrailComponent } from '../admin-master-data/tax-master/all-tax-master-audit-trail/all-tax-master-audit-trail.component';
import { TaxMasterCreateUpdateComponent } from '../admin-master-data/tax-master/tax-master-create-update/tax-master-create-update.component';
import { TaxMasterHomePageComponent } from '../admin-master-data/tax-master/tax-master-home-page/tax-master-home-page.component';
import { ActiveSpsAuditTrailComponent } from '../admin-master-data/security-profile-setting/active-sps-audit-trail/active-sps-audit-trail.component';
import { AllSpsAuditTrailComponent } from '../admin-master-data/security-profile-setting/all-sps-audit-trail/all-sps-audit-trail.component';
import { SecurityProfileCreateUpdateComponent } from '../admin-master-data/security-profile-setting/security-profile-create-update/security-profile-create-update.component';
import { SecurityProfileHomePageComponent } from '../admin-master-data/security-profile-setting/security-profile-home-page/security-profile-home-page.component';
import { ActivePackMasterAuditTrailComponent } from '../admin-master-data/pack-master/active-pack-master-audit-trail/active-pack-master-audit-trail.component';
import { AllPackMasterAuditTrailComponent } from '../admin-master-data/pack-master/all-pack-master-audit-trail/all-pack-master-audit-trail.component';
import { PackMasterCreateUpdateComponent } from '../admin-master-data/pack-master/pack-master-create-update/pack-master-create-update.component';
import { PackMasterHomePageComponent } from '../admin-master-data/pack-master/pack-master-home-page/pack-master-home-page.component';
import { CreateGuidelineComponent } from 'src/app/home-page-menubar/create-guideline/create-guideline.component';
import { GuidelinesComponent } from 'src/app/home-page-menubar/guidelines/guidelines.component';
import { ActiveDosageFormAtComponent } from '../admin-master-data/dosage-form/active-dosage-form-at/active-dosage-form-at.component';
import { AllDosageFormAtComponent } from '../admin-master-data/dosage-form/all-dosage-form-at/all-dosage-form-at.component';
import { CreateUpdateDosageFormComponent } from '../admin-master-data/dosage-form/create-update-dosage-form/create-update-dosage-form.component';
import { DosageFormHomePageComponent } from '../admin-master-data/dosage-form/dosage-form-home-page/dosage-form-home-page.component';
import { ActivePaymentTermATComponent } from '../admin-master-data/payment-term/active-payment-term-at/active-payment-term-at.component';
import { AllPaymentTermATComponent } from '../admin-master-data/payment-term/all-payment-term-at/all-payment-term-at.component';
import { CreateUpdatePaymentTermComponent } from '../admin-master-data/payment-term/create-update-payment-term/create-update-payment-term.component';
import { PaymentTermHomePageComponent } from '../admin-master-data/payment-term/payment-term-home-page/payment-term-home-page.component';

///************************ Master Data *******************************


@NgModule({
  declarations: [
    AdAdminHomePageComponent,
    AdMasterHomePageComponent,
    MasterDataManagementComponent,
    UserProfileManagementComponent,
    ActiveAuditTrailComponent,
    ReviewCommentsHistoryComponent,
    UserProfileCreateComponent,
    LifeCycleHomeComponent,
    ActiveUserLifeCycleListComponent,
    ActiveUserListComponent,
    CreateActiveLifeCycleComponent,
    CreateAllLifeCycleComponent,
    SelectedUserListComponent,
    UpdateLifeCycleComponent,
    UserListComponent,
    //******master Data*************
    ActiveBusinessUnitAuditTrailComponent,
    AllBusinessUnitAuditTrailComponent,
    BusinessUnitHomePageComponent,
    CreateBusinessUnitComponent,
    RoleMasterHomePageComponent,
    RoleMasterCreateUpdateComponent,
    AllRoleAuditTrailComponent,
    ActiveRoleAuditTrailComponent,
    DepartmentHomePageComponent,
    DepartmentCreateUpdateComponent,
    AllDepartmentAuditTrailComponent,
    ActiveDepartmentAuditTrailComponent,
    DesignationHomePageComponent,
    DesignationCreateUpdateComponent,
    AllDesigantionAuditTrailComponent,
    ActiveDesigantionAuditTrailComponent,
    ActiveSrrAuditTrailComponent,
    AllSrrAuditTrailComponent,
    StandardReasonRegistartionCreateUpdateComponent,
    StandardReasonRegistartionHomePageComponent,
    ModuleMasterHomePageComponent,
    ModuleCreateUpdateComponent,
    AllModuleAuditTrailComponent,
    ActiveModuleAuditTrailComponent,
    ActiveSubMaterialAuditTrailComponent,
    AllSubMaterialAuditTrailComponent,
    MaterialSubTypeCreateUpdateComponent,
    MaterialSubTypeHomePageComponent,
    ActiveMaterialTypeAuditTrailComponent,
    AllMaterialTypeAuditTrailComponent,
    MaterialTypeCreateUpdateComponent,
    MaterialTypeHomePageComponent,
    ActiveSubdepartmentAuditTrailComponent,
    AllSubdepartmentAuditTrailComponent,
    SubDepartmentCreateUpdateComponent,
    SubDepartmentHomePageComponent,
    ActiveUnitMasterAuditTrailComponent,
    AllUnitMasterAuditTrailComponent,
    UtMasterCreateUpdateComponent,
    UtMasterHomePageComponent,
    AllButAuditTrailComponent,
    BusinessUnitTypeCreateUpdateComponent,
    BusinessUnitTypeHomePageComponent,
    GuidelinesHomePageComponent,
    GuidelinesCreateUpdateComponent,
    ActiveOrgMasterAuditTrailComponent,
    AllOrgMasterAuditTrailComponent,
    OrganizationCreateUpdateComponent,
    OrganizationHomePageComponent,
    ActiveButAuditTrailComponent,
    ActiveTaxMasterAuditTrailComponent,
    AllTaxMasterAuditTrailComponent,
    TaxMasterCreateUpdateComponent,
    TaxMasterHomePageComponent,
    ActiveSpsAuditTrailComponent,
    AllSpsAuditTrailComponent,
    SecurityProfileCreateUpdateComponent,
    SecurityProfileHomePageComponent,
    ActivePackMasterAuditTrailComponent,
    AllPackMasterAuditTrailComponent,
    PackMasterCreateUpdateComponent,
    PackMasterHomePageComponent,
      GuidelinesComponent,
      CreateGuidelineComponent,
      DosageFormHomePageComponent,
      CreateUpdateDosageFormComponent,
      AllDosageFormAtComponent,
      ActiveDosageFormAtComponent,
      PaymentTermHomePageComponent,
      CreateUpdatePaymentTermComponent,
      AllPaymentTermATComponent,
      ActivePaymentTermATComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BkTableModule,
    AdminRoutingModule,
  //  MatGridListModule
  ]
})
export class AdminModule { }
