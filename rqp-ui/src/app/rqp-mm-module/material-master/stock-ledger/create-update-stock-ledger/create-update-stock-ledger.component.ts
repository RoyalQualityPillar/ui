import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
import { StockLedgerService } from '../stock-ledger.service';
import { MessageService } from 'src/app/service/message.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import * as moment from 'moment';
import { changeStatusByCode, changeStatusByDescription } from 'src/app/common/removeEmptyStrings';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export interface userData {
  userData: any;
  type: any;
  tableData: any;
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-create-update-stock-ledger',
  templateUrl: './create-update-stock-ledger.component.html',
  styleUrls: ['./create-update-stock-ledger.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CreateUpdateStockLedgerComponent implements OnInit {
  isReadOnly = true;
  isUpdate = false;
  DepartmentMaster: FormGroup;
  orgList: any;
  buTypeList: any;
  unitList: any;
  formData: any;
  isLoading = false;
  statusList: any;
  displayedColumns: any;
  selectedDialogData: any;
  isStatusSuccess = false;
  isPlantCodeSuccess = false;

  constructor(public fb: FormBuilder,
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<CreateUpdateStockLedgerComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData,
    private stockLedgerService: StockLedgerService) {
    this.DepartmentMaster = this.fb.group({
      ff0002: ['', Validators.required],
      uc0001: [''],
      ff0001: ['', Validators.required],
      ff0003: ['', Validators.required],
      ff0004: ['', Validators.required],
      ff0005: ['', Validators.required],
      ff0006: ['', Validators.required],
      ff0007: ['', Validators.required],
      ff0008: ['', Validators.required],
      ff0009: ['', Validators.required],
      ff0010: ['', Validators.required],
      ff0011: ['', Validators.required],
      ff0012: ['', Validators.required],
      ff0013: ['', Validators.required],
      ff0014: ['', Validators.required],
      ff0015: ['', Validators.required],
      ff0016: ['', Validators.required],
      createdby: [''],
      status: [''],
      comments: ['']
    })
  }

  ngOnInit(): void {
    // this.onLoadStatusDropDown();
    this.onloadDropDown();
    if (this.userData.type == 'Update') {
      this.isReadOnly = true;
      this.isUpdate = true;
      this.onLoadFormValue();
    } else {
      this.isReadOnly = false;
      this.isUpdate = false;
    }
  }
  saleProductList: any;
  buUnitList: any;
  suUnitList: any;
  puUnitList: any;
  stageMasterList: any;
  onloadDropDown() {
    this.isLoading = true;
    this.stockLedgerService.getDropDownList().subscribe((data: any) => {
      console.log(data)
      this.saleProductList = data.data.saleProductList;
      this.buUnitList = data.data.buUnitList;
      this.suUnitList = data.data.suUnitList;
      this.puUnitList = data.data.puUnitList;
      this.isLoading = false;
    })
  }
  onLoadStatusDropDown() {
    this.isLoading = true;
    this.adminService.getDropDownList().subscribe((data: any) => {
      this.statusList = data.data.statusInfo;
      this.isLoading = false;
    })
  }
  onLoadFormValue() {
    this.isLoading = true;
    this.isUpdate = true
    this.stockLedgerService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      if (data.data == null) {
        this.isLoading = false;
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        })
      } else {
        this.formData = data.data;
        this.isLoading = false;
        this.setFormValue();
      }
    })
  }
  setFormValue() {
    this.DepartmentMaster.controls['uc0001'].setValue(this.formData.uc0001)
    this.DepartmentMaster.controls['ff0001'].setValue(this.formData.ff0001)
    this.DepartmentMaster.controls['ff0002'].setValue(this.formData.ff0002)
    this.DepartmentMaster.controls['ff0003'].setValue(this.formData.ff0003)
    let orderDate = moment(this.formData.ff0004, 'DD-MM-YYYY HH:mm:ss.SSS').format();
    this.DepartmentMaster.controls['ff0004'].setValue(orderDate)
    this.DepartmentMaster.controls['ff0005'].setValue(this.formData.ff0005)
    this.DepartmentMaster.controls['ff0006'].setValue(this.formData.ff0006)
    this.DepartmentMaster.controls['ff0007'].setValue(this.formData.ff0007)
    this.DepartmentMaster.controls['ff0008'].setValue(this.formData.ff0008)
    this.DepartmentMaster.controls['ff0016'].setValue(this.formData.ff0016)
    this.DepartmentMaster.controls['ff0009'].setValue(this.formData.ff0009)
    this.DepartmentMaster.controls['ff0010'].setValue(this.formData.ff0010)
    this.DepartmentMaster.controls['ff0011'].setValue(this.formData.ff0011)
    let mfgDate = moment(this.formData.ff0012, 'DD-MM-YYYY HH:mm:ss.SSS').format();
    this.DepartmentMaster.controls['ff0012'].setValue(mfgDate)
    let expDate = moment(this.formData.ff0013, 'DD-MM-YYYY HH:mm:ss.SSS').format();
    this.DepartmentMaster.controls['ff0013'].setValue(expDate)
    this.DepartmentMaster.controls['ff0014'].setValue(this.formData.ff0014)
    this.DepartmentMaster.controls['ff0015'].setValue(this.formData.ff0015)
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments)
    let statusByValue = changeStatusByCode(this.formData.status)
    this.DepartmentMaster.controls['status'].setValue(statusByValue)
  }
  onUpdate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['status'].setValue(changeStatusByDescription(this.DepartmentMaster.controls['status'].value))
    this.stockLedgerService.onCreate(this.DepartmentMaster.value).subscribe((data: any) => {
      if (data.errorInfo != null) {
        this.isLoading = false;
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      } else {
        this.isLoading = false;
        this.messageService.sendSnackbar('success', 'Record Updated Successfully');
        this.dialogRef.close();
      }
    })
  }
  onCreate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['createdby'].setValue(this.cookieService.get('userId'))
    this.stockLedgerService.onCreate(this.DepartmentMaster.value).subscribe((data: any) => {
      if (data.errorInfo != null) {
        this.isLoading = false;
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      } else {
        this.isLoading = false;
        this.messageService.sendSnackbar('success', 'Record Created Successfully');
        this.dialogRef.close();
      }
    })
  }
  onClear() {
    this.DepartmentMaster.reset();
  }
  openPlantCodeLOV() {
    this.displayedColumns = [
      { field: 'buunitcode', title: 'Code' },
      { field: 'buunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Plant Code",
        dialogColumns: this.displayedColumns,
        dialogData: this.buUnitList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0004'].setValue(this.selectedDialogData.buunitcode)
      }
    })
  }

  onChangePlantCode() {
    if (this.DepartmentMaster.controls['ff0004'].value == '') {
      this.DepartmentMaster.controls['ff0004'].setValue('')
    } else {
      let currentPlantCodeValue = this.DepartmentMaster.controls['ff0004'].value;
      this.isPlantCodeSuccess = false;
      this.buUnitList.forEach(elements => {
        if (elements.buunitcode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      })
      if (this.isPlantCodeSuccess == false) {
        this.DepartmentMaster.controls['ff0004'].setErrors({ 'incorrect': true })
        this.openPlantCodeLOV();
      }
    }
  }
  openSaleProductListLOV() {
    this.displayedColumns = [
      { field: 'punumber', title: 'Name' },
      { field: 'puunitcode', title: 'Code' },
      { field: 'puunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Sales Product List",
        dialogColumns: this.displayedColumns,
        dialogData: this.saleProductList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0015'].setValue(this.selectedDialogData.punumber);
        this.DepartmentMaster.controls['ff0016'].setValue(this.selectedDialogData.puunitname);
        this.DepartmentMaster.controls['ff0001'].setValue(this.selectedDialogData.puunitcode);
      }
    })
  }
  onChangeByProductCode() {
    if (this.DepartmentMaster.controls['ff0001'].value == '') {
      this.DepartmentMaster.controls['ff0015'].setValue('')
      this.DepartmentMaster.controls['ff0016'].setValue('')
      this.DepartmentMaster.controls['ff0001'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0001'].value;
      this.saleProductList.forEach(elements => {
        if (elements.puunitcode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0015'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0016'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0001'].setErrors({ 'incorrect': true })
        this.openSaleProductListLOV();
      }
    }
  }
  onChangeProductCode() {
    if (this.DepartmentMaster.controls['ff0015'].value == '') {
      this.DepartmentMaster.controls['ff0015'].setValue('')
      this.DepartmentMaster.controls['ff0016'].setValue('');
      this.DepartmentMaster.controls['ff0001'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0015'].value;
      this.saleProductList.forEach(elements => {
        if (elements.punumber == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0015'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0016'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0001'].setErrors({ 'incorrect': true })
        this.openSaleProductListLOV();
      }
    }
  }
  onChangeProductName() {
    if (this.DepartmentMaster.controls['ff0016'].value == '') {
      this.DepartmentMaster.controls['ff0015'].setValue('')
      this.DepartmentMaster.controls['ff0016'].setValue('')
      this.DepartmentMaster.controls['ff0001'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0016'].value;
      this.saleProductList.forEach(elements => {
        if (elements.puunitname == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0015'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0016'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0001'].setErrors({ 'incorrect': true })
        this.openSaleProductListLOV();
      }
    }
  }
  openOrgUnitCodeListLOV() {
    this.displayedColumns = [
      { field: 'buunitcode', title: 'Code' },
      { field: 'buunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Organization Unit Code",
        dialogColumns: this.displayedColumns,
        dialogData: this.buUnitList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0005'].setValue(this.selectedDialogData.buunitcode);
      }
    })
  }
  onChageOrgUnitCode() {
    if (this.DepartmentMaster.controls['ff0005'].value == '') {
      this.DepartmentMaster.controls['ff0005'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0005'].value;
      this.buUnitList.forEach(elements => {
        if (elements.buunitcode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0005'].setErrors({ 'incorrect': true })
        this.openOrgUnitCodeListLOV();
      }
    }
  }
  openSalesUnitCodeListLOV() {
    this.displayedColumns = [
      { field: 'suunitcode', title: 'Code' },
      { field: 'suunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Sell Unit Code",
        dialogColumns: this.displayedColumns,
        dialogData: this.suUnitList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0006'].setValue(this.selectedDialogData.suunitcode);
      }
    })
  }
  onChangeSellUnitCode() {
    if (this.DepartmentMaster.controls['ff0006'].value == '') {
      this.DepartmentMaster.controls['ff0006'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0006'].value;
      this.suUnitList.forEach(elements => {
        if (elements.suunitcode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0006'].setErrors({ 'incorrect': true })
        this.openOrgUnitCodeListLOV();
      }
    }
  }
  openPurchaseUnitCodeLOV() {
    this.displayedColumns = [
      { field: 'puunitcode', title: 'Code' },
      { field: 'puunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Purches Unit Code",
        dialogColumns: this.displayedColumns,
        dialogData: this.puUnitList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0007'].setValue(this.selectedDialogData.puunitcode);
      }
    })
  }
  onChangePurchaseUnitCode() {
    if (this.DepartmentMaster.controls['ff0007'].value == '') {
      this.DepartmentMaster.controls['ff0007'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0007'].value;
      this.puUnitList.forEach(elements => {
        if (elements.puunitcode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0007'].setErrors({ 'incorrect': true })
        this.openOrgUnitCodeListLOV();
      }
    }
  }
  openStatusLOV() {
    this.displayedColumns = [
      { field: 'code', title: "Code" },
      { field: 'description', title: "Descritption" }
    ]
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Status",
        dialogColumns: this.displayedColumns,
        dialogData: this.statusList,
        lovName: 'statusList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['status'].setValue(this.selectedDialogData.code)
      }
    })
  }
  onChangeDosageForm() {

  }
  openDosageFormLOV() {

  }

  onChangeStatus() {
    if (this.DepartmentMaster.controls['status'].value == '') {
      this.DepartmentMaster.controls['status'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['status'].value;
      this.statusList.forEach(elements => {
        if (elements.code == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['status'].setErrors({ 'incorrect': true })
        this.openStatusLOV();
      }
    }
  }
}
