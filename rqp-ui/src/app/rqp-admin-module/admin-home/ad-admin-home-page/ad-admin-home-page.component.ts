import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-ad-admin-home-page',
  templateUrl: './ad-admin-home-page.component.html',
  styleUrls: ['./ad-admin-home-page.component.scss']
})
export class AdAdminHomePageComponent implements OnInit{
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
}
