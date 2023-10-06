import { Component,OnInit,ViewChild,ElementRef,QueryList,ViewChildren,AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {MessageService} from '../../../service/message.service';
import { AdminService } from 'src/app/admin/admin.service';
import {GlobalConstants} from '../../../common/global-constants';
import { UserListComponent } from '../user-list/user-list.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectedUserListComponent } from '../selected-user-list/selected-user-list.component';
import { CreateAllLifeCycleComponent } from '../create-all-life-cycle/create-all-life-cycle.component';
import { CreateActiveLifeCycleComponent } from '../create-active-life-cycle/create-active-life-cycle.component';
import { SelectionModel } from '@angular/cdk/collections';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import *as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import * as moment from 'moment';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { ActiveUserLifeCycleListComponent } from '../active-user-life-cycle-list/active-user-life-cycle-list.component';
import { exportData } from 'bk-export';

@Component({
  selector: 'app-life-cycle-home',
  templateUrl: './life-cycle-home.component.html',
  styleUrls: ['./life-cycle-home.component.scss']
})
export class LifeCycleHomeComponent implements OnInit,AfterViewInit{

  selection = new SelectionModel<any>(true,[])
  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  selectedTab=0;
  isReadOnly=true;
  deptCodeList:any;
  plantList:any;
  designationList:any;
  subDeptList:any;
  LifeCycleForm: FormGroup;
  size:any;
  pageIndex:any;
  isLoading=false;
  dataSource:any;
  roletoAdd:any;
  roleData:any='';
  data1:any;
  roletoRemove:any;
  rolesList:any;
  moduleList:any;
  statusInfo:any;
  activeUserFilterObject:any;
  allLifeCycleisplayedColumns: string[] = ['action','lcnum','businessunit','comments','createdon','department','lifecycle','module','status','version'];
  activeLifeCycleisplayedColumns:string[] = ['action','lcnum','businessunit','comments','createdon','department','lifecycle','module','status','version'];
  constructor(public fb: FormBuilder,
    private adminService:AdminService,
    public messageService:MessageService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,){

  }
  filterObject:any;
  ngOnInit(): void {
    this.filterObject = {
      "field": "SELECT",
      "value": "",
      "condition": "equals",
      "DateFieldvalue1":"",
      "DateFieldvalue2":""
    }
    this.activeUserFilterObject= {
      "field": "SELECT",
      "value": "",
      "condition": "equals",
      "DateFieldvalue1":"",
      "DateFieldvalue2":""
    }
  }
  ngAfterViewInit() {
    this.onLoadAllLifeCycleData();
    this.onLoadAllActiveLifeCycleData();
  }
  //Tab Selection
tabChanged(tabChangeEvent:any) {
  console.log('index => ', tabChangeEvent.index);
  this.selectedTab=tabChangeEvent.index;
  
  if(this.selectedTab==0){
    this.onLoadAllLifeCycleData();
  }else if(this.selectedTab==1){
    this.onLoadAllActiveLifeCycleData();
  }
};
currentAllLCApiResLength:any;
allLifeCycleInfoDataLength:any;
copiedData:any;
tableData:any;
tableDataLoaded:any;
onLoadAllLifeCycleData(){
  this.isLoading=true;
  this.size=GlobalConstants.size;
  this.dataSource=null;
 this.pageIndex=0;
 this.adminService.getAllLifeCycleList(this.size,this.pageIndex).subscribe((data: any) => {
  console.log(data);
  this.dataSource=data.data.content;
  this.currentAllLCApiResLength=data.data.content.length;
  this.allLifeCycleInfoDataLength = this.dataSource.length;
      this.copiedData = JSON.stringify(this.dataSource);
    this.tableData = new MatTableDataSource(this.dataSource);
    this.tableData.paginator = this.paginator.toArray()[0];
    this.tableData.sort = this.sort.toArray()[0];
    this.isLoading=false;
    this.tableDataLoaded=true;
 })
}
//Pagination
pageChanged(event){
  console.log(event)
  if(this.currentAllLCApiResLength==GlobalConstants.size){
    if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
      this.onPaginationForAllLifeCycle();
    }
  }
}
newList:any;
previousTableList:any;
onPaginationForAllLifeCycle(){
  this.pageIndex=this.pageIndex+1;
  this.size=GlobalConstants.size;
  this.isLoading=true;
  this.adminService.getAllLifeCycleList(this.size,this.pageIndex).subscribe((data: any) => {
    console.log(data);
    this.newList=data.data.content;
    this.dataSource.push(...this.newList);
    this.previousTableList=JSON.parse(this.copiedData);
    console.log(this.previousTableList)
    //this.copiedData.push(...this.newTableList);
    this.previousTableList.push(...this.newList);
    this.copiedData=this.previousTableList;
    this.tableData = new MatTableDataSource(this.dataSource);
    this.tableData.paginator = this.paginator.toArray()[0];
    this.tableData.sort = this.sort.toArray()[0];
    this.isLoading=false;
    console.log(this.newList)
  })
}
filterFieldError=false;
filterValueError=false;
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
  this.adminService.getFilterDataForAllLifeCycle(filetrDataBody).subscribe((data: any) => {
    console.log(data)
    if(data.data){
    this.dataSource=data.data;
    this.currentAllLCApiResLength=data.data.length;
    this.allLifeCycleInfoDataLength = this.dataSource.length;
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


//  this.tableData.filterPredicate= (data:any, filter: string) => {
//     const textToSearch = data[field] && data[field].toLowerCase() || '';
//     return textToSearch.indexOf(filter) !== -1;
//   }
//   this.tableData.filter = value.trim().toLowerCase();


}
onChangeSelctedField(){
  console.log('testing')
  if(this.filterObject.field!='createdon'){
    this.filterObject.condition='equals'
  }else{
    this.filterObject.condition='between'
  }
}
onClearFilter(){
    this.tableData.filter = '';
    this.filterObject.field='SELECT';
    this.filterObject.value='';
    this.filterObject.condition='equals'
    this.filterFieldError=false
    this.filterValueError=false;
    this.onLoadAllLifeCycleData();
}

//DOWNLOAD PART
downloadExcel(){
  let type='excel';
  let screenName='lifecycle';
  let fileName='lifecycle';
  let arrExcel=[];
  let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "LC Number":excelData[i].lcnum,
      "Business Unit":excelData[i].businessunit,
      "Comments":excelData[i].comments,
      "Department":excelData[i].department,
      "Life Cycle":excelData[i].lifecycle,
      "Module":excelData[i].module,
      "Status":excelData[i].status,
      "Vesrion":excelData[i].version,
      "Creation Date":excelData[i].createdon,
      "CreatedBy":excelData[i].createdby
    })
  }
  exportData(arrExcel,screenName,fileName,type)
}
totalRow:any;
downloadPdf() {
  let header: string[] = ['LC No.', 'Business Unit', 'Comments', 'Created','Department','Life Cycle','Module','Status','version'];
  this.totalRow=this.allLifeCycleInfoDataLength;
  var img = new Image();
  img.src = 'assets/logo1.png'
  let doc = new jsPDF('p', 'mm', 'A4')
  let col: any = [];
  col = [header];
  let rows: any = [];
  this.dataSource=this.tableData.filteredData
  this.dataSource.forEach((element: {
    'lcnum': any;
    'businessunit':any;
    'comments':any;
    'createdon':any;
    'department':any;
    'lifecycle':any;
    'module':any;
    'status':any;
    'version':any;


  }) => {
    var temp = [
      element['lcnum'],
      element['businessunit'],
      element['comments'],
      element['createdon'],
      element['department'],
      element['lifecycle'],
      element['module'],
      element['status'],
      element['version']

    ];
    rows.push(temp);
  });
  doc.setFillColor(255, 128,0);
  doc.rect(5, 24, 200, 8, "F");
  doc.setFontSize(14); 
  doc.text("Life Cycle", 90, 30);
  doc.addImage(img, 'gif', 170, 5, 30, 15);
  autoTable(doc, {
    head: col,
    body: rows,
    showHead: "everyPage",
    startY: 35,
    margin: {right:5,left:5},
    tableWidth: 'auto',
    didDrawPage: (dataArg) => {

      doc.text('', dataArg.settings.margin.left, 20);

    }
  });
  let fileName='life-cycle';
  doc.save(fileName + '.pdf');
}

