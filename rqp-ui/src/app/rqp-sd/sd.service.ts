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

  getStockList(pageIndex:any,size:any){
    const queryParams = `?pageIndex=${pageIndex}&size=${size}`;
    let token = this.cookieService.get('token');
    let userId=this.cookieService.get('userId');
    console.log(token)
    let stockListURL=this.API_URL+"sd/sl-master/get-max-all"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(stockListURL,httpOptions)
  }
}
