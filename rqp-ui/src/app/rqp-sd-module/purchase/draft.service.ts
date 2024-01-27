import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DraftService {
  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  /************************************** DRAFT QUOTATION ************************************************* */
  onSaveUpdateDQ(requestBody: any) {
    const saveUpdateURL = this.API_URL + 'sddq/dq-items/save-update';
    return this.http.post(saveUpdateURL, requestBody);
  }
}
