import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DmsService } from '../../dms.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { MatDialog } from '@angular/material/dialog';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MessageService } from 'src/app/service/message.service';
import {CookieService} from 'ngx-cookie-service';
import { ESignatureDMSComponent } from '../../dms-common/dms-common-header/e-signature/e-signature.component';
interface Row {
  files: File[];
}
@Component({
  selector: 'app-user-requirement-home-page',
  templateUrl: './user-requirement-home-page.component.html',
  styleUrls: ['./user-requirement-home-page.component.scss']
})
export class UserRequirementHomePageComponent implements OnInit{

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;
pageData:any;
UserRequirementForm:FormGroup;
isLoading:boolean;
headerRequestBody:any;
AddedUserdisplayedColumns: string[] =['documentName','categoryTypes','uploadedDocfileName']
AddedAttachmentisplayedColumns: string[] =['attachmentName']
constructor(private fb:FormBuilder,private dmsService:DmsService,
  private toolbarService:ToolbarService,public dialog: MatDialog,
  private lifeCycleDataService:LifeCycleDataService,private messageService: MessageService,
  private cookieService: CookieService){
 this.UserRequirementForm=this.fb.group({
  comments:[''],
  stage2:[''],
  attachmentName:[''],
  documentName:[''],
  categoryTypes:[''],
 })
}
ngOnInit(): void {
  this.pageData={
    pageName:'homePage',
   } 
   this.headerRequestBody=this.lifeCycleDataService.getSelectedRowData();
   this.onLoadNextStageData();
}
selectedDataList={
  documentType:'',
  docNames:'',
  categoryTypes:'',
  attachement:File,
  documentName:''
}
selectedAttachmentDataList={
  attachmentName:''
}
testfile:any
selectedFiles:any;
selectedAttachmentFiles:any;
attachmentName:any;
UserRoleTable:any[]=[]
UserRoleAttachmentTable:any[]=[]
tableData:any;
tableAttachmentData:any;
fileToUpload:File|null=null;
uploadedDocfileName:any

handleFileInput(event:any){
this.selectedFiles= event.target.files[0];
if(this.selectedFiles){
 this.uploadedDocfileName=this.selectedFiles.name;
}
}

uploadedAttachmentfileName:any;
handleAttachmentFileInput(event:any){
  this.selectedAttachmentFiles= event.target.files[0];
  if(this.selectedAttachmentFiles){
    this.uploadedAttachmentfileName=this.selectedAttachmentFiles.name;
   }
}
selectedAttachmentFileList: File[] = [];
attachmentDtoList:any[]=[]
onCreateSelectedAttachmentList(){
  this.selectedAttachmentFileList.push(this.selectedAttachmentFiles)
  this.UserRoleAttachmentTable.push({
    attachmentName:this.UserRequirementForm.controls['attachmentName'].value,
    uploadedAttachmentfileName:this.uploadedAttachmentfileName
  })
  this.attachmentDtoList.push({
    ff0002:this.headerData.unitcode,
    ff0003:this.headerData.departmentcode,
    ff0004:this.headerData.modulecode,
    //ff0004:'URS',
    ff0006:this.uploadedAttachmentfileName,
    ff0011:this.headerData.stage
  })
  console.log(this.UserRoleAttachmentTable);
  this.tableAttachmentData = new MatTableDataSource(this.UserRoleAttachmentTable);
  this.tableAttachmentData.paginator = this.paginator;
  this.tableAttachmentData.sort = this.sort;
}
documentDtoList:any[]=[]
selectedFileList: File[] = [];
  onCreateSelectedDataList(){
    console.log(this.UserRequirementForm.controls['categoryTypes'].value)
    this.selectedFileList.push(this.selectedFiles)
    this.UserRoleTable.push({
      //documentName:this.selectedDataList.documentName,
      documentName:this.UserRequirementForm.controls['documentName'].value,
      categoryTypes:this.UserRequirementForm.controls['categoryTypes'].value,
      uploadedDocfileName:this.uploadedDocfileName,
     
    })
    this.documentDtoList.push({
      ff0001:this.UserRequirementForm.controls['documentName'].value,
      ff0002:this.headerData.unitcode,
      ff0003:this.headerData.departmentcode,
      ff0004:this.headerData.modulecode,
      //ff0004:'URS',
      ff0005:this.UserRequirementForm.controls['categoryTypes'].value,
      ff0006:this.uploadedDocfileName,
      ff0011:this.headerData.stage
    })
    console.log(this.UserRoleTable);
    this.tableData = new MatTableDataSource(this.UserRoleTable);
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  headerData:any
getHeaderData(event:any){
 console.log(event)
 this.headerData=event;
}
onSaveConfirmation(){
  const dialogRef = this.dialog.open(ESignatureDMSComponent, {
    height: "300px",
    width: "600px",
    data: {},
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.selectedDialogData = result.data;
      if(this.selectedDialogData){
        this.onSubmit('0')
      }
    }
  })
}
selectedDialogData:any;
onSubmitConfirmation(){
    const dialogRef = this.dialog.open(ESignatureDMSComponent, {
      height: "300px",
      width: "600px",
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        if(this.selectedDialogData){
          this.onSubmit('1')
        }
      }
    })
  }
