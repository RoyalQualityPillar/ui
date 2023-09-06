import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule
  ]
})
export class AdminModule { }
