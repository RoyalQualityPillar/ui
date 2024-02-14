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
    onCreate(attachments:any,reffereceAttachments:any, body: any) {
      let token = this.cookieService.get('token');
      let formData: FormData = new FormData();
    
      for (let file of attachments) {
        formData.append('docFiles', file);
      }
    
      for (let file of reffereceAttachments) {
        formData.append('referenceAttachments', file);
      }
    
      // Append JSON data as a blob
      const jsonBlob = new Blob([JSON.stringify(body.ursDTO)],{ type: 'application/json' });
      formData.append('ursDTO', jsonBlob, 'data.json');
       //formData.append('ursDTO', JSON.stringify(body.ursDTO));
      console.log(formData);
    
      let createUserURL = this.API_URL + "dms/urs/save-update";
    
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };
    
      return this.http.post(createUserURL, formData, httpOptions);
    }

getNextStageList(requestBody: any) {
  const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
  return this.http.post(nextStageURL, requestBody);
}
}
