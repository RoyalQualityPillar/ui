import { Component, AfterViewInit, ViewChild, OnInit, ViewEncapsulation, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { SelectionModel } from '@angular/cdk/collections';
import { CookieService } from 'ngx-cookie-service';
import *as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BusinessUnitService } from '../business-unit.service';
import * as moment from 'moment';
import { CreateBusinessUnitComponent } from '../create-business-unit/create-business-unit.component';
import { exportData } from 'bk-export';
import { ActiveBusinessUnitAuditTrailComponent } from '../active-business-unit-audit-trail/active-business-unit-audit-trail.component';
import { AllBusinessUnitAuditTrailComponent } from '../all-business-unit-audit-trail/all-business-unit-audit-trail.component';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ToolbarService } from 'src/app/service/toolbar.service';

@Component({
  selector: 'app-business-unit-home-page',
  templateUrl: './business-unit-home-page.component.html',
  styleUrls: ['./business-unit-home-page.component.scss']
})
export class BusinessUnitHomePageComponent implements OnInit, AfterViewInit {
  
  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  allBusinessUnitdisplayedColumns: string[] = ['action','uc0001', 'uc0002','ff0001','ff0002','ff0003', 'status','version', 'createdon', 'createdby'];
  ActiveBusinessUnitdisplayedColumns: string[] = ['action', 'uc0001', 'uc0002','ff0001','ff0002','ff0003', 'status','version', 'createdon', 'createdby'];

  constructor(private _liveAnnouncer: LiveAnnouncer,
    public toolbarService: ToolbarService,
    public lifeCycleDataService: LifeCycleDataService,
    public cookieService: CookieService,
    public dialog: MatDialog,
    private businessUnitService: BusinessUnitService) {
  }
  selection = new SelectionModel<any>(true, [])
  selectedTab = 0;
  tableData: MatTableDataSource<any>;
  isLoading = false;
  size: any;
  dataSource: any;
  pageIndex = 0;
  copiedData: any;
  currentApiResLength: any;
  allBuisnessUnitDataLength: any;
  tableDataLoaded = false;
  selectedID=[];
  filterObject:any;
  activeUserFilterObject:any;
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

  ngAfterViewInit() {
    this.onLoadAllBusinessUnit();
    this.OnLoadActiveBusinessUnit();
  }



  //Tab Selection
  tabChanged(tabChangeEvent: any) {
    this.selectedTab = tabChangeEvent.index;
    if (this.selectedTab == 0) {
      this.onLoadAllBusinessUnit();
    } else if (this.selectedTab == 1) {
      this.OnLoadActiveBusinessUnit();
    }
  }

  onLoadAllBusinessUnit() {
    this.isLoading = true;
    this.size = GlobalConstants.size;
    this.dataSource = null;
    this.pageIndex = 0;
    this.businessUnitService.getAllBusinessUnit(this.size, this.pageIndex).subscribe((data: any) => {
      if(data.errorInfo !=null){
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
        this.isLoading = false;
      }else{
      this.dataSource = data.data.content;
      this.currentApiResLength = data.data.content.length;
      this.allBuisnessUnitDataLength = this.dataSource.length;
      this.copiedData = JSON.stringify(this.dataSource);
      this.tableData = new MatTableDataSource(this.dataSource);
      this.tableData.paginator = this.paginator.toArray()[0];
      this.tableData.sort = this.sort.toArray()[0];
      this.isLoading = false;
      this.tableDataLoaded = true;
      }
    })

  }
  pageChanged(event){
    console.log(event)
    if(this.currentApiResLength==GlobalConstants.size){
      if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
        this.onPaginationCall();
      }
    }
  }
  newList:any;
