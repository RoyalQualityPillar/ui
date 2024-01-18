import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BkTableModule } from 'bk-angular-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { DmsRoutingModule } from './dms.routing.module';

import { DmsModuleHomePageComponent } from '../dms-module-home-page/dms-module-home-page.component';
import { DmsCommonHeaderComponent } from '../dms-common/dms-common-header/dms-common-header.component';
import { UserRequirementHomePageComponent } from '../dms-main/user-requirement-home-page/user-requirement-home-page.component';




@NgModule({
  declarations: [
    DmsModuleHomePageComponent,
    DmsCommonHeaderComponent,
    UserRequirementHomePageComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BkTableModule,
    DmsRoutingModule
  ]
})
export class DmsModule { }
