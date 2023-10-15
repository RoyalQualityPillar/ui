import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AdminService } from 'src/app/admin/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MaterialSubTypeService } from '../material-sub-type.service';
import { downloadCanvasArea } from 'bk-export';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}


@Component({
  selector: 'app-active-sub-material-audit-trail',
  templateUrl: './active-sub-material-audit-trail.component.html',
  styleUrls: ['./active-sub-material-audit-trail.component.scss']
})
export class ActiveSubMaterialAuditTrailComponent  implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  isLoading=false
  constructor(public adminService:AdminService,
    private materialSubTypeService: MaterialSubTypeService,
    public dialogRef: MatDialogRef<ActiveSubMaterialAuditTrailComponent>,
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
    this.materialSubTypeService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      console.log(data);
      this.data=data.data;
      this.isLoading=false;
    })
  }
  
  
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA,'material')
  }
  onChangeStatus(data:any){
    return changeStatusByCode(data);
     }
}





