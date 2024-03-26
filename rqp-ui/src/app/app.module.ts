import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BkTableModule } from 'bk-angular-table';

import { HeaderComponent } from './toolbar/header/header.component';
import { LoginComponent } from './toolbar/login/login.component';
import { FooterComponent } from './toolbar/footer/footer.component';
import { DataTableComponent } from './toolbar/life-cycle-data/data-table.component';
import { HomeComponent } from './toolbar/home/home.component';
import { ChangePasswordComponent } from './toolbar/change-password/change-password.component';
import { ModuleHomePageComponent } from './toolbar/module-home-page/module-home-page.component';
import { ForgetPasswordComponent } from './toolbar/forget-password/forget-password.component';

import { LogoutConfirmComponent } from './toolbar/logout-confirm/logout-confirm.component';
import { MessageDialogComponent } from './common/message-dialog/message-dialog.component';
import { ErrorInterceptor } from 'src/interceptor/error.interceptor';
import { AttachmentPreviewComponent } from './home-page-menubar/attachment-preview/attachment-preview.component';
import { LovDialogComponent } from './common/lov-dialog/lov-dialog.component';
import { PageNotFoundComponent } from './toolbar/page-not-found/page-not-found.component';
import { RqpInterceptor } from 'src/interceptor/rqp.interceptor';





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
    LogoutConfirmComponent,
    MessageDialogComponent,
   // GuidelinesComponent,
    AttachmentPreviewComponent,
   // CreateGuidelineComponent,
    LovDialogComponent,
    PageNotFoundComponent,
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    BkTableModule,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [CookieService,DatePipe,
  {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:RqpInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }