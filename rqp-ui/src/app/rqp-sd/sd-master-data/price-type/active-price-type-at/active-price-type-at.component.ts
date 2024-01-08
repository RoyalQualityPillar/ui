import { Component,ViewChild,OnInit,ElementRef,Inject } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { downloadCanvasArea } from 'bk-export';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { PriceTypeService } from '../price-type.service';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}


@Component({
  selector: 'app-active-price-type-at',
  templateUrl: './active-price-type-at.component.html',
  styleUrls: ['./active-price-type-at.component.scss']
})
export class ActivePriceTypeAtComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  isLoading=false
  constructor(public adminService:AdminService,
    public dialog: MatDialog,
    private saleProductMasterService: PriceTypeService,
    public dialogRef: MatDialogRef<ActivePriceTypeAtComponent>,
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








