import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DmsModuleHomePageComponent } from "../dms-module-home-page/dms-module-home-page.component";
import { UserRequirementHomePageComponent } from "../dms-main/user-requirement-home-page/user-requirement-home-page.component";


const routes: Routes = [
    // {path:"ad-administrator",component:AdAdminHomePageComponent}, 
    {path:"dms-module-home-page",component:DmsModuleHomePageComponent},
    {path:"user-requirement-home-page",component:UserRequirementHomePageComponent}

]

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
export class DmsRoutingModule {}