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
    let listURL=this.API_URL+"admin/profile-input";
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
    let createUserURL=this.API_URL+"admin/save-profile";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(createUserURL,body,httpOptions)

  }
}
