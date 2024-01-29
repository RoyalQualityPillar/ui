import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MmRoutingModule } from './mm-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MmModuleHomePageComponent } from '../mm-module-home-page/mm-module-home-page.component';
import { MmMasterDataHomePageComponent } from '../mm-master-data-home-page/mm-master-data-home-page.component';


@NgModule({
  declarations: [
    MmModuleHomePageComponent,
    MmMasterDataHomePageComponent
  ],
  imports: [
    CommonModule,
    
 AngularMaterialModule,
 ReactiveFormsModule,
 FormsModule,
    MmRoutingModule
  ]
})
export class MmModule { }