downloadCsvFile() {
  let type='csv';
  let screenName='lifecycle';
  let fileName='lifecycle';
  let arrExcel=[];
  let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "LC Number":excelData[i].lcnum,
      "Business Unit":excelData[i].businessunit,
      "Comments":excelData[i].comments,
      "Department":excelData[i].department,
      "Life Cycle":excelData[i].lifecycle,
      "Module":excelData[i].module,
      "Status":excelData[i].status,
      "Vesrion":excelData[i].version,
      "Creation Date":excelData[i].createdon,
      "CreatedBy":excelData[i].createdby
    })
  }
  exportData(arrExcel,screenName,fileName,type)

}
downloadTxt(){
  let type='txt';
  let screenName='lifecycle';
  let fileName='lifecycle';
  let arrExcel=[];
  let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "LC Number":excelData[i].lcnum,
      "Business Unit":excelData[i].businessunit,
      "Comments":excelData[i].comments,
      "Department":excelData[i].department,
      "Life Cycle":excelData[i].lifecycle,
      "Module":excelData[i].module,
      "Status":excelData[i].status,
      "Vesrion":excelData[i].version,
      "Creation Date":excelData[i].createdon,
      "CreatedBy":excelData[i].createdby
    })
  }
  exportData(arrExcel,screenName,fileName,type)
 }
 copyData() {
  var dataArray = "";
  let tableData:any;
  let exportData:any
  tableData=this.tableData.filteredData;
  for(let i=0;i<tableData.length;i++){
    delete tableData[i].createdby;
    delete tableData[i].action;
  }
  tableData.forEach(row => {
    dataArray += this.ObjectToArray(row)
  })
  return dataArray;
}

  ObjectToArray(obj: any): string {
    let result = Object.keys(obj).map((key: keyof typeof obj) => {
      let value = obj[key];
      return value;
    });
    return result.toString() + "\n";
  }

  handleKeyPress(val:any){
    console.log('bharat')
    console.log(val);
    console.log(this.selection.selected)
   
  }
  cureentSelectedRow:any;
  selectedUserId:any;
  selectedModuleName:any;
  selectedLifecycleCode:any;
  selectedRowData:any;
  onReviewUserData1(){

    this.cureentSelectedRow=this.selection.selected;
    console.log(this.cureentSelectedRow)
    if(this.cureentSelectedRow.length==1){
      console.log(this.cureentSelectedRow[0])
      this.selectedRowData=this.cureentSelectedRow[0];
        console.log(' one')
    }else if(this.cureentSelectedRow.length>1){
      console.log('more than one')
      let arrayLength=this.cureentSelectedRow.length-1;
      console.log(arrayLength)
      console.log(this.cureentSelectedRow[arrayLength]);
      this.selectedRowData=this.cureentSelectedRow[arrayLength]
    }else{
      //do nothing
      console.log('else block')
          //do nothing
          this.dialog.open(MessageDialogComponent, {
            width:"400px",
            data: { 'message': "Please select any row", 'heading': "Error Information" }
          });
          return
        
    }
   console.log(this.selectedRowData)
  // this.redirectToList()
  
  }
  selectedId:any;
  setSelectedId(id:any){
   // if(target.checked){
      this.selectedId=id;
      
      console.log(this.selectedId)
 //   }
  }
  onReviewUserData(){
    console.log(this.selectedId)
    if(this.selectedId==undefined){
      this.dialog.open(MessageDialogComponent, {
        width:"400px",
        data: { 'message': "Please select any row", 'heading': "Error Information" }
      });
      return
    }else{
    const dialogRef=this.dialog.open(ActiveUserLifeCycleListComponent,{
      minWidth:"80%",
      data:{userData:this.selectedId,type:'active_life_Cycle'}
    })
  }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    console.log(filterValue)
    this.tableData.filter = filterValue;
    console.log(this.tableData)
    console.log(this.tableData)
  }






