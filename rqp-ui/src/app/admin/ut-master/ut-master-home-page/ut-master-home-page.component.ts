import { Component, AfterViewInit, ViewChild, OnInit, ViewEncapsulation, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToolbarService } from '../../../service/toolbar.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { SelectionModel } from '@angular/cdk/collections';
import { CookieService } from 'ngx-cookie-service';
import *as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { GlobalConstants } from '../../../common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { UtMasterService } from '../ut-master.service';
import { UtMasterCreateUpdateComponent } from '../ut-master-create-update/ut-master-create-update.component';
import { exportData } from 'bk-export'
import { ActiveUnitMasterAuditTrailComponent } from '../active-unit-master-audit-trail/active-unit-master-audit-trail.component';
import { AllUnitMasterAuditTrailComponent } from '../all-unit-master-audit-trail/all-unit-master-audit-trail.component';

@Component({
  selector: 'app-ut-master-home-page',
  templateUrl: './ut-master-home-page.component.html',
  styleUrls: ['./ut-master-home-page.component.scss']
})
export class UtMasterHomePageComponent implements OnInit, AfterViewInit {
  
  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  allRoleMasterdisplayedColumns: string[] = ['action', 'id', 'uc0001', 'ff0001','ff0002', 'status','version','createdon', 'createdby'];
  activeRoleMasterdisplayedColumns: string[] = ['action', 'id', 'uc0001', 'ff0001','ff0002', 'status','version','createdon', 'createdby'];
  isLoading=false;
  filterObject:any;
  activeUserFilterObject:any;
  tableData: MatTableDataSource<any>;
  size:any;
  dataSource:any;
  pageIndex:any;
  tableDataLoaded=false;
  currentApiResLength:any;
  allRoleDataLength:any;
  copiedData:any;
  selectedTab=0;
  filterFieldError=false;
  filterValueError=false;
  activeUsertableData: MatTableDataSource<any>;

