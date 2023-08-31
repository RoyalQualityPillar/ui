import { Component,OnInit,ViewChild,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {MessageService} from '../../service/message.service';
import { AdminService } from 'src/app/service/admin.service';
import {GlobalConstants} from '../../common/global-constants';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { elements } from 'chart.js';
export interface userData {
  userData: any;
  type:any;
}

@Component({
  selector: 'app-update-life-cycle',
  templateUrl: './update-life-cycle.component.html',
  styleUrls: ['./update-life-cycle.component.scss']
})
export class UpdateLifeCycleComponent implements OnInit{

  updateLifeCycle: FormGroup;
  isReadOnly=true;
  selectedDataList={
    download:false,
    print:false,
    esign:false,
    allUser :false,
    comment:''
  }
  isLoading=false;
  constructor(public fb: FormBuilder,
    private adminService:AdminService,
    public messageService:MessageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateLifeCycleComponent>,
              @Inject(MAT_DIALOG_DATA) public userData: userData){
                this.updateLifeCycle = this.fb.group({
                  lcnum:['',Validators.required],
                  stage:['',Validators.required],
                  alluser:['',Validators.required],
                  download:['',Validators.required],
                  esign:['',Validators.required],
                  lcrole:['',Validators.required],
                  print:['',Validators.required],
                  status:['',Validators.required],

                })
    }
    ngOnInit(): void {
      this.onloadDropDown();
      this.onLoadFormData();
    }
    statusInfo:any;
    rolesList:any;
    onloadDropDown(){
      this.adminService.getDropDownList().subscribe((data: any) => {
        console.log(data)
        this.rolesList=data.data.rolesList;
        this.statusInfo=data.data.statusInfo;
      })
    }
    formData:any;
    userList:any;
    copiedData:any;
    onLoadFormData(){
      this.adminService.getUpdateFormData(this.userData.userData.lcnum,this.userData.userData.stage).subscribe((data: any) => {
        console.log(data)
        this.formData=data.data;
        this.userList=data.data.userInfoList
        this.copiedData = JSON.stringify(data.data.userInfoList);
        this.setFormVaue()
      })
    }
    setFormVaue(){
      this.updateLifeCycle.controls['lcnum'].setValue(this.userData.userData.lcnum)
      this.updateLifeCycle.controls['stage'].setValue(this.formData.stage)
      this.updateLifeCycle.controls['status'].setValue(this.formData.status)
      this.updateLifeCycle.controls['lcrole'].setValue(this.formData.lcrole)
      this.selectedDataList.download=this.formData.download;
      this.selectedDataList.print=this.formData.print;
      this.selectedDataList.esign=this.formData.esign;
      this.selectedDataList.allUser =this.formData.allUser ;

    }
    addUser(){
      if(this.userList.length ==0){
        this.userList=[]
      }
      this.userList.push({});
    }
    backupList:any;
    onUpdate(){
      let requesBody={
        lcnum:'',
        stage:'',
        alluser:false,
        comments:'',
        download:false,
        esign:false,
        lcrole:'',
        print:false,
        createdby:'',
        userInfoList:[]
      }
      console.log(this.userData.userData.lcnum)
      requesBody.lcnum=this.userData.userData.lcnum;
      requesBody.stage=this.formData.stage;
      requesBody.alluser=this.formData.alluser;
      requesBody.comments=this.selectedDataList.comment;
      requesBody.download=this.selectedDataList.download;
      requesBody.esign=this.selectedDataList.esign;
      requesBody.lcrole=  this.updateLifeCycle.controls['lcrole'].value;
      requesBody.print=this.selectedDataList.print;
      requesBody.createdby=this.formData.createdby;
      requesBody.userInfoList=this.userList;
      console.log(requesBody)
      let copyData=JSON.parse(this.copiedData);
      this.backupList = JSON.stringify(this.userList);
      requesBody.userInfoList.forEach(elements=>{
        copyData.forEach(ele => {
          if(elements.userid==ele.userid && elements.status==ele.status){
             console.log(elements.userid)
             console.log(ele)
            requesBody.userInfoList.splice( requesBody.userInfoList.indexOf(elements),1);
            // this.removedUnChangedData( requesBody.userInfoList,ele)
          }
          
        });
      })
      console.log(this.list)
      console.log(requesBody)
      this.isLoading=true;
      this.adminService.getUpdate(requesBody).subscribe((data: any) => {
        console.log(data);
        this.isLoading=false;
        this.userList=JSON.parse(this.backupList)
        if(data.errorInfo !=null){
          this.dialog.open(MessageDialogComponent, {
            data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
          });
        }else{
          
          this.messageService.sendSnackbar('success',data.status);
        }
      })
    }
    list:any;
    removedUnChangedData(list:any,row:any){
      this.list=list;
      console.log(list)
      console.log(row)
      this.list.splice( this.list.userInfoList.indexOf(row),1);
      console.log(this.list)
    }
}
