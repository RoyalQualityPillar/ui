import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AdminService } from 'src/app/admin/admin.service';
import { BusinessUnitService } from '../business-unit.service';
import { downloadCanvasArea } from 'bk-export';
import {MessageService} from '../../../service/message.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}


@Component({
  selector: 'app-active-business-unit-audit-trail',
  templateUrl: './active-business-unit-audit-trail.component.html',
  styleUrls: ['./active-business-unit-audit-trail.component.scss']
})
export class ActiveBusinessUnitAuditTrailComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  isLoading=false
  constructor(public adminService:AdminService,
    public dialog: MatDialog,
    public messageService:MessageService,
    private businessUnitService: BusinessUnitService,
    public dialogRef: MatDialogRef<ActiveBusinessUnitAuditTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
    ) {}

    data:any;
  ngOnInit() {
    console.log(this.userData.tableData.uc0001)
    console.log(this.userData.type)
    this.onSearch()
  }
  onSearch(){
    this.isLoading=true;
    this.businessUnitService.onLoadUpdatePage(this.userData.tableData.uc0001,this.userData.tableData.uc0001).subscribe((data: any) => {
      console.log(data);
      if(data.errorInfo !=null){
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      }else{
      this.data=data.data;
      this.isLoading=false;
      }
    })
  }
  
  
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA,'roleAuditTrail')
  }
  onChangeStatus(data:any){
    return changeStatusByCode(data);
     }
  
}



