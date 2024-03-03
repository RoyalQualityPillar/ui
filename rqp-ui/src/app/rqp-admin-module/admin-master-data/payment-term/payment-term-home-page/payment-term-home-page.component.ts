
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
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
import * as moment from 'moment';
import { exportData } from 'bk-export';
import { PaymentTermService } from '../payment-term.service';
import { CreateUpdatePaymentTermComponent } from '../create-update-payment-term/create-update-payment-term.component';
import { AllPaymentTermATComponent } from '../all-payment-term-at/all-payment-term-at.component';
import { ActivePaymentTermATComponent } from '../active-payment-term-at/active-payment-term-at.component';
import { changeStatusByCode, changeStatusByDescription } from 'src/app/common/removeEmptyStrings';


@Component({
  selector: 'app-payment-term-home-page',
  templateUrl: './payment-term-home-page.component.html',
  styleUrls: ['./payment-term-home-page.component.scss']
})
export class PaymentTermHomePageComponent implements OnInit,AfterViewInit{

  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  alldisplayedColumns: string[] = ['action', 'uc0001', 'ff0001','ff0002','status','version'];
  activedisplayedColumns: string[] = ['action', 'uc0001', 'ff0001','ff0002','status','version'];
  isLoading=false;
  pageIndex:number;
  size:number;
  filterFieldError=false;
  filterValueError=false;
  activeUserFilterFieldError=false;
  activeUserFilterValueError=false;
  tableData: MatTableDataSource<any>;
   constructor(private router:Router,
    private paymentTermService:PaymentTermService,
    public dialog: MatDialog,
    ){}
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
  ngAfterViewInit(): void {
     this.onLoadAllSaleProductMaster();
     this.onLoadActiveSaleProductMaster();
  }
  selectedTab=0;
  tabChanged(tabChangeEvent: any) {
    this.selectedTab = tabChangeEvent.index;
    if (this.selectedTab == 0) {
      this.onLoadAllSaleProductMaster();
    } else if (this.selectedTab == 1) {
      this.onLoadActiveSaleProductMaster();
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.tableData.filter = filterValue;
  }
  selectedRow=[];
  onOpenRolePOPUP(){
    const dialogRef=this.dialog.open(CreateUpdatePaymentTermComponent,{
      minWidth:"80%",
      data:{tableData:this.selectedRow,type:'Create'}
    })
    dialogRef.afterClosed().subscribe(result => {
      this.onLoadActiveSaleProductMaster();
      this.onLoadAllSaleProductMaster();
    })
  }
  selectedAllRow=[];
  setSelectedAllID(row:any){
   this.selectedAllRow=row;
  }
  currentApiResLength:any;
  pageChanged(event){
    if(this.currentApiResLength==GlobalConstants.size){
      if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
        this.onPaginationCall();
      }
    }
  }
  onAllSelectAuditRow(){
    if(this.selectedAllRow.length==0){
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': 'Please select any row', 'heading': "Error Information" }
     })
      }else{
      const dialogRef=this.dialog.open(AllPaymentTermATComponent,{
          minWidth:"80%",
          data:{tableData:this.selectedAllRow,type:'Update'}
        })
        dialogRef.afterClosed().subscribe(result => {
        })
      } 
  }
  onPaginationCall(){

  }
  onLoadAllSaleProductMaster(){
    //todo
    this.pageIndex=0;
    this.size=GlobalConstants.size;
    this.paymentTermService.getAllSaleProduct(this.size,this.pageIndex).subscribe((data:any)=>{
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
  onLoadActiveSaleProductMaster(){
    //todo
    this.isLoading = true;
    this.size = GlobalConstants.size;
    this.dataSource = null;
    this.pageIndex = 0;
    this.paymentTermService.getActiveSaleProduct(this.size, this.pageIndex).subscribe((data: any) => {
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
  dataSource:any;
  allRoleDataLength:any;
  copiedData:any;
  tableDataLoaded:any;
  applyFilterByColumn(){
    this.filterFieldError=false
    this.filterValueError=false;
    if(this.filterObject.field==''|| this.filterObject.field==null || this.filterObject.field==undefined ||this.filterObject.field=='SELECT'){
      this.filterFieldError=true;
      return;
    }
    if(this.filterObject.value==''|| this.filterObject.value==null || this.filterObject.value==undefined){
      if(this.filterObject.field !='createdon'){
      this.filterValueError=true;
      return;
    }else if(this.filterObject.DateFieldvalue1==''){
        this.filterValueError=true;
        return;
    }else{
    }
    }
  
    let field=this.filterObject.field;
    let value=this.filterObject.value;  
    let condition=this.filterObject.condition;
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
    this.paymentTermService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
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
    this.onLoadAllSaleProductMaster();
  
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
    activeUsertableData:any;
    activeUserApplyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase(); 
      this.activeUsertableData.filter = filterValue;
    }
    setSelectedID(row:any){
     this.selectedRow=row;
    }
    currentActiveUserApiResLength:any;
    activeUSerPageChanged(event){
      if(this.currentActiveUserApiResLength==GlobalConstants.size){
        if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
          this.onActiveUserTablePagination();
        }
      }
    }
    onActiveUserTablePagination(){

    }
    onActiveSelectRow(){
      if(this.selectedRow.length==0){
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': 'Please select any row', 'heading': "Error Information" }
       })
        }else{
        const dialogRef=this.dialog.open(CreateUpdatePaymentTermComponent,{
            minWidth:"80%",
            data:{tableData:this.selectedRow,type:'Update'}
          })
          dialogRef.afterClosed().subscribe(result => {
            this.onLoadActiveSaleProductMaster();
            this.onLoadAllSaleProductMaster();
          })
        }
    }
    onActiveSelectAuditRow(){
      if(this.selectedRow.length==0){
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': 'Please select any row', 'heading': "Error Information" }
       })
        }else{
        const dialogRef=this.dialog.open(ActivePaymentTermATComponent,{
            minWidth:"80%",
            data:{tableData:this.selectedRow,type:'Update'}
          })
          dialogRef.afterClosed().subscribe(result => {
          })
        } 
    }
    onChangeSelctedField(){
      if(this.filterObject.field!='createdon'){
        this.filterObject.condition='equals'
      }else{
        this.filterObject.condition='between'
      }
    }
    onChangeActiveSelctedField(){
      if(this.activeUserFilterObject.field!='createdDate'){
        this.activeUserFilterObject.condition='equals'
      }else{
        this.activeUserFilterObject.condition='between'
      }
    }
    activeUserDataSource:any;
    activeUserCopiedData:any;
    activeUserTableLoded:any;
    applyActiveUserFilterByColumn(){
      this.activeUserFilterFieldError=false
      this.activeUserFilterValueError=false;
      if(this.activeUserFilterObject.field==''|| this.activeUserFilterObject.field==null || this.activeUserFilterObject.field==undefined ||this.activeUserFilterObject.field=='SELECT'){
        this.activeUserFilterFieldError=true;
        return;
      }
      
      if(this.activeUserFilterObject.value==''|| this.activeUserFilterObject.value==null || this.activeUserFilterObject.value==undefined){
        if(this.activeUserFilterObject.field !='createdon'){
        this.activeUserFilterValueError=true;
        return;
        }else if(this.activeUserFilterObject.DateFieldvalue1==''){
            this.activeUserFilterValueError=true;
            return;
        }else{
        }
      }
    
      let field=this.activeUserFilterObject.field;
      let value=this.activeUserFilterObject.value;  
      let condition=this.activeUserFilterObject.condition;
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
      this.paymentTermService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
        if(data.data){
        this.activeUserDataSource=data.data;
        this.currentActiveUserApiResLength=data.data.length;
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
      this.onLoadActiveSaleProductMaster();
    
    }
    downloadTxt(){
      let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
      let arrExcel=[];
      for(var i=0, len=excelData.length; i<len; i++){
        arrExcel.push({
          "Payment Terms Code":excelData[i].uc0001,
          "Payment Terms Description":excelData[i].ff0001,
          "Business Unit Code":excelData[i].ff0002,
          "Status":this.onChangeStatus(excelData[i].status),
          "Version":excelData[i].version,
          "Comments":excelData[i].comments, 
        })
      }
      exportData(arrExcel,'payment','payment','txt')
}
downloadCsvFile() {
  let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
  let arrExcel=[];
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "Payment Terms Code":excelData[i].uc0001,
      "Payment Terms Description":excelData[i].ff0001,
      "Business Unit Code":excelData[i].ff0002,
      "Status":this.onChangeStatus(excelData[i].status),
      "Version":excelData[i].version,
      "Comments":excelData[i].comments, 
    })
  }
  exportData(arrExcel,'payment','payment','csv')
}


