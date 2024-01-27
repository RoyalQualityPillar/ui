import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SdService {
  public commentsCurrentValue:any;
  private API_URL = environment.apiBaseURL;
  // private API_URL='http://103.10.234.106:8081/';
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getStockList(orgUnitCode: any, pageIndex: any, size: any) {
    let body = {
      buCode: orgUnitCode,
    };
    const queryParams = `?buCode=${body.buCode}`;
    let stockListURL = this.API_URL + 'sd/get-stock-price-master' + queryParams;
    return this.http.get(stockListURL);
  }
  getInputValue() {
    let inputFieldValueURL = this.API_URL + 'sd/input';
    return this.http.get(inputFieldValueURL);
  }
  getUnitCodeDetail(auc0001: any, buc0001: any) {
    let pageIndex = 0;
    let size = 5;
    const queryParams = `?auc0001=${auc0001}&buc0001=${buc0001}&pageIndex=${pageIndex}&size=${size}`;
    let stockListURL = this.API_URL + 'gm/bu-master/get-bu-info' + queryParams;
    return this.http.post(stockListURL, '');
  }

  getHeaderData(body: any) {
    let getHederURL = this.API_URL + 'admin/input/lcinfo';
    return this.http.post(getHederURL, body);
  }
  onSaveUpdate(requestBody: any) {
    const saveUpdateURL = this.API_URL + 'sdqt/qt-item/save-update';
    return this.http.post(saveUpdateURL, requestBody);
  }
  getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }

  getBuInfo(requestBody: any) {
    const queryParams = `?auc0001=${requestBody.auc0001}&buc0001=${requestBody.buc0001}`;
    const buInfoURL = this.API_URL + 'gm/bu-master/get-bu-info' + queryParams;
    return this.http.post(buInfoURL, '');
  }
  getReviewerData(f0001: any, f0009: any,createdby :any, pageIndex: any, size: any) {
    const queryParams = `?FF0001=${f0001}&FF0009=${f0009}&createdby=${createdby }&pageIndex=${pageIndex}&size=${size}`;
    const reviwerURL = this.API_URL + 'gm/gmur-record/todo-all' + queryParams;
    return this.http.get(reviwerURL);
  }
  onReviewData(ff0001:any){
    const queryParams =`?FF0001=${ff0001}`;
    const reviewURL=this.API_URL+'gm/gmap-record/review-comments'+queryParams;
    return this.http.get(reviewURL);
  }
  onQTList(ff0001:any){  //1st response data
    const queryParams =`?ff0001=${ff0001}`;
    const reviewURL=this.API_URL+'sdqt/get-qt-item-list'+queryParams;
    return this.http.get(reviewURL);
  }
  getResquestNoID(lc0002:any){ ///1st
    const queryParams =`?lc0002=${lc0002}`;
    const reviewURL=this.API_URL+'sdqt/module-request-no'+queryParams;
    return this.http.get(reviewURL);
  }
  getQTIndexList(uc0001:any){
    const queryParams =`?uc0001=${uc0001}`;
    const reviewURL=this.API_URL+'sdqt/get-qt-index-list'+queryParams;
    return this.http.get(reviewURL);
  }
  onLcApproval(body:any){
    const lcApprovalURL=this.API_URL+'gm/lc-approval/save-update';
    return this.http.post(lcApprovalURL,body)
  }
  onLcReject(body:any){
    const lcRejectURL=this.API_URL+'gm/lc-reject/save-update';
    return this.http.post(lcRejectURL,body)
  }


  /**************************************ALL ASSIGNMENT **************************************/
  getAllAssignmentData(f0001: any, pageIndex: any, size: any) {
    const queryParams = `?FF0001=${f0001}&pageIndex=${pageIndex}&size=${size}`;
    const reviwerURL = this.API_URL + 'gm/gmur-record/complete-all' + queryParams;
    return this.http.get(reviwerURL);
  }
}
