import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


  onQTList(ff0001: any) {  //1st response data
    const queryParams = `?ff0001=${ff0001}`;
    const reviewURL = this.API_URL + 'pmmpqtitem/get-pqt-item-list' + queryParams;
    return this.http.get(reviewURL);
  }

  getQTIndexList(uc0001: any) {
    const queryParams = `?uc0001=${uc0001}`;
    const reviewURL = this.API_URL + 'pmmpqtitem/get-pqt-index-list' + queryParams;
    return this.http.get(reviewURL);
  }

  onLcApproval(body: any) {
    const lcApprovalURL = this.API_URL + 'gm/lc-approval/save-update';
    return this.http.post(lcApprovalURL, body)
  }
  onLcReject(body: any) {
    const lcRejectURL = this.API_URL + 'gm/lc-reject/save-update';
    return this.http.post(lcRejectURL, body)
  }
}
