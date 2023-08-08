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

@Component({
  selector: 'app-life-cycle-home',
  templateUrl: './life-cycle-home.component.html',
  styleUrls: ['./life-cycle-home.component.scss']
})
export class LifeCycleHomeComponent implements OnInit{

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;
  selectedTab=0;
  isReadOnly=true;
  deptCodeList:any;
  plantList:any;
  designationList:any;
  subDeptList:any;
  LifeCycleForm: FormGroup;
  size:any;
  pageIndex:any;
  isLoading=false;
  dataSource:any;
  roletoAdd:any;
  roleData:any='';
  data1:any;
  roletoRemove:any;
  rolesList:any;
  moduleList:any;
  statusInfo:any;
  AddedUserdisplayedColumns: string[] = ['role','userList','download', 'signature','print','esign'];
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
      role:['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.onloadDropDown();
    this.onSearchUser();
    this.LifeCycleForm.controls['lifeCycleCode'].setValue('LC')
  }
  onSearchUser(){
    this.isLoading=true;
    this.size=GlobalConstants.size;
    this.dataSource=null;
   this.pageIndex=0;
    this.adminService.getUserProfileList(this.size,this.pageIndex,this.selectedTab).subscribe((data: any) => {
      console.log(data)
      console.log(data.data.content)
      this.data1=data.data.content;
    })
  }
  //Tab Selection
tabChanged(tabChangeEvent:any) {
  console.log('index => ', tabChangeEvent.index);
  this.selectedTab=tabChangeEvent.index;
  
  // if(this.selectedTab==0){
  //   this.onSearch();
  // }else if(this.selectedTab==1){
  //   this.OnActiveUserSearch();
  // }
};
selectedUser:any
onUserList(){
  const dialogRef = this.dialog.open(UserListComponent, {
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
  esign:false
}
 public arr=Array<{role:any,userList:any,download:any,signature:any,print:any,esign:any}>;
 UserRoleTable:any[]=[]
//selectedDataList:any;
selectedDataTable:any;
tableData:any;
onCreateSelectedDataList(){
console.log("click")
this.selectedDataList.userList=this.selectedUser;
this.UserRoleTable.push({
  role:this.selectedDataList.role,
  download:this.selectedDataList.download,
  signature:this.selectedDataList.signature,
  print:this.selectedDataList.print,
  esign:this.selectedDataList.esign,
  userList:this.selectedDataList.userList
})
this.tableData = new MatTableDataSource(this.UserRoleTable);
this.tableData.paginator = this.paginator;
this.tableData.sort = this.sort;

console.log(this.UserRoleTable)
console.log(this.selectedDataList)
console.log(this.arr)
console.log(this.arr.length)
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

addRole() {
  for (let i = 0; i < this.roleData.length; i++) {
    if (this.roleData[i].firstName == this.roletoAdd) {
      this.data1.push(this.roleData[i]);
      this.roleData.splice(i, 1);
      break;
    }
  }
}
addallRole() {
  for (let i = 0; i < this.roleData.length; i++) {
    this.data1.push(this.roleData[i]);
  }
  this.roleData = [];
}
removeRole() {
  for (let i = 0; i < this.data1.length; i++) {
    if (this.data1[i].firstName == this.roletoRemove) {
      this.roleData.push(this.data1[i]);
      this.data1.splice(i, 1);
      break;
    }
  }
}
removeallRole() {
  for (let i = 0; i < this.data1.length; i++) {
    this.roleData.push(this.data1[i]);
  }
  this.data1= [];
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
}
}
