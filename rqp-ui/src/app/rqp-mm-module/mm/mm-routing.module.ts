import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MmModuleHomePageComponent } from '../mm-module-home-page/mm-module-home-page.component';
import { MmMasterDataHomePageComponent } from '../mm-master-data-home-page/mm-master-data-home-page.component';

const routes: Routes = [
  {
    path:"mm-module-home-page",
    component:MmModuleHomePageComponent
},
{
  path:"mm-master-data-home-page",
  component:MmMasterDataHomePageComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MmRoutingModule { }
