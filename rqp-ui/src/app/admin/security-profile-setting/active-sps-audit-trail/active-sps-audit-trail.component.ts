import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AdminService } from 'src/app/admin/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SecurityProfileService } from '../security-profile.service';
import { downloadCanvasArea } from 'bk-export';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}

@Component({
  selector: 'app-active-sps-audit-trail',
  templateUrl: './active-sps-audit-trail.component.html',
  styleUrls: ['./active-sps-audit-trail.component.scss']
})
export class ActiveSpsAuditTrailComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  isLoading=false
  constructor(public adminService:AdminService,
    private securityProfileService: SecurityProfileService,
    public dialogRef: MatDialogRef<ActiveSpsAuditTrailComponent>,
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
    this.securityProfileService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      console.log(data);
      this.data=data.data;
      this.isLoading=false;
    })
  }
  
  
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA,'sps')
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








