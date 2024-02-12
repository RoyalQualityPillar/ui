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
AddedUserdisplayedColumns: string[] =['docNames','categoryTypes','attachmentName']
constructor(private fb:FormBuilder,private dmsService:DmsService,
  private toolbarService:ToolbarService,public dialog: MatDialog,
  private lifeCycleDataService:LifeCycleDataService){
 this.UserRequirementForm=this.fb.group({
  comments:[''],
  stage2:['']
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
}
testfile:any
selectedFiles:any;
attachmentName:any;
UserRoleTable:any[]=[]
tableData:any;
fileToUpload:File|null=null;
handleFileInput(event:any){
this.selectedFiles=event.target.files;
console.log(this.selectedFiles[0].name);
this.attachmentName=this.selectedFiles[0].name
const target =event.target as HTMLInputElement;
this.fileToUpload=(target.files as FileList)[0]
this.testfile=this.selectedFiles.item(0)
}
  onCreateSelectedDataList(){
    this.UserRoleTable.push({
      docNames:this.selectedDataList.docNames,
      categoryTypes:this.selectedDataList.documentType,
      attachement:this.selectedFiles.item(0),
      attachmentName:this.attachmentName
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
onSaveConfirmation(value:any){

}
onSubmit(value:any){
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
      "draft": true
    },
    documentDtoList:[]
  }
}
console.log(body)
this.dmsService.onCreate(attachement,body).subscribe((data:any)=>{

})



}
//******************************LOV IMPLEMENTATION *******************************************/
nextStageListData:any;
selectedDialogData:any;
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
