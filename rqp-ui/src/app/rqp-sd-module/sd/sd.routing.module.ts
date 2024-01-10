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
]

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
export class SDRoutingModule {}