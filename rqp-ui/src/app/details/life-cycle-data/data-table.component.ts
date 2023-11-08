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

  displayedColumns: string[] = ['sNo','action', 'userid','lcnum', 'lcrole','stage','uc0001','ff0001'];
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
        console.log(this.lifeCycleInfoDataLength)
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
    console.log(filterValue)
    this.tableData.filter = filterValue;
    console.log(this.tableData)
    // this.tableData = new MatTableDataSource(this.tableData);
    // this.tableData.paginator = this.paginator;
    // this.tableData.sort = this.sort;
    console.log(this.tableData)
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
      console.log('test1')
      this.filterFieldError=true;
      return;
    }
    if(this.filterObject.value==''|| this.filterObject.value==null || this.filterObject.value==undefined){
      console.log('test2')
      this.filterValueError=true;
      return;
    }

    let field=this.filterObject.field;
    let value=this.filterObject.value;  
    console.log('field = '+field+' value = '+value);
    
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
   // console.log(tableData)
    // console.log(this.copiedData)
    tableData.forEach(row => {
      // console.log(row)
      // console.log("before: ", dataArray);
      dataArray += this.ObjectToArray(row)
      // console.log("after: ", dataArray);
    })
  
    return dataArray;
  }
  
    ObjectToArray(obj: any): string {
      let result = Object.keys(obj).map((key: keyof typeof obj) => {
        let value = obj[key];
        // console.log(value)
        return value;
      });
     // console.log(result.toString())
      return result.toString() + "\n";
    }


    onPrint() {
      // do other stuff...
      window.print();
    }
    announceSortChange(sortState: Sort) {
      console.log('working')
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
      console.log('bharat')
      console.log(val);
      console.log(this.selection.selected)
     
    }
    cureentSelectedRow:any;
    selectedUserId:any;
    selectedModuleName:any;
    selectedLifecycleCode:any;
    onSelectRow(val:any){
      console.log(val);
      console.log(this.selection.selected)
      this.cureentSelectedRow=this.selection.selected;
      if(this.cureentSelectedRow.length==1){
        console.log(this.cureentSelectedRow[0].userid)
          console.log(' one')
          this.selectedUserId=this.cureentSelectedRow[0].userid;
          console.log(this.selectedUserId)
          this.selectedLifecycleCode=this.cureentSelectedRow[0].lcrole;
          this.selectedModuleName=this.cureentSelectedRow[0].stage;
      }else if(this.cureentSelectedRow.length>1){
        console.log('more than one')
        let arrayLength=this.cureentSelectedRow.length-1;
        console.log(arrayLength)
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
      console.log(this.selectedUserId)
      body.userid=this.selectedUserId;
      body.lcrole=this.selectedLifecycleCode;
      body.stage=this.selectedModuleName;
      console.log(body);
      this.selection.clear();
      this.lifeCycleDataService.getModuleName(body).subscribe((data: any) => {
        console.log(data);
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
        lcrole:'',
        ff0001:''
      }
      console.log(this.selectedRow)
      body.userId=this.selectedRow.userid;
      body.lcnum=this.selectedRow.lcnum;
      body.lcrole=this.selectedRow.lcrole;
      body.ff0001=this.selectedRow.ff0001;
      this.isLoading=true;
      this.lifeCycleDataService.getModuleName(body).subscribe((data: any) => {
        console.log(data);
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
  this.lifeCycleDataService.subMenuList=data
  // Module Value
  console.log(data[0].ff0001)
  console.log(data[0].uc0001)
  if(data[0].lcnum=='RQP1ADQALC0001'){
   // this.route.navigate(['./module-home-page'])
   this.route.navigate(['./master-data-management'])
  }else if(data[0].lcnum=='RQP1NCIQALC0002'){
    this.route.navigate(['./rqp-sd-module'])
  }else if(data[0].lcnum=='RQP1QTSDLC0001'){
    this.route.navigate(['./rqp-sd-module'])
  }
  else{
    this.dialog.open(MessageDialogComponent, {
      data: { 'message': 'You dont have access for this module', 'heading': "Error Information" }
   }) 
  }
  
 }

onSelect(row:any){
  console.log(row);
}

//Pagination
pageChanged(event){
  console.log(event)
  if(this.dataSource.length==GlobalConstants.size){
    console.log('page length'+event.length);
    console.log('page index'+event.pageIndex);
    console.log('page size'+event.pageSize);
    console.log('previous page'+event.previousPageIndex);
    //24-((2+1)*(10))
    if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
      this.onPaginationCall();
    }
  }
}
pageIndex=0;
newList:any;
onPaginationCall(){
  console.log('calling');
  this.pageIndex=this.pageIndex+1;
  this.size=GlobalConstants.size;
  this.isLoading=true;
  this.lifeCycleDataService.getLifeCycleInfo(this.pageIndex,this.size).subscribe((data: any) => {
    this.newList = data.data.content;
    this.dataSource.push(...this.newList);
    this.lifeCycleInfoDataLength = this.dataSource.length;
        console.log(this.lifeCycleInfoDataLength)
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded=true;
        this.toolbarService.setTableData(this.dataSource)


  })
}
  }




