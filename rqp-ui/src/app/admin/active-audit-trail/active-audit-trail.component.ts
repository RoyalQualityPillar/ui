import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import html2canvas from 'html2canvas';
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
  selector: 'app-active-audit-trail',
  templateUrl: './active-audit-trail.component.html',
  styleUrls: ['./active-audit-trail.component.scss']
})
export class ActiveAuditTrailComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;

  constructor(public adminService:AdminService,public messageService:MessageService,
    public dialogRef: MatDialogRef<ActiveAuditTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
    ) {}

    data:any;
  ngOnInit() {
    //this.data=this.userData.userData
    console.log(this.userData.userData.employeeId)
    console.log(this.userData.type)
   //this.setFormValue();
    this.onSearch()
  }
  onSearch(){
    if(this.userData.type=='AuditTrail'){
    this.adminService.onAuditTrail(this.userData.userData.employeeId).subscribe((data: any) => {
      console.log(data);
      this.data=data.data;
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
  
  public openPDF(): void {
    this.messageService.sendSnackbar('success','File will get downloaded once its ready');
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
  onChangeStatus(data:any){
    if(data==1002){
      return 'Active'
     }else if(data==1003){
      return 'Disabled'
     }else if(data==1004){
      return "Locked"
     }else{
      return ''
     }
     }
  
}