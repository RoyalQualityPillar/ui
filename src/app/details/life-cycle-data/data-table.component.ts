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

  displayedColumns: string[] = ['sNo','action', 'userId','fullName', 'lifecyclecode','moduleName','module'];
 // dataSource = ELEMENT_DATA;
 dataSource:any;
 filterObject:any;

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private route: Router,
              private router: ActivatedRoute,
              public toolbarService:ToolbarService,
              public lifeCycleDataService:LifeCycleDataService,
              public cookieService:CookieService){
   // this.dataSource=tableData.tableData;
  
  }
  tableData:MatTableDataSource<any>;
  ngOnInit(): void {
    this.filterObject = {
      "field": "SELECT",
      "value": "",
      "condition":"SELECT"
    }
  }
  copiedData:any
  lifeCycleInfoDataLength:any
  tableDataLoaded=false;
  onSearch(){
    this.lifeCycleDataService.getLifeCycleInfo().subscribe((data: any) => {
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
    this.onSearch()
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

//Pagination
pageChanged(event){
  console.log(event)
  if(this.dataSource.length==24){
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
onPaginationCall(){
  console.log('calling')
  //this.dataSource.push(...this.getNewList);
  //add dataSorce,pagination, sort
}
  }




