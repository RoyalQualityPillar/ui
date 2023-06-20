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
  displayedColumns: string[] = ['action','sNo','BusinessUnitName', 'BusinessUnitCode','unitType', 'status','modificationNo','auditTrail'];

  dataSource:any;
  filterObject:any;
 
   constructor(private _liveAnnouncer: LiveAnnouncer,
               private route: Router,
               private router: ActivatedRoute,
               public toolbarService:ToolbarService,
               public lifeCycleDataService:LifeCycleDataService,
               public cookieService:CookieService,
               public dialog: MatDialog){

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
  onSearch(){

  }
   //copyToClipboard:any;
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
   let header: string[] = ['S No.', 'User Id', 'Role', 'Life Cycle','Module Name','Module'];
   this.totalRow=this.lifeCycleInfoDataLength;
   var img = new Image();
   img.src = 'assets/logo1.png'
   let doc = new jsPDF('p', 'mm', 'A4')
   let col: any = [];
   col = [header];
   let rows: any = [];

   this.dataSource.forEach((element: {
     'sNo':any
     'userId': any;
     'fullName':any;
     'lifecyclecode':any;
     'moduleName':any;
     'module':any;


   }) => {
     var temp = [
       element['sNo'],
       element['userId'],
       element['fullName'],
       element['lifecyclecode'],
       element['moduleName'],
       element['module'],

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
   let exportData:any
   exportData=JSON.parse(JSON.stringify(this.dataSource))
   for(let i=0;i<exportData.length;i++){
     delete exportData[i].action;
     delete exportData[i].sNo
   }
 const fileName = "lifeCycle.xlsx";
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
 const fileName = "lifeCycle.txt";
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
   saveAs(blob, "lifeCycle.csv");
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
        console.log(this.cureentSelectedRow[0].userId)
          console.log(' one')
          this.selectedUserId=this.cureentSelectedRow[0].userId;
          console.log(this.selectedUserId)
          this.selectedLifecycleCode=this.cureentSelectedRow[0].lifecyclecode;
          this.selectedModuleName=this.cureentSelectedRow[0].moduleName;
      }else if(this.cureentSelectedRow.length>1){
        console.log('more than one')
        let arrayLength=this.cureentSelectedRow.length-1;
        console.log(arrayLength)
        this.selectedUserId=this.cureentSelectedRow[arrayLength].userId;
          this.selectedLifecycleCode=this.cureentSelectedRow[arrayLength].lifecyclecode;
          this.selectedModuleName=this.cureentSelectedRow[arrayLength].moduleName;
      }else{
        //do nothing
        console.log('else block')
      }
      let body={
        userId:'',
        lifecycleCode:'',
        moduleName:''
      }
      console.log(this.selectedUserId)
      body.userId=this.selectedUserId;
      body.lifecycleCode=this.selectedLifecycleCode;
      body.moduleName=this.selectedModuleName;
      console.log(body);
      this.selection.clear();
      this.lifeCycleDataService.getModuleName(body).subscribe((data: any) => {
        console.log(data)
        this.cookieService.set('menuHeader',data[0].moduleName);
        this.cookieService.set('subMenu1',data[0].links)
        this.route.navigate(['./module-home-page'])
      })
    }

onSelect(row:any){
  console.log(row);
}

applyFilterByColumn(){

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
