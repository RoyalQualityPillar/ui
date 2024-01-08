import { Component,ViewChild,OnInit,ElementRef,Inject } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { downloadCanvasArea } from 'bk-export';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { PaymentTermService } from '../payment-term.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}


@Component({
  selector: 'app-active-payment-term-at',
  templateUrl: './active-payment-term-at.component.html',
  styleUrls: ['./active-payment-term-at.component.scss']
})
export class ActivePaymentTermATComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  isLoading=false
  constructor(public adminService:AdminService,
    public dialog: MatDialog,
    private saleProductMasterService: PaymentTermService,
    public dialogRef: MatDialogRef<ActivePaymentTermATComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
    ) {}

    data:any;
  ngOnInit() {
    this.onSearch()
  }
  onSearch(){
    this.isLoading=true;
    this.saleProductMasterService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      this.data=data.data;
      this.isLoading=false;
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







