import { Component,OnInit,Inject  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService} from '../../../../service/message.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import {CookieService} from 'ngx-cookie-service';
import { changeStatusByCode ,changeStatusByDescription} from 'src/app/common/removeEmptyStrings';
import { PriceMasterService } from '../price-master.service';
import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
import { StockLedgerService } from '../../stock-ledger/stock-ledger.service';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}


@Component({
  selector: 'app-create-update-price-master',
  templateUrl: './create-update-price-master.component.html',
  styleUrls: ['./create-update-price-master.component.scss']
})
export class CreateUpdatePriceMasterComponent implements OnInit  {
  isReadOnly=true;
  isUpdate=false;
  DepartmentMaster: FormGroup;
  orgList:any;
  buTypeList:any;
  unitList:any;
  formData:any;
  isLoading=false;
  statusList:any;
  displayedColumns:any;
  selectedDialogData:any;
  isStatusSuccess=false;
  isPlantCodeSuccess=false;

  constructor(public fb: FormBuilder,
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private cookieService: CookieService,
    private ledgerService:StockLedgerService,
    public dialogRef: MatDialogRef<CreateUpdatePriceMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData,
    private stockLedgerService:PriceMasterService) {
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
      createdby: [''],
      status: [''],
      comments: ['']
    })
  }

  ngOnInit(): void {
   // this.onLoadStatusDropDown();
    //this.onloadDropDown();
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
  saleProductList:any;
  buUnitList:any;
  suUnitList:any;
  puUnitList:any;
  stageMasterList:any;
  onloadDropDown() {
    this.isLoading = true;
    this.ledgerService.getDropDownList().subscribe((data: any) => {
      console.log(data)
      this.saleProductList = data.data.saleProductList;
       this.buUnitList = data.data.buUnitList;
       this.suUnitList = data.data.suUnitList;
       this.puUnitList=data.data.puUnitList;
      this.isLoading = false;
    })
  }
 // buUnitList:any;
  mtMasterList:any;
  utMasterList:any;
  // onloadDropDown() {
  //   this.isLoading = true;
  //   this.stockLedgerService.getDropDownList().subscribe((data: any) => {
  //     console.log(data)
  //     this.buUnitList = data.data.buUnitList;
  //      this.mtMasterList = data.data.mtMasterList;
  //      this.utMasterList = data.data.utMasterList;
  //     this.isLoading = false;
  //   })
  // }
  onLoadStatusDropDown() {
    this.isLoading = true;
    this.adminService.getDropDownList().subscribe((data: any) => {
      this.statusList = data.data.statusInfo;
      this.isLoading = false;
    })
  }
  onLoadFormValue(){
    this.isLoading = true;
    this.stockLedgerService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      if(data.data==null){
        this.isLoading = false;
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        })
      }else{
      this.formData = data.data;
      this.isLoading = false;
      this.setFormValue();
    }
    })
  }
  setFormValue(){
    this.DepartmentMaster.controls['uc0001'].setValue(this.formData.uc0001)
    this.DepartmentMaster.controls['ff0001'].setValue(this.formData.ff0001)
    this.DepartmentMaster.controls['ff0002'].setValue(this.formData.ff0002)
    this.DepartmentMaster.controls['ff0003'].setValue(this.formData.ff0003)
    
   this.DepartmentMaster.controls['ff0004'].setValue(this.formData.ff0004)
   this.DepartmentMaster.controls['ff0005'].setValue(this.formData.ff0005)
   this.DepartmentMaster.controls['ff0006'].setValue(this.formData.ff0006)
   this.DepartmentMaster.controls['ff0007'].setValue(this.formData.ff0007)
   this.DepartmentMaster.controls['ff0008'].setValue(this.formData.ff0008)
   this.DepartmentMaster.controls['ff0009'].setValue(this.formData.ff0009)
   this.DepartmentMaster.controls['ff0010'].setValue(this.formData.ff0010)
   this.DepartmentMaster.controls['ff0011'].setValue(this.formData.ff0011)
   this.DepartmentMaster.controls['ff0012'].setValue(this.formData.ff0012)
   this.DepartmentMaster.controls['ff0013'].setValue(this.formData.ff0013)
   this.DepartmentMaster.controls['ff0014'].setValue(this.formData.ff0014)
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments)
     let statusByValue=changeStatusByCode(this.formData.status)
    this.DepartmentMaster.controls['status'].setValue(statusByValue)
  }
  onUpdate(){
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
  onCreate(){
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
  onClear(){
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
  openProductCategoryLOV(){
    this.displayedColumns = [
      { field: 'mtCode', title: 'Code' },
      { field: 'mtName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Product Category",
        dialogColumns: this.displayedColumns,
        dialogData: this.mtMasterList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0005'].setValue(this.selectedDialogData.mtCode)
      }
    })
  }
  onChangeProductCategory(){
    if (this.DepartmentMaster.controls['ff0005'].value == '') {
      this.DepartmentMaster.controls['ff0005'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0005'].value;
      this.mtMasterList.forEach(elements => {
        if (elements.mtCode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0005'].setErrors({ 'incorrect': true })
        this.openProductCategoryLOV();
      }
    }
  }
  openStatusLOV() {
    this.displayedColumns = [
      {field:'code',title:"Code"},
      {field:'description',title:"Descritption"}
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
  onChangeDosageForm(){

  }
  openDosageFormLOV(){

  }
  openUOMLOV(){
    this.displayedColumns = [
      { field: 'utCode', title: 'Code' },
      { field: 'utName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "UOM",
        dialogColumns: this.displayedColumns,
        dialogData: this.utMasterList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0007'].setValue(this.selectedDialogData.utCode)
      }
    }) 
  }
  onChangeUOM(){
    if (this.DepartmentMaster.controls['ff0007'].value == '') {
      this.DepartmentMaster.controls['ff0007'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0007'].value;
      this.utMasterList.forEach(elements => {
        if (elements.utCode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0007'].setErrors({ 'incorrect': true })
        this.openUOMLOV();
      }
    }
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

  openSaleProductListLOV(){
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
        this.DepartmentMaster.controls['ff0001'].setValue(this.selectedDialogData.punumber);
        this.DepartmentMaster.controls['ff0003'].setValue(this.selectedDialogData.puunitname);
        this.DepartmentMaster.controls['ff0002'].setValue(this.selectedDialogData.puunitcode);
      }
    })
  }
  onChangeByProductCode(){
    if (this.DepartmentMaster.controls['ff0002'].value == '') {
      this.DepartmentMaster.controls['ff0003'].setValue('')
      this.DepartmentMaster.controls['ff0002'].setValue('')
      this.DepartmentMaster.controls['ff0001'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0002'].value;
      this.saleProductList.forEach(elements => {
        if (elements.puunitcode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0002'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0003'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0001'].setErrors({ 'incorrect': true })
        this.openSaleProductListLOV();
      }
    }
  }
  onChangeProductCode(){
    if (this.DepartmentMaster.controls['ff0001'].value == '') {
      this.DepartmentMaster.controls['ff0001'].setValue('')
      this.DepartmentMaster.controls['ff0002'].setValue('');
      this.DepartmentMaster.controls['ff0003'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0001'].value;
      this.saleProductList.forEach(elements => {
        if (elements.punumber == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0001'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0002'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0003'].setErrors({ 'incorrect': true })
        this.openSaleProductListLOV();
      }
    }
  }
  onChangeProductName(){
    if (this.DepartmentMaster.controls['ff0003'].value == '') {
      this.DepartmentMaster.controls['ff0003'].setValue('')
      this.DepartmentMaster.controls['ff0002'].setValue('')
      this.DepartmentMaster.controls['ff0001'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0003'].value;
      this.saleProductList.forEach(elements => {
        if (elements.puunitname == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0003'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0002'].setErrors({ 'incorrect': true })
        this.DepartmentMaster.controls['ff0001'].setErrors({ 'incorrect': true })
        this.openSaleProductListLOV();
      }
    }
  }
}





