import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationHomePageComponent } from '../quotation-home-page/quotation-home-page.component';
import { QuotationMasterPageComponent } from '../quotation-master-page/quotation-master-page.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';






@NgModule({
  declarations: [
    QuotationHomePageComponent,
    QuotationMasterPageComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule
  ]
})
export class SdModule { }
