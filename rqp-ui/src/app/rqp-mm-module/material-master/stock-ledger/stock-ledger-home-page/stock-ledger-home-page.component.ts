import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateUpdateStockLedgerComponent } from '../create-update-stock-ledger/create-update-stock-ledger.component';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { AllStockLedgerAuditTrailComponent } from '../all-stock-ledger-audit-trail/all-stock-ledger-audit-trail.component';
import * as moment from 'moment';
import { ActiveStockLedgerAuditTrailComponent } from '../active-stock-ledger-audit-trail/active-stock-ledger-audit-trail.component';
import { exportData } from 'bk-export';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { StockLedgerService } from '../stock-ledger.service';

@Component({
  selector: 'app-stock-ledger-home-page',
  templateUrl: './stock-ledger-home-page.component.html',
  styleUrls: ['./stock-ledger-home-page.component.scss']
})
export class StockLedgerHomePageComponent implements OnInit {

  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  alldisplayedColumns: string[] = ['action', 'uc0001', 'ff0001', 'ff0002', 'ff0003', 'ff0004', 'ff0005', 'ff0006', 'ff0007', 'ff0008', 'ff0009', 'ff0010'];
  activedisplayedColumns: string[] = ['action', 'uc0001', 'ff0001', 'ff0002', 'ff0003', 'ff0004', 'ff0005', 'ff0006', 'ff0007', 'ff0008', 'ff0009', 'ff0010'];
  isLoading = false;
  pageIndex: number;
  size: number;
  filterFieldError = false;
  filterValueError = false;
  activeUserFilterFieldError = false;
  activeUserFilterValueError = false;
  tableData: MatTableDataSource<any>;
  constructor(private router: Router,
    private stockLedgerService: StockLedgerService,
    public dialog: MatDialog,
  ) { }
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    console.log("Bharat")
    this.filterObject = {
      "field": "SELECT",
      "value": "",
      "condition": "equals",
      "DateFieldvalue1": "",
      "DateFieldvalue2": ""
    }
    this.activeUserFilterObject = {
      "field": "SELECT",
      "value": "",
      "condition": "equals",
      "DateFieldvalue1": "",
      "DateFieldvalue2": ""
    }
  }
  ngAfterViewInit(): void {
    this.onLoadAllSaleProductMaster();
    this.onLoadActiveSaleProductMaster();
  }
  selectedTab = 0;
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
  selectedRow = [];
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(CreateUpdateStockLedgerComponent, {
      minWidth: "80%",
      data: { tableData: this.selectedRow, type: 'Create' }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.onLoadActiveSaleProductMaster();
      this.onLoadAllSaleProductMaster();
    })
  }
  selectedAllRow = [];
  setSelectedAllID(row: any) {
    this.selectedAllRow = row;
  }
  currentApiResLength: any;
  pageChanged(event) {
    console.log(event)
    if (this.currentApiResLength == GlobalConstants.size) {
      if (event.length - ((event.pageIndex + 1) * (event.pageSize)) == 0 || (event.length < event.pageSize)) {
        this.onPaginationCall();
      }
    }
  }
  onAllSelectAuditRow() {
    if (this.selectedAllRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': 'Please select any row', 'heading': "Error Information" }
      })
    } else {
      const dialogRef = this.dialog.open(AllStockLedgerAuditTrailComponent, {
        minWidth: "80%",
        data: { tableData: this.selectedAllRow, type: 'Update' }
      })
      dialogRef.afterClosed().subscribe(result => {
      })
    }
  }
  onPaginationCall() {

  }
  onLoadAllSaleProductMaster() {
    //todo
    this.pageIndex = 0;
    this.size = GlobalConstants.size;
    this.stockLedgerService.getAllSaleProduct(this.size, this.pageIndex).subscribe((data: any) => {
      if (data.errorInfo != null) {
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
        this.isLoading = false;
      } else {
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
  onLoadActiveSaleProductMaster() {
    //todo
    this.isLoading = true;
    this.size = GlobalConstants.size;
    this.dataSource = null;
    this.pageIndex = 0;
    this.stockLedgerService.getActiveSaleProduct(this.size, this.pageIndex).subscribe((data: any) => {
      if (data.errorInfo != null) {
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
        this.isLoading = false;
      } else {
        this.activeUserDataSource = data.data.content;
        this.currentActiveUserApiResLength = data.data.content.length;
        this.activeUserCopiedData = JSON.stringify(this.activeUserDataSource);
        this.activeUsertableData = new MatTableDataSource(this.activeUserDataSource);
        this.activeUsertableData.paginator = this.paginator.toArray()[1];
        this.activeUsertableData.sort = this.sort.toArray()[1];
        this.isLoading = false;

        this.activeUserTableLoded = true;
      }
    })
  }
  dataSource: any;
  allRoleDataLength: any;
  copiedData: any;
  tableDataLoaded: any;
  applyFilterByColumn() {
    this.filterFieldError = false
    this.filterValueError = false;
    if (this.filterObject.field == '' || this.filterObject.field == null || this.filterObject.field == undefined || this.filterObject.field == 'SELECT') {
      console.log('test1')
      this.filterFieldError = true;
      return;
    }
    if (this.filterObject.value == '' || this.filterObject.value == null || this.filterObject.value == undefined) {
      console.log('test2')
      if (this.filterObject.field != 'createdon') {
        this.filterValueError = true;
        return;
      } else if (this.filterObject.DateFieldvalue1 == '') {
        console.log('test4')
        this.filterValueError = true;
        return;
      } else {
        console.log('test6')
      }
    }

    let field = this.filterObject.field;
    let value = this.filterObject.value;
    let condition = this.filterObject.condition;
    console.log('field = ' + field + ' value = ' + value);
    let filetrDataBody = {
      field: '',
      value1: '',
      value2: '',
      condition: ''
    }
    filetrDataBody.field = field;
    filetrDataBody.value1 = value;
    filetrDataBody.condition = condition;
    if (this.filterObject.field == 'createdon') {
      filetrDataBody.value1 = moment(this.filterObject.DateFieldvalue1).format('DD-MM-YYYY HH:mm:ss.SSS');
      filetrDataBody.value2 = moment(this.filterObject.DateFieldvalue2).format('DD-MM-YYYY HH:mm:ss.SSS');
      filetrDataBody.value2 = (moment(this.filterObject.DateFieldvalue2).add(1, 'days').format('DD-MM-YYYY HH:mm:ss.SSS'));
      // filetrDataBody.value2=moment(filetrDataBody.value2,'DD-MM-YYYY HH:mm:ss.SSS').add(2,'days');
      // filetrDataBody.value2=newDate;
      filetrDataBody.condition = 'between';
    }
    this.isLoading = true;
    this.stockLedgerService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
      console.log(data)
      if (data.data) {
        this.dataSource = data.data;
        this.currentApiResLength = data.data.length;
        this.allRoleDataLength = this.dataSource.length;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator.toArray()[0];
        this.tableData.sort = this.sort.toArray()[0];
        this.isLoading = false;
        this.tableDataLoaded = true;
      } else {
        this.isLoading = false;
        this.dialog.open(MessageDialogComponent, {
          width: "400px",
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      }
    })
  }
  onClearFilter() {
    this.tableData.filter = '';
    this.filterObject.field = 'SELECT';
    this.filterObject.value = '';
    this.filterObject.condition = 'equals'
    this.filterFieldError = false
    this.filterValueError = false;
    this.onLoadAllSaleProductMaster();

  }

  copyData() {
    var dataArray = "";
    let tableData: any;
    let exportData: any
    tableData = this.tableData.filteredData;
    for (let i = 0; i < tableData.length; i++) {
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
  activeUsertableData: any;
  activeUserApplyFilter(filterValue: string) {
    console.log(filterValue)
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.activeUsertableData.filter = filterValue;
  }
  setSelectedID(row: any) {
    this.selectedRow = row;
  }
  currentActiveUserApiResLength: any;
  activeUSerPageChanged(event) {
    if (this.currentActiveUserApiResLength == GlobalConstants.size) {
      if (event.length - ((event.pageIndex + 1) * (event.pageSize)) == 0 || (event.length < event.pageSize)) {
        this.onActiveUserTablePagination();
      }
    }
  }
  onActiveUserTablePagination() {

  }
  onActiveSelectRow() {
    if (this.selectedRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': 'Please select any row', 'heading': "Error Information" }
      })
    } else {
      const dialogRef = this.dialog.open(CreateUpdateStockLedgerComponent, {
        minWidth: "80%",
        data: { tableData: this.selectedRow, type: 'Update' }
      })
      dialogRef.afterClosed().subscribe(result => {
        this.onLoadActiveSaleProductMaster();
        this.onLoadAllSaleProductMaster();
      })
    }
  }
  onActiveSelectAuditRow() {
    if (this.selectedRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': 'Please select any row', 'heading': "Error Information" }
      })
    } else {
      const dialogRef = this.dialog.open(ActiveStockLedgerAuditTrailComponent, {
        minWidth: "80%",
        data: { tableData: this.selectedRow, type: 'Update' }
      })
      dialogRef.afterClosed().subscribe(result => {
      })
    }
  }
  onChangeSelctedField() {
    console.log('testing')
    if (this.filterObject.field != 'createdon') {
      this.filterObject.condition = 'equals'
    } else {
      this.filterObject.condition = 'between'
    }
  }
  onChangeActiveSelctedField() {
    console.log('testing')
    if (this.activeUserFilterObject.field != 'createdDate') {
      this.activeUserFilterObject.condition = 'equals'
    } else {
      this.activeUserFilterObject.condition = 'between'
    }
  }
  activeUserDataSource: any;
  activeUserCopiedData: any;
  activeUserTableLoded: any;
  applyActiveUserFilterByColumn() {
    this.activeUserFilterFieldError = false
    this.activeUserFilterValueError = false;
    console.log(this.activeUserFilterObject.field)
    if (this.activeUserFilterObject.field == '' || this.activeUserFilterObject.field == null || this.activeUserFilterObject.field == undefined || this.activeUserFilterObject.field == 'SELECT') {
      console.log('test1')
      this.activeUserFilterFieldError = true;
      return;
    }

    if (this.activeUserFilterObject.value == '' || this.activeUserFilterObject.value == null || this.activeUserFilterObject.value == undefined) {
      console.log('test2')
      if (this.activeUserFilterObject.field != 'createdon') {
        console.log('test3')
        this.activeUserFilterValueError = true;
        return;
      } else if (this.activeUserFilterObject.DateFieldvalue1 == '') {
        console.log('test4')
        this.activeUserFilterValueError = true;
        return;
      } else {
        console.log('test6')
      }
    }

    let field = this.activeUserFilterObject.field;
    let value = this.activeUserFilterObject.value;
    let condition = this.activeUserFilterObject.condition;

    console.log('field = ' + field + ' value = ' + value);
    let filetrDataBody = {
      field: '',
      value1: '',
      value2: '',
      condition: ''
    }
    filetrDataBody.field = field;
    filetrDataBody.value1 = value;
    filetrDataBody.condition = condition;
    if (this.activeUserFilterObject.field == 'createdon') {
      filetrDataBody.value1 = moment(this.activeUserFilterObject.DateFieldvalue1).format('DD-MM-YYYY HH:mm:ss.SSS');
      filetrDataBody.value2 = moment(this.activeUserFilterObject.DateFieldvalue2).format('DD-MM-YYYY HH:mm:ss.SSS');
      filetrDataBody.condition = 'between';
    }
    this.isLoading = true;
    this.stockLedgerService.getUserProfileFilterData(filetrDataBody).subscribe((data: any) => {
      console.log(data)
      if (data.data) {
        this.activeUserDataSource = data.data;
        this.currentActiveUserApiResLength = data.data.length;
        console.log(this.currentActiveUserApiResLength)
        this.activeUserCopiedData = JSON.stringify(this.activeUserDataSource);
        this.activeUsertableData = new MatTableDataSource(this.activeUserDataSource);
        this.activeUsertableData.paginator = this.paginator.toArray()[1];
        this.activeUsertableData.sort = this.sort.toArray()[1];
        this.isLoading = false;

        this.activeUserTableLoded = true;
      } else {
        this.isLoading = false;
        this.dialog.open(MessageDialogComponent, {
          width: "400px",
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      }

    })
  }
  onAcctiveUserClearFilter() {
    this.activeUsertableData.filter = '';
    this.activeUserFilterObject.field = 'SELECT';
    this.activeUserFilterObject.value = '';
    this.activeUserFilterObject.condition = 'equals'
    this.activeUserFilterFieldError = false
    this.activeUserFilterValueError = false;
    this.onLoadActiveSaleProductMaster();

  }
  downloadTxt() {
    let excelData = JSON.parse(JSON.stringify(this.tableData.filteredData))
    let arrExcel = [];
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        "Product No": excelData[i].uc0001,
        "Product Code": excelData[i].ff0001,
        "Product Name": excelData[i].ff0002,
        "Brand Name": excelData[i].ff0003,
        "Plant Code": excelData[i].ff0004,
        "Product Categoty": excelData[i].ff0005,
        " Dosage Form": excelData[i].ff0006,
      })
    }
    exportData(arrExcel, 'sale', 'sale', 'txt')
  }
  downloadCsvFile() {
    let excelData = JSON.parse(JSON.stringify(this.tableData.filteredData))
    let arrExcel = [];
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        "Product No": excelData[i].uc0001,
        "Product Code": excelData[i].ff0001,
        "Product Name": excelData[i].ff0002,
        "Brand Name": excelData[i].ff0003,
        "Plant Code": excelData[i].ff0004,
        "Product Categoty": excelData[i].ff0005,
        "Dosage Form": excelData[i].ff0006,
      })
    }
    exportData(arrExcel, 'sale', 'sale', 'csv')
  }


  totalRow: any;
  downloadPdf() {
    let header: string[] = ['Product No', 'Product Code', 'Product Name', 'Brand Name', 'Plant Code', 'Product Categoty', 'Dosage Form'];
    this.totalRow = 0;
    var img = new Image();
    img.src = 'assets/logo1.png'
    let doc = new jsPDF('p', 'mm', 'A4')
    let col: any = [];
    col = [header];
    let rows: any = [];
    this.dataSource = this.tableData.filteredData
    this.dataSource.forEach((element: {
      'uc0001': any;
      'ff0001': any;
      'ff0002': any;
      'ff0003': any;
      'ff0004': any;
      'ff0005': any;
      'ff0006': any;


    }) => {
      var temp = [
        element['uc0001'],
        element['ff0001'],
        element['ff0002'],
        element['ff0003'],
        element['ff0004'],
        element['ff0005'],
        element['ff0006'],

      ];
      rows.push(temp);
    });
    doc.setFillColor(255, 128, 0);
    doc.rect(5, 24, 200, 8, "F");
    doc.setFontSize(14);
    doc.text("Sale", 88, 30);
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
    let fileName = 'sale-list';
    doc.save(fileName + '.pdf');
  }

  downloadExcel() {
    let excelData = JSON.parse(JSON.stringify(this.tableData.filteredData))
    let arrExcel = [];
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        "Product No": excelData[i].uc0001,
        "Product Code": excelData[i].ff0001,
        "Product Name": excelData[i].ff0002,
        "Brand Name": excelData[i].ff0003,
        "Plant Code": excelData[i].ff0004,
        "Product Categoty": excelData[i].ff0005,
        " Dosage Form": excelData[i].ff0006,
      })
    }
    exportData(arrExcel, 'sale', 'sale', 'excel')
  }

  activeUserCopyData() {
    var dataArray = "";
    let tableData: any;
    let exportData: any
    tableData = this.activeUsertableData.filteredData;
    for (let i = 0; i < tableData.length; i++) {
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

  activeUserDownloadTxt() {
    let excelData = JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
    let arrExcel = [];
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        "Product No": excelData[i].uc0001,
        "Product Code": excelData[i].ff0001,
        "Product Name": excelData[i].ff0002,
        "Brand Name": excelData[i].ff0003,
        "Plant Code": excelData[i].ff0004,
        "Product Categoty": excelData[i].ff0005,
        "Dosage Form": excelData[i].ff0006,
      })
    }
    exportData(arrExcel, 'sale', 'sale', 'txt')
  }
  activeUserDownloadCsvFile() {

    let excelData = JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
    let arrExcel = [];
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        "Product No": excelData[i].uc0001,
        "Product Code": excelData[i].ff0001,
        "Product Name": excelData[i].ff0002,
        "Brand Name": excelData[i].ff0003,
        "Plant Code": excelData[i].ff0004,
        "Product Categoty": excelData[i].ff0005,
        "Dosage Form": excelData[i].ff0006,
      })
    }
    exportData(arrExcel, 'pack', 'pack', 'csv')
  }

  activeUserDownloadPdf() {
    let header: string[] = ['Product No', 'Product Code', 'Product Name', 'Brand Name', 'Plant Code', 'Product Categoty', 'Dosage Form'];
    this.totalRow = 0;
    var img = new Image();
    img.src = 'assets/logo1.png'
    let doc = new jsPDF('p', 'mm', 'A4')
    let col: any = [];
    col = [header];
    let rows: any = [];
    this.activeUserDataSource = this.activeUsertableData.filteredData
    this.activeUserDataSource.forEach((element: {
      'uc0001': any;
      'ff0001': any;
      'ff0002': any;
      'ff0003': any;
      'ff0004': any;
      'ff0005': any;
      'ff0006': any;
    }) => {
      var temp = [
        element['uc0001'],
        element['ff0001'],
        element['ff0002'],
        element['ff0003'],
        element['ff0004'],
        element['ff0005'],
        element['ff0006'],

      ];
      rows.push(temp);
    });
    doc.setFillColor(255, 128, 0);
    doc.rect(5, 24, 200, 8, "F");
    doc.setFontSize(14);
    doc.text("Sale", 86, 30);
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
    let fileName = 'sale-list';
    doc.save(fileName + '.pdf');
  }
  activeUserDownloadExcel1() {
    let excelData = JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
    let arrExcel = [];
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        "Product No": excelData[i].uc0001,
        "Product Code": excelData[i].ff0001,
        "Product Name": excelData[i].ff0002,
        "Brand Name": excelData[i].ff0003,
        "Plant Code": excelData[i].ff0004,
        "Product Categoty": excelData[i].ff0005,
        "Dosage Form": excelData[i].ff0006,
      })
    }
    exportData(arrExcel, 'sale', 'sale', 'csv')
  }
  activeUserDownloadExcel() {
    let excelData = JSON.parse(JSON.stringify(this.activeUsertableData.filteredData))
    let arrExcel = [];
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        "Product No": excelData[i].uc0001,
        "Product Code": excelData[i].ff0001,
        "Product Name": excelData[i].ff0002,
        "Brand Name": excelData[i].ff0003,
        "Plant Code": excelData[i].ff0004,
        "Product Categoty": excelData[i].ff0005,
        "Dosage Form": excelData[i].ff0006,
      })
    }
    exportData(arrExcel, 'sale', 'sale', 'excel')
  }
}
