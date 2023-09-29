import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import * as moment from 'moment';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxMasterService {
  private API_URL=environment.apiBaseURL;
 // private API_URL='http://103.10.234.106:8081/';
  constructor(
    private http:HttpClient,private cookieService:CookieService
  ) { }
  getDropDownList(){
    let token = this.cookieService.get('token');
    let listURL=this.API_URL+"gm/input";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(listURL,httpOptions)
  }
  getAllDepartment(size:any,pageIndex:any){
    let queryParams=`?pageIndex=${pageIndex}&size=${size}`;
    let token=this.cookieService.get('token');
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gm/tx-master/get-all"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
     return this.http.post(fetchAllBusinessUnitInfoApiUrl,'',httpOptions)
  }
  getActiveDepartment(size:any,pageIndex:any){
    let queryParams=`?pageIndex=${pageIndex}&size=${size}`;
    let token=this.cookieService.get('token');
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gm/tx-master/get-max-all"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
     return this.http.post(fetchAllBusinessUnitInfoApiUrl,'',httpOptions)
  }
  getUserProfileFilterData(body){
    let token = this.cookieService.get('token');
    let fetchProfileListUrlAll=this.API_URL+"gm/tx-master/search";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.post(fetchProfileListUrlAll,body,httpOptions)
  }
  onCreate(body:any){
      console.log(body);
      let token = this.cookieService.get('token');
      let createUserURL=this.API_URL+"gm/tx-master/save-update";
      const httpOptions = {
        headers: new HttpHeaders({      
         'Content-Type':  'application/json',
         'Authorization': 'Bearer ' + token
        })
      };
      return this.http.post(createUserURL,body,httpOptions)
  }
  onLoadUpdatePage(UC0001:any){
    let queryParams=`?UC0001=${UC0001}`;
    let token=this.cookieService.get('token');
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gm/tx-master/get-by-max-code"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
     return this.http.post(fetchAllBusinessUnitInfoApiUrl,'',httpOptions)
  }
}