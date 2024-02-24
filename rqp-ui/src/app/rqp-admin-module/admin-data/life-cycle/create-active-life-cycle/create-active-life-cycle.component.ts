import { Component,OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { UserListComponent } from '../user-list/user-list.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectedUserListComponent } from '../selected-user-list/selected-user-list.component';
import { ActiveUserListComponent } from '../active-user-list/active-user-list.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageService } from 'src/app/service/message.service';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-create-active-life-cycle',
  templateUrl: './create-active-life-cycle.component.html',
  styleUrls: ['./create-active-life-cycle.component.scss']
})
export class CreateActiveLifeCycleComponent implements OnInit{

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;

  LifeCycleForm: FormGroup;
  AddedUserdisplayedColumns: string[] = ['action','stage','role','userList','download', 'signature','print','esign','allUser'];
  constructor(public fb: FormBuilder,
    private adminService:AdminService,
    public messageService:MessageService,
    public dialog: MatDialog, public refDialog :MatDialogRef<CreateActiveLifeCycleComponent>,){

    this.LifeCycleForm = this.fb.group({
      businessUnit:['',Validators.required],
      department:['',Validators.required],
      module:['',Validators.required],
      lifeCycleCode:['',Validators.required],
      status:['',Validators.required],
      lc_req_code:[''],
      comments:[''],
    })
  }
  deptCodeList:any;
  plantList:any;
  designationList:any;
  subDeptList:any;
  rolesList:any;
  moduleList:any;
  statusInfo:any;
  isLoading=false;
  size:any;
  pageIndex:any;
  dataSource:any;
  data1:any;
  selectedTab=0;
  isReadOnly=true;
  ngOnInit(): void {
    this.onloadDropDown();
    this.onSearchUser();
    this.LifeCycleForm.controls['lifeCycleCode'].setValue('LC')
    this.LifeCycleForm.controls['status'].setValue('1001')
    console.log( this.LifeCycleForm.controls['status'].value)
  }

  onloadDropDown(){
    this.adminService.getDropDownList().subscribe((data: any) => {
      console.log(data)
      this.deptCodeList=data.data.deptCodeList;
      this.plantList=data.data.plantList;
      this.designationList=data.data.designationList;
      this.subDeptList=data.data.subDeptList;
      this.rolesList=data.data.rolesList;
      this.moduleList=data.data.moduleList;
      this.statusInfo=data.data.statusInfo;
    })
  }
  onSearchUser(){
    this.isLoading=true;
    this.size=GlobalConstants.size;
    this.dataSource=null;
   this.pageIndex=0;
    this.adminService.getActiveUserList(this.size,this.pageIndex).subscribe((data: any) => {
      console.log(data)
      console.log(data.data.content)
      this.data1=data.data.content;
    })
  }
  selectedUser:any
onUserList(){
  const dialogRef = this.dialog.open(ActiveUserListComponent, {
    minWidth: "80%",
    data:{type:'List'},
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
   console.log(dialogResult);
   this.selectedUser=dialogResult.data;
  }
    
  });
}
selectedDataList={
  role:"",
  userList:[],
  download:false,
  signature:false,
  print:false,
  esign:false,
  allUser :false,
}
UserRoleTable:any[]=[]
//selectedDataList:any;
selectedDataTable:any;
tableData:any;
onCreateSelectedDataList(){
console.log("click")
if(this.selectedDataList.role==''){
  this.dialog.open(MessageDialogComponent, {
    data: { 'message': "Please select role before add row", 'heading': "Error Information" }
  });
return; 
}
if(this.selectedUser==undefined ){
  this.dialog.open(MessageDialogComponent, {
    data: { 'message': "Please select user before add row", 'heading': "Error Information" }
  });
return;
}
this.selectedDataList.userList=this.selectedUser;
let useridList=[]
console.log(this.UserRoleTable)
this.selectedUser.forEach(ele=>{
  console.log(ele.userId)
  useridList.push(ele.userId)
})
console.log(useridList)
let stage =this.UserRoleTable.length;
this.UserRoleTable.push({
  stage:++stage,
  role:this.selectedDataList.role,
  download:this.selectedDataList.download,
  signature:this.selectedDataList.signature,
  print:this.selectedDataList.print,
  esign:this.selectedDataList.esign,
  allUser:this.selectedDataList.allUser ,
  userList:useridList,
  useridList:this.selectedUser
})
this.tableData = new MatTableDataSource(this.UserRoleTable);
this.tableData.paginator = this.paginator;
this.tableData.sort = this.sort;

console.log(this.UserRoleTable)
console.log(this.selectedDataList)
}