/*************************************************************
 * **********************************************************
 * ********* ACTIVE LIFE CYCLE ******************************
 * **********************************************************
 * **********************************************************
 */
activeUserCurrentPageIndex:any;
activeUserDataSource:any
currentActiveUserApiResLength:any;
activeUserCopiedData:any;
activeUsertableData: MatTableDataSource<any>;
activeUserTableLoded=false;
onLoadAllActiveLifeCycleData(){
  console.log('active working')
  this.isLoading=true;
  this.size=GlobalConstants.size;
 // this.activeUserDataSource=null;
 this.activeUserCurrentPageIndex=0;
 console.log(this.size+"current page"+this.activeUserCurrentPageIndex)
  this.adminService.getActiveLifeCycleList(this.size,this.activeUserCurrentPageIndex).subscribe((data: any) => {

    this.activeUserDataSource=data.data.content;
    this.currentActiveUserApiResLength=data.data.content.length;
    console.log(this.currentActiveUserApiResLength)


    // this.lifeCycleInfoDataLength = this.dataSource.length;
      this.activeUserCopiedData = JSON.stringify(this.activeUserDataSource);
      this.activeUsertableData = new MatTableDataSource(this.activeUserDataSource);
      this.activeUsertableData.paginator = this.paginator.toArray()[1];
      this.activeUsertableData.sort = this.sort.toArray()[1];
      this.isLoading=false;
 
      this.activeUserTableLoded=true;
  // }
  })
}
activeUserNewList:any;
  previousActiveTableList:any;
