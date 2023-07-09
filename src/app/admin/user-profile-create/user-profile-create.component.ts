import { Component,OnInit,AfterViewInit,Inject  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { AdminService } from 'src/app/service/admin.service';
import * as moment from 'moment';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MessageService} from '../../service/message.service';
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
      status:['',Validators.required],
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
    }else{
      this.isReadOnly=false;
      this.isUpdate=false;
      console.log('create condition')
    }
  }
  formValue:any;
  onLoadFormValue(){
    //load functionality
    // console.log(this.userData.userData.employeeId);
    // console.log(this.userData.tableData);
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
  //  console.log(finalList)
  this.formValue=finalList[0];
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
  onloadDropDown(){
    this.adminService.getDropDownList().subscribe((data: any) => {
      console.log(data)
      this.deptCodeList=data.data.deptCodeList;
      this.plantList=data.data.plantList;
      this.designationList=data.data.designationList;
      this.subDeptList=data.data.subDeptList;
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
}
