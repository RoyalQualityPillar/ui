import { Component,OnInit } from '@angular/core';
import {ToolbarService} from './service/toolbar.service';
import {ActivatedRoute,Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
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
              private cookieService:CookieService){
   // sessionStorage.removeItem("isLogin");
  }
  token:any;
  ngOnInit(): void {
   // this.applicationshow=sessionStorage.getItem('isLogin');
   //this.applicationshow=this.toolbarService.isLogin;
    console.log(this.applicationshow);
    this.token = this.cookieService.get('token');
    this.getLoginDetail()
  }
  getLoginDetail(){
    console.log(this.cookieService.get('token'))
    if(this.token == undefined || this.token == ""){
      console.log('without login')
      this.route.navigate(['./login'])
    }else{
      console.log('with login')
      this.route.navigate(['./data-table'])
    }
  }
}
