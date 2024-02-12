import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DmsService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  getHeaderData(body: any) {
    let getHederURL = this.API_URL + 'admin/input/lcinfo';
    return this.http.post(getHederURL, body);
  }
  onCreate(attachements:any,body:any){
    var formdata:FormData= new FormData();
      for (let file of attachements) {
        formdata.append('ursFiles', file);
      }
        // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body)], { type: 'application/json' });
    formdata.append('json', jsonBlob, 'data.json');

    let createUserURL=this.API_URL+"/dms/urs/save-update"
    const httpOptions = {
      headers: new HttpHeaders({      
       'Content-Type':  'mutipart/form-data',
      })
    };
    return this.http.post(createUserURL,formdata,httpOptions)
}
getNextStageList(requestBody: any) {
  const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
  return this.http.post(nextStageURL, requestBody);
}
}
