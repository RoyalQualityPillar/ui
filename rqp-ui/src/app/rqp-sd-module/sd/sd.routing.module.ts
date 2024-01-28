import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RqpSdHomePageComponent } from "../rqp-sd-home-page/rqp-sd-home-page.component";
import { QuotationHomePageComponent } from "../quotation-home-page/quotation-home-page.component";
import { QtUpdateDetailsComponent } from "../qt-update-section/qt-update-details/qt-update-details.component";
import { QtUpdateComponent } from "../qt-update-section/qt-update/qt-update.component";
import { QtReviewerHomePageComponent } from "../qt-reviewer-home-page/qt-reviewer-home-page.component";
import { QtReviewComponent } from "../qt-review/qt-review.component";
import { DosageFormHomePageComponent } from "../sd-master-data/dosage-form/dosage-form-home-page/dosage-form-home-page.component";
import { NumberingSystemHomePageComponent } from "../sd-master-data/numbering-system/numbering-system-home-page/numbering-system-home-page.component";
import { PaymentTermHomePageComponent } from "../sd-master-data/payment-term/payment-term-home-page/payment-term-home-page.component";
import { PriceMasterHomePageComponent } from "../sd-master-data/price-master/price-master-home-page/price-master-home-page.component";
import { PriceTypeHomePageComponent } from "../sd-master-data/price-type/price-type-home-page/price-type-home-page.component";
import { QtMasterDataHomePageComponent } from "../sd-master-data/qt-master-data-home-page/qt-master-data-home-page.component";
import { SaleProductMasterHomePageComponent } from "../sd-master-data/sale-product-master/sale-product-master-home-page/sale-product-master-home-page.component";
import { StockLedgerHomePageComponent } from "../sd-master-data/stock-ledger/stock-ledger-home-page/stock-ledger-home-page.component";
import { DraftQuotationHomePageComponent } from "../purchase/draft/draft-quotation-home-page/draft-quotation-home-page.component";
import { DqReviewHomePageComponent } from "../purchase/draft/dq-review-home-page/dq-review-home-page.component";
import { DqUpdateHomePageComponent } from "../purchase/draft/dq-update-home-page/dq-update-home-page.component";
import { AllQuotationHomePageComponent } from "../all-quotation/all-quotation-home-page/all-quotation-home-page.component";
import { AllQuotationPrintPageComponent } from "../all-quotation/all-quotation-print-page/all-quotation-print-page.component";
import { DqReviewSaveSubmitComponent } from "../purchase/draft/dq-review-save-submit/dq-review-save-submit.component";
import { FairQuotationHomePageComponent } from "../purchase/fair/fair-quotation-home-page/fair-quotation-home-page.component";
import { FairReviewHomePageComponent } from "../purchase/fair/fair-review-home-page/fair-review-home-page.component";
import { FairUpdateHomePageComponent } from "../purchase/fair/fair-update-home-page/fair-update-home-page.component";
import { FairSaveUpdateComponent } from "../purchase/fair/fair-save-update/fair-save-update.component";



const routes: Routes = [
    // {path:"ad-administrator",component:AdAdminHomePageComponent},
    {path:"rqp-sd-module",component:RqpSdHomePageComponent}, 
    {path:"quotation-home-page",component:QuotationHomePageComponent}, 
    {path:"qt-update-details",component:QtUpdateDetailsComponent},
    {path:"qt-update-page",component:QtUpdateComponent},
    {path:"rqp-pending-assignment",component:QtReviewerHomePageComponent},
    {path:"qt-review",component:QtReviewComponent},
    {path:"qt-master-data-home-page",component:QtMasterDataHomePageComponent},
  {path:"stock-ledger-home-page",component:StockLedgerHomePageComponent},
  {path:"sale-product-master-home-page",component:SaleProductMasterHomePageComponent},
  {path:"qt-update-page",component:QtUpdateComponent},
  {path:"qt-update-details",component:QtUpdateDetailsComponent},
  {path:"payment-term-home-page",component:PaymentTermHomePageComponent},
  {path:"price-type-home-page",component:PriceTypeHomePageComponent},
  {path:"price-master-home-page",component:PriceMasterHomePageComponent},
  {path:"dosage-from-home-page",component:DosageFormHomePageComponent},
  {path:"numbering-system-home-page",component:NumberingSystemHomePageComponent},
  
  {path:"draft-initator-home-page",component:DraftQuotationHomePageComponent},
  {path:"draft-reviewer-home-page",component:DqReviewHomePageComponent},
  {path:"draft-update-home-page",component:DqUpdateHomePageComponent},
  {path:"dq-review-save-submit",component:DqReviewSaveSubmitComponent},

  {path:"all-quotation-home-page",component:AllQuotationHomePageComponent},
  {path:"all-quotation-print-page",component:AllQuotationPrintPageComponent},
 
  {path:"fair-initator-home-page",component:FairQuotationHomePageComponent},
  {path:"fair-reviewer-home-page",component:FairReviewHomePageComponent},
  {path:"fair-update-home-page",component:FairUpdateHomePageComponent},
  {path:"fair-review-save-submit",component:FairSaveUpdateComponent},
]

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
export class SDRoutingModule {}