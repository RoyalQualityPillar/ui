import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RqpHeaderComponent } from '../sd-common/rqp-header/rqp-header.component';
import { SDRoutingModule } from './sd.routing.module';
import { RqpSdHomePageComponent } from '../rqp-sd-home-page/rqp-sd-home-page.component';
import { QtReviewComponent } from '../qt-review/qt-review.component';
import { QtReviewerHomePageComponent } from '../qt-reviewer-home-page/qt-reviewer-home-page.component';
import { QtUpdateComponent } from '../qt-update-section/qt-update/qt-update.component';
import { QtUpdateDetailsComponent } from '../qt-update-section/qt-update-details/qt-update-details.component';
import { QuotationHomePageComponent } from '../quotation-home-page/quotation-home-page.component';
import { QuotationMasterPageComponent } from '../quotation-master-page/quotation-master-page.component';
import { ActiveDosageFormAtComponent } from '../sd-master-data/dosage-form/active-dosage-form-at/active-dosage-form-at.component';
import { AllDosageFormAtComponent } from '../sd-master-data/dosage-form/all-dosage-form-at/all-dosage-form-at.component';
import { CreateUpdateDosageFormComponent } from '../sd-master-data/dosage-form/create-update-dosage-form/create-update-dosage-form.component';
import { DosageFormHomePageComponent } from '../sd-master-data/dosage-form/dosage-form-home-page/dosage-form-home-page.component';
import { ActiveNumberingSystemAtComponent } from '../sd-master-data/numbering-system/active-numbering-system-at/active-numbering-system-at.component';
import { AllNumberingSystemAtComponent } from '../sd-master-data/numbering-system/all-numbering-system-at/all-numbering-system-at.component';
import { CreateUpdateNumberingSystemComponent } from '../sd-master-data/numbering-system/create-update-numbering-system/create-update-numbering-system.component';
import { NumberingSystemHomePageComponent } from '../sd-master-data/numbering-system/numbering-system-home-page/numbering-system-home-page.component';
import { ActivePaymentTermATComponent } from '../sd-master-data/payment-term/active-payment-term-at/active-payment-term-at.component';
import { AllPaymentTermATComponent } from '../sd-master-data/payment-term/all-payment-term-at/all-payment-term-at.component';
import { CreateUpdatePaymentTermComponent } from '../sd-master-data/payment-term/create-update-payment-term/create-update-payment-term.component';
import { PaymentTermHomePageComponent } from '../sd-master-data/payment-term/payment-term-home-page/payment-term-home-page.component';
import { ActivePriceMasterAtComponent } from '../sd-master-data/price-master/active-price-master-at/active-price-master-at.component';
import { AllPriceMasterAtComponent } from '../sd-master-data/price-master/all-price-master-at/all-price-master-at.component';
import { CreateUpdatePriceMasterComponent } from '../sd-master-data/price-master/create-update-price-master/create-update-price-master.component';
import { PriceMasterHomePageComponent } from '../sd-master-data/price-master/price-master-home-page/price-master-home-page.component';
import { ActivePriceTypeAtComponent } from '../sd-master-data/price-type/active-price-type-at/active-price-type-at.component';
import { AllPriceTypeAtComponent } from '../sd-master-data/price-type/all-price-type-at/all-price-type-at.component';
import { CreateUpdatePriceTypeComponent } from '../sd-master-data/price-type/create-update-price-type/create-update-price-type.component';
import { PriceTypeHomePageComponent } from '../sd-master-data/price-type/price-type-home-page/price-type-home-page.component';
import { ActiveSaleProductMasterAtComponent } from '../sd-master-data/sale-product-master/active-sale-product-master-at/active-sale-product-master-at.component';
import { AllSaleProductMasterAtComponent } from '../sd-master-data/sale-product-master/all-sale-product-master-at/all-sale-product-master-at.component';
import { CreateUpdateSaleProductMasterComponent } from '../sd-master-data/sale-product-master/create-update-sale-product-master/create-update-sale-product-master.component';
import { SaleProductMasterHomePageComponent } from '../sd-master-data/sale-product-master/sale-product-master-home-page/sale-product-master-home-page.component';
import { ActiveStockLedgerAuditTrailComponent } from '../sd-master-data/stock-ledger/active-stock-ledger-audit-trail/active-stock-ledger-audit-trail.component';
import { AllStockLedgerAuditTrailComponent } from '../sd-master-data/stock-ledger/all-stock-ledger-audit-trail/all-stock-ledger-audit-trail.component';
import { CreateUpdateStockLedgerComponent } from '../sd-master-data/stock-ledger/create-update-stock-ledger/create-update-stock-ledger.component';
import { StockLedgerHomePageComponent } from '../sd-master-data/stock-ledger/stock-ledger-home-page/stock-ledger-home-page.component';
import { StockListComponent } from '../stock-list/stock-list.component';
import { QtMasterDataHomePageComponent } from '../sd-master-data/qt-master-data-home-page/qt-master-data-home-page.component';
import { AsCommonFooterComponent } from '../sd-common/as-common-footer/as-common-footer.component';
import { ESignatureComponent } from '../sd-common/e-signature/e-signature.component';




@NgModule({
  declarations: [
    RqpHeaderComponent,
    RqpSdHomePageComponent,
    QtReviewComponent,
    QtReviewerHomePageComponent,
    QtUpdateComponent,
    QtUpdateDetailsComponent,
    QuotationHomePageComponent,
    QuotationMasterPageComponent,
    ActiveDosageFormAtComponent,
    AllDosageFormAtComponent,
    CreateUpdateDosageFormComponent,
    DosageFormHomePageComponent,
    ActiveNumberingSystemAtComponent,
    AllNumberingSystemAtComponent,
    CreateUpdateNumberingSystemComponent,
    NumberingSystemHomePageComponent,
    ActivePaymentTermATComponent,
    AllPaymentTermATComponent,
    CreateUpdatePaymentTermComponent,
    PaymentTermHomePageComponent,
    ActivePriceMasterAtComponent,
    AllPriceMasterAtComponent,
    CreateUpdatePriceMasterComponent,
    PriceMasterHomePageComponent,
    ActivePriceTypeAtComponent,
    AllPriceTypeAtComponent,
    CreateUpdatePriceTypeComponent,
    PriceTypeHomePageComponent,
    ActiveSaleProductMasterAtComponent,
    AllSaleProductMasterAtComponent,
    CreateUpdateSaleProductMasterComponent,
    SaleProductMasterHomePageComponent,
    ActiveStockLedgerAuditTrailComponent,
    AllStockLedgerAuditTrailComponent,
    CreateUpdateStockLedgerComponent,
    StockLedgerHomePageComponent,
    StockListComponent,
    QtMasterDataHomePageComponent,
    AsCommonFooterComponent,
    ESignatureComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SDRoutingModule
  ],
  providers:[]
})
export class SdModule { }
