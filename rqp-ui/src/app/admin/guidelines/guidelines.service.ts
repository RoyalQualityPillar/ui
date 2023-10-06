import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import * as moment from 'moment';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GuidelinesService {
  // private API_URL='http://103.10.234.106:8081/';
  private API_URL=environment.apiBaseURL;
  constructor(
    private http:HttpClient,private cookieService:CookieService
  ) { }
  getDropDownList(){
    let token = this.cookieService.get('token');
    let listURL=this.API_URL+"gl/upload-input";
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
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gl/gl-master/get-all"+queryParams;
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
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gl/gl-master/get-max-all"+queryParams;
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
    let fetchProfileListUrlAll=this.API_URL+"gm/but-master/search";
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.post(fetchProfileListUrlAll,body,httpOptions)
  }
  onCreate(docNos:any,docNames:any,categoryTypes:any,attachements:any,body:any){
      var formdata:FormData= new FormData();
        for (let file of attachements) {
          formdata.append('attachement', file);
        }
      let token = this.cookieService.get('token');
      let queryParams=`?docNos=${docNos}&docNames=${docNames}&categoryTypes=${categoryTypes}&status=${body.status}&category=${body.category}&subCategory=${body.subCategory}&createdBy=${body.createdby}`;
      let createUserURL=this.API_URL+"gl/upload"+queryParams;
      const httpOptions = {
        headers: new HttpHeaders({      
         'Content-Type':  'mutipart/form-data',
         'Authorization': 'Bearer ' + token
        })
      };
      return this.http.post(createUserURL,formdata,httpOptions)
  }
  onLoadUpdatePage(UC0001:any){
    let queryParams=`?UC0001=${UC0001}`;
    let token=this.cookieService.get('token');
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gm/but-master/get-by-max-code"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + token
      })
    };
     return this.http.post(fetchAllBusinessUnitInfoApiUrl,'',httpOptions)
  }
  onAllRoleAuditTrail(uc0001:any){
    let queryParams=`?UC0001=${uc0001}`;
  let token=this.cookieService.get('token');
  let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gm/but-master/get-by-code-all"+queryParams;
  const httpOptions = {
    headers: new HttpHeaders({      
     'Content-Type':  'application/json',
     'Authorization': 'Bearer ' + token
    })
  };
   return this.http.get(fetchAllBusinessUnitInfoApiUrl,httpOptions) 
  }
}
