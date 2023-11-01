import { Component,OnInit,AfterViewInit,Inject  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { AdminService } from 'src/app/admin/admin.service';
import * as moment from 'moment';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MessageService} from '../../service/message.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
}

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
  selector: 'app-user-profile-create',
  templateUrl: './user-profile-create.component.html',
  styleUrls: ['./user-profile-create.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UserProfileCreateComponent implements OnInit  {
  isReadOnly=false;
  isUpdate=false;
  BusinessUnit: FormGroup;
  constructor(public fb: FormBuilder,
              private route:Router,
              private adminService:AdminService,
              public dialog: MatDialog,
              private messageService:MessageService,
              public dialogRef: MatDialogRef<UserProfileCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public userData: userData){
    this.BusinessUnit = this.fb.group({
      // id:this.fb.group({
      //   employeeId:['',Validators.required],
      //   userId:['',Validators.required],
      //   version:['1']
      // }),
      employeeId:['',Validators.required],
      userId:['',Validators.required],
      version:['1'],
      altEmail:['',Validators.email],
      altMobile:['',Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      branchId:['',Validators.required],
      branchName:['',Validators.required],
      dob:['',Validators.required],
      department:['',Validators.required],
      designation:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      effectiveDate:['',Validators.required],
      firstName:['',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      gender:['',Validators.required],
      lastName:['',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      levelOneManager:['',Validators.required],
      levelTwoManager:['',Validators.required],
      lifecyclecode:[''],
      mobile:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      userRights:[''],
      userStatus:[''],
      status:[''],
      joinedDate:['',Validators.required],
      urpcomments:['',Validators.required],

    }); 

  }

  ngOnInit(): void {
    console.log(this.userData)
    this.onloadDropDown();
    if(this.userData.type=='Update'){
      this.isReadOnly=true;
      this.isUpdate=true;
       this.onLoadFormValue();
    }else if(this.userData.type=="active_User_Update"){
      this.isReadOnly=true;
      this.isUpdate=true;
      this.onActiveUserOnLoad()
    }
    else if(this.userData.type=="Create"){
      this.isReadOnly=false;
      this.isUpdate=false;
      console.log('create condition')
    }
  }
  onActiveUserOnLoad(){
    let finalList=[];
    this.userData.tableData.forEach(element =>{
      if(element.employeeId == this.userData.userData.employeeId){
        console.log(element.userId)
       
        let newDataList={
        'employeeId':element.employeeId,
        'userId':element.userId,
        'version':element.version,

        'altEmail':element.altEmail,
        'altMobile':element.altMobile,
        'branchId':element.branchId,
        'branchName':element.branchName,
        'dob':element.dob,
        'department':element.department,
        'designation':element.designation,
        'email':element.email,
        'effectiveDate':element.effectiveDate,
        'firstName':element.firstName,
        'gender':element.gender,
        'lastName':element.lastName,
        'levelOneManager':element.levelOneManager,
        'levelTwoManager':element.levelTwoManager,
        'lifecyclecode':element.lifecyclecode,
        'mobile':element.mobile,
        'userStatus':element.userStatus,
        'status':element.status,
        'createdDate':element.createdDate,
        'joinedDate':element.joinedDate,
        'urpcomments':element.urpcomments,
        }
        finalList.push(newDataList)
      }
    })
    this.formValue=finalList[0];
    this.loadFormValue();
    }
  formValue:any;
  onLoadFormValue(){
    let tableCurrentData:any
    tableCurrentData=JSON.parse(this.userData.tableData);
    let finalList=[];
    tableCurrentData.forEach(element =>{
      if(element.employeeId == this.userData.userData.employeeId){
        console.log(element.userId)
       
        let newDataList={
        'employeeId':element.employeeId,
        'userId':element.userId,
        'version':element.version,

        'altEmail':element.altEmail,
        'altMobile':element.altMobile,
        'branchId':element.branchId,
        'branchName':element.branchName,
        'dob':element.dob,
        'department':element.department,
        'designation':element.designation,
        'email':element.email,
        'effectiveDate':element.effectiveDate,
        'firstName':element.firstName,
        'gender':element.gender,
        'lastName':element.lastName,
        'levelOneManager':element.levelOneManager,
        'levelTwoManager':element.levelTwoManager,
        'lifecyclecode':element.lifecyclecode,
        'mobile':element.mobile,
        'userStatus':element.userStatus,
        'status':element.status,
        'createdDate':element.createdDate,
        'joinedDate':element.joinedDate,
        'urpcomments':element.urpcomments,
        }
        finalList.push(newDataList)
      }
    })
  this.formValue=finalList[0];
  this.loadFormValue();
 
  }
  loadFormValue(){
    console.log(this.formValue)
    this.BusinessUnit.controls['employeeId'].setValue(this.formValue.employeeId);
    this.BusinessUnit.controls['userId'].setValue(this.formValue.userId);
    this.BusinessUnit.controls['firstName'].setValue(this.formValue.firstName);
    this.BusinessUnit.controls['lastName'].setValue(this.formValue.lastName);
    this.BusinessUnit.controls['branchName'].setValue(this.formValue.branchId);
    this.BusinessUnit.controls['branchId'].setValue(this.formValue.branchId);
    this.BusinessUnit.controls['department'].setValue(this.formValue.department);
    this.BusinessUnit.controls['email'].setValue(this.formValue.email);
    this.BusinessUnit.controls['altEmail'].setValue(this.formValue.altEmail);
    this.BusinessUnit.controls['mobile'].setValue(this.formValue.mobile);
    this.BusinessUnit.controls['altMobile'].setValue(this.formValue.altMobile);
    this.BusinessUnit.controls['levelOneManager'].setValue(this.formValue.levelOneManager)
    this.BusinessUnit.controls['levelTwoManager'].setValue(this.formValue.levelTwoManager)
    this.BusinessUnit.controls['gender'].setValue(this.formValue.gender);
   console.log(this.formValue.status)
   if(this.formValue.status==1001){
    this.formValue.status='1001'
   }else if(this.formValue.status==1004){
    this.formValue.status='1004'
   }else if(this.formValue.status==1003){
    this.formValue.status='1003'
   }
    this.BusinessUnit.controls['status'].setValue(this.formValue.status)
    let dob= moment(this.formValue.dob,'DD-MM-YYYY').format();
    this.BusinessUnit.controls['dob'].setValue(dob)
  
    let newFormatDate1= moment(this.formValue.createdDate,'DD-MM-YYYY').format();
    console.log(newFormatDate1);
    this.BusinessUnit.controls['joinedDate'].setValue(newFormatDate1);
  
    let newFormatDate11= moment(this.formValue.effectiveDate,'DD-MM-YYYY').format();
    console.log(newFormatDate11)
    this.BusinessUnit.controls['effectiveDate'].setValue(newFormatDate11)
  
    this.BusinessUnit.controls['urpcomments'].setValue(this.formValue.urpcomments)
  }
  deptCodeList:any;
  plantList:any;
  designationList:any;
  subDeptList:any;
  statusInfo:any;
  onloadDropDown(){
    this.adminService.getDropDownList().subscribe((data: any) => {
      console.log(data)
      this.deptCodeList=data.data.deptCodeList;
      this.plantList=data.data.plantList;
      this.designationList=data.data.designationList;
      this.subDeptList=data.data.subDeptList;
      this.statusInfo=data.data.statusInfo;
    })
  }
  onCreate(){
    
    //this.BusinessUnit.controls['dob'].setValue(dob);
    console.log(this.BusinessUnit.value);
    this.adminService.saveUserData(this.BusinessUnit.value).subscribe((data: any) => {
      console.log(data);
      if(data.errorInfo !=null){
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      }else{
        // this.dialog.open(MessageDialogComponent, {
        //   data: { 'message': "Record Created Successfully.", 'heading': "Information" }
        // });
        this.messageService.sendSnackbar('success','Record Created Successfully');
      }
    })
  }
  onClear(){
   this.BusinessUnit.reset();
  }
  onUpdate(){
    console.log(this.BusinessUnit.value);
    this.adminService.saveUserData(this.BusinessUnit.value).subscribe((data: any) => {
      console.log(data);
      if(data.errorInfo !=null){
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      }else{
        // this.dialog.open(MessageDialogComponent, {
        //   data: { 'message': "Record Created Successfully.", 'heading': "Information" }
        // });
        this.messageService.sendSnackbar('success','Record Updated Successfully');
      }
    }) 
  }

  /**********************LOV IMPLEMENTATION *******************************************/
  displayedColumns:any;
  selectedDialogData:any;
  openBranchCodeLOV(){
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Branch Code",
        dialogColumns: this.displayedColumns,
        dialogData: this.plantList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.BusinessUnit.controls['branchId'].setValue(this.selectedDialogData.unitCode)
      }
    })
  }
  isBranchCodeSuccess:any;
  onChangeBranchCode(){
    if (this.BusinessUnit.controls['branchId'].value == '') {
      this.BusinessUnit.controls['branchId'].setValue('')
    } else {
      let currentPlantCodeValue = this.BusinessUnit.controls['branchId'].value;
      this.isBranchCodeSuccess = false;
      this.plantList.forEach(elements => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isBranchCodeSuccess = true;
        }
      })
      if (this.isBranchCodeSuccess == false) {
        this.BusinessUnit.controls['branchId'].setErrors({ 'incorrect': true })
        this.openBranchCodeLOV();
      }
    }
  }
  onChangeDepCode(){
    if (this.BusinessUnit.controls['department'].value == '') {
      this.BusinessUnit.controls['department'].setValue('')
    } else {
      let currentPlantCodeValue = this.BusinessUnit.controls['department'].value;
      this.isBranchCodeSuccess = false;
      this.deptCodeList.forEach(elements => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isBranchCodeSuccess = true;
        }
      })
      if (this.isBranchCodeSuccess == false) {
        this.BusinessUnit.controls['department'].setErrors({ 'incorrect': true })
        this.openDepCodeLOV();
      }
    }
  }
  openDepCodeLOV(){
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Branch Code",
        dialogColumns: this.displayedColumns,
        dialogData: this.deptCodeList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.BusinessUnit.controls['department'].setValue(this.selectedDialogData.unitCode)
      }
    })
  }

  onChangeSectionCode(){
    if (this.BusinessUnit.controls['branchName'].value == '') {
      this.BusinessUnit.controls['branchName'].setValue('')
    } else {
      let currentPlantCodeValue = this.BusinessUnit.controls['branchName'].value;
      this.isBranchCodeSuccess = false;
      this.plantList.forEach(elements => {
        if (elements.unitName == currentPlantCodeValue) {
          this.isBranchCodeSuccess = true;
        }
      })
      if (this.isBranchCodeSuccess == false) {
        this.BusinessUnit.controls['branchName'].setErrors({ 'incorrect': true })
        this.openSectionCodeLOV();
      }
    }
  }
  openSectionCodeLOV(){
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Section",
        dialogColumns: this.displayedColumns,
        dialogData: this.plantList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.BusinessUnit.controls['branchName'].setValue(this.selectedDialogData.unitName)
      }
    })
  }
  isDesignationSuccess:any;
  currentDesignationCodeValue:any;
  onChangeDesignationCode(){
    if (this.BusinessUnit.controls['designation'].value == '') {
      this.BusinessUnit.controls['designation'].setValue('')
    } else {
      let currentDesignationCodeValue = this.BusinessUnit.controls['designation'].value;
      this.isDesignationSuccess = false;
      this.designationList.forEach(elements => {
        if (elements.unitCode == currentDesignationCodeValue) {
          this.isDesignationSuccess = true;
        }
      })
      if (this.isDesignationSuccess == false) {
        this.BusinessUnit.controls['designation'].setErrors({ 'incorrect': true })
        this.openDesignationCodeLOV();
      }
    }
  }


  openDesignationCodeLOV(){
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Designation",
        dialogColumns: this.displayedColumns,
        dialogData: this.designationList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.BusinessUnit.controls['designation'].setValue(this.selectedDialogData.unitName)
      }
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
        dialogData: this.statusInfo,
        lovName: 'statusList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.BusinessUnit.controls['status'].setValue(this.selectedDialogData.code)
      }
    })
  }
  isStatusSuccess:any;
  onChangeStatus() {
    if (this.BusinessUnit.controls['status'].value == '') {
      this.BusinessUnit.controls['status'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.BusinessUnit.controls['status'].value;
      this.statusInfo.forEach(elements => {
        if (elements.code == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.BusinessUnit.controls['status'].setErrors({ 'incorrect': true })
        this.openStatusLOV();
      }
    }
  }
}