onActiveLifeCycleTablePagination(){
  console.log('calling')
  this.pageIndex=this.pageIndex+1;
  this.isLoading=true;
  this.adminService.getActiveLifeCycleList(this.size,this.pageIndex).subscribe((data: any) => {
    this.activeUserNewList=data.data.content;
    this.activeUserDataSource.push(...this.activeUserNewList);
    this.previousActiveTableList=JSON.parse(this.activeUserCopiedData);
    this.previousActiveTableList.push(...this.activeUserNewList);
    this.activeUserCopiedData=this.previousActiveTableList;
    this.activeUsertableData = new MatTableDataSource(this.activeUserDataSource);
    setTimeout(()=>{
      this.activeUsertableData.paginator = this.paginator.toArray()[1];
      this.activeUsertableData.sort = this.sort.toArray()[1];
    })
   
    this.isLoading=false;
  })
}
activeLifeCycleApplyFilter(filterValue: string) {
  console.log(filterValue)
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase(); 
  this.activeUsertableData.filter = filterValue;
}
activeUSerPageChanged(event){
  if(this.currentActiveUserApiResLength==GlobalConstants.size){
    if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
      this.onActiveLifeCycleTablePagination();
    }
  }
}
activeUserFilterFieldError=false;
activeUserFilterValueError=false;
applyActiveUserFilterByColumn(){
  this.activeUserFilterFieldError=false
  this.activeUserFilterValueError=false;
  console.log(this.activeUserFilterObject.field)
  console.log(this.activeUserFilterObject.value)
  if(this.activeUserFilterObject.field==''|| this.activeUserFilterObject.field==null || this.activeUserFilterObject.field==undefined ||this.activeUserFilterObject.field=='SELECT'){
    console.log('test1')
    this.activeUserFilterFieldError=true;
    return;
  }
  
  if(this.activeUserFilterObject.value==''|| this.activeUserFilterObject.value==null || this.activeUserFilterObject.value==undefined){
    console.log('test2')
    if(this.activeUserFilterObject.field !='createdon'){
      console.log('test3')
    this.activeUserFilterValueError=true;
    return;
    }else if(this.activeUserFilterObject.DateFieldvalue1==''){
      console.log('test4')
        this.activeUserFilterValueError=true;
        return;
    }else{
      console.log('test6')
    }
  }

  let field=this.activeUserFilterObject.field;
  let value=this.activeUserFilterObject.value;  
  let condition=this.activeUserFilterObject.condition;
  
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
  if(this.activeUserFilterObject.field =='createdon'){
    filetrDataBody.value1=moment(this.activeUserFilterObject.DateFieldvalue1).format('DD-MM-YYYY HH:mm:ss.SSS');
    filetrDataBody.value2=moment(this.activeUserFilterObject.DateFieldvalue2).format('DD-MM-YYYY HH:mm:ss.SSS');
    filetrDataBody.condition='between';
  }
  this.isLoading=true;
  this.adminService.getFilterDataForAllLifeCycle(filetrDataBody).subscribe((data: any) => {
    console.log(data)
    if(data.data){
    this.activeUserDataSource=data.data;
    this.currentActiveUserApiResLength=data.data.length;
    console.log(this.currentActiveUserApiResLength)


    // this.lifeCycleInfoDataLength = this.dataSource.length;
      this.activeUserCopiedData = JSON.stringify(this.activeUserDataSource);
      this.activeUsertableData = new MatTableDataSource(this.activeUserDataSource);
      this.activeUsertableData.paginator = this.paginator.toArray()[1];
      this.activeUsertableData.sort = this.sort.toArray()[1];
      this.isLoading=false;
 
      this.activeUserTableLoded=true;
    }else{
      this.isLoading=false;
      this.dialog.open(MessageDialogComponent, {
        width:"400px",
        data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
      });
    }

  })
}
onAcctiveUserClearFilter(){
  this.activeUsertableData.filter = '';
  this.activeUserFilterObject.field='SELECT';
  this.activeUserFilterObject.value='';
  this.activeUserFilterObject.condition='equals'
  this.activeUserFilterFieldError=false
  this.activeUserFilterValueError=false;
  this.onLoadAllActiveLifeCycleData();

}
onChangeActiveSelctedField(){
  console.log('testing')
  if(this.activeUserFilterObject.field!='createdon'){
    this.activeUserFilterObject.condition='equals'
  }else{
    this.activeUserFilterObject.condition='between'
  }
}

