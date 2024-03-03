import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import {ToolbarService} from '../../service/toolbar.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { SelectionModel } from '@angular/cdk/collections';
import {CookieService} from 'ngx-cookie-service';
import *as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {GlobalConstants} from '../../common/global-constants';
import { exportData } from 'bk-export';
export interface selectedRowInterface{
  userId:string
  lifeCycleCode:string
  lcRole:string
  stage:number
  moduleName:string
  moduelCode:string
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
  // encapsulation : ViewEncapsulation.None,
})
export class DataTableComponent implements OnInit ,AfterViewInit {

  selection = new SelectionModel<any>(true,[])
  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;

  displayedColumns: string[] = ['action', 'userid','lcnum', 'lcrole','stage','uc0001','ff0001'];
 // dataSource = ELEMENT_DATA;
 dataSource:any;
 filterObject:any;
 isLoading=false;
  constructor(private _liveAnnouncer: LiveAnnouncer,
              private route: Router,
              private router: ActivatedRoute,
              public toolbarService:ToolbarService,
              public lifeCycleDataService:LifeCycleDataService,
              public cookieService:CookieService,
              private dialog:MatDialog){
   // this.dataSource=tableData.tableData;
  
  }
  tableData:MatTableDataSource<any>;
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.filterObject = {
      "field": "SELECT",
      "value": "",
      "condition":"SELECT"
    }
  }
  copiedData:any
  lifeCycleInfoDataLength:any
  tableDataLoaded=false;
  size:any;
  onSearch(){
    this.pageIndex=0;
    this.size=GlobalConstants.size;
    this.isLoading=true;
    this.lifeCycleDataService.getLifeCycleInfo(this.pageIndex,this.size).subscribe((data: any) => {
      this.dataSource = data.data.content;
      if (this.dataSource) {
        this.lifeCycleInfoDataLength = this.dataSource.length;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded=true;
        this.toolbarService.setTableData(this.dataSource)
    }
    window.scrollTo(0,0);
    this.isLoading=false;
    })
    // this.dataSource=this.toolbarService.getData();
    // if(this.dataSource){
    // this.copiedData = JSON.stringify(this.dataSource);
    // this.tableData = new MatTableDataSource(this.dataSource);
    // this.tableData.paginator = this.paginator;
    //  this.tableData.sort = this.sort;
    // }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.tableData.filter = filterValue;
    // this.tableData = new MatTableDataSource(this.tableData);
    // this.tableData.paginator = this.paginator;
    // this.tableData.sort = this.sort;
  }
  // public applyFilter1 = (search:any) => {
  //  // console.log(event.target.)
  //  console.log(search)
  //   this.dataSource.filter = search.trim().toLowerCase();
  //   console.log(this.dataSource)
  // }
  processdata:any;
  filterFieldError=false;
  filterValueError=false;
  applyFilterByColumn(){
    this.filterFieldError=false
    this.filterValueError=false;
    if(this.filterObject.field==''|| this.filterObject.field==null || this.filterObject.field==undefined ||this.filterObject.field=='SELECT'){
     
      this.filterFieldError=true;
      return;
    }
    if(this.filterObject.value==''|| this.filterObject.value==null || this.filterObject.value==undefined){
    
      this.filterValueError=true;
      return;
    }

    let field=this.filterObject.field;
    let value=this.filterObject.value;  
    
   this.tableData.filterPredicate= (data:any, filter: string) => {
      const textToSearch = data[field] && data[field].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    }
    this.tableData.filter = value.trim().toLowerCase();
  }
  
  onClearFilter(){
    this.tableData.filter = '';
    this.filterObject.field='SELECT';
    this.filterObject.value='';
    this.filterFieldError=false
    this.filterValueError=false;

  }
 
  ngAfterViewInit() {
    this.onSearch();
    window.scrollTo(0,0);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    
  }
  //copyToClipboard:any;
  copyData() {
    var dataArray = "";
    let tableData:any;
    tableData=this.dataSource
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


    onPrint() {
      // do other stuff...
      window.print();
    }
    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

    moduleHomePage(){
      this.route.navigate(['./module-home-page'])
    }
    //print

    //download pdf
    totalRow:any;

    downloadPdf() {
      let header: string[] = ['S No.', 'User Id', 'Life Cycle Code', 'LC Role','Stage','Module Code','Module Name'];
      this.totalRow=this.lifeCycleInfoDataLength;
      var img = new Image();
      img.src = 'assets/logo1.png'
      let doc = new jsPDF('p', 'mm', 'A4')
      let col: any = [];
      col = [header];
      let rows: any = [];
  
      this.dataSource.forEach((element: {
        'sNo':any
        'userid': any;
        'lcnum':any;
        'lcrole':any;
        'stage':any;
        'uc0001':any;
        'ff0001':any;


      }) => {
        var temp = [
          element['sNo'],
          element['userid'],
          element['lcnum'],
          element['lcrole'],
          element['stage'],
          element['uc0001'],
          element['ff0001']
  
        ];
        rows.push(temp);
      });
      doc.setFillColor(255, 128,0);
      doc.rect(5, 24, 200, 8, "F");
      doc.setFontSize(14); 
      doc.text("User Right & Life Cycle data (" + this.totalRow + ")", 66, 30);
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
      let fileName='lifeCycle';
      doc.save(fileName + '.pdf');
    }
    downloadExcel(){
    let excelData:any;
    let arrExcel=[];
    excelData=JSON.parse(JSON.stringify(this.dataSource))
   for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "User Id":excelData[i].userid,  
      "Life Cycle Code":excelData[i].lcnum,
      "LC Role":excelData[i].lcrole,
      "Stage":excelData[i].stage,
      "Module Code":excelData[i].uc0001,
      "Module Name":excelData[i].ff0001,
    })
  }
    exportData(arrExcel,'role','lifeCycle','excel')
    }
    downloadTxt(){
    let excelData:any;
    let arrExcel=[];
    excelData=JSON.parse(JSON.stringify(this.dataSource))
   for(var i=0, len=excelData.length; i<len; i++){
    arrExcel.push({
      "User Id":excelData[i].userid,  
      "Life Cycle Code":excelData[i].lcnum,
      "LC Role":excelData[i].lcrole,
      "Stage":excelData[i].stage,
      "Module Code":excelData[i].uc0001,
      "Module Name":excelData[i].ff0001,
    })
  }
    exportData(arrExcel,'role','lifeCycle','txt')
    }

    downloadCsvFile() {
      let excelData:any;
      let arrExcel=[];
      excelData=JSON.parse(JSON.stringify(this.dataSource))
     for(var i=0, len=excelData.length; i<len; i++){
      arrExcel.push({
        "User Id":excelData[i].userid,  
        "Life Cycle Code":excelData[i].lcnum,
        "LC Role":excelData[i].lcrole,
        "Stage":excelData[i].stage,
        "Module Code":excelData[i].uc0001,
        "Module Name":excelData[i].ff0001,
      })
    }
      exportData(arrExcel,'role','lifeCycle','csv')
  }




    //Redirect To Home Page
    handleKeyPress(val:any){
     
    }
    cureentSelectedRow:any;
    selectedUserId:any;
    selectedModuleName:any;
    selectedLifecycleCode:any;
    onSelectRow(val:any){
      this.cureentSelectedRow=this.selection.selected;
      if(this.cureentSelectedRow.length==1){
          this.selectedUserId=this.cureentSelectedRow[0].userid;
          this.selectedLifecycleCode=this.cureentSelectedRow[0].lcrole;
          this.selectedModuleName=this.cureentSelectedRow[0].stage;
      }else if(this.cureentSelectedRow.length>1){
        let arrayLength=this.cureentSelectedRow.length-1;
        this.selectedUserId=this.cureentSelectedRow[arrayLength].userid;
          this.selectedLifecycleCode=this.cureentSelectedRow[arrayLength].lcrole;
          this.selectedModuleName=this.cureentSelectedRow[arrayLength].stage;
      }else{
        this.dialog.open(MessageDialogComponent, {
          width:"400px",
          data: { 'message': "Please select any row", 'heading': "Error Information" }
        });
        return;
      }
      let body={
        userid:'',
        lcrole:'',
        stage:''
      }
      body.userid=this.selectedUserId;
      body.lcrole=this.selectedLifecycleCode;
      body.stage=this.selectedModuleName;
      this.selection.clear();
      this.lifeCycleDataService.getModuleName(body).subscribe((data: any) => {
        this.cookieService.set('subMenuFlag','true');
        this.cookieService.set('menuHeader',data[0].stage);
        this.cookieService.set('subMenu1',data[0].links)
        this.route.navigate(['./module-home-page'])
      })
    }

    selectedRow:any;
    setSelectedID(row:any){
      this.selectedRow=row;
     }
 onSubmit(val:any){
  if(this.selectedRow.length==0){
    this.dialog.open(MessageDialogComponent, {
      data: { 'message': 'Please select any row', 'heading': "Error Information" }
   })
    }else{
      let body={
        userId:'',
        lcnum:'',
       // lcrole:'',
       // ff0001:''
      }
      body.userId=this.selectedRow.userid;
      body.lcnum=this.selectedRow.lcnum;
     // body.lcrole=this.selectedRow.lcrole;
     // body.ff0001=this.selectedRow.ff0001;
      const selectedRowInterfaceData:selectedRowInterface={
        userId:this.selectedRow.userid,
        lifeCycleCode:this.selectedRow.lcnum,
        lcRole:this.selectedRow.lcrole,
        stage:this.selectedRow.stage,
        moduleName:this.selectedRow.uc0001,
        moduelCode:this.selectedRow.ff0001,
      }
      this.lifeCycleDataService.setSelectedRowData(selectedRowInterfaceData)
     // console.log(selectedRowInterfaceData)
      this.isLoading=true;
      this.lifeCycleDataService.getModuleName(body).subscribe((data: any) => {
        this.redirect(data)
        this.isLoading=false;
      })
    }
 }
 redirect(data:any){
  this.cookieService.set('subMenuFlag','true');
  this.cookieService.set('menuHeader',data[0].ff0001);
 // this.cookieService.set('subMenu1',data[0].lcrole)
 //let subMenuList=JSON.stringify(data)
 // this.cookieService.set('subMenu1',subMenuList)//
 console.log(data);
 let isfindSuccess=0;
 let obj={ff0001: "Sale Quotation",lcnum: "RQP1QTSDLCBBB1",lcrole: "SQT-Update",userId: this.selectedRow.userid}
 data.forEach((ele,index)=>{
  if(ele.lcrole=='SQT-Initiator' || ele.lcrole=='SQT-Reviewer'){
    ++isfindSuccess;
  }
 })
 if(isfindSuccess>0){
   data.push(obj)
 }
 
 //need to add DQ and fair object for update
 let isfindSuccessDQ=0;
 let dqObj={ff0001: "Draft Quatetion",lcnum: "RQP1DQWHLC0002",lcrole: "DQ-Update",stage:1,userId: this.selectedRow.userid}
 data.forEach((ele)=>{
  if(ele.lcrole=='DQ-Initator' || ele.lcrole=='DQ-Reviewer'){
    ++isfindSuccessDQ;
  }
 })
 if(isfindSuccessDQ>0){
  data.push(dqObj)
 }
 let isfindSuccessFQ=0;
 let fqObj={ff0001: "Fair Quatetion",lcnum: "RQP1FQWHLC0002",lcrole: "FQ-Update",stage:1,userId: this.selectedRow.userid}
 data.forEach((ele)=>{
  if(ele.lcrole=='FQ-Initator' || ele.lcrole=='FQ-Reviewer'){
    ++isfindSuccessFQ;
  }
 })
 if(isfindSuccessFQ>0){
  data.push(fqObj)
 }
 console.log(data)
  this.lifeCycleDataService.subMenuList=data
  // Module Value
  if (data[0].uc0001 == 'AD') {
    this.route.navigate(['./admin/master-data-management']);
  } else if (data[0].uc0001 == 'AD') {
    this.route.navigate(['./admin/master-data-management']);
  //}else if (data[0].ff0001 == 'Quatetion') {
  }else if (data[0].uc0001 == 'SQT') {
    this.lifeCycleDataService.allQtHomePageStageValue=this.selectedRow.stage,
       this.route.navigate(['./sd/rqp-sd-module']);
  // } else if (data[0].lcnum == 'RQP1NCIQALC0002') {
  //   this.route.navigate(['./rqp-sd-module']);
  // } else if (data[0].lcnum == 'RQP1QTSDLC0001') {
  //   this.route.navigate(['./rqp-sd-module']);
  // }else if (data[0].lcnum == 'RQP1QTPDLC0002' || data[0].lcnum == 'RQP1QTPDLC0003') {
  //   this.route.navigate(['./rqp-sd-module']);
  }else if(data[0].uc0001 == 'SD'){
    this.route.navigate(['./sd/sd-home-page']);
  
}else if(data[0].uc0001 == 'URS'){
    this.route.navigate(['./dms/dms-module-home-page']);
  }else if(data[0].uc0001 == 'DQ'){
    this.route.navigate(['./dms/dms-module-home-page']);
  }else if(data[0].uc0001 == 'FQ'){
    this.route.navigate(['./dms/dms-module-home-page']);
  }else if(data[0].uc0001 == 'LMS'){
    this.route.navigate(['./lms/lms-module-home-page']);
  }
  else if(data[0].uc0001 == 'QMS'){
    this.route.navigate(['./qms/qms-module-home-page']);
  }
  else if(data[0].uc0001 == 'CAPA'){
    this.route.navigate(['./qms/capa-home']);
  }
  else if(data[0].uc0001 == 'DEV'){
    this.route.navigate(['./qms/dev-home']);
  }
  else if(data[0].uc0001 == 'NCI'){
    this.route.navigate(['./qms/nci-home']);
  }
  else if(data[0].uc0001 == 'CC'){
    this.route.navigate(['./qms/cc-home']);
  }
  else if(data[0].uc0001 == 'MM'){
    this.route.navigate(['./mm/mm-module-home-page']);
  }
  else if(data[0].uc0001 == 'PDQ'){
    this.route.navigate(['./mm/dq-home']);
  }
  else if(data[0].uc0001 == 'PFQ'){
    this.route.navigate(['./mm/fq-home']);
  }
  else if(data[0].uc0001 == 'PPO'){
    this.route.navigate(['./mm/po-home']);
  }
  else if(data[0].uc0001 == 'PPT'){
    this.route.navigate(['./mm/po-home']);
  }
  else if(data[0].uc0001 == 'PQT'){
    this.route.navigate(['./mm/qt-home']);
  }
  else if(data[0].uc0001 == 'PSI'){
    this.route.navigate(['./mm/si-home']);
  }
  else if(data[0].uc0001 == 'PSO'){
    this.route.navigate(['./mm/so-home']);
  }
  else if(data[0].uc0001 == 'PDO'){
    this.route.navigate(['./mm/do-home']);
  }
   else {
    this.dialog.open(MessageDialogComponent, {
      data: {
        message: 'You dont have access for this module',
        heading: 'Error Information',
      },
    });
  }
  
 }

onSelect(row:any){
}

//Pagination
pageChanged(event){
  if(this.dataSource.length==GlobalConstants.size){
    if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
      this.onPaginationCall();
    }
  }
}
pageIndex=0;
newList:any;
onPaginationCall(){
  this.pageIndex=this.pageIndex+1;
  this.size=GlobalConstants.size;
  this.isLoading=true;
  this.lifeCycleDataService.getLifeCycleInfo(this.pageIndex,this.size).subscribe((data: any) => {
    this.newList = data.data.content;
    this.dataSource.push(...this.newList);
    this.lifeCycleInfoDataLength = this.dataSource.length;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded=true;
        this.toolbarService.setTableData(this.dataSource)
        this.isLoading=false;
  })
  this.isLoading=false;
}
  }