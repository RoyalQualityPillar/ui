import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LmsModuleHomePageComponent } from '../lms-module-home-page/lms-module-home-page.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LMSRoutingModule } from './lms.routing.module';
import { LmsMasterDataHomePageComponent } from '../lms-master-data-home-page/lms-master-data-home-page.component';




@NgModule({
    
    declarations: [LmsModuleHomePageComponent,
      LmsMasterDataHomePageComponent
    ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LMSRoutingModule
  ]
})
export class LmsModule { }
