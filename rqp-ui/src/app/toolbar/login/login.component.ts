import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder}  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {ToolbarService} from '../../service/toolbar.service';
import {AuthService} from '../../service/auth.service';
import {CookieService} from 'ngx-cookie-service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  hide = true;
  LoginForm: FormGroup;
  constructor(public fb: FormBuilder,
              private route:Router,
              private toolbarService:ToolbarService,
              private authService:AuthService,
              private cookieService:CookieService,
              public dialog: MatDialog,){
    this.LoginForm = this.fb.group({
      userid:['',Validators.required],
      password:['',Validators.required],
    }); 
  }
  isLoading=false;
  ngOnInit(): void {
  }
  get userid() { return this.LoginForm.get('userid'); }
  get password() { return this.LoginForm.get('password'); }
  tokenData:any;
  tokenId:any;
  userId='';
  onLogin(){
    if(this.LoginForm.invalid){
      console.log('invalid');
      return;
    }
    console.log('testing');
    this.isLoading=true;
    this.userId=this.LoginForm.controls['userid'].value
     this.authService.getAuth(this.LoginForm.controls['userid'].value,this.LoginForm.controls['password'].value).subscribe((data:any)=>{
       console.log(data);
       if(data.errorInfo!=null){
        this.isLoading=false;
        this.dialog.open(MessageDialogComponent, {
          width:"400px",
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
       }
      else {
        this.isLoading=false;
        this.tokenData=data.data.token;
        this.tokenId=data.data.tokenId;
       const expireInDuration =3600;
       this.authService.setAuthTimer(expireInDuration)
       const now =new Date();
       const expirationDate= new Date(now.getTime() + expireInDuration*1000);
       console.log(expirationDate);
       let isAuth=true;
       this.cookieService.set('isAuth','true');
       this.authService.setIsAuth(isAuth)
       this.authService.saveAuthData(this.tokenData,expirationDate,this.userId,this.tokenId);
        this.route.navigate(['./data-table'])
      }
     })
  }
  onForgetPassword(){
    console.log('working')
    this.toolbarService.isLogin='forgetPassword';
    sessionStorage.setItem('isLogin','forgetPassword')
    console.log(sessionStorage.getItem('isLogin'))
     this.route.navigate(['./forget-password']);
  }
}
