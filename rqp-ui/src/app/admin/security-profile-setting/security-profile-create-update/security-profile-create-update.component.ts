import { Component,OnInit,Inject  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService} from '../../../service/message.service';
import { SecurityProfileService } from '../security-profile.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import {CookieService} from 'ngx-cookie-service';
import { BusinessUnitService } from '../../business-unit/business-unit.service'

export interface userData {
  userData: any;
  type:any;
  tableData:any;
}

@Component({
  selector: 'app-security-profile-create-update',
  templateUrl: './security-profile-create-update.component.html',
  styleUrls: ['./security-profile-create-update.component.scss']
})
export class SecurityProfileCreateUpdateComponent implements OnInit  {
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
  checkBoxValue={
    ff0007:'',
    ff0008:'',
    ff0009:'',
    ff0010:''
  }
  constructor(public fb: FormBuilder,
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private securityProfileService: SecurityProfileService,
    private businessUnitService: BusinessUnitService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<SecurityProfileCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData) {
    this.DepartmentMaster = this.fb.group({
      uc0001: ['', Validators.required],
      ff0001: ['', Validators.required],
      ff0002: ['', Validators.required],
      ff0003: ['', Validators.required],
      ff0004: ['', Validators.required],
      ff0005: ['', Validators.required],
      ff0006: ['22', Validators.required],
      ff0007: ['', Validators.required],
      ff0008: ['', Validators.required],
      ff0009: ['', Validators.required],
      ff0010: ['', Validators.required],
      ff0011: ['', Validators.required],
      ff0012: ['', Validators.required],
      ff0013: ['', Validators.required],
      createdby: [''],
      status: [''],
      comments: ['']
    })
  }

  ngOnInit(): void {
    this.onLoadStatusDropDown();
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

  onloadDropDown() {
    this.isLoading = true;
    this.businessUnitService.getDropDownList().subscribe((data: any) => {
      this.orgList = data.data.orgList;
      this.buTypeList = data.data.buTypeList;
      this.unitList = data.data.unitList;
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
  onLoadFormValue(){
    this.isLoading = true;
    this.securityProfileService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      this.formData = data.data;
      this.isLoading = false;
      this.setFormValue();
    })
  }
  setFormValue(){
    this.DepartmentMaster.controls['uc0001'].setValue(this.formData.uc0001)
    this.DepartmentMaster.controls['ff0001'].setValue(this.formData.ff0001)
    this.DepartmentMaster.controls['ff0002'].setValue(this.formData.ff0002)
    this.DepartmentMaster.controls['ff0003'].setValue(this.formData.ff0003)
    this.DepartmentMaster.controls['ff0004'].setValue(this.formData.ff0004)
    this.DepartmentMaster.controls['ff0005'].setValue(this.formData.ff0005)
    if(this.formData.ff0007=='1'){
      this.checkBoxValue.ff0007=this.formData.ff0007;
      this.DepartmentMaster.controls['ff0007'].setValue('1')
    }else{
      this.checkBoxValue.ff0007=this.formData.ff0007;
    this.DepartmentMaster.controls['ff0007'].setValue('0')
    }

    if(this.formData.ff0008=='1'){
      this.checkBoxValue.ff0008=this.formData.ff0008;
      this.DepartmentMaster.controls['ff0008'].setValue('1')
    }else{
      this.checkBoxValue.ff0008=this.formData.ff0008;
    this.DepartmentMaster.controls['ff0008'].setValue('0')
    }

    if(this.formData.ff0009=='1'){
      this.checkBoxValue.ff0009=this.formData.ff0009;
      this.DepartmentMaster.controls['ff0009'].setValue('1')
    }else{
      this.checkBoxValue.ff0009=this.formData.ff0009;
    this.DepartmentMaster.controls['ff0009'].setValue('0')
    }

    if(this.formData.ff0010=='1'){
      this.checkBoxValue.ff0010=this.formData.ff0010;
      this.DepartmentMaster.controls['ff0010'].setValue('1')
    }else{
      this.checkBoxValue.ff0010=this.formData.ff0010;
    this.DepartmentMaster.controls['ff0010'].setValue('0')
    }
    this.DepartmentMaster.controls['ff0011'].setValue(this.formData.ff0011)
    this.DepartmentMaster.controls['ff0012'].setValue(this.formData.ff0012)
    this.DepartmentMaster.controls['ff0013'].setValue(this.formData.ff0013)
    this.DepartmentMaster.controls['status'].setValue(this.formData.status)
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments)
  }
  onUpdate(){
    this.isLoading = true;
    this.securityProfileService.onCreate(this.DepartmentMaster.value).subscribe((data: any) => {
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
    this.securityProfileService.onCreate(this.DepartmentMaster.value).subscribe((data: any) => {
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
  openUnitListCodeLOV() {
    // this.displayedColumns = [
    //   { field: 'unitCode', title: 'Code' },
    //   { field: 'unitName', title: 'Description' },
    // ];
    this.displayedColumns = ['unitCode', 'unitName']
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Business Unit",
        dialogColumns: this.displayedColumns,
        dialogData: this.unitList,
        lovName: 'businessUnitListdsdsd'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0001'].setValue(this.selectedDialogData.unitCode)
      }
    })
  }
    
  onUnitListChange() {
    if (this.DepartmentMaster.controls['ff0001'].value == '') {
      this.DepartmentMaster.controls['ff0001'].setValue('')
    } else {
      let currentPlantCodeValue = this.DepartmentMaster.controls['ff0001'].value;
      this.isPlantCodeSuccess = false;
      this.unitList.forEach(elements => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      })
      if (this.isPlantCodeSuccess == false) {
        this.DepartmentMaster.controls['ff0001'].setErrors({ 'incorrect': true })
        this.openUnitListCodeLOV();
      }
    }
  }
  openStatusLOV() {
    this.displayedColumns = ['code', 'description']
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





