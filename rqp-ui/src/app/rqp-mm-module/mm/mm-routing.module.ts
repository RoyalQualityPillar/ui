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
  { path: "si-home", component: SiHomeComponent },
  { path: "si-initiator", component: SiInitiatorComponent },
  { path: "so-home", component: SoHomeComponent },
  { path: "so-initiator", component: SoInitiatorComponent },
  { path: "do-home", component: DoHomeComponent },
  { path: "do-initiator", component: DoInitiatorComponent },
  { path: "mm-master-data-home-page", component: MmMasterDataHomePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MmRoutingModule { }
