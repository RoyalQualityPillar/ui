import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,ViewChildren,QueryList  } from '@angular/core';
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
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { UserProfileCreateComponent } from '../user-profile-create/user-profile-create.component';
import { ReviewCommentsHistoryComponent } from '../review-comments-history/review-comments-history.component';
import { AdminService } from 'src/app/service/admin.service';
import { elements } from 'chart.js';
import {GlobalConstants} from '../../common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ActiveAuditTrailComponent } from '../active-audit-trail/active-audit-trail.component';

@Component({
  selector: 'app-user-profile-management',
  templateUrl: './user-profile-management.component.html',
  styleUrls: ['./user-profile-management.component.scss']
})
export class UserProfileManagementComponent implements OnInit ,AfterViewInit {
  selection = new SelectionModel<any>(true,[])
  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  displayedColumns: string[] = ['action','userId', 'employeeId','firstName', 'status','version','createdDate'];
  ActiveUserdisplayedColumns: string[] = ['action','userId', 'employeeId','firstName', 'status','version','createdDate'];

  dataSource: any;
  filterObject: any;
  activeUserFilterObject: any;
  selectedTab = 0;
  activeUserCurrentPageIndex = 0;
  activeUserDataSource: any;
  currentActiveUserApiResLength: any;
  activeUsertableData: MatTableDataSource<any>;
  activeUserTableLoded = false;
  lifeCycleInfoDataLength:any;
  tableDataLoaded:any;
  copiedData:any;
  initinalData:any
  isLoading=false;
  currentApiResLength:any;
  pageIndex:any;
  size:any;
  tableData:MatTableDataSource<any>;
   constructor(private _liveAnnouncer: LiveAnnouncer,
               private route: Router,
               private router: ActivatedRoute,
               public toolbarService:ToolbarService,
               public lifeCycleDataService:LifeCycleDataService,
               public cookieService:CookieService,
               public dialog: MatDialog,
               private adminService:AdminService,
               private datepipe:DatePipe){        
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
  ngAfterViewInit() {
    this.onSearch();
    this.OnActiveUserSearch();
  }
 
  onSearch(){
  this.isLoading=true;
  this.size=GlobalConstants.size;
  this.dataSource=null;
 this.pageIndex=0;
  this.adminService.getUserProfileList(this.size,this.pageIndex,this.selectedTab).subscribe((data: any) => {
    console.log(data)
    console.log(data.data.content)
    this.dataSource=data.data.content;
    this.currentApiResLength=data.data.content.length;
    this.lifeCycleInfoDataLength = this.dataSource.length;
        this.copiedData = JSON.stringify(this.dataSource);
      this.tableData = new MatTableDataSource(this.dataSource);
      this.tableData.paginator = this.paginator.toArray()[0];
      this.tableData.sort = this.sort.toArray()[0];
      this.isLoading=false;
      this.tableDataLoaded=true;
  })
  }
  checkStatus(status){
    if(status=='1001'){
      return 'Enabled'
    }else if(status=='1003'){
      return 'Disabled'
    }else if(status='1004'){
      return 'Locked'
    }else{
      return ''
    }
  }
  copyData() {
    var dataArray = "";
    let tableData:any;
    let exportData:any
    tableData=this.tableData.filteredData;
    for(let i=0;i<tableData.length;i++){
      delete tableData[i].action;
      delete tableData[i].altEmail;
      delete tableData[i].altMobile
      delete tableData[i].branchId
      delete tableData[i].branchName
      delete tableData[i].dob
      delete tableData[i].department
      delete tableData[i].designation
      delete tableData[i].email
      delete tableData[i].effectiveDate;
      delete tableData[i].gender
      delete tableData[i].levelOneManager
      delete tableData[i].lastName
      delete tableData[i].levelOneManager
      delete tableData[i].levelTwoManager
      delete tableData[i].lifecyclecode
      delete tableData[i].mobile
      delete tableData[i].userStatus
      delete tableData[i].joinedDate
      delete tableData[i].urpcomments
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
 //download pdf
 totalRow:any;

 downloadPdf() {
   let header: string[] = ['User Id.', 'Employee Id', 'Name', 'Unit Type','Status','Modification No'];
   this.totalRow=this.lifeCycleInfoDataLength;
   var img = new Image();
   img.src = 'assets/logo1.png'
   let doc = new jsPDF('p', 'mm', 'A4')
   let col: any = [];
   col = [header];
   let rows: any = [];
   this.dataSource=this.tableData.filteredData
   this.dataSource.forEach((element: {
     'userId': any;
     'employeeId':any;
     'firstName':any;
     'status':any;
     'version':any;
     'createdDate':any;


   }) => {
     var temp = [
       element['userId'],
       element['employeeId'],
       element['firstName'],
       element['status'],
       element['version'],
       element['createdDate']

     ];
     rows.push(temp);
   });
   doc.setFillColor(255, 128,0);
   doc.rect(5, 24, 200, 8, "F");
   doc.setFontSize(14); 
   doc.text("User Profile Information", 66, 30);
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
   let fileName='user-list';
   doc.save(fileName + '.pdf');
 }
 downloadExcel(){
   let exportData:any
   exportData=JSON.parse(JSON.stringify(this.tableData.filteredData))
   for(let i=0;i<exportData.length;i++){
     delete exportData[i].action;
     delete exportData[i].altEmail;
     delete exportData[i].altMobile
     delete exportData[i].branchId
     delete exportData[i].branchName
     delete exportData[i].dob
     delete exportData[i].department
     delete exportData[i].designation
     delete exportData[i].email
     delete exportData[i].effectiveDate;
     delete exportData[i].gender
     delete exportData[i].levelOneManager
     delete exportData[i].lastName
     delete exportData[i].levelOneManager
     delete exportData[i].levelTwoManager
     delete exportData[i].lifecyclecode
     delete exportData[i].mobile
     delete exportData[i].userStatus
     delete exportData[i].joinedDate
     delete exportData[i].urpcomments
   }
 const fileName = "user-list.xlsx";
 const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
 const wb: XLSX.WorkBook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, fileName);
 XLSX.writeFile(wb, fileName);
 }
 downloadData:any;
 downloadTxt(){
  //this.downloadData = JSON.stringify(this.tableData);
   let exportDataForTxt:any
  //  console.log(this.dataSource);
  //  console.log(this.tableData)
   exportDataForTxt=JSON.parse(JSON.stringify(this.tableData.filteredData))
   //console.log(newData)
  // exportDataForTxt=JSON.parse(JSON.stringify(this.dataSource))
   for(let i=0;i<exportDataForTxt.length;i++){
     delete exportDataForTxt[i].action;
     delete exportDataForTxt[i].altEmail;
     delete exportDataForTxt[i].altMobile
     delete exportDataForTxt[i].branchId
     delete exportDataForTxt[i].branchName
     delete exportDataForTxt[i].dob
     delete exportDataForTxt[i].department
     delete exportDataForTxt[i].designation
     delete exportDataForTxt[i].email
     delete exportDataForTxt[i].effectiveDate;
     delete exportDataForTxt[i].gender
     delete exportDataForTxt[i].levelOneManager
     delete exportDataForTxt[i].lastName
     delete exportDataForTxt[i].levelOneManager
     delete exportDataForTxt[i].levelTwoManager
     delete exportDataForTxt[i].lifecyclecode
     delete exportDataForTxt[i].mobile
     delete exportDataForTxt[i].userStatus
     delete exportDataForTxt[i].joinedDate
     delete exportDataForTxt[i].urpcomments

   }
 const fileName = "user-list.txt";
 const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportDataForTxt);
 const wb: XLSX.WorkBook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, fileName);
 XLSX.writeFile(wb, fileName,{bookType:'txt'});
 }

