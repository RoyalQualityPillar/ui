import { Component,ViewChild,OnInit,ElementRef,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { downloadCanvasArea } from 'bk-export';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { DosageFormService } from '../dosage-form.service';
import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}



@Component({
  selector: 'app-active-dosage-form-at',
  templateUrl: './active-dosage-form-at.component.html',
  styleUrls: ['./active-dosage-form-at.component.scss']
})
export class ActiveDosageFormAtComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  isLoading=false
  constructor(public adminService:AdminService,
    public dialog: MatDialog,
    private saleProductMasterService: DosageFormService,
    public dialogRef: MatDialogRef<ActiveDosageFormAtComponent>,
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









