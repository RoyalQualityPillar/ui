import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { QtUpdateComponent } from '../sale/quotation/qt-update/qt-update.component';
import { QtReviewerComponent } from '../sale/quotation/qt-reviewer/qt-reviewer.component';
import { QtReviewSaveSubmitComponent } from '../sale/quotation/qt-review-save-submit/qt-review-save-submit.component';
import { SoReviewerComponent } from '../sale/sale-order/so-reviewer/so-reviewer.component';
import { SoUpdateComponent } from '../sale/sale-order/so-update/so-update.component';
import { SoReviewSaveSubmitComponent } from '../sale/sale-order/so-review-save-submit/so-review-save-submit.component';
import { DoReviewerComponent } from '../sale/delivery-order/do-reviewer/do-reviewer.component';
import { DoUpdateComponent } from '../sale/delivery-order/do-update/do-update.component';
import { DoReviewSaveSubmitComponent } from '../sale/delivery-order/do-review-save-submit/do-review-save-submit.component';
import { SiReviewerComponent } from '../sale/sale-invoice/si-reviewer/si-reviewer.component';
import { SiUpdateComponent } from '../sale/sale-invoice/si-update/si-update.component';
import { SiReviewSaveSubmitComponent } from '../sale/sale-invoice/si-review-save-submit/si-review-save-submit.component';
import { MaterialMasterHomePageComponent } from '../material-master/material-master-home-page/material-master-home-page.component';

const routes: Routes = [
  { path: "mm-module-home-page", component: MmModuleHomePageComponent },
  { path: "dq-home", component: DqHomeComponent },
  { path: "dq-initiator", component: DqInitiatorComponent },
  { path: "fq-home", component: FqHomeComponent },
  { path: "fq-initiator", component: FqInitiatorComponent },
  { path: "po-home", component: PoHomeComponent },
  { path: "po-initiator", component: PoInitiatorComponent },
  { path: "qt-home", component: QtHomeComponent },
  { path: "qt-initiator", component: QtInitiatorComponent },
  { path: "qt-reviewer", component: QtReviewerComponent },
  { path: "qt-update", component: QtUpdateComponent },
  { path: "qt-review-save", component: QtReviewSaveSubmitComponent },
  { path: "si-home", component: SiHomeComponent },
  { path: "si-initiator", component: SiInitiatorComponent },
  { path: "si-reviewer", component: SiReviewerComponent },
  { path: 'si-update', component: SiUpdateComponent },
  { path: 'si-review-save', component: SiReviewSaveSubmitComponent },
  { path: "so-home", component: SoHomeComponent },
  { path: "so-initiator", component: SoInitiatorComponent },
  { path: "so-reviewer", component: SoReviewerComponent },
  { path: 'so-review-save', component: SoReviewSaveSubmitComponent },
  { path: "so-update", component: SoUpdateComponent },
  { path: "do-home", component: DoHomeComponent },
  { path: "do-initiator", component: DoInitiatorComponent },
  { path: 'do-reviewer', component: DoReviewerComponent },
  { path: 'do-update', component: DoUpdateComponent },
  { path: 'do-review-save', component: DoReviewSaveSubmitComponent },
  { path: "mm-master-data-home-page", component: MmMasterDataHomePageComponent },
  { path: 'material-master-home-page', component: MaterialMasterHomePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MmRoutingModule { }
