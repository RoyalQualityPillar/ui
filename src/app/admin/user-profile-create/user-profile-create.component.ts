import { Component,OnInit,AfterViewInit  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { AdminService } from 'src/app/service/admin.service';
import * as moment from 'moment';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MessageService} from '../../service/message.service';

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

  BusinessUnit: FormGroup;
  constructor(public fb: FormBuilder,
              private route:Router,
              private adminService:AdminService,
              public dialog: MatDialog,
              private messageService:MessageService,){
    this.BusinessUnit = this.fb.group({
      id:this.fb.group({
        employeeId:['',Validators.required],
        userId:['',Validators.required],
        version:['1']
      }),
      altEmail:['',Validators.email],
      altMobile:[''],
      branchId:['',Validators.required],
      branchName:['',Validators.required],
      dob:['',Validators.required],
      department:['',Validators.required],
      designation:['',Validators.required],
      email:['',Validators.required,Validators.email],
      effectiveDate:['',Validators.required],
      firstName:['',Validators.required],
      gender:['',Validators.required],
      lastName:['',Validators.required],
      levelOneManager:['',Validators.required],
      levelTwoManager:['',Validators.required],
      lifecyclecode:[''],
      mobile:['',Validators.required,Validators.pattern(/^-?([0-9]\d*)?$/)],
      userRights:[''],
      userStatus:[''],
      status:['',Validators.required],
      joinedDate:['',Validators.required],
      urpcomments:['',Validators.required],

    }); 

  }

  ngOnInit(): void {
    this.onloadDropDown()
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
}
