import { Component,OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {MessageService} from '../../../service/message.service';
import { AdminService } from 'src/app/service/admin.service';
import {GlobalConstants} from '../../../common/global-constants';
import { UserListComponent } from '../user-list/user-list.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectedUserListComponent } from '../selected-user-list/selected-user-list.component';
import { ActiveUserListComponent } from '../active-user-list/active-user-list.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';


@Component({
  selector: 'app-create-active-life-cycle',
  templateUrl: './create-active-life-cycle.component.html',
  styleUrls: ['./create-active-life-cycle.component.scss']
})
export class CreateActiveLifeCycleComponent implements OnInit{

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;

  LifeCycleForm: FormGroup;
  AddedUserdisplayedColumns: string[] = ['stage','role','userList','download', 'signature','print','esign','allUser'];
  constructor(public fb: FormBuilder,
    private adminService:AdminService,
    public messageService:MessageService,
    public dialog: MatDialog,){

    this.LifeCycleForm = this.fb.group({
      businessUnit:['',Validators.required],
      department:['',Validators.required],
      module:['',Validators.required],
      lifeCycleCode:['',Validators.required],
      status:['',Validators.required],
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
  userList:useridList
})
this.tableData = new MatTableDataSource(this.UserRoleTable);
this.tableData.paginator = this.paginator;
this.tableData.sort = this.sort;

console.log(this.UserRoleTable)
console.log(this.selectedDataList)
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
     let body={
      lifeCycleStageList:[],
      businessUnit:this.LifeCycleForm.controls['businessUnit'].value,
      department:this.LifeCycleForm.controls['department'].value,
      module:this.LifeCycleForm.controls['module'].value,
      lifecycle:this.LifeCycleForm.controls['lifeCycleCode'].value,
      status:this.LifeCycleForm.controls['status'].value,
      //role:this.LifeCycleForm.controls['role'].value,
      comments:this.LifeCycleForm.controls['comments'].value,
    }
   
    body.lifeCycleStageList=this.UserRoleTable
    console.log(this.UserRoleTable)
    console.log(this.LifeCycleForm.value)
    let merge =Object.assign(this.UserRoleTable,this.LifeCycleForm.value);
    console.log(merge)
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
      }
    })
  }
  onRole(role){
    return this.LifeCycleForm.controls['module'].value+" - "+role
  }
}