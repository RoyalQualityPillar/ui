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
    this.router.navigate(['/stock-ledger-home-page'])
  }
  onSaleProductMaster(){
    this.router.navigate(['/sale-product-master-home-page'])
  }
  onPaymentTerm(){
    this.router.navigate(['/payment-term-home-page'])
  }
  onPriceType(){
    this.router.navigate(['/price-type-home-page'])
  }
  onPriceMaster(){
    this.router.navigate(['/price-master-home-page'])
  }
  onDosageForm(){
    this.router.navigate(['./dosage-from-home-page'])
  }
  onNumberingSystem(){
    this.router.navigate(['./numbering-system-home-page'])
  }
}
