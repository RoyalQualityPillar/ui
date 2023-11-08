import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BkTableModule } from 'bk-angular-table';

import { HeaderComponent } from './toolbar/header/header.component';
import { LoginComponent } from './toolbar/login/login.component';
import { FooterComponent } from './toolbar/footer/footer.component';
import { DataTableComponent } from './details/life-cycle-data/data-table.component';
import { HomeComponent } from './toolbar/home/home.component';
import { ChangePasswordComponent } from './toolbar/change-password/change-password.component';
import { ModuleHomePageComponent } from './toolbar/module-home-page/module-home-page.component';
import { ForgetPasswordComponent } from './toolbar/forget-password/forget-password.component';

import { LogoutConfirmComponent } from './toolbar/logout-confirm/logout-confirm.component';
import { ReviewCommentsHistoryComponent } from './admin/review-comments-history/review-comments-history.component';
import { MessageDialogComponent } from './common/message-dialog/message-dialog.component';
import { ErrorInterceptor } from 'src/interceptor/error.interceptor';
import { AdminModule } from './admin/admin/admin.module';
import { GuidelinesComponent } from './home-page-menubar/guidelines/guidelines.component';
import { AttachmentPreviewComponent } from './home-page-menubar/attachment-preview/attachment-preview.component';
import { CreateGuidelineComponent } from './home-page-menubar/create-guideline/create-guideline.component';
import { CreateBusinessUnitComponent } from './admin/business-unit/create-business-unit/create-business-unit.component';
import { LovDialogComponent } from './common/lov-dialog/lov-dialog.component';
import { AllRoleAuditTrailComponent } from './admin/role-master/all-role-audit-trail/all-role-audit-trail.component';
import { ActiveRoleAuditTrailComponent } from './admin/role-master/active-role-audit-trail/active-role-audit-trail.component';
import { AllBusinessUnitAuditTrailComponent } from './admin/business-unit/all-business-unit-audit-trail/all-business-unit-audit-trail.component';
import { ActiveBusinessUnitAuditTrailComponent } from './admin/business-unit/active-business-unit-audit-trail/active-business-unit-audit-trail.component';
import { AllDepartmentAuditTrailComponent } from './admin/department-master/all-department-audit-trail/all-department-audit-trail.component';
import { ActiveDepartmentAuditTrailComponent } from './admin/department-master/active-department-audit-trail/active-department-audit-trail.component';
import { AllModuleAuditTrailComponent } from './admin/module-master/all-module-audit-trail/all-module-audit-trail.component';
import { ActiveModuleAuditTrailComponent } from './admin/module-master/active-module-audit-trail/active-module-audit-trail.component';
import { AllDesigantionAuditTrailComponent } from './admin/desigantion-master/all-desigantion-audit-trail/all-desigantion-audit-trail.component';
import { ActiveDesigantionAuditTrailComponent } from './admin/desigantion-master/active-desigantion-audit-trail/active-desigantion-audit-trail.component';
import { AllSrrAuditTrailComponent } from './admin/standard-reason-registarion/all-srr-audit-trail/all-srr-audit-trail.component';
import { ActiveSrrAuditTrailComponent } from './admin/standard-reason-registarion/active-srr-audit-trail/active-srr-audit-trail.component';
import { ActiveSubdepartmentAuditTrailComponent } from './admin/sub-department/active-subdepartment-audit-trail/active-subdepartment-audit-trail.component';
import { AllSubdepartmentAuditTrailComponent } from './admin/sub-department/all-subdepartment-audit-trail/all-subdepartment-audit-trail.component';
import { ActiveMaterialTypeAuditTrailComponent } from './admin/material-type/active-material-type-audit-trail/active-material-type-audit-trail.component';
import { AllMaterialTypeAuditTrailComponent } from './admin/material-type/all-material-type-audit-trail/all-material-type-audit-trail.component';
import { ActiveSubMaterialAuditTrailComponent } from './admin/material-sub-type/active-sub-material-audit-trail/active-sub-material-audit-trail.component';
import { AllSubMaterialAuditTrailComponent } from './admin/material-sub-type/all-sub-material-audit-trail/all-sub-material-audit-trail.component';
import { AllUnitMasterAuditTrailComponent } from './admin/ut-master/all-unit-master-audit-trail/all-unit-master-audit-trail.component';
import { ActiveUnitMasterAuditTrailComponent } from './admin/ut-master/active-unit-master-audit-trail/active-unit-master-audit-trail.component';
import { AllPackMasterAuditTrailComponent } from './admin/pack-master/all-pack-master-audit-trail/all-pack-master-audit-trail.component';
import { ActivePackMasterAuditTrailComponent } from './admin/pack-master/active-pack-master-audit-trail/active-pack-master-audit-trail.component';
import { AllTaxMasterAuditTrailComponent } from './admin/tax-master/all-tax-master-audit-trail/all-tax-master-audit-trail.component';
import { ActiveTaxMasterAuditTrailComponent } from './admin/tax-master/active-tax-master-audit-trail/active-tax-master-audit-trail.component';
import { AllOrgMasterAuditTrailComponent } from './admin/organization/all-org-master-audit-trail/all-org-master-audit-trail.component';
import { ActiveOrgMasterAuditTrailComponent } from './admin/organization/active-org-master-audit-trail/active-org-master-audit-trail.component';
import { ActiveButAuditTrailComponent } from './admin/business-unit-type/active-but-audit-trail/active-but-audit-trail.component';
import { AllButAuditTrailComponent } from './admin/business-unit-type/all-but-audit-trail/all-but-audit-trail.component';
import { ActiveSpsAuditTrailComponent } from './admin/security-profile-setting/active-sps-audit-trail/active-sps-audit-trail.component';
import { AllSpsAuditTrailComponent } from './admin/security-profile-setting/all-sps-audit-trail/all-sps-audit-trail.component';
import { GuidelinesHomePageComponent } from './admin/guidelines/guidelines-home-page/guidelines-home-page.component';
import { GuidelinesCreateUpdateComponent } from './admin/guidelines/guidelines-create-update/guidelines-create-update.component';
import { SdModule } from './rqp-sd/sd/sd.module';
import { RqpSdHomePageComponent } from './rqp-sd/rqp-sd-home-page/rqp-sd-home-page.component';
import { StockListComponent } from './rqp-sd/stock-list/stock-list.component';
import { AdAdminHomePageComponent } from './admin/ad-admin-home-page/ad-admin-home-page.component';
import { SdAdminHomePageComponent } from './admin/sd-admin-home-page/sd-admin-home-page.component';
import { AdMasterHomePageComponent } from './admin/ad-master-home-page/ad-master-home-page.component';
//import { RqpTableModule} from 'rqp-table'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    DataTableComponent,
    HomeComponent,
    ChangePasswordComponent,
    ModuleHomePageComponent,
    ForgetPasswordComponent,
    LogoutConfirmComponent,
    MessageDialogComponent,
    GuidelinesComponent,
    AttachmentPreviewComponent,
    CreateGuidelineComponent,
    CreateBusinessUnitComponent,
    LovDialogComponent,

    GuidelinesHomePageComponent,
    GuidelinesCreateUpdateComponent,
    RqpSdHomePageComponent,
    StockListComponent,
    AdAdminHomePageComponent,
    SdAdminHomePageComponent,
    AdMasterHomePageComponent,
 
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    PdfViewerModule,
   // RqpTableModule,
   BkTableModule,
   SdModule
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [CookieService,DatePipe,
  {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
