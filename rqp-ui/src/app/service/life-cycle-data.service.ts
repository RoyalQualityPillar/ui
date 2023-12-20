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
  constructor(private http:HttpClient,private cookieService:CookieService) { }


  getLifeCycleInfo(pageIndex:any,size:any){
    let userId=this.cookieService.get('userId');
    const queryParams = `?userId=${userId}&pageIndex=${pageIndex}&size=${size}`;
    let lifeCycleURL=this.API_URL+"login/lifecycleinfo"+queryParams;
    return this.http.get(lifeCycleURL)
  }
  getModuleName(body:any){
    const queryParams = `?userId=${body.userId}&lcnum=${body.lcnum}`;
    let lifeCycleURL=this.API_URL+"login/get-modules"+queryParams;
    return this.http.post(lifeCycleURL,'')
  }
  setSelectedRowData(selectedRow){
    this.selectedRow=selectedRow
  }
  getSelectedRowData(){
    return this.selectedRow
    
  }
}
