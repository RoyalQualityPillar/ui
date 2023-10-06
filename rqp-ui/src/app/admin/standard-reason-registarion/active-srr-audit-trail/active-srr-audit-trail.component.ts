import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AdminService } from 'src/app/admin/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { StandardReasonRegistartionService } from '../standard-reason-registartion.service';
import { downloadCanvasArea } from 'bk-export';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}


@Component({
  selector: 'app-active-srr-audit-trail',
  templateUrl: './active-srr-audit-trail.component.html',
  styleUrls: ['./active-srr-audit-trail.component.scss']
})
export class ActiveSrrAuditTrailComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  isLoading=false
  constructor(public adminService:AdminService,
    private standardReasonRegistartionService: StandardReasonRegistartionService,
    public dialogRef: MatDialogRef<ActiveSrrAuditTrailComponent>,
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
    this.standardReasonRegistartionService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      console.log(data);
      this.data=data.data;
      this.isLoading=false;
    })
  }
  
  
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA,'srr')
  }
  onChangeStatus(data:any){
    if(data==1002){
      return 'Enabled'
     }else if(data==1003){
      return 'Disabled'
     }else if(data==1004){
      return "Locked"
     }else if(data==1001){
      return "Active"
     }
     else{
      return ''
     }
    }
}




