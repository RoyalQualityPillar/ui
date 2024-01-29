import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GuidelinesService {
  private API_URL=environment.apiBaseURL;
  constructor(
    private http:HttpClient,private cookieService:CookieService
  ) { }
  getDropDownList(){
    let token = this.cookieService.get('token');
    let listURL=this.API_URL+"gl/upload-input";
    return this.http.get(listURL)
  }
  getAllDepartment(size:any,pageIndex:any){
    let queryParams=`?pageIndex=${pageIndex}&size=${size}`;
    let token=this.cookieService.get('token');
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gl/gl-master/get-all"+queryParams;
     return this.http.post(fetchAllBusinessUnitInfoApiUrl,'')
  }
  getActiveDepartment(size:any,pageIndex:any){
    let queryParams=`?pageIndex=${pageIndex}&size=${size}`;
    let token=this.cookieService.get('token');
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gl/gl-master/get-max-all"+queryParams;
     return this.http.post(fetchAllBusinessUnitInfoApiUrl,'')
  }
  getUserProfileFilterData(body){
    let token = this.cookieService.get('token');
    let fetchProfileListUrlAll=this.API_URL+"gm/but-master/search";
    return this.http.post(fetchProfileListUrlAll,body)
  }
  onCreate1(docNos:any,docNames:any,categoryTypes:any,attachements:any,body:any){
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
         //'Authorization': 'Bearer ' + token
        })
      };
      return this.http.post(createUserURL,formdata)
  }
  onCreate(docNos:any,docNames:any,categoryTypes:any,attachements:any,body:any){
    var formdata:FormData= new FormData();
      for (let file of attachements) {
        formdata.append('attachement', file);
      }
        // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body)], { type: 'application/json' });
    formdata.append('json', jsonBlob, 'data.json');


    let token = this.cookieService.get('token');
    let queryParams=`?docNos=${docNos}&docNames=${docNames}&categoryTypes=${categoryTypes}&status=${body.status}&category=${body.category}&subCategory=${body.subCategory}&createdBy=${body.createdby}`;
    let createUserURL=this.API_URL+"gl/upload"+queryParams;
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'mutipart/form-data',
      // 'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(createUserURL,formdata,httpOptions)
}
  onLoadUpdatePage(UC0001:any){
    let queryParams=`?UC0001=${UC0001}`;
    let token=this.cookieService.get('token');
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gm/but-master/get-by-max-code"+queryParams;
     return this.http.post(fetchAllBusinessUnitInfoApiUrl,'')
  }
  onAllRoleAuditTrail(uc0001:any){
    let queryParams=`?UC0001=${uc0001}`;
  let token=this.cookieService.get('token');
  let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gm/but-master/get-by-code-all"+queryParams;
   return this.http.get(fetchAllBusinessUnitInfoApiUrl) 
  }
}
