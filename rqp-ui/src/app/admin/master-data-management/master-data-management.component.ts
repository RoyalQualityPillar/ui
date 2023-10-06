import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-master-data-management',
  templateUrl: './master-data-management.component.html',
  styleUrls: ['./master-data-management.component.scss']
})
export class MasterDataManagementComponent implements OnInit{

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    public cookieService:CookieService){}
ngOnInit(): void {}
  onUserProfileRegistration(){
    console.log('working');
    this.route.navigate(['./user-profile-management'])
  }
  onLifeCycle(){
    this.route.navigate(['./life-cycle'])
  }
  onBusinessUnit(){
    this.route.navigate(['./Business-unit-home-page'])
  }
  onRoleMaster(){
    this.route.navigate(['./role-master-home-page'])
  }
  onDepartmentMaster(){
    this.route.navigate(['./department-home-page'])
  }
  onModuleMaster(){
    this.route.navigate(['./module-master-home-page'])
  }
  onDesignation(){
    this.route.navigate(['./designation-home-page'])
  }
  onStandardReason(){
    this.route.navigate(['./standard-reason-registartion-home-page'])
  }
  onSubDepartmentMaster(){
    this.route.navigate(['./sub-department-home-page'])
  }
  onMaterialType(){
    this.route.navigate(['./material-type-home-page'])
  }
  onMaterialSubType(){
    this.route.navigate(['./material-sub-type-home-page'])
  }
  onUTMaster(){
    this.route.navigate(['./ut-master-home-page'])
  }
  onPackMaster(){
    this.route.navigate(['./pack-master-home-page'])
  }
  onTaxMasterMaster(){
    this.route.navigate(['./tax-master-home-page'])
  }
  onOrganization(){
    this.route.navigate(['./orginazation-home-page'])
  }
  onBusinessUnitType(){
    this.route.navigate(['./business-unit-type-home-page'])
  }
  onSecurityProfile(){
    this.route.navigate(['./security-profile-type-home-page'])
  }
  onGuidelines(){
    this.route.navigate(['./guidelines-home-page'])
  }
}
