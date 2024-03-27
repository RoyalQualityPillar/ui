import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QmsRoutingModule } from './qms-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QmsModuleHomePageComponent } from '../qms-module-home-page/qms-module-home-page.component';
import { QmsMasterDataHomePageComponent } from '../qms-master-data-home-page/qms-master-data-home-page.component';
import { CapaHomeComponent } from '../capa/capa-home/capa-home.component';
import { CapaInitiatorComponent } from '../capa/capa-initiator/capa-initiator.component';
import { NciHomeComponent } from '../nci/nci-home/nci-home.component';
import { NciInitiatorComponent } from '../nci/nci-initiator/nci-initiator.component';
import { DevHomeComponent } from '../dev/dev-home/dev-home.component';
import { DevInitiatorComponent } from '../dev/dev-initiator/dev-initiator.component';
import { CcHomeComponent } from '../cc/cc-home/cc-home.component';
import { CcInitiatorComponent } from '../cc/cc-initiator/cc-initiator.component';
import { QMSESignatureComponent } from '../qms-common/e-signature/qms-e-signature.component';
import { QmsCommonHeaderComponent } from '../qms-common/qms-common-header/qms-common-header.component';
import { RctHomePageComponent } from '../rqp-qms-master/rct-master/rct-home-page/rct-home-page.component';
import { CreateUpdateRctComponent } from '../rqp-qms-master/rct-master/create-update-rct/create-update-rct.component';
import { ActiveRctAtComponent } from '../rqp-qms-master/rct-master/active-rct-at/active-rct-at.component';
import { AllRctAtComponent } from '../rqp-qms-master/rct-master/all-rct-at/all-rct-at.component';
import { QmsMasterHomePageComponent } from '../rqp-qms-master/rct-master/qms-master-home-page/qms-master-home-page.component';



@NgModule({
  declarations: [
    QmsModuleHomePageComponent,
    QmsMasterDataHomePageComponent,
    CapaHomeComponent,
    CapaInitiatorComponent,
    DevHomeComponent,
    DevInitiatorComponent,
    NciHomeComponent,
    NciInitiatorComponent,
    CcHomeComponent,
    CcInitiatorComponent,
    QMSESignatureComponent,
    QmsCommonHeaderComponent,
    RctHomePageComponent,
    CreateUpdateRctComponent,
    ActiveRctAtComponent,
    AllRctAtComponent,
    QmsMasterHomePageComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    QmsRoutingModule
  ]
})
export class QmsModule { }
