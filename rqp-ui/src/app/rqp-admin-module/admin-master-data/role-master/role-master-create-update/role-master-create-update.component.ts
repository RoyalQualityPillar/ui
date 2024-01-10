import { Component,OnInit,Inject  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleMasterService } from '../role-master.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import {CookieService} from 'ngx-cookie-service';
import { BusinessUnitService } from '../../business-unit/business-unit.service'
import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
import { MessageService } from 'src/app/service/message.service';

export interface userData {
  userData: any;
  type:any;
  tableData:any;
}

@Component({
  selector: 'app-role-master-create-update',
  templateUrl: './role-master-create-update.component.html',
  styleUrls: ['./role-master-create-update.component.scss']
})
export class RoleMasterCreateUpdateComponent implements OnInit  {
  isReadOnly=true;
  isUpdate=false;
  RoleMaster: FormGroup;
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
    private roleMasterService: RoleMasterService,
    private businessUnitService: BusinessUnitService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<RoleMasterCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData) {
    this.RoleMaster = this.fb.group({
      uc0001: ['', Validators.required],
      ff0001: ['', Validators.required],
      ff0002: ['', Validators.required],
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

  onLoadFormValue() {
    this.isLoading = true;
    this.roleMasterService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      this.formData = data.data;
      this.isLoading = false;
      this.setFormValue();
    })
  }
  setFormValue() {
    this.RoleMaster.controls['uc0001'].setValue(this.formData.uc0001)
    this.RoleMaster.controls['ff0001'].setValue(this.formData.ff0001)
    this.RoleMaster.controls['ff0002'].setValue(this.formData.ff0002)
    this.RoleMaster.controls['status'].setValue(this.formData.status)
    this.RoleMaster.controls['comments'].setValue(this.formData.comments)
  }
  onCreate() {
    this.isLoading = true;
    this.RoleMaster.controls['createdby'].setValue(this.cookieService.get('userId'))
    this.roleMasterService.onCreate(this.RoleMaster.value).subscribe((data: any) => {
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
  onUpdate() {
    this.isLoading = true;
    this.roleMasterService.onCreate(this.RoleMaster.value).subscribe((data: any) => {
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
     onClear(){
      this.RoleMaster.reset();
     }
    
  onLoadStatusDropDown() {
    this.isLoading = true;
    this.adminService.getDropDownList().subscribe((data: any) => {
      this.statusList = data.data.statusInfo;
      this.isLoading = false;
    })
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
        this.RoleMaster.controls['status'].setValue(this.selectedDialogData.code)
      }
    })
  }
    
  onChangeStatus() {
    if (this.RoleMaster.controls['status'].value == '') {
      this.RoleMaster.controls['status'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.RoleMaster.controls['status'].value;
      this.statusList.forEach(elements => {
        if (elements.code == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.RoleMaster.controls['status'].setErrors({ 'incorrect': true })
        this.openStatusLOV();
      }
    }
  }
  openBusinessUnitCodeLOV() {
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Business Unit",
        dialogColumns: this.displayedColumns,
        dialogData: this.unitList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.RoleMaster.controls['ff0001'].setValue(this.selectedDialogData.unitCode)
      }
    })
  }
    
  onChangePlantCode() {
    if (this.RoleMaster.controls['ff0001'].value == '') {
      this.RoleMaster.controls['ff0001'].setValue('')
    } else {
      let currentPlantCodeValue = this.RoleMaster.controls['ff0001'].value;
      this.isPlantCodeSuccess = false;
      this.unitList.forEach(elements => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      })
      if (this.isPlantCodeSuccess == false) {
        this.RoleMaster.controls['ff0001'].setErrors({ 'incorrect': true })
        this.openBusinessUnitCodeLOV();
      }
    }
  }
}
