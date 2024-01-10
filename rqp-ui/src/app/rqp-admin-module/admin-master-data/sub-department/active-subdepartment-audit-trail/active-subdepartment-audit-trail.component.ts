import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SubDepartmentService } from '../sub-department.service';
import { downloadCanvasArea } from 'bk-export';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}



@Component({
  selector: 'app-active-subdepartment-audit-trail',
  templateUrl: './active-subdepartment-audit-trail.component.html',
  styleUrls: ['./active-subdepartment-audit-trail.component.scss']
})
export class ActiveSubdepartmentAuditTrailComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  isLoading=false
  constructor(public adminService:AdminService,
    private subDepartmentService: SubDepartmentService,
    public dialogRef: MatDialogRef<ActiveSubdepartmentAuditTrailComponent>,
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
    this.subDepartmentService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      console.log(data);
      this.data=data.data;
      this.isLoading=false;
    })
  }
  
  
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA,'department')
  }
  onChangeStatus(data:any){
    return changeStatusByCode(data);
     }
}




