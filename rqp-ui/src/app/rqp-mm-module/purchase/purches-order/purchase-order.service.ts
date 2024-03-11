import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /************************************** DRAFT QUOTATION ************************************************* */
  onSaveUpdate(requestBody: any) {
    const saveUpdateURL = this.API_URL + 'pmmppo/pmmppo-items/save-update';
    return this.http.post(saveUpdateURL, requestBody);
  }

  getResquestNoID(lc0002: any) { ///1st
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'pmmppo/module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
}
