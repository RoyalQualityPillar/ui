import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private API_URL='http://103.10.234.106:8081/';
  constructor(
    private http:HttpClient,private cookieService:CookieService
  ) { }

  getDropDownList(){
    let token = this.cookieService.get('token');
    let listURL=this.API_URL+"admin/userprofile/input";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(listURL,httpOptions)
  }
  saveUserData(body:any){
    console.log(body);
     body.dob=moment(body.dob,'DD-MM-YYYY').format('DD-MM-YYYY');
     body.joinedDate=moment(body.joinedDate,'DD-MM-YYYY').format('DD-MM-YYYY');
     body.effectiveDate=moment(body.effectiveDate,'DD-MM-YYYY').format('DD-MM-YYYY');
     console.log(body);
    let token = this.cookieService.get('token');
    let createUserURL=this.API_URL+"admin/userprofile/save-update";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(createUserURL,body,httpOptions)

  }
  getActiveUserList(size:any,pageIndex:any){
    const queryParams = `?pageIndex=${pageIndex}&size=${size}`;
    let token = this.cookieService.get('token');
    let fetchProfileListURLActive=this.API_URL+"admin/userprofile/get-max-all"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.post(fetchProfileListURLActive,'',httpOptions)
  }
  
  getUserProfileList(size:any,pageIndex:any,selectedTab:any){
    const queryParams = `?pageIndex=${pageIndex}&size=${size}`;
    let token = this.cookieService.get('token');
    let fetchProfileListUrlAll=this.API_URL+"admin/userprofile/get-all"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.post(fetchProfileListUrlAll,'',httpOptions)
  }

  getUserProfileFilterData(body){
    let token = this.cookieService.get('token');
    let fetchProfileListUrlAll=this.API_URL+"admin/userprofile/serach";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.post(fetchProfileListUrlAll,body,httpOptions)
  }
  onAuditTrail(employeeId:any){
    const queryParams = `?employeeId=${employeeId}`;
    let token = this.cookieService.get('token');
    let fetchAuditTrailUrlAll=this.API_URL+"admin/userprofile/get-by-code"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.post(fetchAuditTrailUrlAll,'',httpOptions)
  }
  onActiveAuditTrail(employeeId:any){
    const queryParams = `?employeeId=${employeeId}`;
    let token = this.cookieService.get('token');
    let fetchAuditTrailUrlAll=this.API_URL+"admin/userprofile/get-max-by-code"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.post(fetchAuditTrailUrlAll,'',httpOptions)
  }
  createAllLifeCycle(body:any){
    console.log(body)
    let token = this.cookieService.get('token');
    
    let createLifeCycleUrlAll=this.API_URL+"admin/lifecycle/create";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.post(createLifeCycleUrlAll,body,httpOptions)

  }
}
