import { Component,ViewChild,OnInit,ElementRef,Inject } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { downloadCanvasArea } from 'bk-export';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { StockLedgerService } from '../stock-ledger.service';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}


@Component({
  selector: 'app-active-stock-ledger-audit-trail',
  templateUrl: './active-stock-ledger-audit-trail.component.html',
  styleUrls: ['./active-stock-ledger-audit-trail.component.scss']
})
export class ActiveStockLedgerAuditTrailComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  isLoading=false
  constructor(public adminService:AdminService,
    public dialog: MatDialog,
    private saleProductMasterService: StockLedgerService,
    public dialogRef: MatDialogRef<ActiveStockLedgerAuditTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
    ) {}

    data:any;
  ngOnInit() {
    this.onSearch()
  }
  showErrorMsg=false;
  onSearch(){
    this.showErrorMsg=false;
    this.isLoading=true;
    this.saleProductMasterService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      this.data=data.data;
      this.isLoading=false;
      console.log(this.data)
      if(this.data==null){
        this.showErrorMsg=true;
      }
    }),
    (error)=>{
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': error, 'heading': "Error Information" }
      })
    }
    
  }
  
  
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA,'unit')
  }
  onChangeStatus(data:any){
    return changeStatusByCode(data);
     }
}










