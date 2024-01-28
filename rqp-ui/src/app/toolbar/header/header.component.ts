import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ToolbarService} from '../../service/toolbar.service';
import {CookieService} from 'ngx-cookie-service';
import { LogoutConfirmModel, LogoutConfirmComponent } from '../logout-confirm/logout-confirm.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  result: string = '';
  color = "accent";
  constructor(private route: Router, private router: ActivatedRoute,public toolbarService:ToolbarService,
    public cookieService:CookieService,public dialog: MatDialog,public lifeCycleDataService:LifeCycleDataService){

  }
  userId:any
  ngOnInit(): void {
    this.userId=this.cookieService.get('userId')
  }
  
  navigatehome() {
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
    //this.route.navigate(['./data-table'])
    this.route.navigate(['./change-password'])
  }
  submenu1(subMenuName1:any){
   // let subMenuName123='AD-MasterDataRegistration'
    if(subMenuName1=='CC-QA Approver'){
      this.route.navigate(['./master-data-management'])
    }else if(subMenuName1=='NCI-QA Approver'){
      this.route.navigate(['./quotation-home-page']) 
    }
  }
  onSelectSubMenu(subMenu:any,stage:any){
    console.log(stage)
     this.toolbarService.currentStage=stage;
    if(subMenu =='CC-Cross Functional Reviewer'){
      this.route.navigate(['./master-data-management'])
    }else if(subMenu == 'CC-QA Approver'){
      this.route.navigate(['./sd/quotation-home-page']) 
    }else if(subMenu == 'AD-Administrator'){
      console.log('working')
      //this.route.navigate(['./admin/ad-administrator']) 
      this.route.navigate(['./admin/ad-administrator']) 
    }else if(subMenu == 'AD-Master Data'){ 
      console.log('working')
       this.route.navigate(['./admin/ad-master']) 
     }else if(subMenu == 'QT-Initator'){
      this.route.navigate(['./sd/quotation-home-page']) 
    // }else if(subMenu == 'QT-Reviewer'){
     // this.route.navigate(['./rqp-pending-assignment']) 
     }else if(subMenu == 'QT-Update'){
      this.toolbarService.currentStage=1;
      this.route.navigate(['./sd/qt-update-page']) 
     }else if(subMenu == 'QT-Master Data'){
      this.route.navigate(['./sd/qt-master-data-home-page']) 
     }
    //  else if(this.toolbarService.currentStage>=2){
    //   this.route.navigate(['./sd/rqp-pending-assignment'])  need to check with @suresh
    // }
     else if(subMenu =='URS-Initator'){
      this.route.navigate(['./dms/user-requirement-home-page'])  
     }else if(subMenu =='DQ-Initator'){
      this.route.navigate(['./sd/draft-initator-home-page'])  
     }else if(subMenu =='DQ-Reviewer'){
      this.route.navigate(['./sd/draft-reviewer-home-page'])  
     }else if(subMenu =='DQ-Update'){
      this.route.navigate(['./sd/draft-update-home-page'])  
     }
     else if(subMenu =='FQ-Initator'){
      this.route.navigate(['./sd/fair-initator-home-page'])  
     }else if(subMenu =='FQ-Reviewer'){
      this.route.navigate(['./sd/fair-reviewer-home-page'])  
     }
     else if(subMenu =='FQ-Update'){
      this.route.navigate(['./sd/fair-update-home-page'])  
     }
     
    //Module routing required based on submenu
  }
  //without login
  onHome(){
    //on home
  }
  onGuildeLines(){
    this.route.navigate(['./guidelines'])
  }
}
