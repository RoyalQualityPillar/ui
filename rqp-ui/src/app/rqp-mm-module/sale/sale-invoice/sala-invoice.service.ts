import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaInvoiceService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /************************************** DRAFT QUOTATION ************************************************* */
  onSaveUpdate(requestBody: any) {
    const saveUpdateURL = this.API_URL + 'pmmpsi/pmmpsi-items/save-update';
    return this.http.post(saveUpdateURL, requestBody);
  }
}
