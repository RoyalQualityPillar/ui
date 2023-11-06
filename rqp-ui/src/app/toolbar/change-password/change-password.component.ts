import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {ToolbarService} from '../../service/toolbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import {AuthService} from '../../service/auth.service';
import { MessageService} from '../../service/message.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  hide = true;
  ChangePasswordForm: FormGroup;
  constructor(public fb: FormBuilder,
    private route:Router,
    private toolbarService:ToolbarService,
    public dialog: MatDialog,
    public authService:AuthService,
    private messageService: MessageService,){
    this.ChangePasswordForm = this.fb.group({
      userId:['', Validators.required],
      oldPassword:['', Validators.required],
      newPassword:['', Validators.required],
      reNewPassword:['', Validators.required],
    }); 
  }
  ngOnInit(): void {
  }
  onClear(){
    this.ChangePasswordForm.reset();
  }
  isLoading=false;
  onSubmit(){
    if(this.ChangePasswordForm.invalid){
      console.log('invalid');
      return;
    }
    this.isLoading=true;
    this.authService.changePAssword(this.ChangePasswordForm.value).subscribe((data:any)=>{
      console.log(data);
      if(data.data.errorInfo!=null){
       this.isLoading=false;
       this.dialog.open(MessageDialogComponent, {
         width:"400px",
         data: { 'message': data.data.errorInfo.message, 'heading': "Error Information" }
       });
      }
     else {
       this.isLoading=false;
       this.messageService.sendSnackbar('success', 'Record Updated Successfully');
     }
    })
  }
  errMsg:any;
  errorStatus=false;
  onChangeValidation(){
    this.errorStatus=true;
   if(this.ChangePasswordForm.controls['newPassword'].value !=this.ChangePasswordForm.controls['reNewPassword'].value) {
    this.errMsg='New Password and Re New Password should be same';
    this.errorStatus=true;
   }else{
    this.errorStatus=false;
   }
  }
}
