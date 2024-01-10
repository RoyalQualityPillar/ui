import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qt-master-data-home-page',
  templateUrl: './qt-master-data-home-page.component.html',
  styleUrls: ['./qt-master-data-home-page.component.scss']
})
export class QtMasterDataHomePageComponent {

  constructor(private router:Router){}
  onStockLedger(){
    this.router.navigate(['/sd/stock-ledger-home-page'])
  }
  onSaleProductMaster(){
    this.router.navigate(['/sd/sale-product-master-home-page'])
  }
  onPaymentTerm(){
    this.router.navigate(['/sd/payment-term-home-page'])
  }
  onPriceType(){
    this.router.navigate(['/sd/price-type-home-page'])
  }
  onPriceMaster(){
    this.router.navigate(['/sd/price-master-home-page'])
  }
  onDosageForm(){
    this.router.navigate(['./sd/dosage-from-home-page'])
  }
  onNumberingSystem(){
    this.router.navigate(['./sd/numbering-system-home-page'])
  }
}
