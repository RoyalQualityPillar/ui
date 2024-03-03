import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /************************************** DRAFT QUOTATION ************************************************* */
  onSaveUpdate(requestBody: any) {
    const saveUpdateURL = this.API_URL + 'pmmpqtitem/pmmpqt-items/save-update';
    return this.http.post(saveUpdateURL, requestBody);
  }

  getResquestNoID(lc0002: any) { ///1st
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'pmmpqtitem/module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
}