onSubmit(value:any){
  let draftValue:boolean;
  if(value ==1){
    draftValue=false;
  }else{
    draftValue=true;
  }
  let attachement=[];
  let docNames=[];
  let categoryTypes=[];
  this.UserRoleTable.forEach(element=>{
    docNames.push(element.docNames);
    categoryTypes.push(element.categoryTypes);
    attachement.push(element.attachement);
  })
  let body={
  ursDTO: {
    lcRequest: {
      "unitCode": this.headerData.unitcode,
      "moduleCode": this.headerData.modulecode,
      "departmentCode": this.headerData.departmentcode,
     // "lcrqNumber": this.headerData.unitcode, //need to check
      "lcNumber": this.headerData.lcnum,
      "lcStage":this.headerData.stage,
      "stage2":this.UserRequirementForm.controls['stage2'].value,
      "draft": draftValue,
      "comments":this.UserRequirementForm.controls['comments'].value,
      "createdBy":this.cookieService.get('userId'),
      "lcRole":this.headerData.role
    },
    documentDtoList:this.documentDtoList,
    attachmentDtoList:this.attachmentDtoList
  }
}
console.log(body)
this.isLoading=true;
this.dmsService.onCreate(this.selectedFileList,this.selectedAttachmentFileList,body).subscribe((data:any)=>{
  if (data.errorInfo != null) {
    this.isLoading = false;
    this.dialog.open(MessageDialogComponent, {
      data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
    });
  } else {
    this.isLoading = false;
    this.messageService.sendSnackbar('success', 'Record Created Successfully');
  }
})



}
//******************************LOV IMPLEMENTATION *******************************************/
nextStageListData:any;
onLoadNextStageData(){
  let body:any;
  body={
    lcNumber:this.headerRequestBody.lifeCycleCode,
    //lcStage:this.headerRequestBody.stage
      lcStage:this.toolbarService.currentStage
  }
  console.log(body)
  this.dmsService.getNextStageList(body).subscribe((data:any)=>{
    this.nextStageListData=data.data.nstage;
  })
}
displayedColumns:any;
openNextStageLov(){
  this.displayedColumns = [
    { field: 'stage', title: 'Code' },
    { field: 'lcRole', title: 'Description' },
  ];
  const dialogRef = this.dialog.open(LovDialogComponent, {
    height: "500px",
    width: "600px",
    data: {
      dialogTitle: "Stage",
      dialogColumns: this.displayedColumns,
      dialogData: this.nextStageListData,
      lovName: 'businessUnitList'
    },
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.selectedDialogData = result.data;
      this.UserRequirementForm.controls['stage2'].setValue(result.data.stage)
    }
  })
}

}
