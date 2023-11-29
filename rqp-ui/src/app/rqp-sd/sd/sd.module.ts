import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationHomePageComponent } from '../quotation-home-page/quotation-home-page.component';
import { QuotationMasterPageComponent } from '../quotation-master-page/quotation-master-page.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RqpHeaderComponent } from '../sd-common/rqp-header/rqp-header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RqpInterceptor } from '../rqp.interceptor';
import { QtReviewerHomePageComponent } from '../qt-reviewer-home-page/qt-reviewer-home-page.component';
import { QtReviewComponent } from '../qt-review/qt-review.component';
import { AsCommonFooterComponent } from '../sd-common/as-common-footer/as-common-footer.component';





@NgModule({
  declarations: [
    QuotationHomePageComponent,
    QuotationMasterPageComponent,
    RqpHeaderComponent,
    QtReviewerHomePageComponent,
    QtReviewComponent,
    AsCommonFooterComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule
  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:RqpInterceptor,multi:true}]
})
export class SdModule { }
