import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryOrderService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /************************************** DRAFT QUOTATION ************************************************* */
  onSaveUpdate(requestBody: any) {
    const saveUpdateURL = this.API_URL + 'pmmpso/pdo_item/save-update';
    return this.http.post(saveUpdateURL, requestBody);
  }
}
