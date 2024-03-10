import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mm-master-data-home-page',
  templateUrl: './mm-master-data-home-page.component.html',
  styleUrls: ['./mm-master-data-home-page.component.scss']
})
export class MmMasterDataHomePageComponent {
  constructor(private router: Router) { }

  onStockLedger() {
    this.router.navigate(['/sd/stock-ledger-home-page'])
  }
  onMaterialMaster() {
    this.router.navigate(['/mm/material-master-home-page'])
  }

  onPriceType() {
    this.router.navigate(['/sd/price-type-home-page'])
  }
  onPriceMaster() {
    this.router.navigate(['/sd/price-master-home-page'])
  }

  onNumberingSystem() {
    this.router.navigate(['./sd/numbering-system-home-page'])
  }
}