  constructor(private _liveAnnouncer: LiveAnnouncer,
    public toolbarService: ToolbarService,
    public lifeCycleDataService: LifeCycleDataService,
    public cookieService: CookieService,
    public dialog: MatDialog,
    public utMasterService:UtMasterService) {}

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
    this.onLoadAllRoleMaster();
    this.OnLoadActiveRoleMaster();
  }

  tabChanged(tabChangeEvent: any) {
    this.selectedTab = tabChangeEvent.index;
    if (this.selectedTab == 0) {
      this.onLoadAllRoleMaster();
    } else if (this.selectedTab == 1) {
      this.OnLoadActiveRoleMaster();
    }
  }
 
  onLoadAllRoleMaster(){
    this.isLoading = true;
    this.size = GlobalConstants.size;
    this.dataSource = null;
    this.pageIndex = 0;
    this.utMasterService.getAllDepartment(this.size, this.pageIndex).subscribe((data: any) => {
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
    this.utMasterService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
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
    this.onLoadAllRoleMaster();
  
  }
  currentActiveUserApiResLength:any;
  activeUserDataSource:any;
  activeUserCopiedData:any;
  activeUserTableLoded=false;
  OnLoadActiveRoleMaster(){
    this.isLoading = true;
    this.size = GlobalConstants.size;
    this.dataSource = null;
    this.pageIndex = 0;
    this.utMasterService.getActiveDepartment(this.size, this.pageIndex).subscribe((data: any) => {
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


  activeUserApplyFilter(filterValue: string) {
    console.log(filterValue)
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.activeUsertableData.filter = filterValue;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.tableData.filter = filterValue;
  }
  pageChanged(event){
    console.log(event)
    if(this.currentApiResLength==GlobalConstants.size){
      if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
        this.onPaginationCall();
      }
    }
  }
  activeUSerPageChanged(event){
    if(this.currentActiveUserApiResLength==GlobalConstants.size){
      if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
        this.onActiveUserTablePagination();
      }
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
  activeUserFilterFieldError=false;
  activeUserFilterValueError=false;
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
    this.utMasterService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
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
  onAcctiveUserClearFilter(){
    this.activeUsertableData.filter = '';
    this.activeUserFilterObject.field='SELECT';
    this.activeUserFilterObject.value='';
    this.activeUserFilterObject.condition='equals'
    this.activeUserFilterFieldError=false
    this.activeUserFilterValueError=false;
    this.OnLoadActiveRoleMaster();
  
  }
  activeUserNewList:any;
  previousActiveTableList:any;
  onActiveUserTablePagination(){
    console.log('calling')
    this.pageIndex=this.pageIndex+1;
    this.isLoading=true;
    this.utMasterService.getActiveDepartment(this.size,this.pageIndex).subscribe((data: any) => {
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

   let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
   let arrExcel=[];
   for(var i=0, len=excelData.length; i<len; i++){
     arrExcel.push({
      "Id":excelData[i].id,
      "UOM Code":excelData[i].uc0001,
      "UOM Name":excelData[i].ff0001,
      "Business Unit Code":excelData[i].ff0002,
      "Status":excelData[i].status,
      "Vesrion":excelData[i].version,
      "Creation Date":excelData[i].createdon,
      "CreatedBy":excelData[i].createdby
     })
   }
   exportData(arrExcel,'ut','ut','txt')
   }
   activeUserDownloadCsvFile(){
   let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
   let arrExcel=[];
   for(var i=0, len=excelData.length; i<len; i++){
     arrExcel.push({
      "Id":excelData[i].id,
      "UOM Code":excelData[i].uc0001,
      "UOM Name":excelData[i].ff0001,
      "Business Unit Code":excelData[i].ff0002,
      "Status":excelData[i].status,
      "Vesrion":excelData[i].version,
      "Creation Date":excelData[i].createdon,
      "CreatedBy":excelData[i].createdby
     })
   }
   exportData(arrExcel,'ut','ut','csv')
  }
  activeUserDownloadPdf(){
    let header: string[] = ['Id','UOM Code', 'UOM Name', 'Business Unit Code', 'Status','Version','Created Date','CreatedBy'];
   this.totalRow=0;
   var img = new Image();
   img.src = 'assets/logo1.png'
   let doc = new jsPDF('p', 'mm', 'A4')
   let col: any = [];
   col = [header];
   let rows: any = [];
   this.activeUserDataSource=this.activeUsertableData.filteredData
   this.activeUserDataSource.forEach((element: {
      'id': any;
      'uc0001':any; 
      'ff0001':any;
      'ff0002':any;
      'status':any;
      'version':any;     
      'createdon':any;
      'createdby':any;


  }) => {
    var temp = [
      element['id'],
      element['uc0001'],
      element['ff0001'],
      element['ff0002'],
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
   doc.text("Unit Master", 86, 30);
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
   let fileName='ut-list';
   doc.save(fileName + '.pdf');
  }
  activeUserDownloadExcel1(){
   let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
   let arrExcel=[];
   for(var i=0, len=excelData.length; i<len; i++){
     arrExcel.push({
      "Id":excelData[i].id,
      "UOM Code":excelData[i].uc0001,
      "UOM Name":excelData[i].ff0001,
      "Business Unit Code":excelData[i].ff0002,
      "Status":excelData[i].status,
      "Vesrion":excelData[i].version,
      "Creation Date":excelData[i].createdon,
      "CreatedBy":excelData[i].createdby
     })
   }
   exportData(arrExcel,'ut','ut','excel')
  }
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
    let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
    let arrExcel=[];
    for(var i=0, len=excelData.length; i<len; i++){
      arrExcel.push({
        "Id":excelData[i].id,
        "UOM Code":excelData[i].uc0001,
        "UOM Name":excelData[i].ff0001,
        "Business Unit Code":excelData[i].ff0002,
        "Status":excelData[i].status,
        "Vesrion":excelData[i].version,
        "Creation Date":excelData[i].createdon,
        "CreatedBy":excelData[i].createdby
      })
    }
    exportData(arrExcel,'ut','ut','txt')
    }
    downloadCsvFile() {
      let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
      let arrExcel=[];
      for(var i=0, len=excelData.length; i<len; i++){
        arrExcel.push({
          "Id":excelData[i].id,
          "UOM Code":excelData[i].uc0001,
          "UOM Name":excelData[i].ff0001,
          "Business Unit Code":excelData[i].ff0002,
          "Status":excelData[i].status,
          "Vesrion":excelData[i].version,
          "Creation Date":excelData[i].createdon,
          "CreatedBy":excelData[i].createdby
        })
      }
      exportData(arrExcel,'ut','ut','csv')
   }

   totalRow:any;
   downloadPdf() {
    let header: string[] = ['Id','UOM Code', 'UOM Name', 'Business Unit Code', 'Status','Version','Created Date','CreatedBy'];
    this.totalRow=0;
    var img = new Image();
    img.src = 'assets/logo1.png'
    let doc = new jsPDF('p', 'mm', 'A4')
    let col: any = [];
    col = [header];
    let rows: any = [];
    this.dataSource=this.tableData.filteredData
    this.dataSource.forEach((element: {
      'id': any;
      'uc0001':any;
      'ff0001':any;
      'ff0002':any;
      'status':any;
      'version':any;
      'createdon':any;
      'createdby':any;
 
 
    }) => {
      var temp = [
        element['id'],
        element['uc0001'],
        element['ff0001'],
        element['ff0002'],
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
    doc.text("Unit Master", 88, 30);
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
    let fileName='ut-list';
    doc.save(fileName + '.pdf');
  }

  downloadExcel1(){
  let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
  let arrExcel=[];
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "Id":excelData[i].id,
      "UOM Code":excelData[i].uc0001,
      "UOM Name":excelData[i].ff0001,
      "Business Unit Code":excelData[i].ff0002,
      "Status":excelData[i].status,
      "Vesrion":excelData[i].version,
      "Creation Date":excelData[i].createdon,
      "CreatedBy":excelData[i].createdby
    })
  }
  exportData(arrExcel,'ut','ut','excel')
  }

  newList:any;
  previousTableList:any;
  onPaginationCall(){
    this.pageIndex=this.pageIndex+1;
    this.size=GlobalConstants.size;
    this.isLoading=true;
    this.utMasterService.getAllDepartment(this.size,this.pageIndex).subscribe((data: any) => {
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
 

  selectedRow=[];
  setSelectedID(row:any){
   this.selectedRow=row;
  }
  selectedAllRow=[];
  setSelectedAllID(row:any){
    this.selectedAllRow=row;
  }
  
  onActiveSelectRow(){
    if(this.selectedRow.length==0){
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': 'Please select any row', 'heading': "Error Information" }
     })
      }else{
      const dialogRef=this.dialog.open(UtMasterCreateUpdateComponent,{
          minWidth:"80%",
          data:{tableData:this.selectedRow,type:'Update'}
        })
        dialogRef.afterClosed().subscribe(result => {
          this.OnLoadActiveRoleMaster();
          this.onLoadAllRoleMaster();
        })
      }
  }
  onActiveSelectAuditRow(){
    if(this.selectedRow.length==0){
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': 'Please select any row', 'heading': "Error Information" }
     })
      }else{
      const dialogRef=this.dialog.open(ActiveUnitMasterAuditTrailComponent,{
          minWidth:"80%",
          data:{tableData:this.selectedRow,type:'AuditTrail'}
        })
        dialogRef.afterClosed().subscribe(result => {
        })
      }
  }
  onAllSelectAuditRow(){
    if(this.selectedAllRow.length==0){
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': 'Please select any row', 'heading': "Error Information" }
     })
      }else{
      const dialogRef=this.dialog.open(AllUnitMasterAuditTrailComponent,{
          minWidth:"80%",
          data:{tableData:this.selectedAllRow,type:'AuditTrail'}
        })
        dialogRef.afterClosed().subscribe(result => {
        })
      } 
  }
  onOpenRolePOPUP(){
    const dialogRef=this.dialog.open(UtMasterCreateUpdateComponent,{
      minWidth:"80%",
      data:{tableData:this.selectedRow,type:'Create'}
    })
    dialogRef.afterClosed().subscribe(result => {
      this.OnLoadActiveRoleMaster();
      this.onLoadAllRoleMaster();
    })
  } 
  downloadExcel(){
    let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
    let arrExcel=[];
    for(var i=0, len=excelData.length; i<len; i++){
      arrExcel.push({
        "Id":excelData[i].id,
        "UOM Code":excelData[i].uc0001,
        "UOM Name":excelData[i].ff0001,
        "Business Unit Code":excelData[i].ff0002,
        "Status":excelData[i].status,
        "Vesrion":excelData[i].version,
        "Creation Date":excelData[i].createdon,
        "CreatedBy":excelData[i].createdby
      })
    }
    exportData(arrExcel,'ut','ut','excel')
  }
  activeUserDownloadExcel(){ 
    let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
    let arrExcel=[];
    for(var i=0, len=excelData.length; i<len; i++){
      arrExcel.push({
        "Id":excelData[i].id,
        "UOM Code":excelData[i].uc0001,
        "UOM Name":excelData[i].ff0001,
        "Business Unit Code":excelData[i].ff0002,
        "Status":excelData[i].status,
        "Vesrion":excelData[i].version,
        "Creation Date":excelData[i].createdon,
        "CreatedBy":excelData[i].createdby
      })
    }
    exportData(arrExcel,'ut','ut','excel')
  }
}