previousTableList:any;
  onPaginationCall(){
    this.pageIndex=this.pageIndex+1;
    this.size=GlobalConstants.size;
    this.isLoading=true;
    this.businessUnitService.getAllBusinessUnit(this.size,this.pageIndex).subscribe((data: any) => {
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
  activeUSerPageChanged(event){
    if(this.currentActiveUserApiResLength==GlobalConstants.size){
      if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
        this.onActiveUserTablePagination();
      }
    }
  }
  activeUserNewList:any;
  previousActiveTableList:any;
  onActiveUserTablePagination(){
    console.log('calling')
    this.pageIndex=this.pageIndex+1;
    this.isLoading=true;
    this.businessUnitService.getAllBusinessUnit(this.size,this.pageIndex).subscribe((data: any) => {
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
  filterFieldError=false;
  filterValueError=false;
  activeUserFilterFieldError=false;
  activeUserFilterValueError=false;
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
    this.businessUnitService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
      console.log(data)
      if(data.data){
      this.dataSource=data.data;
      this.currentApiResLength=data.data.length;
      this.allBuisnessUnitDataLength = this.dataSource.length;
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
  applyActiveUserFilterByColumn(){
    this.activeUserFilterFieldError=false
    this.activeUserFilterValueError=false;
    console.log(this.activeUserFilterObject.field)
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
    this.businessUnitService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
      console.log(data)
      if(data.data){
      this.activeUserDataSource=data.data;
      this.currentActiveUserApiResLength=data.data.length;
      console.log(this.currentActiveUserApiResLength)
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
  onChangeSelctedField(){
    console.log('testing')
    if(this.filterObject.field!='createdon'){
      this.filterObject.condition='equals'
    }else{
      this.filterObject.condition='between'
    }
  }
  onChangeActiveSelctedField(){
    console.log('testing')
    if(this.activeUserFilterObject.field!='createdDate'){
      this.activeUserFilterObject.condition='equals'
    }else{
      this.activeUserFilterObject.condition='between'
    }
  }
  onClearFilter(){
    this.tableData.filter = '';
    this.filterObject.field='SELECT';
    this.filterObject.value='';
    this.filterObject.condition='equals'
    this.filterFieldError=false
    this.filterValueError=false;
    this.onLoadAllBusinessUnit();
  
  }
  onAcctiveUserClearFilter(){
    this.activeUsertableData.filter = '';
    this.activeUserFilterObject.field='SELECT';
    this.activeUserFilterObject.value='';
    this.activeUserFilterObject.condition='equals'
    this.activeUserFilterFieldError=false
    this.activeUserFilterValueError=false;
    this.OnLoadActiveBusinessUnit();
  
  }
  activeUserDataSource: any;
  currentActiveUserApiResLength:any;
  activeUserCopiedData:any;
  activeUsertableData: MatTableDataSource<any>;
  activeUserTableLoded=false;
  OnLoadActiveBusinessUnit() {
    
    this.isLoading = true;
    this.size = GlobalConstants.size;
    this.dataSource = null;
    this.pageIndex = 0;
    this.businessUnitService.getActiveBusinessUnit(this.size, this.pageIndex).subscribe((data: any) => {
      if(data.errorInfo !=null){
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
        this.isLoading = false;
      }else{
      this.activeUserDataSource=data.data.content;
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.tableData.filter = filterValue;
  }
 //Filter Part for Active User
 activeUserApplyFilter(filterValue: string) {
  console.log(filterValue)
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase(); 
  this.activeUsertableData.filter = filterValue;
}
activeUserSelectedRowData:any;
  onOpenBusinessUnitPOPUP() {
    const dialogRef=this.dialog.open(CreateBusinessUnitComponent,{
      minWidth:"80%",
      data:{userData:this.activeUserSelectedRowData,type:'Create'}
    })
    dialogRef.afterClosed().subscribe(result => {
      this.onLoadAllBusinessUnit();
      this.OnLoadActiveBusinessUnit();
    })
  }
  //Download 
  copyData() {
    var dataArray = "";
    let tableData:any;
    let exportData:any
    tableData=this.tableData.filteredData;
    for(let i=0;i<tableData.length;i++){
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
    downloadTxt(){
      let type='txt';
      let screenName='businessunit';
      let fileName='businessunit';
      let arrExcel=[];
      let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
      for(var i=0, len=excelData.length; i<len; i++){
        arrExcel.push({
          "Business Unit Code":excelData[i].uc0001,
          "Category":excelData[i].uc0002,
          "Business Organisation Name":excelData[i].ff0001,
          "Business Organisation Code":excelData[i].ff0002,
          "Business Unit Name":excelData[i].ff0003,
          "Status":excelData[i].status,
          "Vesrion":excelData[i].version,
          "Creation Date":excelData[i].createdon,
          "CreatedBy":excelData[i].createdby
        })
      }
      exportData(arrExcel,screenName,fileName,type)
     }
     downloadCsvFile() {
      let type='csv';
      let screenName='businessunit';
      let fileName='businessunit';
      let arrExcel=[];
      let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
      for(var i=0, len=excelData.length; i<len; i++){
        arrExcel.push({
          "Business Unit Code":excelData[i].uc0001,
          "Category":excelData[i].uc0002,
          "Business Organisation Name":excelData[i].ff0001,
          "Business Organisation Code":excelData[i].ff0002,
          "Business Unit Name":excelData[i].ff0003,
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
    let header: string[] = ['Business Unit Code', 'Category', 'Business Organisation Name','Business Organisation Code','Business Unit Name', 'Status','Version','Created Date','CreatedBy'];
    this.totalRow=0;
    var img = new Image();
    img.src = 'assets/logo1.png'
    let doc = new jsPDF('p', 'mm', 'A4')
    let col: any = [];
    col = [header];
    let rows: any = [];
    this.dataSource=this.tableData.filteredData
    this.dataSource.forEach((element: {
      'uc0001': any;
      'uc0002':any;
      'ff0001':any;
      'ff0002':any;
      'ff0003':any;
      'status':any;
      'version':any;
      'createdon':any;
      'createdby':any;
 
 
    }) => {
      var temp = [
        element['uc0001'],
        element['uc0002'],
        element['ff0001'],
        element['ff0002'],
        element['ff0003'],
        element['status'],
        element['version'],
        element['createdon'],
        element['createdby']
 
      ];
      rows.push(temp);
    });
    doc.setFillColor(255, 128,0);
    doc.rect(5, 24, 200, 8, "F");
    doc.setFontSize(14); 
    doc.text("Business Unit", 88, 30);
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
    let fileName='business-unit-list';
    doc.save(fileName + '.pdf');
  }
  downloadExcel(){
    let type='excel';
    let screenName='businessunit';
    let fileName='businessunit'
    let arrExcel=[];
    let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
    for(var i=0, len=excelData.length; i<len; i++){
      arrExcel.push({
        "Business Unit Code":excelData[i].uc0001,
        "Category":excelData[i].uc0002,
        "Business Organisation Name":excelData[i].ff0001,
        "Business Organisation Code":excelData[i].ff0002,
        "Business Unit Name":excelData[i].ff0003,
        "Status":excelData[i].status,
        "Vesrion":excelData[i].version,
        "Creation Date":excelData[i].createdon,
        "CreatedBy":excelData[i].createdby
      })
    }
    exportData(arrExcel,screenName,fileName,type)

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
    let screenName='businessunit';
    let fileName='businessunit';
    let arrExcel=[];
    let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
    for(var i=0, len=excelData.length; i<len; i++){
      arrExcel.push({
        "Business Unit Code":excelData[i].uc0001,
        "Category":excelData[i].uc0002,
        "Business Organisation Name":excelData[i].ff0001,
        "Business Organisation Code":excelData[i].ff0002,
        "Business Unit Name":excelData[i].ff0003,
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
    let screenName='businessunit';
    let fileName='businessunit';
    let arrExcel=[];
    let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
    for(var i=0, len=excelData.length; i<len; i++){
      arrExcel.push({
        "Business Unit Code":excelData[i].uc0001,
        "Category":excelData[i].uc0002,
        "Business Organisation Name":excelData[i].ff0001,
        "Business Organisation Code":excelData[i].ff0002,
        "Business Unit Name":excelData[i].ff0003,
        "Status":excelData[i].status,
        "Vesrion":excelData[i].version,
        "Creation Date":excelData[i].createdon,
        "CreatedBy":excelData[i].createdby
      })
    }
    exportData(arrExcel,screenName,fileName,type)
  }
  activeUserDownloadPdf(){
    let header: string[] = ['Business Unit Code', 'Category', 'Business Organisation Name','Business Organisation Code','Business Unit Name', 'Status','Version','Created Date','CreatedBy'];
   this.totalRow=0;
   var img = new Image();
   img.src = 'assets/logo1.png'
   let doc = new jsPDF('p', 'mm', 'A4')
   let col: any = [];
   col = [header];
   let rows: any = [];
   this.activeUserDataSource=this.activeUsertableData.filteredData
   this.activeUserDataSource.forEach((element: {
    'uc0001': any;
    'uc0002':any;
    'ff0001':any;
    'ff0002':any;
    'ff0003':any;
    'status':any;
    'version':any;
    'createdon':any;
    'createdby':any;


  }) => {
    var temp = [
      element['uc0001'],
      element['uc0002'],
      element['ff0001'],
      element['ff0002'],
      element['ff0003'],
      element['status'],
      element['version'],
      element['createdon'],
      element['createdby']

     ];
     rows.push(temp);
   });
   doc.setFillColor(255, 128,0);
   doc.rect(5, 24, 200, 8, "F");
   doc.setFontSize(14); 
   doc.text("Business Unit", 86, 30);
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
   let fileName='active-business-unit-list';
   doc.save(fileName + '.pdf');
  }
  activeUserDownloadExcel(){
    let type='excel';
    let screenName='businessunit';
    let fileName='businessunit';
    let arrExcel=[];
    let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
    for(var i=0, len=excelData.length; i<len; i++){
      arrExcel.push({
        "Business Unit Code":excelData[i].uc0001,
        "Category":excelData[i].uc0002,
        "Business Organisation Name":excelData[i].ff0001,
        "Business Organisation Code":excelData[i].ff0002,
        "Business Unit Name":excelData[i].ff0003,
        "Status":excelData[i].status,
        "Vesrion":excelData[i].version,
        "Creation Date":excelData[i].createdon,
        "CreatedBy":excelData[i].createdby
      })
    }
    exportData(arrExcel,screenName,fileName,type)

  }
  //selected Row
  setSelectedID(row:any){
    console.log(row)
    this.selectedID=row;
  }
  selectedAllId:any;
  setSelectedAllID(row:any){
  this.selectedAllId=row;
  }
  onActiveSelectRow(){
 console.log(this.selectedID);
 if(this.selectedID.length==0){
  this.dialog.open(MessageDialogComponent, {
    data: { 'message': 'Please select any row', 'heading': "Error Information" }
 })
  }else{
  const dialogRef=this.dialog.open(CreateBusinessUnitComponent,{
      minWidth:"80%",
      data:{tableData:this.selectedID,type:'Update'}
    })
    dialogRef.afterClosed().subscribe(result => {
    })
  }
}
onAllSelectAuditTrailRow(){
  if(this.selectedAllId.length==0){
    this.dialog.open(MessageDialogComponent, {
      data: { 'message': 'Please select any row', 'heading': "Error Information" }
   })
    }else{
  const dialogRef=this.dialog.open(AllBusinessUnitAuditTrailComponent,{
    minWidth:"80%",
    data:{tableData:this.selectedAllId,type:'Update'}
  })
  dialogRef.afterClosed().subscribe(result => {
  }) 
}
}
onActiveSelectAuditTrailRow(){
  if(this.selectedID.length==0){
    this.dialog.open(MessageDialogComponent, {
      data: { 'message': 'Please select any row', 'heading': "Error Information" }
   })
    }else{
  console.log(this.selectedID)
  const dialogRef=this.dialog.open(ActiveBusinessUnitAuditTrailComponent,{
    minWidth:"80%",
    data:{tableData:this.selectedID,type:'auditTrail'}
  })
  dialogRef.afterClosed().subscribe(result => {
  }) 
}
}
}
