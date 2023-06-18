import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LifeCycleDataService {

   private API_URL='http://103.10.234.106:8081/';
  constructor(private http:HttpClient,private cookieService:CookieService) { }


  getLifeCycleInfo(){
    let token = this.cookieService.get('token');
    let userId=this.cookieService.get('userId')
    console.log(token)
    let lifeCycleURL=this.API_URL+"login/lifecycleinfo?userId="+userId;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(lifeCycleURL,httpOptions)
  }
  getModuleName(body:any){
    console.log(body)
    let token = this.cookieService.get('token');
    console.log(token)
    let lifeCycleURL=this.API_URL+"login/get-modules";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(lifeCycleURL,body,httpOptions)
  }
}
