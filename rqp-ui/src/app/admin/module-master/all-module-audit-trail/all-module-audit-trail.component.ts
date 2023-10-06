import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AdminService } from 'src/app/admin/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ModuleService } from '../module.service';
import {MessageService} from '../../../service/message.service';
import { downloadCanvasArea } from 'bk-export';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}


@Component({
  selector: 'app-all-module-audit-trail',
  templateUrl: './all-module-audit-trail.component.html',
  styleUrls: ['./all-module-audit-trail.component.scss']
})
export class AllModuleAuditTrailComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;

  constructor(public adminService:AdminService,
    private moduleService: ModuleService,
    public messageService:MessageService,
    public dialogRef: MatDialogRef<AllModuleAuditTrailComponent>,
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
    this.moduleService.onAllRoleAuditTrail(this.userData.tableData.uc0001).subscribe((data: any) => {
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
//       this.snackBar.open("File will get downloaded once its ready", 'OK', {
//         duration: 3000,
//         panelClass: 'my-custom-snackbar'
//       });
      this.messageService.sendSnackbar('success','File will get downloaded once its ready');
      if(this.dataLength==1){
        this.openPDFByOne();
      }else if(this.dataLength==2){
        this.openPDFByTwo();
      }else{
        this.openPDFByThree();
      }
     }
     public openPDFByOne(): void {
      let DATA: any = document.getElementById('htmlData');
      downloadCanvasArea(DATA,'roleAuditTrail')
     }
  public openPDFByTwo(): void {
     let DATA: any = document.getElementById('Location1');
     let DATA1: any = document.getElementById('Location2');
     let HEADER: any = document.getElementById('header');
     let FILEURI:any;
     let FILEURI1:any;
     let FILEHEADER:any
     html2canvas(HEADER).then((canvas2) => {
      FILEHEADER = canvas2.toDataURL('image/png');
      this.printURLHeader(FILEHEADER)
    });
     html2canvas(DATA).then((canvas) => {
      FILEURI = canvas.toDataURL('image/png');
      this.printURL1(FILEURI)
    });
    html2canvas(DATA1).then((canvas1) => {
      FILEURI1 = canvas1.toDataURL('image/png');
      this.printURL2(FILEURI1)
    });
  }
  openPDFByThree():void{
    let DATA: any = document.getElementById('Location1');
    let DATA1: any = document.getElementById('Location2');
    let DATA2: any = document.getElementById('Location3');
    let HEADER: any = document.getElementById('header');
    let FILEURI:any;
    let FILEURI1:any;
    let FILEURI2:any;
    let FILEHEADER:any
    html2canvas(HEADER).then((canvas2) => {
     FILEHEADER = canvas2.toDataURL('image/png');
     this.printURLHeader(FILEHEADER)
   });
    html2canvas(DATA).then((canvas) => {
     FILEURI = canvas.toDataURL('image/png');
     this.printURLForLength3(FILEURI)
   });
   html2canvas(DATA1).then((canvas1) => {
     FILEURI1 = canvas1.toDataURL('image/png');
     this.printURL2(FILEURI1)
   });
   html2canvas(DATA2).then((canvas2) => {
    FILEURI2 = canvas2.toDataURL('image/png');
    this.printURL3(FILEURI2)
  });
  }
  printURLForLength3(FILEURI){
    console.log('working')
    this.FileURLObject.url1=FILEURI;
    setTimeout(()=>{
     this.savepdfForLength3()
    },1000)
  }
  savepdfForLength3(){
    let FILEURI1=this.FileURLObject.url1;
    let FILEURI2=this.FileURLObject.url2;
    let FILEURI3=this.FileURLObject.url3;
    let FILEURI4=this.FileURLObject.url4;
    console.log(FILEURI1+""+FILEURI2)
     let PDF = new jsPDF('p', 'mm', 'a4');
   PDF.addImage(FILEURI3, "JPEG", 3, 3, 200, 22, "alias3", 'SLOW');
  PDF.addImage(FILEURI1, "JPEG", 3, 23, 200, 50, "alias1", 'SLOW');
  PDF.addImage(FILEURI2, "JPEG", 3, 75, 200, 50, "alias2", 'SLOW');
  PDF.addImage(FILEURI4, "JPEG", 3, 127, 200, 50, "alias4", 'SLOW');
    PDF.save('role.pdf');
  }
  printURL1(FILEURI){
    console.log('working')
  this.FileURLObject.url1=FILEURI;
  setTimeout(()=>{
   this.savepdf()
  },1000)
  }
  printURL2(FILEURI){
    console.log('working')
    this.FileURLObject.url2=FILEURI;
    }
    printURL3(FILEURI){
      console.log('working')
      this.FileURLObject.url4=FILEURI;
      }
    printURLHeader(FILEURI){
      console.log('working')
      this.FileURLObject.url3=FILEURI;
      }

  savepdf(){
    console.log(this.FileURLObject)
    let FILEURI1=this.FileURLObject.url1;
    let FILEURI2=this.FileURLObject.url2;
    let FILEURI3=this.FileURLObject.url3;
     let PDF = new jsPDF('p', 'mm', 'a4');
     PDF.addImage(FILEURI3, "JPEG", 3, 3, 200, 22, "alias3", 'SLOW');
     PDF.addImage(FILEURI1, "JPEG", 3, 23, 200, 50, "alias1", 'SLOW');
     PDF.addImage(FILEURI2, "JPEG", 3, 75, 200, 50, "alias2", 'SLOW');
    PDF.save('role.pdf');
  }
 
  DATA:any;
  DOWNLOADLINK:any
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



