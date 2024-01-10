import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockLedgerService {
  private API_URL=environment.apiBaseURL
  constructor(private http:HttpClient ) { }


  getAllSaleProduct(size:any,index:any){
    let queryParams=`?pageIndex=${index}&size=${size}`
    const ALLSALEPRODUCTURL=this.API_URL+"sd/sl-master/get-all"+queryParams
   return this.http.post(ALLSALEPRODUCTURL,'')
  }
  getActiveSaleProduct(size:any,index:any){
    let queryParams=`?pageIndex=${index}&size=${size}`
    let fetchProfileListUrlAll=this.API_URL+"sd/sl-master/get-max-all"+queryParams;
    return this.http.post(fetchProfileListUrlAll,'')
  }
  getUserProfileFilterData(body){
    let fetchProfileListUrlAll=this.API_URL+"sd/sl-master/search";
    return this.http.post(fetchProfileListUrlAll,body,)
  }
  onLoadUpdatePage(UC0001:any){
    let queryParams=`?UC0001=${UC0001}`;
    let fetchAllBusinessUnitInfoApiUrl=this.API_URL+"sd/sp-master/get-by-max-code"+queryParams;
     return this.http.post(fetchAllBusinessUnitInfoApiUrl,'')
  }
  onCreate(body:any){
    let createUserURL=this.API_URL+"sd/sp-master/save-update";
    return this.http.post(createUserURL,body)
}
onAllRoleAuditTrail(uc0001:any){
  let queryParams=`?UC0001=${uc0001}`
    const ALLSALEPRODUCTURL=this.API_URL+"sd/sp-master/get-by-code-all"+queryParams
   return this.http.get(ALLSALEPRODUCTURL)
  }
}
