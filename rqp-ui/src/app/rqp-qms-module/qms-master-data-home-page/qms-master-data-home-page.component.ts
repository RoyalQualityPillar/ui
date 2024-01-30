import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-qms-master-data-home-page',
  templateUrl: './qms-master-data-home-page.component.html',
  styleUrls: ['./qms-master-data-home-page.component.scss']
})
export class QmsMasterDataHomePageComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public cookieService: CookieService
  ) {}

  ngOnInit(): void {
    // Initialization logic here
  }

  onUserProfileRegistration() {
    this.router.navigate(['./qms/user-profile-management']);
  }

  onLifeCycle() {
    this.router.navigate(['./qms/life-cycle']);
  }
}
