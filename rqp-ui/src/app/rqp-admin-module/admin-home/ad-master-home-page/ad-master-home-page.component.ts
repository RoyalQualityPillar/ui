import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-ad-master-home-page',
  templateUrl: './ad-master-home-page.component.html',
  styleUrls: ['./ad-master-home-page.component.scss']
})
export class AdMasterHomePageComponent implements OnInit{

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    public cookieService:CookieService){}
ngOnInit(): void {}
  onUserProfileRegistration(){
    console.log('working');
    this.route.navigate(['./admin/user-profile-management'])
  }
  onLifeCycle(){
    this.route.navigate(['./admin/life-cycle'])
  }
  onBusinessUnit(){
    this.route.navigate(['./admin/Business-unit-home-page'])
  }
  onRoleMaster(){
    this.route.navigate(['./admin/role-master-home-page'])
  }
  onDepartmentMaster(){
    this.route.navigate(['./admin/department-home-page'])
  }
  onModuleMaster(){
    this.route.navigate(['./admin/module-master-home-page'])
  }
  onDesignation(){
    this.route.navigate(['./admin/designation-home-page'])
  }
  onStandardReason(){
    this.route.navigate(['./admin/standard-reason-registartion-home-page'])
  }
  onSubDepartmentMaster(){
    this.route.navigate(['./admin/sub-department-home-page'])
  }
  onMaterialType(){
    this.route.navigate(['./admin/material-type-home-page'])
  }
  onMaterialSubType(){
    this.route.navigate(['./admin/material-sub-type-home-page'])
  }
  onUTMaster(){
    this.route.navigate(['./admin/ut-master-home-page'])
  }
  onPackMaster(){
    this.route.navigate(['./admin/pack-master-home-page'])
  }
  onTaxMasterMaster(){
    this.route.navigate(['./admin/tax-master-home-page'])
  }
  onOrganization(){
    this.route.navigate(['./admin/orginazation-home-page'])
  }
  onBusinessUnitType(){
    this.route.navigate(['./admin/business-unit-type-home-page'])
  }
  onSecurityProfile(){
    this.route.navigate(['./admin/security-profile-type-home-page'])
  }
  onGuidelines(){
    this.route.navigate(['./admin/guidelines-home-page'])
  }
  onDosageForm(){
    this.route.navigate(['./admin/dosage-from-home-page'])
  }
    onPaymentTerm(){
    this.route.navigate(['/admin/payment-term-home-page'])
  }

}
