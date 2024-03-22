import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-qms-e-signature',
  templateUrl: './qms-e-signature.component.html',
  styleUrls: ['./qms-e-signature.component.scss']
})
export class QMSESignatureComponent implements OnInit{

  EsignatureForm:FormGroup;
  isReadonly:boolean;
  isLoading:boolean;
  isSuccess:boolean;
  constructor( private fb:FormBuilder,private cookiesService:CookieService,private authService:AuthService,
    public dialogRef: MatDialogRef<QMSESignatureComponent>,
    public dialog: MatDialog,){
   this.EsignatureForm=this.fb.group({
    userId:['',Validators.required],
    password:['',Validators.required]
   })
  }
  ngOnInit(): void {
    this.isReadonly=true;
    let userID=this.cookiesService.get('userId')
    console.log(userID)
     this.EsignatureForm.controls['userId'].setValue(userID)
  }

  onConfirm(){
    this.isLoading=true;
     this.authService.getAuth(this.EsignatureForm.controls['userId'].value,this.EsignatureForm.controls['password'].value).subscribe((data:any)=>{
       console.log(data);
       if(data.errorInfo!=null){
        this.isLoading=false;
        this.dialog.open(MessageDialogComponent, {
          width:"400px",
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
        this.isSuccess=false;
       }
      else {
        this.isSuccess=true;
        this.dialogRef.close({data:this.isSuccess})
      }
  })
}

  onDismiss(){
    this.isSuccess=false;
    this.dialogRef.close({data:this.isSuccess})
  }
}