activeUserCopyData(){
  var dataArray = "";
  let tableData:any;
  let exportData:any
  tableData=this.activeUsertableData.filteredData;
  for(let i=0;i<tableData.length;i++){
    delete tableData[i].action;
  }
  tableData.forEach(row => {
    dataArray += this.activeUserObjectToArray(row)
  })
  return dataArray;
}
activeUserObjectToArray(obj: any): string {
  let result = Object.keys(obj).map((key: keyof typeof obj) => {
    let value = obj[key];
    return value;
  });
  return result.toString() + "\n";
}

activeUserDownloadTxt(){
  let type='txt';
  let screenName='lifecycle';
  let fileName='lifecycle';
  let arrExcel=[];
  let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "LC Number":excelData[i].lcnum,
      "Business Unit":excelData[i].businessunit,
      "Comments":excelData[i].comments,
      "Department":excelData[i].department,
      "Life Cycle":excelData[i].lifecycle,
      "Module":excelData[i].module,
      "Status":excelData[i].status,
      "Vesrion":excelData[i].version,
      "Creation Date":excelData[i].createdon,
      "CreatedBy":excelData[i].createdby
    })
  }
  exportData(arrExcel,screenName,fileName,type)
 }
 activeUserDownloadCsvFile(){
  let type='csv';
  let screenName='lifecycle';
  let fileName='lifecycle';
  let arrExcel=[];
  let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "LC Number":excelData[i].lcnum,
      "Business Unit":excelData[i].businessunit,
      "Comments":excelData[i].comments,
      "Department":excelData[i].department,
      "Life Cycle":excelData[i].lifecycle,
      "Module":excelData[i].module,
      "Status":excelData[i].status,
      "Vesrion":excelData[i].version,
      "Creation Date":excelData[i].createdon,
      "CreatedBy":excelData[i].createdby
    })
  }
  exportData(arrExcel,screenName,fileName,type)

 }

 activeUserDownloadPdf(){
  let header: string[] = ['User Id.', 'Employee Id', 'Name', 'Unit Type','Status','Modification No'];
 //this.totalRow=this.lifeCycleInfoDataLength;
 var img = new Image();
 img.src = 'assets/logo1.png'
 let doc = new jsPDF('p', 'mm', 'A4')
 let col: any = [];
 col = [header];
 let rows: any = [];
 this.activeUserDataSource=this.activeUsertableData.filteredData
 this.activeUserDataSource.forEach((element: {
  'lcnum': any;
  'businessunit':any;
  'comments':any;
  'createdon':any;
  'department':any;
  'lifecycle':any;
  'module':any;
  'status':any;
  'version':any;

 }) => {
   var temp = [
    element['lcnum'],
    element['businessunit'],
    element['comments'],
    element['createdon'],
    element['department'],
    element['lifecycle'],
    element['module'],
    element['status'],
    element['version']
   ];
   rows.push(temp);
 });
 doc.setFillColor(255, 128,0);
 doc.rect(5, 24, 200, 8, "F");
 doc.setFontSize(14); 
 doc.text("Active Life Cycle", 90, 30);
 doc.addImage(img, 'gif', 170, 5, 30, 15);
 autoTable(doc, {
   head: col,
   body: rows,
   showHead: "everyPage",
   startY: 35,
   margin: {right:5,left:5},
   tableWidth: 'auto',
   didDrawPage: (dataArg) => {

     doc.text('', dataArg.settings.margin.left, 20);

   }
 });
 let fileName='active-life-cycle-list';
 doc.save(fileName + '.pdf');
}
activeUserDownloadExcel(){
  let type='excel';
  let screenName='lifecycle';
  let fileName='lifecycle';
  let arrExcel=[];
  let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "LC Number":excelData[i].lcnum,
      "Business Unit":excelData[i].businessunit,
      "Comments":excelData[i].comments,
      "Department":excelData[i].department,
      "Life Cycle":excelData[i].lifecycle,
      "Module":excelData[i].module,
      "Status":excelData[i].status,
      "Vesrion":excelData[i].version,
      "Creation Date":excelData[i].createdon,
      "CreatedBy":excelData[i].createdby
    })
  }
  exportData(arrExcel,screenName,fileName,type)
}
selectedUser:any
onUserList(){
  const dialogRef = this.dialog.open(UserListComponent, {
    minWidth: "80%",
    data:{type:'List'},
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
   console.log(dialogResult);
   this.selectedUser=dialogResult.data;
  }
    
  });
}
selectedDataList={
  role:"",
  userList:[],
  download:false,
  signature:false,
  print:false,
  esign:false
}
 public arr=Array<{role:any,userList:any,download:any,signature:any,print:any,esign:any}>;
 UserRoleTable:any[]=[]
