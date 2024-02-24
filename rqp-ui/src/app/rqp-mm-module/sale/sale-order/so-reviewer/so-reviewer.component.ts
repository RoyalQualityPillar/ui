import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { exportData } from 'bk-export';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Subscription, take } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { SdService } from 'src/app/rqp-sd-module/sd.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';

@Component({
  selector: 'app-so-reviewer',
  templateUrl: './so-reviewer.component.html',
  styleUrls: ['./so-reviewer.component.scss']
})
export class SoReviewerComponent {
  selection = new SelectionModel<any>(true, [])
  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['action', 'uc0001', 'ff0001', 'ff0003', 'ff0004', 'ff0005', 'ff0007', 'createdby', 'status', 'createdon'];
  isLoading: boolean;
  headerData: any;
  headerRequestBody: any;
  page = 0;
  pageSize = GlobalConstants.size;
  private headerDataSubscription: Subscription;
  private getReviewDataAPICall: Subscription;
  dataSource: any;
  copiedData: string;
  tableData: any;
  tableDataLoaded: boolean;
  //toolbarService: any;
  filterFieldError = false;
  filterValueError = false;
  filterObject: any;
  constructor(
    public sdService: SdService,
    public lifeCycleDataService: LifeCycleDataService,
    public router: Router,
    private toolbarService: ToolbarService
  ) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.filterObject = {
      "field": "SELECT",
      "value": "",
      "condition": "SELECT"
    }

    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
  }
  ngAfterViewInit(): void {
    let body: any;
    body = {
      createdBy: this.headerRequestBody.userId,
      lcNumber: this.headerRequestBody.lifeCycleCode,
      // lcStage: this.headerRequestBody.stage,
      lcStage: this.toolbarService.currentStage
    };
    this.headerDataSubscription = this.sdService
      .getHeaderData(body)
      .subscribe((data: any) => {
        this.headerData = data.data[0];
        if (this.headerData) {
          this.onReviewerData();
        }
      });

  }
  onReviewerData() {
    this.isLoading = true;
    this.getReviewDataAPICall = this.sdService
      .getReviewerData(
        this.headerData.lcnum,
        this.headerData.stage,
        this.headerData.createdby,
        this.page,
        this.pageSize
      ).pipe(take(1))
      .subscribe((data: any) => {
        console.log(data);

        this.dataSource = data.data.content;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded = true;
        ///  this.toolbarService.setTableData(this.dataSource)
        this.isLoading = false;
      });
  }
  onRequestVersion(row) {
    return row.ff0007 + "." + row.ff0008 + "." + row.ff0009 + "." + row.ff0010;
  }
  onStatus(statusCode: any) {
    if (statusCode == 1001) {
      return 'ACTIVE'
    } else if (statusCode == 1004) {
      return 'LOCKED'
    } else if (statusCode == 1005) {
      return "UNLOCKED"
    } else if (statusCode == 1003) {
      return "DISABLE"
    } else {
      return ''
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tableData.filter = filterValue;
  }
  selectedRow: any;
  setSelectedID(row: any) {
    this.selectedRow = row;
  }
  //Pagination
  pageChanged(event) {
    if (this.dataSource.length == GlobalConstants.size) {
      if (event.length - ((event.pageIndex + 1) * (event.pageSize)) == 0 || (event.length < event.pageSize)) {
        this.onPaginationCall();
      }
    }
  }
  onPaginationCall() {
    //todo
  }
  applyFilterByColumn() {
    this.filterFieldError = false
    this.filterValueError = false;
    if (this.filterObject.field == '' || this.filterObject.field == null || this.filterObject.field == undefined || this.filterObject.field == 'SELECT') {

      this.filterFieldError = true;
      return;
    }
    if (this.filterObject.value == '' || this.filterObject.value == null || this.filterObject.value == undefined) {

      this.filterValueError = true;
      return;
    }

    let field = this.filterObject.field;
    let value = this.filterObject.value;

    this.tableData.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data[field] && data[field].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    }
    this.tableData.filter = value.trim().toLowerCase();
  }

  onClearFilter() {
    this.tableData.filter = '';
    this.filterObject.field = 'SELECT';
    this.filterObject.value = '';
    this.filterFieldError = false
    this.filterValueError = false;

  }
  onSubmit() {
    console.log(this.selectedRow)
    this.router.navigate(['./mm/qt-review-save'], { queryParams: this.selectedRow })
  }
  copyData() {
    var dataArray = "";
    let tableData: any;
    tableData = this.dataSource
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
  totalRow: any;

  downloadPdf() {
    let header: string[] = ['Request No', 'Life Cycle Code', 'Unit Code', 'Department', 'Module Code', 'Status', 'Created By', 'Created Date'];
    // this.totalRow=this.lifeCycleInfoDataLength;
    var img = new Image();
    img.src = 'assets/logo1.png'
    let doc = new jsPDF('p', 'mm', 'A4')
    let col: any = [];
    col = [header];
    let rows: any = [];

    this.dataSource.forEach((element: {
      'Request No': any
      'Life Cycle Code': any;
      'Unit Code': any;
      'Department': any;
      'Module Code': any;
      'Status': any;
      'Created By': any;
      'Created Date': any


    }) => {
      var temp = [
        element['uc0001'],
        element['ff0001'],
        element['ff0003'],
        element['ff0004'],
        element['ff0005'],
        element['status'],
        element['createdby'],
        element['createdon']

      ];
      rows.push(temp);
    });
    doc.setFillColor(255, 128, 0);
    doc.rect(5, 24, 200, 8, "F");
    doc.setFontSize(14);
    doc.text("Quotation reviewer", 66, 30);
    doc.addImage(img, 'gif', 170, 5, 30, 15);
    autoTable(doc, {
      head: col,
      body: rows,
      showHead: "everyPage",
      startY: 35,
      margin: { right: 5, left: 5 },
      tableWidth: 'auto',
      didDrawPage: (dataArg) => {

        doc.text('', dataArg.settings.margin.left, 20);

      }
    });
    let fileName = 'pqt';
    doc.save(fileName + '.pdf');
  }
  downloadExcel() {
    let excelData: any;
    let arrExcel = [];
    excelData = JSON.parse(JSON.stringify(this.dataSource))
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        "Request No": excelData[i].uc0001,
        "Life Cycle Code": excelData[i].ff0001,
        "Unit Code": excelData[i].ff0003,
        "Department": excelData[i].ff0004,
        "Module Code": excelData[i].ff0005,
        "request Version": this.onRequestVersion(excelData[i]),
        "Status": excelData[i].status,
        "Created By": excelData[i].createdby,
        "Created Date ": excelData[i].createdon,
      })
    }
    exportData(arrExcel, 'role', 'pqt', 'excel')
  }
  downloadTxt() {
    let excelData: any;
    let arrExcel = [];
    excelData = JSON.parse(JSON.stringify(this.dataSource))
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        "Request No": excelData[i].uc0001,
        "Life Cycle Code": excelData[i].ff0001,
        "Unit Code": excelData[i].ff0003,
        "Department": excelData[i].ff0004,
        "Module Code": excelData[i].ff0005,
        "request Version": this.onRequestVersion(excelData[i]),
        "Status": excelData[i].status,
        "Created By": excelData[i].createdby,
        "Created Date ": excelData[i].createdon,
      })
    }
    exportData(arrExcel, 'role', 'pqt', 'txt')
  }

  downloadCsvFile() {
    let excelData: any;
    let arrExcel = [];
    excelData = JSON.parse(JSON.stringify(this.dataSource))
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        "Request No": excelData[i].uc0001,
        "Life Cycle Code": excelData[i].ff0001,
        "Unit Code": excelData[i].ff0003,
        "Department": excelData[i].ff0004,
        "Module Code": excelData[i].ff0005,
        "request Version": this.onRequestVersion(excelData[i]),
        "Status": excelData[i].status,
        "Created By": excelData[i].createdby,
        "Created Date ": excelData[i].createdon,
      })
    }
    exportData(arrExcel, 'role', 'pqt', 'csv')
  }



  ngOnDestroy(): void {
    if (this.headerDataSubscription) {
      this.headerDataSubscription.unsubscribe();
    }
    if (this.getReviewDataAPICall) {
      this.getReviewDataAPICall.unsubscribe();
    }
  }
}
