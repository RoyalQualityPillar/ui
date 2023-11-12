import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute,Router} from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SdService {

  private API_URL=environment.apiBaseURL;
  // private API_URL='http://103.10.234.106:8081/';
  constructor(private http:HttpClient,private cookieService:CookieService) { }

  getStockList(orgUnitCode:any,pageIndex:any,size:any){
    let body={
      'buCode':orgUnitCode
    }
   // const queryParams = `?pageIndex=${pageIndex}&size=${size}`;
    const queryParams = `?buCode=${body.buCode}`;
    let token = this.cookieService.get('token');
    let userId=this.cookieService.get('userId');

    let stockListURL=this.API_URL+"sd/get-stock-price-master"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(stockListURL,httpOptions)
  }
  getInputValue(){
    let token = this.cookieService.get('token');
    let userId=this.cookieService.get('userId');
    let inputFieldValueURL=this.API_URL+"sd/input";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(inputFieldValueURL,httpOptions)
  }
  getUnitCodeDetail(auc0001:any,buc0001:any){
  const queryParams = `?auc0001=${auc0001}&buc0001=${buc0001}`;
 let token = this.cookieService.get('token');
 let userId=this.cookieService.get('userId');

 let stockListURL=this.API_URL+"gm/bu-master/get-bu-info"+queryParams;
 const httpOptions = {
   headers: new HttpHeaders({      
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + token
   })
 };
 return this.http.post(stockListURL,'',httpOptions)
  }
}
