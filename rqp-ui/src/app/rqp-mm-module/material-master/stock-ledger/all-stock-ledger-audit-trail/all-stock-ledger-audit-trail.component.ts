import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
import { StockLedgerService } from '../stock-ledger.service';
import { MessageService } from 'src/app/service/message.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { openPDFByFive, openPDFByFour, openPDFByThree, openPDFByTwo } from 'rqp-audit-trail';
import { downloadCanvasArea } from 'bk-export';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';

export interface userData {
  userData: any;
  type: any;
  tableData: any;
}

@Component({
  selector: 'app-all-stock-ledger-audit-trail',
  templateUrl: './all-stock-ledger-audit-trail.component.html',
  styleUrls: ['./all-stock-ledger-audit-trail.component.scss']
})
export class AllStockLedgerAuditTrailComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;

  constructor(public adminService: AdminService,
    private saleProductMasterService: StockLedgerService,
    public messageService: MessageService,
    public dialogRef: MatDialogRef<AllStockLedgerAuditTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
  ) { }

  data: any;
  isLoading = false;
  ngOnInit() {
    this.onSearch()
  }
  dataLength: any
  onSearch() {
    this.isLoading = true;
    this.saleProductMasterService.onAllRoleAuditTrail(this.userData.tableData.uc0001).subscribe((data: any) => {
      this.data = data.data;
      if (this.data) {
        this.dataLength = data.data.length;
      } else {
        this.data = [];
        this.dataLength = 0;
      }
      this.isLoading = false;
    })
  }


  fileWidth: any;
  fileHeight: any;
  fileWidth1: any;
  fileHeight1: any;
  FileURLObject = {
    url1: '',
    url2: '',
    url3: '',
    url4: ''
  }
  onDownloadPDF() {
    this.messageService.sendSnackbar('success', 'File will get downloaded once its ready');
    if (this.dataLength == 1) {
      this.openPDFByOne();
    } else if (this.dataLength == 2) {
      // this.openPDFByTwo();
      let DATA: any = document.getElementById('Location1');
      let DATA1: any = document.getElementById('Location2');
      let HEADER: any = document.getElementById('header');
      openPDFByTwo(HEADER, DATA, DATA1, 50, 22, 'unit')
    } else if (this.dataLength == 3) {
      let DATA: any = document.getElementById('Location1');
      let DATA1: any = document.getElementById('Location2');
      let DATA2: any = document.getElementById('Location3');
      let HEADER: any = document.getElementById('header');
      openPDFByThree(HEADER, DATA, DATA1, DATA2, 50, 22, 'unit');
    }
    else if (this.dataLength == 4) {
      let DATA: any = document.getElementById('Location1');
      let DATA1: any = document.getElementById('Location2');
      let DATA2: any = document.getElementById('Location3');
      let DATA3: any = document.getElementById('Location4');
      let HEADER: any = document.getElementById('header');
      openPDFByFour(HEADER, DATA, DATA1, DATA2, DATA3, 50, 22, 'unit');
    }
    else {
      let DATA: any = document.getElementById('Location1');
      let DATA1: any = document.getElementById('Location2');
      let DATA2: any = document.getElementById('Location3');
      let DATA3: any = document.getElementById('Location4');
      let DATA4: any = document.getElementById('Location5');
      let HEADER: any = document.getElementById('header');
      openPDFByFive(HEADER, DATA, DATA1, DATA2, DATA3, DATA4, 50, 22, 'unit');
    }
  }
  public openPDFByOne(): void {
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA, 'unit')
  }



  DATA: any;
  DOWNLOADLINK: any
  onChangeStatus(data: any) {
    return changeStatusByCode(data);
  }
}
