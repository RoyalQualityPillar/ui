import { Component,OnInit,Inject  } from '@angular/core';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService} from '../../../../service/message.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import {CookieService} from 'ngx-cookie-service';
import { changeStatusByCode ,changeStatusByDescription} from 'src/app/common/removeEmptyStrings';
import { DosageFormService } from '../dosage-form.service';
import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
import { BusinessUnitService } from 'src/app/rqp-admin-module/admin-master-data/business-unit/business-unit.service';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}


@Component({
  selector: 'app-create-update-dosage-form',
  templateUrl: './create-update-dosage-form.component.html',
  styleUrls: ['./create-update-dosage-form.component.scss']
})
export class CreateUpdateDosageFormComponent implements OnInit  {
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
    public dialogRef: MatDialogRef<CreateUpdateDosageFormComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData,
    private payementTermService:DosageFormService,private businessUnitService:BusinessUnitService) {
    this.DepartmentMaster = this.fb.group({
      ff0002: ['', Validators.required],
      uc0001: ['', Validators.required],
      ff0001: ['', Validators.required],
      version: [''],
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
  buUnitList:any;
  mtMasterList:any;
  utMasterList:any;
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
    this.payementTermService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
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
    this.DepartmentMaster.controls['version'].setValue(this.formData.version)
    
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments)
     let statusByValue=changeStatusByCode(this.formData.status)
    this.DepartmentMaster.controls['status'].setValue(statusByValue)
  }
  onUpdate(){
    this.isLoading = true;
     this.DepartmentMaster.controls['status'].setValue(changeStatusByDescription(this.DepartmentMaster.controls['status'].value))
     console.log(this.DepartmentMaster.value)
    this.payementTermService.onCreate(this.DepartmentMaster.value).subscribe((data: any) => {
      if (data.errorInfo != null) {
        this.isLoading = false;
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
        this.DepartmentMaster.controls['status'].setValue(changeStatusByCode(this.DepartmentMaster.controls['status'].value))
      } else {
        this.isLoading = false;
        this.messageService.sendSnackbar('success', 'Record Updated Successfully');
        this.dialogRef.close();
      }
    }),
    (error)=>{
      console.log(error)
      this.DepartmentMaster.controls['status'].setValue(changeStatusByCode(this.DepartmentMaster.controls['status'].value))
    }

  }
  onCreate(){
    this.isLoading = true;
    this.DepartmentMaster.controls['createdby'].setValue(this.cookieService.get('userId'))
    this.payementTermService.onCreate(this.DepartmentMaster.value).subscribe((data: any) => {
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
        this.DepartmentMaster.controls['ff0002'].setValue(this.selectedDialogData.unitCode)
      }
    })
  }
    
  onChangePlantCode() {
    if (this.DepartmentMaster.controls['ff0002'].value == '') {
      this.DepartmentMaster.controls['ff0002'].setValue('')
    } else {
      let currentPlantCodeValue = this.DepartmentMaster.controls['ff0002'].value;
      this.isPlantCodeSuccess = false;
      this.unitList.forEach(elements => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      })
      if (this.isPlantCodeSuccess == false) {
        this.DepartmentMaster.controls['ff0002'].setErrors({ 'incorrect': true })
        this.openBusinessUnitCodeLOV();
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
        this.DepartmentMaster.controls['status'].setValue(this.selectedDialogData.description)
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
        if (elements.description == statusCurrentValue) {
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