//selectedDataList:any;
selectedDataTable:any;
allLifeCycleData:any;



















onloadDropDown(){
  this.adminService.getDropDownList().subscribe((data: any) => {
    console.log(data)
    this.deptCodeList=data.data.deptCodeList;
    this.plantList=data.data.plantList;
    this.designationList=data.data.designationList;
    this.subDeptList=data.data.subDeptList;
    this.rolesList=data.data.rolesList;
    this.moduleList=data.data.moduleList;
    this.statusInfo=data.data.statusInfo;
  })
}

addRole() {
  for (let i = 0; i < this.roleData.length; i++) {
    if (this.roleData[i].firstName == this.roletoAdd) {
      this.data1.push(this.roleData[i]);
      this.roleData.splice(i, 1);
      break;
    }
  }
}
addallRole() {
  for (let i = 0; i < this.roleData.length; i++) {
    this.data1.push(this.roleData[i]);
  }
  this.roleData = [];
}
removeRole() {
  for (let i = 0; i < this.data1.length; i++) {
    if (this.data1[i].firstName == this.roletoRemove) {
      this.roleData.push(this.data1[i]);
      this.data1.splice(i, 1);
      break;
    }
  }
}
removeallRole() {
  for (let i = 0; i < this.data1.length; i++) {
    this.roleData.push(this.data1[i]);
  }
  this.data1= [];
  }



//onSubmit
onDisplayList(row:any){
console.log(row)
const dialogRef = this.dialog.open(SelectedUserListComponent, {
  minWidth: "80%",
  data:{tableData:row},
});

dialogRef.afterClosed().subscribe(dialogResult => {
  if(dialogResult){
 console.log(dialogResult);
}
  
});
}
onSubmit(){
  //todo
}
onCreateAllLifeCyclePOPUP(){
  const dialogRef = this.dialog.open(CreateAllLifeCycleComponent, {
    minWidth: "80%",
    data:{},
  });
  
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
   console.log(dialogResult);
  }
    
  }); 
}
onCreateActiveLifeCyclePOPUP(){
  const dialogRef = this.dialog.open(CreateActiveLifeCycleComponent, {
    minWidth: "80%",
    data:{},
  });
  
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
   console.log(dialogResult);
  }
    
  }); 
}
}
