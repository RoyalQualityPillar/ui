import { Component,OnInit } from '@angular/core';
import {ToolbarService} from './service/toolbar.service';
import {ActivatedRoute,Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../app/service/auth.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'royal';
  applicationshow:any;
  

  constructor(public toolbarService:ToolbarService,
              private route:Router,
              private cookieService:CookieService,
              private authService:AuthService,
              private location: Location){
   // sessionStorage.removeItem("isLogin");
  }
  token:any;
  ngOnInit(): void {
   // this.applicationshow=sessionStorage.getItem('isLogin');
   //this.applicationshow=this.toolbarService.isLogin;
   // console.log(this.applicationshow);
    //console.log(window.location.href);
    localStorage.setItem('currentURL',window.location.href)
    this.token = this.cookieService.get('token');
    this.cookieService.set('subMenuFlag','false');
    this.getLoginDetail()
  }
  getLoginDetail(){

    //console.log(this.cookieService.get('token'))
    if(this.token == undefined || this.token == ""){
     // console.log('without login')
      this.route.navigate(['./login'])
    }else{
     // console.log('with login')
      this.authService.autoAuthUser();
      const url=localStorage.getItem('currentURL')
      //console.log(url);
     // window.location.href=url;
      this.route.navigate(['./data-table'])      
       // this.location.back()
    }
  }
}
