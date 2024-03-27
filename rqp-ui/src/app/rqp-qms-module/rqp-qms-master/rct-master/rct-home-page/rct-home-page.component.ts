import { GlobalConstants } from 'src/app/common/global-constants';
import { Component, AfterViewInit, ViewChild, OnInit, ViewEncapsulation, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { exportData } from 'bk-export'
import { MatSort, Sort } from '@angular/material/sort';
import { QmsMasterService } from 'src/app/rqp-qms-module/qms-master.service';
@Component({
  selector: 'app-rct-home-page',
  templateUrl: './rct-home-page.component.html',
  styleUrls: ['./rct-home-page.component.scss']
})
export class RctHomePageComponent implements OnInit,AfterViewInit {
  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  selectedTab=0;
  size: number;
  tableData: MatTableDataSource<any>;
  alldisplayedColumns: string[] = ['action', 'uc0001', 'ff0001','ff0002','createdby','createdon','status','version'];
  activedisplayedColumns: string[] = [ 'uc0001', 'ff0001','ff0002','createdby','createdon','status','version'];
  selectedAllRow=[];
  pageIndex = 0;
  isLoading = false;
  dataSource: any;
  currentApiResLength: any;
  allRoleDataLength: any;
  copiedData: any;
  tableDataLoaded: boolean = false;
  activeusertableDataLoaded: boolean = false;
  activeUsertableData: any;
  activeuserdataSource: any;
  activeusercopiedData: string;
  activeusertableData: any;
  activeuserDataLength: any;
  activeUserDataSource: any;
  currentActiveUserApiResLength: any;
  activeUserCopiedData: string;
  activeUserTableLoded: boolean = false;
  filterFieldError: boolean = false;
  filterObject:any;
  activeUserFilterObject: any;
  filterValueError: boolean;
  constructor(private qmsMasterService :QmsMasterService, public dialog: MatDialog, ) {

  }
  ngOnInit(): void {
    this.filterObject = {
      "field": "SELECT",
      "value": "",
      "condition": "equals",
      "DateFieldvalue1":"",
      "DateFieldvalue2":""
    }
    this.activeUserFilterObject = {
      "field": "SELECT",
      "value": "",
      "condition": "equals",
      "DateFieldvalue1":"",
      "DateFieldvalue2":""
    }
  }
ngAfterViewInit(): void { this.onLoadAllRCTTableData(); this.onLoadActiveRCTTableData }
onLoadAllRCTTableData(){
  this.size=GlobalConstants.size;
  this.qmsMasterService.getAllRCTTableData(this.size,this.pageIndex).subscribe((data:any)=>{
    if(data.errorInfo !=null){
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
      });
      this.isLoading = false;
    }else{
    this.dataSource = data.data.content;
    this.currentApiResLength = data.data.content.length;
    this.allRoleDataLength = this.dataSource.length;
    this.copiedData = JSON.stringify(this.dataSource);
    this.tableData = new MatTableDataSource(this.dataSource);
    this.tableData.paginator = this.paginator.toArray()[0];
    this.tableData.sort = this.sort.toArray()[0];
    this.isLoading = false;
    this.tableDataLoaded = true;
    }
  })
}
onLoadActiveRCTTableData(){
  this.size=GlobalConstants.size;
  this.qmsMasterService.getActiveRCTTableData(this.size,this.pageIndex).subscribe((data:any)=>{
    if(data.errorInfo !=null){
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
      });
      this.isLoading = false;
    }else{
    this.activeUserDataSource=data.data.content;
    console.log(this.activeUserDataSource)
  this.currentActiveUserApiResLength=data.data.content.length;
    this.activeUserCopiedData = JSON.stringify(this.activeUserDataSource);
    this.activeUsertableData = new MatTableDataSource(this.activeUserDataSource);
    this.activeUsertableData.paginator = this.paginator.toArray()[1];
    this.activeUsertableData.sort = this.sort.toArray()[1];
    this.isLoading=false;

    this.activeUserTableLoded=true;
    }
  })
}

  setSelectedAllID(row:any){
   this.selectedAllRow=row;
  }
  tabChanged(tabChangeEvent: any) {
    this.selectedTab = tabChangeEvent.index;
    if (this.selectedTab == 0) {
   this.onLoadAllRCTTableData()  
    } else if (this.selectedTab == 1) {
      this.onLoadActiveRCTTableData()
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.tableData.filter = filterValue;
  }
  activeUserApplyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.activeUsertableData.filter = filterValue;
  }
  onOpenRTCCreateUpdatePopup(){
    
  }
  pageChanged(event){
    console.log(event)
    if(this.currentApiResLength==GlobalConstants.size){
      if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
       
      }
    }
  }
  onAllSelectAuditRow() {

  }
  onActiveSelectRow(){

  }
  onActiveSelectAuditRow(){

  }

    activeUSerPageChanged(event){
      if(this.currentActiveUserApiResLength==GlobalConstants.size){
        if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
          
        }
      }
    }

    onChangeSelctedField(){
      console.log('testing')
      if(this.filterObject.field!='createdon'){
        this.filterObject.condition='equals'
      }else{
        this.filterObject.condition='between'
      }
    }
    applyFilterByColumn(){
      this.filterFieldError=false
      this.filterValueError=false;
      if(this.filterObject.field==''|| this.filterObject.field==null || this.filterObject.field==undefined ||this.filterObject.field=='SELECT'){
        console.log('test1')
        this.filterFieldError=true;
        return;
      }
      if(this.filterObject.value==''|| this.filterObject.value==null || this.filterObject.value==undefined){
        console.log('test2')
        if(this.filterObject.field !='createdon'){
        this.filterValueError=true;
        return;
      }else if(this.filterObject.DateFieldvalue1==''){
        console.log('test4')
          this.filterValueError=true;
          return;
      }else{
        console.log('test6')
      }
      }
    
      let field=this.filterObject.field;
      let value=this.filterObject.value;  
      let condition=this.filterObject.condition;
      console.log('field = '+field+' value = '+value);
      let filetrDataBody={
        field:'',
        value1: '',
        value2: '',
        condition: ''
      }
      filetrDataBody.field=field;
      filetrDataBody.value1=value;
      filetrDataBody.condition=condition;
      if(this.filterObject.field =='createdon'){
        filetrDataBody.value1=moment(this.filterObject.DateFieldvalue1).format('DD-MM-YYYY HH:mm:ss.SSS');
        filetrDataBody.value2=moment(this.filterObject.DateFieldvalue2).format('DD-MM-YYYY HH:mm:ss.SSS');
        filetrDataBody.value2=(moment(this.filterObject.DateFieldvalue2).add(1,'days').format('DD-MM-YYYY HH:mm:ss.SSS'));
       // filetrDataBody.value2=moment(filetrDataBody.value2,'DD-MM-YYYY HH:mm:ss.SSS').add(2,'days');
       // filetrDataBody.value2=newDate;
        filetrDataBody.condition='between';
      }
      this.isLoading=true;
      this.qmsMasterService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
        console.log(data)
        if(data.data){
        this.dataSource=data.data;
        this.currentApiResLength=data.data.length;
        this.allRoleDataLength = this.dataSource.length;
            this.copiedData = JSON.stringify(this.dataSource);
          this.tableData = new MatTableDataSource(this.dataSource);
          this.tableData.paginator = this.paginator.toArray()[0];
          this.tableData.sort = this.sort.toArray()[0];
          this.isLoading=false;
          this.tableDataLoaded=true;
        }else{
          this.isLoading=false;
          this.dialog.open(MessageDialogComponent, {
            width:"400px",
            data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
          });
        }
      })
    }

    onClearFilter(){
      this.tableData.filter = '';
      this.filterObject.field='SELECT';
      this.filterObject.value='';
      this.filterObject.condition='equals'
      this.filterFieldError=false
      this.filterValueError=false;
  
    
    }
}


