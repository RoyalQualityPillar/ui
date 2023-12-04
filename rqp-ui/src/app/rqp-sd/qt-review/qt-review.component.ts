import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SdService } from '../sd.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ESignatureComponent } from '../sd-common/e-signature/e-signature.component';

@Component({
  selector: 'app-qt-review',
  templateUrl: './qt-review.component.html',
  styleUrls: ['./qt-review.component.scss']
})
export class QtReviewComponent implements OnInit{

  @ViewChild(MatSort) sort:MatSort;
  pageName='qt-review';
  FooterForm:FormGroup
  pageData:any;
  ff0001:any;
  requestNoID:any;
  headerRequestBody:any;
  resviewCommentsDisplayColumn:string[]=['createdby','ff0003','ff0005','comments'];
  qtListDisplayColumn:string[]=['ff0005','ff0006','ff0018','ff0007','ff0009','ff0010','ff0011','ff0012','ff0019','ff0013','ff0015','ff0016','ff0017']
  constructor(public router:ActivatedRoute,public sdService:SdService,public lifeCycleDataService:LifeCycleDataService,
    public dialog: MatDialog,private fb:FormBuilder){
      this.FooterForm=this.fb.group({
         nextStage:[''],
         previousStage:['']
      })
    }
  ngOnInit(): void {
    this.router.queryParams.subscribe((params:any)=>{
      console.log(params)
      this.pageData ={
        pageName:'qt-review',
        requestNo:params.uc0001,
        version:params.ff0007 +"."+params.ff0008+"."+params.ff0009+"."+params.ff0010,
        comments:params.comments
      }
      this.ff0001=params.uc0001;
       
    })
    if(this.ff0001){
      this.onReviewData();
      //this.onQTList();
      this.onGetRequestNo();
     // this.onQTIndexList();
    }
    this.headerRequestBody=this.lifeCycleDataService.getSelectedRowData();
  
    this.onLoadNextStageData();
  
  }
  nextStageListData:any;
  previousStageListData:any;
  onLoadNextStageData(){
    let body:any;
    body={
      lcNumber:this.headerRequestBody.lifeCycleCode,
      lcStage:this.headerRequestBody.stage
    }
    this.sdService.getNextStageList(body).subscribe((data:any)=>{
      this.nextStageListData=data.data.nstage;
      this.previousStageListData=data.data.pstage;
    })
  }
  headerData:any;
  getHeaderData(event:any){
    console.log(event)
    this.headerData=event;
  }
  reviewCommentsData:any;
  dataSource:any;
  onReviewData(){
    this.sdService.onReviewData(this.ff0001).subscribe((data:any)=>{
       this.reviewCommentsData=data.data;
       this.dataSource=new MatTableDataSource(this.reviewCommentsData);
       this.dataSource.sort=this.sort;
    
    })
  }
  qtItemListdataSource:any;
  onQTList(){
    this.sdService.onQTList(this.requestNoID).subscribe((data:any)=>{
      console.log(data)
      //this.qtItemListdataSource=data;
      this.qtItemListdataSource=new MatTableDataSource(data.data);
    })
  }
  onRequestVersion(row){
    return row.ff0005 +"."+row.ff0006+"."+row.ff0007+"."+row.ff0008;
  }
  onGetRequestNo(){
    this.sdService.getResquestNoID(this.pageData.requestNo).subscribe((data:any)=>{
      console.log(data)
      this.requestNoID=data.data[0].uc0001;
      if( this.requestNoID){
        this.onQTList()
        this.onQTIndexList();
      }
    })
  }
  indexList:any
  onQTIndexList(){
    this.sdService.getQTIndexList(this.requestNoID).subscribe((data:any)=>{
      console.log(data)
      this.indexList=data.data[0];
      if( this.indexList){

      }
    })
  }
  displayedColumns:any;
  selectedDialogData:any;
  openNextStageLov(){
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Next Stage",
        dialogColumns: this.displayedColumns,
        dialogData: this.nextStageListData,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.FooterForm.controls['nextStage'].setValue(result.data.stage)
      }
    })
  }
  openPreviousStageLov(){
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Previous Stage",
        dialogColumns: this.displayedColumns,
        dialogData: this.previousStageListData,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.FooterForm.controls['previousStage'].setValue(result.data.stage)
      }
    })
  }


  onSubmit(){
const dialogRef = this.dialog.open(ESignatureComponent, {
  height: "300px",
  width: "600px",
  data: {},
  disableClose: true
});
dialogRef.afterClosed().subscribe(result => {
  if (result) {
    this.selectedDialogData = result.data;
    if(this.selectedDialogData){
      this.onCallSubmitApi()
    }
  }
})
  }
  currentComments:any;
  getCommentsData(event:any){
    console.log(event)
    this.currentComments=event
  }
  onCallSubmitApi(){
    let body={
      lcNumber:this.headerData.lcnum,
      lcrqNumber:this.pageData.requestNo,
      lcStage:this.headerData.stage,
      lcRole: this.headerData.role,
      stage2: this.FooterForm.controls['nextStage'].value,
      createdBy: this.headerData.createdby,
      comments: this.currentComments
    }
    console.log(body)
    this.sdService.onLcApproval(body).subscribe((data)=>{
      console.log(data)
    })
  }
  onReject(){
    const dialogRef = this.dialog.open(ESignatureComponent, {
      height: "300px",
      width: "600px",
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        if(this.selectedDialogData){
          this.onCallRejectApi()
        }
      }
    })
  }
  onCallRejectApi(){
      let body={
        lcNumber:this.headerData.lcnum,
        lcrqNumber:this.pageData.requestNo,
        lcStage:this.headerData.stage,
        lcRole: this.headerData.role,
        stage2: this.FooterForm.controls['previousStage'].value,
        createdBy: this.headerData.createdby,
        comments: this.currentComments
      }
    this.sdService.onLcReject(body).subscribe((data)=>{
      console.log(data)
    })
  }
}
