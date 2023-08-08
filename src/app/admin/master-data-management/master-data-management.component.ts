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
}
