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
import { QtUpdateSaveSubmitComponent } from '../sale/quotation/qt-update-save-submit/qt-update-save-submit.component';
import { AsCommonFooterComponent } from '../mm-common/as-common-footer/as-common-footer.component';
import { SoReviewerComponent } from '../sale/sale-order/so-reviewer/so-reviewer.component';
import { SoReviewSaveSubmitComponent } from '../sale/sale-order/so-review-save-submit/so-review-save-submit.component';
import { SoUpdateComponent } from '../sale/sale-order/so-update/so-update.component';
import { DoReviewerComponent } from '../sale/delivery-order/do-reviewer/do-reviewer.component';
import { DoUpdateComponent } from '../sale/delivery-order/do-update/do-update.component';
import { DoReviewSaveSubmitComponent } from '../sale/delivery-order/do-review-save-submit/do-review-save-submit.component';
import { SiUpdateComponent } from '../sale/sale-invoice/si-update/si-update.component';
import { SiReviewerComponent } from '../sale/sale-invoice/si-reviewer/si-reviewer.component';
import { SiReviewSaveSubmitComponent } from '../sale/sale-invoice/si-review-save-submit/si-review-save-submit.component';
import { AllMaterialMasterAtComponent } from '../material-master/material-master-product/all-material-master-at/all-material-master-at.component';
import { CreateUpdateMaterialMasterComponent } from '../material-master/material-master-product/create-update-material-master/create-update-material-master.component';
import { MaterialMasterHomePageComponent } from '../material-master/material-master-product/material-master-home-page/material-master-home-page.component';
import { ActiveMaterialMasterAtComponent } from '../material-master/material-master-product/active-material-master-at/active-material-master-at.component';
import { QtReviewerSaveComponent } from '../sale/quotation/qt-reviewer-save/qt-reviewer-save.component';
import { RqpHeaderComponent } from '../mm-common/rqp-header/rqp-header.component';
import { ActiveStockLedgerAuditTrailComponent } from './../material-master/stock-ledger/active-stock-ledger-audit-trail/active-stock-ledger-audit-trail.component';
import { AllStockLedgerAuditTrailComponent } from './../material-master/stock-ledger/all-stock-ledger-audit-trail/all-stock-ledger-audit-trail.component';
import { CreateUpdateStockLedgerComponent } from './../material-master/stock-ledger/create-update-stock-ledger/create-update-stock-ledger.component';
import { StockLedgerHomePageComponent } from './../material-master/stock-ledger/stock-ledger-home-page/stock-ledger-home-page.component';



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
    QtUpdateSaveSubmitComponent,
    SiHomeComponent,
    SiInitiatorComponent,
    SiUpdateComponent,
    SiReviewerComponent,
    SiReviewSaveSubmitComponent,
    SoHomeComponent,
    SoInitiatorComponent,
    SoReviewerComponent,
    SoReviewSaveSubmitComponent,
    SoUpdateComponent,
    DoHomeComponent,
    DoInitiatorComponent,
    DoReviewerComponent,
    DoUpdateComponent,
    DoReviewSaveSubmitComponent,
    AsCommonFooterComponent,
    AllMaterialMasterAtComponent,
    CreateUpdateMaterialMasterComponent,
    MaterialMasterHomePageComponent,
    ActiveMaterialMasterAtComponent,
    QtReviewerSaveComponent,
    RqpHeaderComponent,
    ActiveStockLedgerAuditTrailComponent,
    AllStockLedgerAuditTrailComponent,
    CreateUpdateStockLedgerComponent,
    StockLedgerHomePageComponent
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