 downloadCsvFile() {
   let exportDataForCsv:any
   exportDataForCsv=JSON.parse(JSON.stringify(this.tableData.filteredData))
   for(let i=0;i<exportDataForCsv.length;i++){
     delete exportDataForCsv[i].action;
     delete exportDataForCsv[i].altEmail;
     delete exportDataForCsv[i].altMobile
     delete exportDataForCsv[i].branchId
     delete exportDataForCsv[i].branchName
     delete exportDataForCsv[i].dob
     delete exportDataForCsv[i].department
     delete exportDataForCsv[i].designation
     delete exportDataForCsv[i].email
     delete exportDataForCsv[i].effectiveDate;
     delete exportDataForCsv[i].gender
     delete exportDataForCsv[i].levelOneManager
     delete exportDataForCsv[i].lastName
     delete exportDataForCsv[i].levelOneManager
     delete exportDataForCsv[i].levelTwoManager
     delete exportDataForCsv[i].lifecyclecode
     delete exportDataForCsv[i].mobile
     delete exportDataForCsv[i].userStatus
     delete exportDataForCsv[i].joinedDate
     delete exportDataForCsv[i].urpcomments
   }
   const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
   const header = Object.keys(exportDataForCsv[0]);
   let csv = exportDataForCsv.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
   csv.unshift(header.join(','));
   let csvArray = csv.join('\r\n');

   var blob = new Blob([csvArray], {type: 'text/csv' })
   saveAs(blob, "user-list.csv");
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
    selectedRowData:any;
    onSelectRow(val:any){
      this.cureentSelectedRow=this.selection.selected;
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
      }
     console.log(this.selectedRowData)
     const dialogRef = this.dialog.open(UserProfileCreateComponent, {
      minWidth: "80%",
      data: {userData:this.selectedRowData,type:'Update',tableData:this.copiedData},
      disableClose: true,
    });
    
    }
    onReviewUserData(){
      this.cureentSelectedRow=this.selection.selected;
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
        this.dialog.open(MessageDialogComponent, {
          width:"400px",
          data: { 'message': "Please select any row", 'heading': "Error Information" }
        });
        return
      }
     console.log(this.copiedData)
     let activeUserTableData=JSON.parse(JSON.stringify(this.copiedData))
   activeUserTableData=JSON.parse(activeUserTableData)
     const dialogRef = this.dialog.open(ReviewCommentsHistoryComponent, {
      minWidth: "80%",
      data: {userData:this.selectedRowData,type:'AuditTrail',tableData:activeUserTableData},
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(dialogResult => {
     // this.result = dialogResult;
    });
    }

onSelect(row:any){
  console.log(row);
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
    if(this.filterObject.field !='createdDate'){
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
  if(this.filterObject.field =='createdDate'){
    filetrDataBody.value1=moment(this.filterObject.DateFieldvalue1).format('DD-MM-YYYY HH:mm:ss.SSS');
    filetrDataBody.value2=moment(this.filterObject.DateFieldvalue2).format('DD-MM-YYYY HH:mm:ss.SSS');
    filetrDataBody.condition='between';
  }
  this.isLoading=true;
  this.adminService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
    console.log(data)
    if(data.data){
    this.dataSource=data.data;
    this.currentApiResLength=data.data.length;
    this.lifeCycleInfoDataLength = this.dataSource.length;
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
    if(this.activeUserFilterObject.field !='createdDate'){
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
  if(this.activeUserFilterObject.field =='createdDate'){
    filetrDataBody.value1=moment(this.activeUserFilterObject.DateFieldvalue1).format('DD-MM-YYYY HH:mm:ss.SSS');
    filetrDataBody.value2=moment(this.activeUserFilterObject.DateFieldvalue2).format('DD-MM-YYYY HH:mm:ss.SSS');
    filetrDataBody.condition='between';
  }
  this.isLoading=true;
  this.adminService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
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
//  this.activeUsertableData.filterPredicate= (data:any, filter: string) => {
//     const textToSearch = data[field] && data[field].toLowerCase() || '';
//     return textToSearch.indexOf(filter) !== -1;
//   }
//   this.activeUsertableData.filter = value.trim().toLowerCase();
}
onClearFilter(){
  this.tableData.filter = '';
  this.filterObject.field='SELECT';
  this.filterObject.value='';
  this.filterObject.condition='equals'
  this.filterFieldError=false
  this.filterValueError=false;
  this.onSearch();

}
onAcctiveUserClearFilter(){
  this.activeUsertableData.filter = '';
  this.activeUserFilterObject.field='SELECT';
  this.activeUserFilterObject.value='';
  this.activeUserFilterObject.condition='equals'
  this.activeUserFilterFieldError=false
  this.activeUserFilterValueError=false;
  this.OnActiveUserSearch();

}
addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  this.activeUserFilterObject.DateFieldvalue1 =this.datepipe.transform(event.value, 'dd-MMM-YYYY');
}
onChangeEvent(event: any){

  console.log(event.target.value);
  if(event.target.value instanceof Date){
    this.activeUserFilterObject.DateFieldvalue1 =this.datepipe.transform(event.value, 'dd-MMM-YYYY');
  }else{
    this.activeUserFilterObject.DateFieldvalue1=event.target.value;
    }

  }
onChangeSelctedField(){
  console.log('testing')
  if(this.filterObject.field!='createdDate'){
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
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  console.log(filterValue)
  this.tableData.filter = filterValue;
  console.log(this.tableData)
  console.log(this.tableData)
}
onOpenUserProfilePOPUP(){
  const dialogRef = this.dialog.open(UserProfileCreateComponent, {
    minWidth: "80%",
    data:{userData:this.selectedRowData,type:'Create'},
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
   // this.result = dialogResult;
  });
}
onReview(){
  const dialogRef = this.dialog.open(ReviewCommentsHistoryComponent, {
    minWidth: "80%",
    //data: userData:this.selectedRowData,currentTableData:this.
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
   // this.result = dialogResult;
  });
}


//Pagination
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
  console.log('calling')
  //this.dataSource.push(...this.getNewList);
  //add dataSorce,pagination, sort
  this.pageIndex=this.pageIndex+1;
  this.size=GlobalConstants.size;
  this.isLoading=true;
  this.adminService.getUserProfileList(this.size,this.pageIndex,this.selectedTab).subscribe((data: any) => {
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
//Tab Selection
tabChanged(tabChangeEvent:any) {
  console.log('index => ', tabChangeEvent.index);
  this.selectedTab=tabChangeEvent.index;
  
  if(this.selectedTab==0){
    this.onSearch();
  }else if(this.selectedTab==1){
    this.OnActiveUserSearch();
  }
};


// OnSelectRow(row:any){
//   console.log(row)
//}

activeUserCopiedData:any;
OnActiveUserSearch(){
    console.log('active working')
  this.isLoading=true;
  this.size=GlobalConstants.size;
 // this.activeUserDataSource=null;
 this.activeUserCurrentPageIndex=0;
 console.log(this.size+"current page"+this.activeUserCurrentPageIndex)
  this.adminService.getActiveUserList(this.size,this.activeUserCurrentPageIndex).subscribe((data: any) => {

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
  onActiveUserTablePagination(){
    console.log('calling')
    this.pageIndex=this.pageIndex+1;
    this.isLoading=true;
    this.adminService.getActiveUserList(this.size,this.pageIndex).subscribe((data: any) => {
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
  activeUSerPageChanged(event){
    if(this.currentActiveUserApiResLength==GlobalConstants.size){
      if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
        this.onActiveUserTablePagination();
      }
    }
  }

  //Filter Part for Active User
  activeUserApplyFilter(filterValue: string) {
    console.log(filterValue)
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.activeUsertableData.filter = filterValue;
  }

  //Export Data for active user
  activeUserDownloadTxt(){
   let exportDataForTxt:any
    exportDataForTxt=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
    for(let i=0;i<exportDataForTxt.length;i++){
      delete exportDataForTxt[i].action;
      delete exportDataForTxt[i].altEmail;
      delete exportDataForTxt[i].altMobile
      delete exportDataForTxt[i].branchId
      delete exportDataForTxt[i].branchName
      delete exportDataForTxt[i].dob
      delete exportDataForTxt[i].department
      delete exportDataForTxt[i].designation
      delete exportDataForTxt[i].email
      delete exportDataForTxt[i].effectiveDate;
      delete exportDataForTxt[i].gender
      delete exportDataForTxt[i].levelOneManager
      delete exportDataForTxt[i].lastName
      delete exportDataForTxt[i].levelOneManager
      delete exportDataForTxt[i].levelTwoManager
      delete exportDataForTxt[i].lifecyclecode
      delete exportDataForTxt[i].mobile
      delete exportDataForTxt[i].userStatus
      delete exportDataForTxt[i].joinedDate
      delete exportDataForTxt[i].urpcomments
 
    }
  const fileName = "active-user-list.txt";
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportDataForTxt);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, fileName);
  XLSX.writeFile(wb, fileName,{bookType:'txt'});
  }
  activeUserDownloadCsvFile(){
    let exportDataForCsv:any
   exportDataForCsv=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
   for(let i=0;i<exportDataForCsv.length;i++){
     delete exportDataForCsv[i].action;
     delete exportDataForCsv[i].altEmail;
     delete exportDataForCsv[i].altMobile
     delete exportDataForCsv[i].branchId
     delete exportDataForCsv[i].branchName
     delete exportDataForCsv[i].dob
     delete exportDataForCsv[i].department
     delete exportDataForCsv[i].designation
     delete exportDataForCsv[i].email
     delete exportDataForCsv[i].effectiveDate;
     delete exportDataForCsv[i].gender
     delete exportDataForCsv[i].levelOneManager
     delete exportDataForCsv[i].lastName
     delete exportDataForCsv[i].levelOneManager
     delete exportDataForCsv[i].levelTwoManager
     delete exportDataForCsv[i].lifecyclecode
     delete exportDataForCsv[i].mobile
     delete exportDataForCsv[i].userStatus
     delete exportDataForCsv[i].joinedDate
     delete exportDataForCsv[i].urpcomments
   }
   const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
   const header = Object.keys(exportDataForCsv[0]);
   let csv = exportDataForCsv.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
   csv.unshift(header.join(','));
   let csvArray = csv.join('\r\n');

   var blob = new Blob([csvArray], {type: 'text/csv' })
   saveAs(blob, "active-user-list.csv");
  }
  activeUserDownloadPdf(){
    let header: string[] = ['User Id.', 'Employee Id', 'Name', 'Unit Type','Status','Modification No'];
   this.totalRow=this.lifeCycleInfoDataLength;
   var img = new Image();
   img.src = 'assets/logo1.png'
   let doc = new jsPDF('p', 'mm', 'A4')
   let col: any = [];
   col = [header];
   let rows: any = [];
   this.activeUserDataSource=this.activeUsertableData.filteredData
   this.activeUserDataSource.forEach((element: {
     'userId': any;
     'employeeId':any;
     'firstName':any;
     'status':any;
     'version':any;
     'createdDate':any;


   }) => {
     var temp = [
       element['userId'],
       element['employeeId'],
       element['firstName'],
       element['status'],
       element['version'],
       element['createdDate'],

     ];
     rows.push(temp);
   });
   doc.setFillColor(255, 128,0);
   doc.rect(5, 24, 200, 8, "F");
   doc.setFontSize(14); 
   doc.text("User Profile Information", 66, 30);
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
   let fileName='active-user-list';
   doc.save(fileName + '.pdf');
  }
  activeUserDownloadExcel(){
    let exportDataForCsv:any
   exportDataForCsv=JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
   for(let i=0;i<exportDataForCsv.length;i++){
     delete exportDataForCsv[i].action;
     delete exportDataForCsv[i].altEmail;
     delete exportDataForCsv[i].altMobile
     delete exportDataForCsv[i].branchId
     delete exportDataForCsv[i].branchName
     delete exportDataForCsv[i].dob
     delete exportDataForCsv[i].department
     delete exportDataForCsv[i].designation
     delete exportDataForCsv[i].email
     delete exportDataForCsv[i].effectiveDate;
     delete exportDataForCsv[i].gender
     delete exportDataForCsv[i].levelOneManager
     delete exportDataForCsv[i].lastName
     delete exportDataForCsv[i].levelOneManager
     delete exportDataForCsv[i].levelTwoManager
     delete exportDataForCsv[i].lifecyclecode
     delete exportDataForCsv[i].mobile
     delete exportDataForCsv[i].userStatus
     delete exportDataForCsv[i].joinedDate
     delete exportDataForCsv[i].urpcomments
   }
   const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
   const header = Object.keys(exportDataForCsv[0]);
   let csv = exportDataForCsv.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
   csv.unshift(header.join(','));
   let csvArray = csv.join('\r\n');

   var blob = new Blob([csvArray], {type: 'text/csv' })
   saveAs(blob, "active-user-list.csv");
  }
  activeUserCopyData(){
    var dataArray = "";
    let tableData:any;
    let exportData:any
    tableData=this.activeUsertableData.filteredData;
    for(let i=0;i<tableData.length;i++){
      delete tableData[i].action;
      delete tableData[i].altEmail;
      delete tableData[i].altMobile
      delete tableData[i].branchId
      delete tableData[i].branchName
      delete tableData[i].dob
      delete tableData[i].department
      delete tableData[i].designation
      delete tableData[i].email
      delete tableData[i].effectiveDate;
      delete tableData[i].gender
      delete tableData[i].levelOneManager
      delete tableData[i].lastName
      delete tableData[i].levelOneManager
      delete tableData[i].levelTwoManager
      delete tableData[i].lifecyclecode
      delete tableData[i].mobile
      delete tableData[i].userStatus
      delete tableData[i].joinedDate
      delete tableData[i].urpcomments
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
  
  //update User
  activeUserSelectedRowData:any;
  onActiveUserSelectRow(val:any){
   let currentSelectedRow=this.selection.selected;
   if(currentSelectedRow.length==1){
    this.activeUserSelectedRowData=currentSelectedRow[0];
   }
   else if(currentSelectedRow.length>1){
    //this.activeUserSelectedRowData=currentSelectedRow[0];
    let arrayLength=currentSelectedRow.length-1;
    this.activeUserSelectedRowData=currentSelectedRow[arrayLength]
   }else{
    this.dialog.open(MessageDialogComponent, {
      width:"400px",
      data: { 'message': "Please select any row", 'heading': "Error Information" }
    });
    return;
   }
   let activeUserTableData=JSON.parse(JSON.stringify(this.activeUserCopiedData))
   activeUserTableData=JSON.parse(activeUserTableData)
   const dialogRef=this.dialog.open(UserProfileCreateComponent,{
    minWidth:"80%",
    data:{userData:this.activeUserSelectedRowData,type:'active_User_Update',tableData:activeUserTableData}
   })

  }
  //Review Page for active user
  onActiveUserReviewUserData(){
    let currentSelectedRow=this.selection.selected;
    if(currentSelectedRow.length==1){
     this.activeUserSelectedRowData=currentSelectedRow[0];
    }
    else if(currentSelectedRow.length>1){
     //this.activeUserSelectedRowData=currentSelectedRow[0];
     let arrayLength=currentSelectedRow.length-1;
     this.activeUserSelectedRowData=currentSelectedRow[arrayLength]
    }else{
      this.dialog.open(MessageDialogComponent, {
        width:"400px",
        data: { 'message': "Please select any row", 'heading': "Error Information" }
      });
      return;
    }
    let activeUserTableData=JSON.parse(JSON.stringify(this.activeUserCopiedData))
    activeUserTableData=JSON.parse(activeUserTableData);
    const dialogRef=this.dialog.open(ActiveAuditTrailComponent,{
      minWidth:"80%",
      data:{userData:this.activeUserSelectedRowData,type:'active_User_AuditTrail',tableData:activeUserTableData}
    })
  }
}

