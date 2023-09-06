import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';
//declare let html2canvas: any;
import { jsPDF } from 'jspdf';
import { AdminService } from 'src/app/admin/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../service/message.service';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}
@Component({
  selector: 'app-review-comments-history',
  templateUrl: './review-comments-history.component.html',
  styleUrls: ['./review-comments-history.component.scss']
})
export class ReviewCommentsHistoryComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  constructor(public adminService:AdminService,private snackBar: MatSnackBar,public messageService:MessageService,
    public dialogRef: MatDialogRef<ReviewCommentsHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
    ) {}

    data:any;
    isLoading=false;
  ngOnInit() {
    //this.data=this.userData.userData
    console.log(this.userData.userData.employeeId)
    console.log(this.userData.type)
   //this.setFormValue();
    this.onSearch()
  }
  dataLength:any;
  onSearch(){
    if(this.userData.type=='AuditTrail'){
      this.isLoading=true;
    this.adminService.onAuditTrail(this.userData.userData.employeeId).subscribe((data: any) => {
      console.log(data);
      this.data=data.data;
      this.dataLength=data.data.length;
      console.log(this.dataLength)
      this.isLoading=false;
    })
  }else{
    this.adminService.onActiveAuditTrail(this.userData.userData.employeeId).subscribe((data: any) => {
      console.log(data);
      this.data=data.data;
    })
  }

  }
    setFormValue(){
      let tableCurrentData:any
      if(this.userData.type=='auditTrail'){
      tableCurrentData=JSON.parse(this.userData.tableData);
      }else{
        tableCurrentData=this.userData.tableData;
      }
      let finalList=[];
      tableCurrentData.forEach(element =>{
        if(element.employeeId == this.userData.userData.employeeId){
          console.log(element.userId)
         
          let newDataList={
          'employeeId':element.employeeId,
          'userId':element.userId,
          'version':element.version,
  
          'altEmail':element.altEmail,
          'altMobile':element.altMobile,
          'branchId':element.branchId,
          'branchName':element.branchName,
          'dob':element.dob,
          'department':element.department,
          'designation':element.designation,
          'email':element.email,
          'effectiveDate':element.effectiveDate,
          'firstName':element.firstName,
          'gender':element.gender,
          'lastName':element.lastName,
          'levelOneManager':element.levelOneManager,
          'levelTwoManager':element.levelTwoManager,
          'lifecyclecode':element.lifecyclecode,
          'mobile':element.mobile,
          'userStatus':element.userStatus,
          'status':element.status,
          'createdDate':element.createdDate,
          'joinedDate':element.joinedDate,
          'urpcomments':element.urpcomments,
          }
          finalList.push(newDataList)
        }
      })
    //  console.log(finalList)
    this.data=finalList[0];
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
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('Business-unit-info.pdf');
      });
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
  PDF.addImage(FILEURI1, "JPEG", 3, 23, 200, 75, "alias1", 'SLOW');
  PDF.addImage(FILEURI2, "JPEG", 3, 100, 200, 75, "alias2", 'SLOW');
  PDF.addImage(FILEURI4, "JPEG", 3, 180, 200, 75, "alias4", 'SLOW');
    PDF.save('Business-unit-info.pdf');
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
  PDF.addImage(FILEURI1, "JPEG", 3, 23, 200, 75, "alias1", 'SLOW');
  PDF.addImage(FILEURI2, "JPEG", 3, 100, 200, 75, "alias2", 'SLOW');
    PDF.save('Business-unit-info.pdf');
  }
 
  DATA:any;
  DOWNLOADLINK:any
  ngAfterViewInit() {
  }
 
  onChangeStatus(data:any){
    if(data==1002){
      return 'Enabled'
     }else if(data==1003){
      return 'Disabled'
     }else if(data==1004){
      return "Locked"
     }else{
      return ''
     }
     }
    
}