totalRow:any;
downloadPdf() {
 let header: string[] = ['Payment Terms Code', 'Payment Terms Description', 'Business Unit Code', 'Status','Version'];
 this.totalRow=0;
 var img = new Image();
 img.src = 'assets/logo1.png'
 let doc = new jsPDF('p', 'mm', 'A4')
 let col: any = [];
 col = [header];
 let rows: any = [];
 this.dataSource=this.tableData.filteredData
 this.dataSource.forEach((element: {
   'uc0001':any;
   'ff0001':any;
   'ff0002':any;
   'status':any;
   'version':any;   


 }) => {
   var temp = [
     element['uc0001'],
     element['ff0001'],
     element['ff0002'],
     element['status'],
     element['version'],

   ];
   rows.push(temp);
 });
 doc.setFillColor(255, 128,0);
 doc.rect(5, 24, 200, 8, "F");
 doc.setFontSize(14); 
 doc.text("Payment", 88, 30);
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
 let fileName='payment';
 doc.save(fileName + '.pdf');
}

downloadExcel(){
let excelData=JSON.parse(JSON.stringify(this.tableData.filteredData))
let arrExcel=[];
for(var i=0, len=excelData.length; i<len; i++){
 arrExcel.push({
  "Payment Terms Code":excelData[i].uc0001,
  "Payment Terms Description":excelData[i].ff0001,
  "Business Unit Code":excelData[i].ff0002,
  "Status":this.onChangeStatus(excelData[i].status),
  "Version":excelData[i].version,
  "Comments":excelData[i].comments, 
 })
}
exportData(arrExcel,'payment','payment','excel')
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
      "Payment Terms Code":excelData[i].uc0001,
      "Payment Terms Description":excelData[i].ff0001,
      "Business Unit Code":excelData[i].ff0002,
      "Status":this.onChangeStatus(excelData[i].status),
      "Version":excelData[i].version,
      "Comments":excelData[i].comments, 
    })
  }
  exportData(arrExcel,'payement','payement','txt')
}
activeUserDownloadCsvFile(){

  let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
  let arrExcel=[];
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "Payment Terms Code":excelData[i].uc0001,
      "Payment Terms Description":excelData[i].ff0001,
      "Business Unit Code":excelData[i].ff0002,
      "Status":this.onChangeStatus(excelData[i].status),
      "Version":excelData[i].version,
      "Comments":excelData[i].comments, 
    })
  }
  exportData(arrExcel,'payement','payment','csv')
 }
 
 activeUserDownloadPdf(){
  let header: string[] = ['Payment Terms Code', 'Payment Terms Description', 'Business Unit Code', 'Status','Version'];
 this.totalRow=0;
 var img = new Image();
 img.src = 'assets/logo1.png'
 let doc = new jsPDF('p', 'mm', 'A4')
 let col: any = [];
 col = [header];
 let rows: any = [];
 this.activeUserDataSource=this.activeUsertableData.filteredData
 this.activeUserDataSource.forEach((element: {
  'uc0001':any;
  'ff0001':any;
  'ff0002':any;
  'status':any;
  'version':any;  
}) => {
  var temp = [
    element['uc0001'],
     element['ff0001'],
     element['ff0002'],
     element['status'],
     element['version'],

   ];
   rows.push(temp);
 });
 doc.setFillColor(255, 128,0);
 doc.rect(5, 24, 200, 8, "F");
 doc.setFontSize(14); 
 doc.text("Payment", 86, 30);
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
 let fileName='payment';
 doc.save(fileName + '.pdf');
}
activeUserDownloadExcel1(){
  let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
  let arrExcel=[];
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "Payment Terms Code":excelData[i].uc0001,
      "Payment Terms Description":excelData[i].ff0001,
      "Business Unit Code":excelData[i].ff0002,
      "Status":this.onChangeStatus(excelData[i].status),
      "Version":excelData[i].version,
      "Comments":excelData[i].comments, 
    })
  }
  exportData(arrExcel,'payment','payement','csv')
 }
 activeUserDownloadExcel(){ 
  let excelData=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
  let arrExcel=[];
  for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "Payment Terms Code":excelData[i].uc0001,
      "Payment Terms Description":excelData[i].ff0001,
      "Business Unit Code":excelData[i].ff0002,
      "Status":this.onChangeStatus(excelData[i].status),
      "Version":excelData[i].version,
      "Comments":excelData[i].comments, 
    })
  }
  exportData(arrExcel,'payement','payement','excel')
}

onChangeStatus(statusCode:any){
  return changeStatusByCode(statusCode)
}
}
