import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LifeCycleDataService {
  subMenuList:any;
  selectedRow:any;
  private API_URL=environment.apiBaseURL;
  // private API_URL='http://103.10.234.106:8081/';
  constructor(private http:HttpClient,private cookieService:CookieService) { }


  getLifeCycleInfo(pageIndex:any,size:any){
  
    let token = this.cookieService.get('token');
    let userId=this.cookieService.get('userId');
    const queryParams = `?userId=${userId}&pageIndex=${pageIndex}&size=${size}`;
    console.log(token)
    let lifeCycleURL=this.API_URL+"login/lifecycleinfo"+queryParams;
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
  setSelectedRowData(selectedRow){
    this.selectedRow=selectedRow
  }
  getSelectedRowData(){
    return this.selectedRow
    
  }
}
