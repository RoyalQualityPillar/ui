import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MmRoutingModule } from './mm-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MmModuleHomePageComponent } from '../mm-module-home-page/mm-module-home-page.component';
import { MmMasterDataHomePageComponent } from '../mm-master-data-home-page/mm-master-data-home-page.component';
import { DqHomeComponent } from '../purchase/draft-quotation/dq-home/dq-home.component';
import { DqInitiatorComponent } from '../purchase/draft-quotation/dq-initiator/dq-initiator.component';
import { FqHomeComponent } from '../purchase/fair-quotation/fq-home/fq-home.component';
import { FqInitiatorComponent } from '../purchase/fair-quotation/fq-initiator/fq-initiator.component';
import { PoHomeComponent } from '../purchase/purches-order/po-home/po-home.component';
import { PoInitiatorComponent } from '../purchase/purches-order/po-initiator/po-initiator.component';
import { QtHomeComponent } from '../sale/quotation/qt-home/qt-home.component';
import { QtInitiatorComponent } from '../sale/quotation/qt-initiator/qt-initiator.component';
import { SiHomeComponent } from '../sale/sale-invoice/si-home/si-home.component';
import { SiInitiatorComponent } from '../sale/sale-invoice/si-initiator/si-initiator.component';
import { SoHomeComponent } from '../sale/sale-order/so-home/so-home.component';
import { SoInitiatorComponent } from '../sale/sale-order/so-initiator/so-initiator.component';
import { DoHomeComponent } from '../sale/delivery-order/do-home/do-home.component';
import { DoInitiatorComponent } from '../sale/delivery-order/do-initiator/do-initiator.component';
import { MmCommonHeaderComponent } from '../mm-common/mm-common-header/mm-common-header.component';
import { QtUpdateComponent } from '../sale/quotation/qt-update/qt-update.component';
import { QtReviewerComponent } from '../sale/quotation/qt-reviewer/qt-reviewer.component';


@NgModule({
  declarations: [
    MmCommonHeaderComponent,
    MmModuleHomePageComponent,
    MmMasterDataHomePageComponent,
    DqHomeComponent,
    DqInitiatorComponent,
    FqHomeComponent,
    FqInitiatorComponent,
    PoHomeComponent,
    PoInitiatorComponent,
    QtHomeComponent,
    QtInitiatorComponent,
    QtReviewerComponent,
    QtUpdateComponent,
    SiHomeComponent,
    SiInitiatorComponent,
    SoHomeComponent,
    SoInitiatorComponent,
    DoHomeComponent,
    DoInitiatorComponent,
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
