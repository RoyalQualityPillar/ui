import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QmsModuleHomePageComponent } from '../qms-module-home-page/qms-module-home-page.component';
import { QmsMasterDataHomePageComponent } from '../qms-master-data-home-page/qms-master-data-home-page.component';
import { CapaHomeComponent } from '../capa/capa-home/capa-home.component';
import { CapaInitiatorComponent } from '../capa/capa-initiator/capa-initiator.component';
import { DevHomeComponent } from '../dev/dev-home/dev-home.component';
import { DevInitiatorComponent } from '../dev/dev-initiator/dev-initiator.component';
import { NciHomeComponent } from '../nci/nci-home/nci-home.component';
import { NciInitiatorComponent } from '../nci/nci-initiator/nci-initiator.component';
import { CcHomeComponent } from '../cc/cc-home/cc-home.component';
import { CcInitiatorComponent } from '../cc/cc-initiator/cc-initiator.component';
import { RctHomePageComponent } from '../rqp-qms-master/rct-master/rct-home-page/rct-home-page.component';
import { QmsMasterHomePageComponent } from '../rqp-qms-master/rct-master/qms-master-home-page/qms-master-home-page.component';

const routes: Routes = [
  {    path:"qms-module-home-page",    component:QmsModuleHomePageComponent },
{  path:"qms-master-data-home-page", component:QmsMasterDataHomePageComponent  },
 {  path:"capa-home", component:CapaHomeComponent},
 {  path:"capa-initiator", component:CapaInitiatorComponent},
 {  path:"dev-home", component:DevHomeComponent},
 {  path:"dev-initiator", component:DevInitiatorComponent},
 {  path:"nci-home", component:NciHomeComponent},
 {  path:"nci-initiator", component:NciInitiatorComponent},
 {  path:"cc-home", component:CcHomeComponent},
 {  path:"cc-initiator", component:CcInitiatorComponent},
 { path:"qms-rct-home-page", component:RctHomePageComponent},
 {path:"qms-master-home-page", component:QmsMasterHomePageComponent},
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QmsRoutingModule { }
