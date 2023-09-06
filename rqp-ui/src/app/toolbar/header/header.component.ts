import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ToolbarService} from '../../service/toolbar.service';
import {CookieService} from 'ngx-cookie-service';
import { LogoutConfirmModel, LogoutConfirmComponent } from '../logout-confirm/logout-confirm.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  result: string = '';
  color = "accent";
  constructor(private route: Router, private router: ActivatedRoute,public toolbarService:ToolbarService,
    public cookieService:CookieService,public dialog: MatDialog){

  }
  userId:any
  ngOnInit(): void {
    this.userId=this.cookieService.get('userId')
  }
  
  navigatehome() {
    console.log("clicked")
    this.route.navigate(['./data-table']);
  }
  confirmDialog(): void {
    const message = `Are you sure you want to logout?`;

    const dialogData = new LogoutConfirmModel("Logout Confirmation", message);

    const dialogRef = this.dialog.open(LogoutConfirmComponent, {
      minWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }
  onLogout(){
    //this.toolbarService.isLogin="loginFaild";
    this.cookieService.delete('userId');
    this.cookieService.delete('token');
    this.cookieService.delete('isLogin');
    this.cookieService.delete('menuHeader');
    this.cookieService.delete('subMenu1');
    this.route.navigate(['./login']);
    this.cookieService.delete('isAuth');
  }
  onChangePassword(){
    console.log('working')
    //this.route.navigate(['./data-table'])
    this.route.navigate(['./change-password'])
  }
  submenu1(subMenuName1:any){
    console.log(subMenuName1)
    let subMenuName123='AD-MasterDataRegistration'
    if(subMenuName123=='AD-MasterDataRegistration'){
      this.route.navigate(['./master-data-management'])
    }
  }
  //without login
  onHome(){
    //on home
  }
  onGuildeLines(){
    this.route.navigate(['./guidelines'])
  }
}