onUserRemove(row:any){
  this.UserRoleTable.splice(this.UserRoleTable.indexOf(row),1);
  this.tableData = new MatTableDataSource(this.UserRoleTable);
  this.tableData.paginator = this.paginator;
  this.tableData.sort = this.sort;
}
//onSubmit
onDisplayList(row:any){
  console.log(row)
  const dialogRef = this.dialog.open(SelectedUserListComponent, {
    minWidth: "80%",
    data:{tableData:row},
  });
  
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
   console.log(dialogResult);
  }
    
  });
  }
  onSubmit(){
     //todo
    //  if(this.LifeCycleForm.invalid){
    //   this.dialog.open(MessageDialogComponent, {
    //     data: { 'message': "Please enter all required field", 'heading': "Error Information" }
    //   });
    //   return
    //  }
     let body={
      lifeCycleStageList:[],
      businessUnit:this.LifeCycleForm.controls['businessUnit'].value,
      department:this.LifeCycleForm.controls['department'].value,
      module:this.LifeCycleForm.controls['module'].value,
      lifecycle:this.LifeCycleForm.controls['lifeCycleCode'].value,
      status:this.LifeCycleForm.controls['status'].value,
      //role:this.LifeCycleForm.controls['role'].value,
      lc_req_code:this.LifeCycleForm.controls['lc_req_code'].value,
      comments:this.LifeCycleForm.controls['comments'].value,
    }
   
    body.lifeCycleStageList=this.UserRoleTable;
    body.lifeCycleStageList.forEach(stage => {
      // Check if the role is "Update"
      if (stage.role === "Update") {
        // Set stage value to 1
        stage.stage = 1;
      } else {
        // For other roles, follow the existing sequence
        stage.stage = stage.stage + 1;
      }
    });
    console.log(this.UserRoleTable.length)
    console.log(body)
    if(this.UserRoleTable.length==0){
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': "Please add user list before submit", 'heading': "Error Information" }
      });
      return;
    }
    console.log(this.UserRoleTable)
    console.log(this.LifeCycleForm.value)
    let merge =Object.assign(this.UserRoleTable,this.LifeCycleForm.value);
    console.log(merge)
    //Validation Part



    this.isLoading=true;
    this.adminService.createAllLifeCycle(body).subscribe((data: any) => {
      console.log(data)
      this.isLoading=false;
      if(data.errorInfo !=null){
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      }else{
        this.messageService.sendSnackbar('success',data.status);
        this.refDialog.close();
      }
    })
  }
  onRole(role){
    return this.LifeCycleForm.controls['module'].value+" - "+role
  }

  /*******************LOV IMPLEMENTATION ***********************************/
  displayedColumns:any;
  selectedDialogData:any;
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
        dialogData: this.plantList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.LifeCycleForm.controls['businessUnit'].setValue(this.selectedDialogData.unitCode)
      }
    })
  }
  isPlantCodeSuccess:any;
  onChangePlantCode() {
    if (this.LifeCycleForm.controls['businessUnit'].value == '') {
      this.LifeCycleForm.controls['businessUnit'].setValue('')
    } else {
      let currentPlantCodeValue = this.LifeCycleForm.controls['businessUnit'].value;
      this.isPlantCodeSuccess = false;
      this.plantList.forEach(elements => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      })
      if (this.isPlantCodeSuccess == false) {
        this.LifeCycleForm.controls['businessUnit'].setErrors({ 'incorrect': true })
        this.openBusinessUnitCodeLOV();
      }
    }
  }
  openDepartmentCodeLOV(){
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Department",
        dialogColumns: this.displayedColumns,
        dialogData: this.deptCodeList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.LifeCycleForm.controls['department'].setValue(this.selectedDialogData.unitCode)
      }
    })
  }
  isDepCodeSuccess:any;
  onChangeDepartmentCode(){
    if (this.LifeCycleForm.controls['department'].value == '') {
      this.LifeCycleForm.controls['department'].setValue('')
    } else {
      let currentPlantCodeValue = this.LifeCycleForm.controls['department'].value;
      this.isDepCodeSuccess = false;
      this.deptCodeList.forEach(elements => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isDepCodeSuccess = true;
        }
      })
      if (this.isDepCodeSuccess == false) {
        this.LifeCycleForm.controls['department'].setErrors({ 'incorrect': true })
        this.openDepartmentCodeLOV();
      }
    }
  }

  openModuleCodeLOV(){
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Module",
        dialogColumns: this.displayedColumns,
        dialogData: this.moduleList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.LifeCycleForm.controls['module'].setValue(this.selectedDialogData.unitCode)
      }
    })
  }
  onChangeModuleCode(){
    if (this.LifeCycleForm.controls['module'].value == '') {
      this.LifeCycleForm.controls['module'].setValue('')
    } else {
      let currentPlantCodeValue = this.LifeCycleForm.controls['module'].value;
      this.isDepCodeSuccess = false;
      this.moduleList.forEach(elements => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isDepCodeSuccess = true;
        }
      })
      if (this.isDepCodeSuccess == false) {
        this.LifeCycleForm.controls['module'].setErrors({ 'incorrect': true })
        this.openModuleCodeLOV();
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
        dialogData: this.statusInfo,
        lovName: 'statusList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.LifeCycleForm.controls['status'].setValue(this.selectedDialogData.code)
      }
    })
  }
  isStatusSuccess:any;
  onChangeStatus() {
    if (this.LifeCycleForm.controls['status'].value == '') {
      this.LifeCycleForm.controls['status'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.LifeCycleForm.controls['status'].value;
      this.statusInfo.forEach(elements => {
        if (elements.code == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.LifeCycleForm.controls['status'].setErrors({ 'incorrect': true })
        this.openStatusLOV();
      }
    }
  }
}