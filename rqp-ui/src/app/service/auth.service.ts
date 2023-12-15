import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute,Router} from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL=environment.apiBaseURL;
  tokenTimer:any;
  private isAuthenticated =false;
  constructor(
    private http:HttpClient,
    private cookieService:CookieService,
    private route:Router,
  ) { }

  getIsAuth(){
    return this.isAuthenticated;
  }
  setIsAuth(isAuth:any){
   // console.log(this.cookieService.get('isAuth'))
    if(this.cookieService.get('isAuth')=='true'){
      this.isAuthenticated = true;
    }
    
  }
  token:any;
  userId:any;
  autoAuthUser(){
   // console.log('test1')
    const authInformartion = this.getAuthData();
    if(!authInformartion){
      return
    }
    const now =new Date();
    const expiresIn = authInformartion.expirationDate.getTime()-now.getTime();
    if(expiresIn >0){
      this.token =authInformartion.toekn;
      this.userId=authInformartion.userId;
      let isAuth='true';
      this.cookieService.set('isAuth',isAuth)
      this.setIsAuth(isAuth)
      this.setAuthTimer(expiresIn/1000);

    }

  }
  saveAuthData(token:string,expirationDate:Date,userId:string,tokenId:string){
       this.cookieService.set('token',token);
       this.cookieService.set('expiration',expirationDate.toISOString());
       this.cookieService.set('userId',userId);
       this.cookieService.set('attESHr',token);
       this.cookieService.set('tokenId',tokenId);
       this.cookieService.set('isLogin','loginSuccess');
       let isAuth='true';
       this.cookieService.set('isAuth',isAuth)
  }
  getAuthData(){
    const token =this.cookieService.get('token');
    const expirationDate = this.cookieService.get('expiration');
    const userId = this.cookieService.get('userId');
    if(!token || !expirationDate || !userId){
      return false;
    }
    return {
      toekn:token,
      expirationDate:new Date(expirationDate),
      userId:userId
    }
  }
  setAuthTimer(duration:number){
   // console.log("Setting Timer"+duration);
    this.tokenTimer =setTimeout(()=>{
      this.logout();
    },duration*1000)
  }
  logout(){
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.route.navigate(['./login']);
  }
  clearAuthData(){
    this.cookieService.delete('isLogin');
    this.cookieService.delete('menuHeader');
    this.cookieService.delete('subMenu1');
    this.cookieService.delete('token')
    this.cookieService.delete('expiration')
    this.cookieService.delete('userId');
    this.cookieService.delete('isAuth');
  }

  getAuth(userid:any,password:any){
   // console.log(userid);
    let loginURL=this.API_URL+'authenticate';
    let authData=userid+':'+password;
    let encodedAuthData=btoa(authData);
    //console.log(encodedAuthData1)
   //let test ='cnEyMDAxMDA6d2VsY29tZQ==';
  // let username1='rd200100';
   //let password1='welcome';
//let encodedAuthData=`Basic ${encodedAuthData1}`
   // console.log(authData)
   // console.log(encodedAuthData);
   // console.log(btoa(+username1+':'+password1))
   // console.log(btoa('rd200100:welcome'))
   ///// console.log(encodedAuthData)
    const httpOptions = {
      headers: new HttpHeaders({      
       // 'Authorization': encodedAuthData 
       'Content-Type':  'application/json',
       //'Authorization': 'Basic ' + btoa('rd200100:welcome')
       'Authorization': 'Basic ' + encodedAuthData
      })
    };
//this.http.get('url',httpOptions);
return this.http.post(loginURL,'',httpOptions)
}
changePAssword(requestBody:any){
    let token = this.cookieService.get('token');
    let changePassword=this.API_URL+"admin/changepassword";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.post(changePassword,requestBody,httpOptions)
}
}
