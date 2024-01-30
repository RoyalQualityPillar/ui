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
import { GuidelinesComponent } from './home-page-menubar/guidelines/guidelines.component';
import { AttachmentPreviewComponent } from './home-page-menubar/attachment-preview/attachment-preview.component';
import { CreateGuidelineComponent } from './home-page-menubar/create-guideline/create-guideline.component';
import { LovDialogComponent } from './common/lov-dialog/lov-dialog.component';
import { PageNotFoundComponent } from './toolbar/page-not-found/page-not-found.component';
import { RqpInterceptor } from 'src/interceptor/rqp.interceptor';
import { DqHomeComponent } from './rqp-mm-module/purchase/draft-quotation/dq-home/dq-home.component';
import { DqInitiatorComponent } from './rqp-mm-module/purchase/draft-quotation/dq-initiator/dq-initiator.component';
import { DqReviewerComponent } from './rqp-mm-module/purchase/draft-quotation/dq-reviewer/dq-reviewer.component';
import { DqUpdateComponent } from './rqp-mm-module/purchase/draft-quotation/dq-update/dq-update.component';
import { FqHomeComponent } from './rqp-mm-module/purchase/fair-quotation/fq-home/fq-home.component';
import { FqInitiatorComponent } from './rqp-mm-module/purchase/fair-quotation/fq-initiator/fq-initiator.component';
import { FqReviewerComponent } from './rqp-mm-module/purchase/fair-quotation/fq-reviewer/fq-reviewer.component';
import { FqUpdateComponent } from './rqp-mm-module/purchase/fair-quotation/fq-update/fq-update.component';
import { PoHomeComponent } from './rqp-mm-module/purchase/purches-order/po-home/po-home.component';
import { PoInitiatorComponent } from './rqp-mm-module/purchase/purches-order/po-initiator/po-initiator.component';
import { PoReviewerComponent } from './rqp-mm-module/purchase/purches-order/po-reviewer/po-reviewer.component';
import { PoUpdateComponent } from './rqp-mm-module/purchase/purches-order/po-update/po-update.component';
import { QtHomeComponent } from './rqp-mm-module/sale/quotation/qt-home/qt-home.component';
import { QtInitiatorComponent } from './rqp-mm-module/sale/quotation/qt-initiator/qt-initiator.component';
import { QtReviewerComponent } from './rqp-mm-module/sale/quotation/qt-reviewer/qt-reviewer.component';
import { QtUpdateComponent } from './rqp-mm-module/sale/quotation/qt-update/qt-update.component';
import { SiHomeComponent } from './rqp-mm-module/sale/sale-invoice/si-home/si-home.component';
import { SiInitiatorComponent } from './rqp-mm-module/sale/sale-invoice/si-initiator/si-initiator.component';
import { SiReviewerComponent } from './rqp-mm-module/sale/sale-invoice/si-reviewer/si-reviewer.component';
import { SiUpdateComponent } from './rqp-mm-module/sale/sale-invoice/si-update/si-update.component';
import { SoHomeComponent } from './rqp-mm-module/sale/sale-order/so-home/so-home.component';
import { SoInitiatorComponent } from './rqp-mm-module/sale/sale-order/so-initiator/so-initiator.component';
import { SoReviewerComponent } from './rqp-mm-module/sale/sale-order/so-reviewer/so-reviewer.component';
import { SoUpdateComponent } from './rqp-mm-module/sale/sale-order/so-update/so-update.component';
import { DoHomeComponent } from './rqp-mm-module/sale/delivery-order/do-home/do-home.component';
import { DoInitiatorComponent } from './rqp-mm-module/sale/delivery-order/do-initiator/do-initiator.component';
import { DoReviewerComponent } from './rqp-mm-module/sale/delivery-order/do-reviewer/do-reviewer.component';
import { DoUpdateComponent } from './rqp-mm-module/sale/delivery-order/do-update/do-update.component';





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
    GuidelinesComponent,
    AttachmentPreviewComponent,
    CreateGuidelineComponent,
    LovDialogComponent,
    PageNotFoundComponent,
    DqHomeComponent,
    DqInitiatorComponent,
    DqReviewerComponent,
    DqUpdateComponent,
    FqHomeComponent,
    FqInitiatorComponent,
    FqReviewerComponent,
    FqUpdateComponent,
    PoHomeComponent,
    PoInitiatorComponent,
    PoReviewerComponent,
    PoUpdateComponent,
    QtHomeComponent,
    QtInitiatorComponent,
    QtReviewerComponent,
    QtUpdateComponent,
    SiHomeComponent,
    SiInitiatorComponent,
    SiReviewerComponent,
    SiUpdateComponent,
    SoHomeComponent,
    SoInitiatorComponent,
    SoReviewerComponent,
    SoUpdateComponent,
    DoHomeComponent,
    DoInitiatorComponent,
    DoReviewerComponent,
    DoUpdateComponent,
   
    
    
    
    
    
    
    

 

    
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
