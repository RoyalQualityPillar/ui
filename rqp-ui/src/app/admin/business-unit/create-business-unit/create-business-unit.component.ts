import { Component,OnInit,AfterViewInit,Inject  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { AdminService } from 'src/app/admin/admin.service';
import * as moment from 'moment';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MessageService} from '../../../service/message.service';
import { BusinessUnitService } from '../business-unit.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import {CookieService} from 'ngx-cookie-service';
import { elements } from 'chart.js';
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
  selector: 'app-create-business-unit',
  templateUrl: './create-business-unit.component.html',
  styleUrls: ['./create-business-unit.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CreateBusinessUnitComponent implements OnInit  {
  isReadOnly=true;
  isUpdate=false;
  BusinessUnit: FormGroup;
  deptCodeList:any;
  plantList:any;
  designationList:any;
  subDeptList:any;
  orgList:any;
  buTypeList:any;
  unitList:any;
  isLoading=false;
  statusList:any;
  constructor(public fb: FormBuilder,
              private route:Router,
              private adminService:AdminService,
              public dialog: MatDialog,
              private messageService:MessageService,
              private businessUnitService:BusinessUnitService,
              private cookieService:CookieService,
              public dialogRef: MatDialogRef<CreateBusinessUnitComponent>,
              @Inject(MAT_DIALOG_DATA) public userData: userData){
                this.BusinessUnit = this.fb.group({
                  ff0001:[''],
                  ff0002:['',Validators.required],
                  uc0001:['',Validators.required],
                  ff0003:[''],
                  ff0004:['',Validators.required],
                  ff0005:[''],
                  ff0006:[''],
                  ff0007:['',Validators.required],
                  ff0008:['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
                  ff0009:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
                  ff0010:['',[Validators.required,Validators.email]],
                  ff0011:[''],
                  ff0012:['',Validators.required],
                  ff0013:['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
                  ff0014:[''],
                  ff0015:[''],
                  ff0016:[''],
                  ff0017:[''],
                  ff0018:[''],
                  uc0002:['',Validators.required],
                  comments:[''],
                  createdby:[''],
                  status:['']

                })
              }
     ngOnInit(): void { 
      this.onloadDropDown();
      this.onLoadStatusDropDown();
      console.log(this.userData.type)
      if(this.userData.type=='Update'){
        this.isReadOnly=true;
        this.isUpdate=true;
         this.onLoadFormValue();
      }else{
        this.isReadOnly=false;
        this.isUpdate=false;
      }
        }      
        onloadDropDown(){
          this.isLoading=true;
          this.businessUnitService.getDropDownList().subscribe((data: any) => {
            console.log(data)
            this.orgList=data.data.orgList;
            this.buTypeList=data.data.buTypeList;
            this.unitList=data.data.unitList;
            this.isLoading=false;
          })
          
        }
        onLoadStatusDropDown(){
          this.isLoading=true;
          this.adminService.getDropDownList().subscribe((data: any) => {
            console.log(data)
            this.statusList=data.data.statusInfo;
            this.isLoading=false;
          })
           
        }
        formData:any;
        onLoadFormValue(){
          console.log(this.userData)
          this.isLoading=true;
          this.businessUnitService.onLoadUpdatePage(this.userData.tableData.uc0001,this.userData.tableData.uc0002).subscribe((data: any) => {
            this.formData=data.data;
            this.isLoading=false;
           this.setFormValue();
          })
        }
        setFormValue(){
          console.log(this.formData.ff0010)
         this.BusinessUnit.controls['ff0001'].setValue(this.formData.ff0001);
         this.BusinessUnit.controls['ff0002'].setValue(this.formData.ff0002);
         this.BusinessUnit.controls['uc0001'].setValue(this.formData.uc0001);
         this.BusinessUnit.controls['ff0003'].setValue(this.formData.ff0003);
         this.BusinessUnit.controls['ff0004'].setValue(this.formData.ff0004);
         this.BusinessUnit.controls['ff0005'].setValue(this.formData.ff0005);
         this.BusinessUnit.controls['ff0006'].setValue(this.formData.ff0006);
         this.BusinessUnit.controls['ff0007'].setValue(this.formData.ff0007);
         this.BusinessUnit.controls['ff0008'].setValue(this.formData.ff0008);
         this.BusinessUnit.controls['ff0009'].setValue(this.formData.ff0009);
         this.BusinessUnit.controls['ff0010'].setValue(this.formData.ff0010);
         this.BusinessUnit.controls['ff0011'].setValue(this.formData.ff0011);
         this.BusinessUnit.controls['ff0012'].setValue(this.formData.ff0012);
         this.BusinessUnit.controls['ff0013'].setValue(this.formData.ff0013);
         this.BusinessUnit.controls['ff0014'].setValue(this.formData.ff0014);
         this.BusinessUnit.controls['ff0015'].setValue(this.formData.ff0015);
         this.BusinessUnit.controls['ff0016'].setValue(this.formData.ff0016);
        //  this.BusinessUnit.controls['ff0017'].setValue(this.formData.ff0017);
        //  this.BusinessUnit.controls['ff0018'].setValue(this.formData.ff0018);
         this.BusinessUnit.controls['uc0002'].setValue(this.formData.uc0002);
         this.BusinessUnit.controls['status'].setValue(this.formData.status);
         this.BusinessUnit.controls['comments'].setValue(this.formData.comments);
        }
        onUpdate(){
          this.businessUnitService.onCreate(this.BusinessUnit.value).subscribe((data: any) => {
            if(data.errorInfo !=null){
              this.dialog.open(MessageDialogComponent, {
                data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
              });
            }else{
              this.messageService.sendSnackbar('success','Record Updayed Successfully');
              this.dialogRef.close();
            }
          })
        }
        onCreate(){
          this.BusinessUnit.controls['createdby'].setValue(this.cookieService.get('userId'))
          this.businessUnitService.onCreate(this.BusinessUnit.value).subscribe((data: any) => {
            if(data.errorInfo !=null){
              this.dialog.open(MessageDialogComponent, {
                data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
              });
            }else{
              this.messageService.sendSnackbar('success','Record Created Successfully');
              this.dialogRef.close();
            }
          })
        }
        onClear(){
          this.BusinessUnit.reset();
        }
        displayedColumns:any;
        selectedDialogData:any;
        openBusinessOrgCodeLOV(){
          this.displayedColumns = ['orgCode','orgName']
          const dialogRef = this.dialog.open(LovDialogComponent, {
            height: "500px",
            width: "600px",
            data: {
              dialogTitle: "Organization List",
              dialogColumns: this.displayedColumns,
              dialogData: this.orgList,
              lovName:'organizationList'
            },
            disableClose: true
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
               this.selectedDialogData = result.data;
              // this.onSelectedCustomerChange(this.selectedDialogData)
              this.BusinessUnit.controls['ff0002'].setValue(this.selectedDialogData.orgCode)
              this.BusinessUnit.controls['ff0001'].setValue(this.selectedDialogData.orgName)
            }
          })
        }
        isOrgFieldValueSuccess=false;
        onChangeOrgCode(){
          
          if( this.BusinessUnit.controls['ff0002'].value==''){
            this.BusinessUnit.controls['ff0001'].setValue('')
            this.BusinessUnit.controls['ff0002'].setValue('')
          }else {
            this.isOrgFieldValueSuccess=false;
            let businessUnitCodeFieldValue=this.BusinessUnit.controls['ff0002'].value;
            this.orgList.forEach(elements=>{
              if(elements.orgCode==businessUnitCodeFieldValue){
                this.isOrgFieldValueSuccess=true
                this.BusinessUnit.controls['ff0001'].setValue(elements.orgName)
              }
            })
            if(this.isOrgFieldValueSuccess==false){
              this.BusinessUnit.controls['ff0002'].setErrors({"incorrect":true});
              this.openBusinessOrgCodeLOV();
            }
          }
        }
openBusinessUnitCodeLOV(){
  this.displayedColumns = ['unitCode','unitName']
  const dialogRef = this.dialog.open(LovDialogComponent, {
    height: "500px",
    width: "600px",
    data: {
      dialogTitle: "Business Unit",
      dialogColumns: this.displayedColumns,
      dialogData: this.unitList,
      lovName:'businessUnitList'
    },
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
       this.selectedDialogData = result.data;
       console.log(this.selectedDialogData)
      // this.onSelectedCustomerChange(this.selectedDialogData)
      this.BusinessUnit.controls['uc0001'].setValue(this.selectedDialogData.unitCode)
      this.BusinessUnit.controls['ff0003'].setValue(this.selectedDialogData.unitName)
      }
      }) 
} 
onChangeUnitCode(){
  if( this.BusinessUnit.controls['uc0001'].value==''){
    this.BusinessUnit.controls['uc0001'].setValue('')
    this.BusinessUnit.controls['ff0003'].setValue('')
  }
}   
openCategoryLOV(){
  this.displayedColumns = ['buTypeCode','buTypeName']
  const dialogRef = this.dialog.open(LovDialogComponent, {
    height: "500px",
    width: "600px",
    data: {
      dialogTitle: "Business Unit",
      dialogColumns: this.displayedColumns,
      dialogData: this.buTypeList,
      lovName:'categoryList'
    },
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
       this.selectedDialogData = result.data;
       console.log(this.selectedDialogData)
      // this.onSelectedCustomerChange(this.selectedDialogData)
      this.BusinessUnit.controls['uc0002'].setValue(this.selectedDialogData.buTypeCode)
      }
      }) 
}  
isCategorySuccess=false;
onChangeCategory(){
  if(this.BusinessUnit.controls['uc0002'].value==''){
    this.BusinessUnit.controls['uc0002'].setValue('')
  }else{
    this.isCategorySuccess=false;
    let categoryCurrentValue=this.BusinessUnit.controls['uc0002'].value;
    this.buTypeList.forEach(elements=>{
      if(elements.buTypeCode==categoryCurrentValue){
        this.isCategorySuccess=true;
      }
    })
    if(this.isCategorySuccess==false){
      this.BusinessUnit.controls['uc0002'].setErrors({"incorrect":true});
      this.openCategoryLOV();
    }
  }
}
openStatusLOV(){
  this.displayedColumns = ['code','description']
  const dialogRef = this.dialog.open(LovDialogComponent, {
    height: "500px",
    width: "600px",
    data: {
      dialogTitle: "Status",
      dialogColumns: this.displayedColumns,
      dialogData: this.statusList,
      lovName:'statusList'
    },
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
       this.selectedDialogData = result.data;
       console.log(this.selectedDialogData)
      // this.onSelectedCustomerChange(this.selectedDialogData)
      this.BusinessUnit.controls['status'].setValue(this.selectedDialogData.code)
      }
      })  
}
isStatusSuccess=false;
onChangeStatus(){
  if(this.BusinessUnit.controls['status'].value==''){
    this.BusinessUnit.controls['status'].setValue('');
  }else{
    this.isStatusSuccess=false;
    let currentStatusValue=this.BusinessUnit.controls['status'].value;
    this.statusList.forEach(elements=>{
      if(elements.code==currentStatusValue){
        this.isStatusSuccess=true;

      }
    })
    if(this.isStatusSuccess==false){
      this.openStatusLOV();
      this.BusinessUnit.controls['status'].setErrors({'incorrect':true})
    }
  }
}
}
