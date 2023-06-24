import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './toolbar/header/header.component';
import { LoginComponent } from './toolbar/login/login.component';
import { FooterComponent } from './toolbar/footer/footer.component';
import { DataTableComponent } from './details/life-cycle-data/data-table.component';
import { HomeComponent } from './toolbar/home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


import { ChangePasswordComponent } from './toolbar/change-password/change-password.component';
import { ModuleHomePageComponent } from './toolbar/module-home-page/module-home-page.component';
import { ForgetPasswordComponent } from './toolbar/forget-password/forget-password.component';
import { BusinessUnitComponent } from './module/business-unit/business-unit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MasterDataManagementComponent } from './admin/master-data-management/master-data-management.component';
import { UserProfileManagementComponent } from './admin/user-profile-management/user-profile-management.component';
import { UserProfileCreateComponent } from './admin/user-profile-create/user-profile-create.component';
import { LogoutConfirmComponent } from './toolbar/logout-confirm/logout-confirm.component';
import { ReviewCommentsHistoryComponent } from './admin/review-comments-history/review-comments-history.component';
import { MessageDialogComponent } from './common/message-dialog/message-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    DataTableComponent,
    HomeComponent,
    ChangePasswordComponent,
    ModuleHomePageComponent,
    ForgetPasswordComponent,
    BusinessUnitComponent,
    MasterDataManagementComponent,
    UserProfileManagementComponent,
    UserProfileCreateComponent,
    LogoutConfirmComponent,
    ReviewCommentsHistoryComponent,
    MessageDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    ClipboardModule,
    MatTableExporterModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
