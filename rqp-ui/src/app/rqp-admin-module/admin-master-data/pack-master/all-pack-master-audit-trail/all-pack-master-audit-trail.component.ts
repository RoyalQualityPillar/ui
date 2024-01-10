import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { PackMasterService } from '../pack-master.service';
import { downloadCanvasArea } from 'bk-export';
import {openPDFByFive,openPDFByTwo, openPDFByFour, openPDFByThree} from 'rqp-audit-trail';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
import { MessageService } from 'src/app/service/message.service';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}

@Component({
  selector: 'app-all-pack-master-audit-trail',
  templateUrl: './all-pack-master-audit-trail.component.html',
  styleUrls: ['./all-pack-master-audit-trail.component.scss']
})
export class AllPackMasterAuditTrailComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;

  constructor(public adminService:AdminService,
    private packMasterService: PackMasterService,
    public messageService:MessageService,
    public dialogRef: MatDialogRef<AllPackMasterAuditTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
    ) {}

    data:any;
    isLoading=false;
  ngOnInit() {
    //this.data=this.userData.userData
    console.log(this.userData.tableData.uc0001)
    console.log(this.userData.type)
   //this.setFormValue();
    this.onSearch()
  }
  dataLength:any
  onSearch(){
    this.isLoading=true;
    this.packMasterService.onAllRoleAuditTrail(this.userData.tableData.uc0001).subscribe((data: any) => {
      console.log(data);
      this.data=data.data;
      this.dataLength=data.data.length;
      this.isLoading=false;
      //this.setFormValue();
    })
  }
  
  
  fileWidth:any;
     fileHeight:any;
     fileWidth1:any;
     fileHeight1:any;
     FileURLObject={
      url1:'',
      url2:'',
      url3:'',
      url4:''
     }
     onDownloadPDF(){
      this.messageService.sendSnackbar('success','File will get downloaded once its ready');
      if(this.dataLength==1){
        this.openPDFByOne();
      }else if(this.dataLength==2){
       // this.openPDFByTwo();
       let DATA: any = document.getElementById('Location1');
       let DATA1: any = document.getElementById('Location2');
       let HEADER: any = document.getElementById('header');
       openPDFByTwo(HEADER,DATA,DATA1,50,22,'pack')
      }else if(this.dataLength==3){
        let DATA: any = document.getElementById('Location1');
       let DATA1: any = document.getElementById('Location2');
       let DATA2: any = document.getElementById('Location3');
       let HEADER: any = document.getElementById('header');
        openPDFByThree(HEADER,DATA,DATA1,DATA2,50,22,'pack');
      }
    else if(this.dataLength==4){
      let DATA: any = document.getElementById('Location1');
      let DATA1: any = document.getElementById('Location2');
      let DATA2: any = document.getElementById('Location3');
      let DATA3: any = document.getElementById('Location4');
      let HEADER: any = document.getElementById('header');
      openPDFByFour(HEADER,DATA,DATA1,DATA2,DATA3,50,22,'pack');
    }
    else {
      let DATA: any = document.getElementById('Location1');
      let DATA1: any = document.getElementById('Location2');
      let DATA2: any = document.getElementById('Location3');
      let DATA3: any = document.getElementById('Location4');
      let DATA4: any = document.getElementById('Location5');
      let HEADER: any = document.getElementById('header');
      openPDFByFive(HEADER,DATA,DATA1,DATA2,DATA3,DATA4,50,22,'pack');
    }
     }
     public openPDFByOne(): void {
      let DATA: any = document.getElementById('htmlData');
      downloadCanvasArea(DATA,'pack')
     }
   
 
  DATA:any;
  DOWNLOADLINK:any
  onChangeStatus(data:any){
    return changeStatusByCode(data);
     }

}





