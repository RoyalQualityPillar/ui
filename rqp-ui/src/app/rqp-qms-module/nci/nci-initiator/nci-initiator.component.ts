import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MessageService } from 'src/app/service/message.service';
import * as moment from 'moment';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { QmsService } from '../../qms.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-nci-initiator',
  templateUrl: './nci-initiator.component.html',
  styleUrls: ['./nci-initiator.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class NciInitiatorComponent {
  EventForm: FormGroup;
  isReadonly = true;
  constructor(
    public router: ActivatedRoute,
    private qmsService: QmsService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private lifeCycleDataService: LifeCycleDataService,
    private messageService: MessageService,
    private toolbarService: ToolbarService
  ) {
    this.EventForm = this.fb.group({
      ff0001: [''],
      ff0002: [''],
      ff0003: [''],
      ff0004: [''],
      ff0005: [''],
      severityEvent: [''],
      severityEvent1: [''],
      severityEvent2: [''],
      severityEvent3: [''],
      severityEvent4: [''],
    });
  }
  isLoading = false;
  pageData: any;
  sList: any;
  oList: any;
  dList: any;
  lcMasterList:any;
  itemCategoryList:any;
  icsMasterList:any;
  rctMasterList:any;
  ctMasterList:any;
  actionItem:any=[{}];
  eventClassification: any = [
    {
      ff0001: '',
      ff0002: '',
      ff0007: '',
      ff0008: '',
      lineList: [{}],
    },
  ];
  ngOnInit(): void {
    this.pageData = {
      pageName: 'qms',
    };
    this.onLoadInputApi();
  }
  onLoadInputApi() {
    this.qmsService.onLoadInputAPI().subscribe((data: any) => {
      console.log(data);
      this.sList = data.data.sList;
      this.oList = data.data.oList;
      this.dList = data.data.dList;
      this.itemCategoryList=data.data.itemCategoryList;
      this.icsMasterList=data.data.icsMasterList;
      this.lcMasterList=data.data.lcMasterList;
      this.rctMasterList=data.data.rctMasterList;
      this.ctMasterList=data.data.ctMasterList;
      this.isReadonly = true;
    });
  }
  headerData: any;
  getHeaderData(pageData: any) {
    console.log(pageData);
    this.headerData = pageData;
  }
  addLineItem(item: any): void {
    item.lineList.push({
      value4: '',
      value5: '',
    });
    console.log(this.eventClassification);
  }
  addNewRow() {
    this.eventClassification.push({
      ff0001: '',
      ff0002: '',
      ff0007: '',
      ff0008: '',
      lineList: [{}],
    });
  }
  deleteTodo(itemIndex: number, lineIndex: number): void {
    if (itemIndex >= 0 && itemIndex < this.eventClassification.length) {
      const item = this.eventClassification[itemIndex];
      if (lineIndex >= 0 && lineIndex < item.lineList.length) {
        item.lineList.splice(lineIndex, 1); // Remove the line item at the specified index
      }
    }
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }
  addRemoveRow() {}

  /********************************LOV LIST ***************************************** */
  displayedColumns: any;
  selectedDialogData: any;
  openSeverityEventLov() {
    this.displayedColumns = [
      { field: 'sCode', title: 'Code' },
      { field: 'sName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Severity of the Event',
        dialogColumns: this.displayedColumns,
        dialogData: this.sList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.EventForm.controls['ff0001'].setValue(result.data.sName);
        this.onGetRPNValue();
      }
    });
  }
  openOccurenceLov() {
    this.displayedColumns = [
      { field: 'oCode', title: 'Code' },
      { field: 'oName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Probability of Occurrence',
        dialogColumns: this.displayedColumns,
        dialogData: this.oList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.EventForm.controls['ff0002'].setValue(result.data.oName);
        this.onGetRPNValue();
      }
    });
  }
  openDetectionLov() {
    this.displayedColumns = [
      { field: 'dCode', title: 'Code' },
      { field: 'dName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Detection Mechanism',
        dialogColumns: this.displayedColumns,
        dialogData: this.dList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.EventForm.controls['ff0003'].setValue(result.data.dName);
        this.onGetRPNValue();
      }
    });
  }
  isRiskFlag = false;
  mediumRisk = false;
  noRisk = false;
  onGetRPNValue() {
    if (
      this.checkFieldValue(this.EventForm.controls['ff0001'].value) &&
      this.checkFieldValue(this.EventForm.controls['ff0002'].value) &&
      this.checkFieldValue(this.EventForm.controls['ff0003'].value)
    ) {
      let rpnValue =
        this.EventForm.controls['ff0001'].value *
        this.EventForm.controls['ff0002'].value *
        this.EventForm.controls['ff0003'].value;
      console.log(rpnValue);
      this.EventForm.controls['ff0004'].setValue(rpnValue);
      if (rpnValue <= 6) {
        this.isRiskFlag = false;
        this.mediumRisk = false;
        this.noRisk = true;
        this.EventForm.controls['ff0005'].setValue('Minor');
      } else if (rpnValue >= 7 && rpnValue <= 24) {
        this.isRiskFlag = false;
        this.mediumRisk = true;
        this.noRisk = false;
        this.EventForm.controls['ff0005'].setValue('Major');
      } else if (rpnValue >= 25) {
        this.isRiskFlag = true;
        this.mediumRisk = false;
        this.noRisk = false;
        this.EventForm.controls['ff0005'].setValue('Critical');
      } else {
        this.isRiskFlag = false;
        this.mediumRisk = false;
        this.noRisk = false;
        this.EventForm.controls['ff0005'].setValue('');
      }
    } else {
      this.EventForm.controls['ff0004'].setValue('');
      this.EventForm.controls['ff0005'].setValue('');
      this.isRiskFlag = false;
      console.log('else block');
    }
  }
  checkFieldValue(value: any) {
    if (value == '' || value == undefined || value == null) {
      return false;
    } else {
      return true;
    }
  }
  openItemCategoryLov(index:any){
    this.displayedColumns = [
      { field: 'itemCode', title: 'Code' },
      { field: 'itemName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Item Category',
        dialogColumns: this.displayedColumns,
        dialogData: this.itemCategoryList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.eventClassification[index].ff0001=result.data.itemCode
      }
    });
  }
  openItemSubCategoryLov(index:any){
    this.displayedColumns = [
      { field: 'icsCode', title: 'Code' },
      { field: 'icsName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Item Subcategory',
        dialogColumns: this.displayedColumns,
        dialogData: this.icsMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.eventClassification[index].ff0002=result.data.icsCode
      }
    });
  }

  /********************************************************************** */
  addActionItemRow(){
    this.actionItem.push({})
  }
  openLifeCycleNoLov(index:any){
    this.displayedColumns = [
      { field: 'lcNumber', title: 'Lc Number' },
      { field: 'departmentCode', title: 'Department Code' },
      { field: 'moduleCode', title: 'Module Code' }
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Item Subcategory',
        dialogColumns: this.displayedColumns,
        dialogData: this.lcMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.actionItem[index].ff0001=result.data.lcNumber;
        this.actionItem[index].ff0002=result.data.departmentCode;
        this.actionItem[index].ff0014=result.data.moduleCode
      }
    });
  }
  isStatusSuccess:boolean;
  onChangeLifeCycle(index:any){
    if ( this.actionItem[index].ff0001 == '') {
      this.actionItem[index].ff0001='';
      this.actionItem[index].ff0002='';
      this.actionItem[index].ff0014='';
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.actionItem[index].ff0001;
      this.lcMasterList.forEach(elements => {
        if (elements.lcNumber == statusCurrentValue) {
          this.actionItem[index].ff0002=elements.departmentCode;
          this.actionItem[index].ff0014=elements.moduleCode;
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.actionItem[index].ff0001='';
        this.actionItem[index].ff0002='';
        this.actionItem[index].ff0014='';
        this.openLifeCycleNoLov(index);
      }
    }
  }
  onChangeDepartmentCode(index:any){
    if ( this.actionItem[index].ff0002 == '') {
      this.actionItem[index].ff0001='';
      this.actionItem[index].ff0002='';
      this.actionItem[index].ff0014='';
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.actionItem[index].ff0002;
      this.lcMasterList.forEach(elements => {
        if (elements.departmentCode == statusCurrentValue) {
          this.actionItem[index].ff0001=elements.lcNumber;
          this.actionItem[index].ff0014=elements.moduleCode;
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.actionItem[index].ff0001='';
        this.actionItem[index].ff0002='';
        this.actionItem[index].ff0014='';
        this.openLifeCycleNoLov(index);
      }
    }
  }
  onChangeModuleCode(index:any){
    if ( this.actionItem[index].ff0014 == '') {
      this.actionItem[index].ff0001='';
      this.actionItem[index].ff0002='';
      this.actionItem[index].ff0014='';
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.actionItem[index].ff0014;
      this.lcMasterList.forEach(elements => {
        if (elements.moduleCode == statusCurrentValue) {
          this.actionItem[index].ff0001=elements.lcNumber;
          this.actionItem[index].ff0002=elements.departmentCode;
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.actionItem[index].ff0001='';
        this.actionItem[index].ff0002='';
        this.actionItem[index].ff0014='';
        this.openLifeCycleNoLov(index);
      }
    }
  }
  openActionItemCategoryLov(index:any){
    this.displayedColumns = [
      { field: 'itemCode', title: 'Code' },
      { field: 'itemName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Item Category',
        dialogColumns: this.displayedColumns,
        dialogData: this.itemCategoryList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.actionItem[index].ff0004=result.data.itemCode
      }
    });
  }
  openActionItemSubCategoryLov(index:any){
    this.displayedColumns = [
      { field: 'icsCode', title: 'Code' },
      { field: 'icsName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Item Subcategory',
        dialogColumns: this.displayedColumns,
        dialogData: this.icsMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.actionItem[index].ff0015=result.data.icsCode
      }
    }); 
  }
  openActionRootCauseLov(index:any){
    this.displayedColumns = [
    { field: 'ctCode', title: 'Code' },
    { field: 'ctName', title: 'Description' },
  ];
  const dialogRef = this.dialog.open(LovDialogComponent, {
    height: '500px',
    width: '600px',
    data: {
      dialogTitle: 'Root Cause',
      dialogColumns: this.displayedColumns,
      dialogData: this.ctMasterList,
      lovName: 'businessUnitList',
    },
    disableClose: true,
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.selectedDialogData = result.data;
      this.actionItem[index].ff0010=result.data.ctCode
    }
  }); 
  }
  openActionRootCauseTypeLov(index:any){
    this.displayedColumns = [
      { field: 'rctCode', title: 'Code' },
    { field: 'rctName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Root Cause Type',
        dialogColumns: this.displayedColumns,
        dialogData: this.rctMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.actionItem[index].ff0009=result.data.rctCode
      }
    }); 
  }
}
