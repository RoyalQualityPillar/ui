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
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { UserProfileCreateComponent } from '../user-profile-create/user-profile-create.component';
import { ReviewCommentsHistoryComponent } from '../review-comments-history/review-comments-history.component';
import { AdminService } from 'src/app/service/admin.service';
import { elements } from 'chart.js';

@Component({
  selector: 'app-user-profile-management',
  templateUrl: './user-profile-management.component.html',
  styleUrls: ['./user-profile-management.component.scss']
})
export class UserProfileManagementComponent implements OnInit ,AfterViewInit {
  selection = new SelectionModel<any>(true,[])
  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;
  displayedColumns: string[] = ['action','sNo','branchName', 'branchId','department', 'status','version','auditTrail'];

  dataSource:any;
  filterObject:any;
 
   constructor(private _liveAnnouncer: LiveAnnouncer,
               private route: Router,
               private router: ActivatedRoute,
               public toolbarService:ToolbarService,
               public lifeCycleDataService:LifeCycleDataService,
               public cookieService:CookieService,
               public dialog: MatDialog,
               private adminService:AdminService){

   }
   tableData:MatTableDataSource<any>;
  ngOnInit(): void {
    this.filterObject = {
      "field": "SELECT",
      "value": "",
      "condition":"SELECT"
    }
  }
  ngAfterViewInit() {
    this.onSearch();
    
  }
  lifeCycleInfoDataLength:any;
  tableDataLoaded:any;
  copiedData:any;
  initinalData:any
  isLoading=false;
  onSearch(){
  //fetch Table Data
  this.isLoading=true;
  this.adminService.getUserProfileList().subscribe((data: any) => {
    // this.dataSource =JSON.stringify(data);
    // this.dataSource=JSON.parse(this.dataSource)
    this.initinalData=data.data;
   // console.log(this.dataSource);
    let finalList=[];
    let i=0;
    this.initinalData.forEach(element =>{
     let newDataList={
        'sNo':++i,
        'employeeId':element.id.employeeId,
        'userId':element.id.userId,
        'version':element.id.version,

        'altEmail':element.altEmail,
        'altMobile':element.altMobile,
        'branchId':element.branchId,
        'branchName':element.branchName,
        'dob':element.dob,
        'department':element.department,
        'designation':element.designation,
        'email':element.email,
        'effectiveDate':element.effectiveDate,
        'firstName':element.firstName,
        'gender':element.gender,
        'lastName':element.lastName,
        'levelOneManager':element.levelOneManager,
        'levelTwoManager':element.levelTwoManager,
        'lifecyclecode':element.lifecyclecode,
        'mobile':element.mobile,
        'userStatus':element.userStatus,
        'status':element.status,
        'createdDate':element.createdDate,
        'joinedDate':element.joinedDate,
        'urpcomments':element.urpcomments,
      }
      finalList.push(newDataList)
    })
    console.log(finalList)
    this.dataSource=finalList;
    this.lifeCycleInfoDataLength = this.dataSource.length;
         this.copiedData = JSON.stringify(this.dataSource);
      this.tableData = new MatTableDataSource(this.dataSource);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
      this.isLoading=false;
  //   if (this.dataSource) {
  //     this.lifeCycleInfoDataLength = this.dataSource.length;
  //     console.log(this.lifeCycleInfoDataLength)
  //     this.copiedData = JSON.stringify(this.dataSource);
  //     this.tableData = new MatTableDataSource(this.dataSource);
  //     this.tableData.paginator = this.paginator;
  //     this.tableData.sort = this.sort;
      this.tableDataLoaded=true;
  //     this.toolbarService.setTableData(this.dataSource)
  // }
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
    tableData=this.dataSource;
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
   let header: string[] = ['S No.', 'Businesss Unit Name', 'Business Unit Code', 'Unit Type','Status','Modification No'];
   this.totalRow=this.lifeCycleInfoDataLength;
   var img = new Image();
   img.src = 'assets/logo1.png'
   let doc = new jsPDF('p', 'mm', 'A4')
   let col: any = [];
   col = [header];
   let rows: any = [];

   this.dataSource.forEach((element: {
     'sNo':any
     'branchName': any;
     'branchId':any;
     'department':any;
     'status':any;
     'version':any;


   }) => {
     var temp = [
       element['sNo'],
       element['branchName'],
       element['branchId'],
       element['department'],
       element['status'],
       element['version'],

     ];
     rows.push(temp);
   });
   doc.setFillColor(255, 128,0);
   doc.rect(5, 24, 200, 8, "F");
   doc.setFontSize(14); 
   doc.text("Business Unit Information (" + this.totalRow + ")", 66, 30);
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
   exportData=JSON.parse(JSON.stringify(this.dataSource))
   for(let i=0;i<exportData.length;i++){
     delete exportData[i].action;
     delete exportData[i].sNo
   }
 const fileName = "user-list.xlsx";
 const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
 const wb: XLSX.WorkBook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, fileName);
 XLSX.writeFile(wb, fileName);
 }
 downloadTxt(){
   let exportDataForTxt:any
   exportDataForTxt=JSON.parse(JSON.stringify(this.dataSource))
   for(let i=0;i<exportDataForTxt.length;i++){
     delete exportDataForTxt[i].action;
     delete exportDataForTxt[i].sNo
   }
 const fileName = "user-list.txt";
 const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportDataForTxt);
 const wb: XLSX.WorkBook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, fileName);
 XLSX.writeFile(wb, fileName,{bookType:'txt'});
 }

 downloadCsvFile() {
   let exportDataForCsv:any
   exportDataForCsv=JSON.parse(JSON.stringify(this.dataSource))
   for(let i=0;i<exportDataForCsv.length;i++){
     delete exportDataForCsv[i].action;
     delete exportDataForCsv[i].sNo
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
        console.log('else block')
      }
     console.log(this.selectedRowData)
     const dialogRef = this.dialog.open(ReviewCommentsHistoryComponent, {
      minWidth: "80%",
      data: {userData:this.selectedRowData},
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
   // data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
   // this.result = dialogResult;
  });
}
onReview(){
  const dialogRef = this.dialog.open(ReviewCommentsHistoryComponent, {
    minWidth: "80%",
   // data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
   // this.result = dialogResult;
  });
}
}
