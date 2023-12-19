import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentTermService {

    private API_URL=environment.apiBaseURL
    constructor(private http:HttpClient ) { }
  
  getAllSaleProduct(size:any,index:any){
    let queryParams=`?pageIndex=${index}&size=${size}`
    const ALLSALEPRODUCTURL=this.API_URL+"gm/payment-terms-Master/get-all"+queryParams
   return this.http.post(ALLSALEPRODUCTURL,'')
  }
  getActiveSaleProduct(size:any,index:any){
    let queryParams=`?pageIndex=${index}&size=${size}`
    let fetchProfileListUrlAll=this.API_URL+"gm/payment-terms-Master/get-max-all"+queryParams;
    return this.http.post(fetchProfileListUrlAll,'')
  }
  getUserProfileFilterData(body){
    let fetchProfileListUrlAll=this.API_URL+"gm/payment-terms-Master/search";
    return this.http.post(fetchProfileListUrlAll,body,)
  }
  onLoadUpdatePage(UC0001:any){
    let queryParams=`?UC0001=${UC0001}`;
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"gm/payment-terms-Master/get-by-max-code"+queryParams;
     return this.http.post(fetchAllBusinessUnitInfoApiUrl,'')
  }
  onCreate(body:any){
    let createUserURL=this.API_URL+"gm/payment-terms-Master/save-update";
    return this.http.post(createUserURL,body)
}
}
