import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialMasterService {

  private API_URL = environment.apiBaseURL;

  constructor(private http: HttpClient) { }

  getAllMaterial(size: any, index: any) {
    let queryParams = `?pageIndex=${index}&size=${size}`
    const ALLSALEPRODUCTURL = this.API_URL + "pmm/pmm_master/get-all" + queryParams
    return this.http.post(ALLSALEPRODUCTURL, '')
  }
  getUserProfileFilterData(body) {
    let fetchProfileListUrlAll = this.API_URL + "pmm/pmm_master/search";
    return this.http.post(fetchProfileListUrlAll, body,)
  }
  getActiveMaterial(size: any, index: any) {
    let queryParams = `?pageIndex=${index}&size=${size}`
    let fetchProfileListUrlAll = this.API_URL + "pmm/pmm_master/get-max-all" + queryParams;
    return this.http.post(fetchProfileListUrlAll, '')
  }
  onLoadUpdatePage(UC0001: any) {
    let queryParams = `?UC0001=${UC0001}`;
    let fetchAllBusinessUnitInfoApiUrl = this.API_URL + "pmm/pmm_master/get-by-max-code" + queryParams;
    return this.http.post(fetchAllBusinessUnitInfoApiUrl, '')
  }
  onCreate(body: any) {
    let createUserURL = this.API_URL + "pmm/pmm_master/save-update";
    return this.http.post(createUserURL, body)
  }
  onAllRoleAuditTrail(uc0001: any) {
    let queryParams = `?UC0001=${uc0001}`;
    let fetchAllBusinessUnitInfoApiUrl = this.API_URL + "pmm/pmm_master/get-by-code-all" + queryParams;

    return this.http.get(fetchAllBusinessUnitInfoApiUrl)
  }
  getDropDownList() {
    let fetchAllBusinessUnitInfoApiUrl = this.API_URL + "pmm/input";

    return this.http.get(fetchAllBusinessUnitInfoApiUrl)
  }
}
