import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder}  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {ToolbarService} from '../../service/toolbar.service';
import {AuthService} from '../../service/auth.service';
import {CookieService} from 'ngx-cookie-service';


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
              private cookieService:CookieService){
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
      if(data){
        this.isLoading=false;
        this.tokenData=data.token;
        this.tokenId=data.tokenId;
       this.cookieService.set('token',this.tokenData);
       this.cookieService.set('attESHr',this.tokenData);
       this.cookieService.set('tokenId',this.tokenId);
       this.cookieService.set('userId',this.userId);
       this.cookieService.set('isLogin','loginSuccess');
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
