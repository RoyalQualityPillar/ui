import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LmsModule } from "./lms.module";
import { LmsModuleHomePageComponent } from "../lms-module-home-page/lms-module-home-page.component";
import { LmsMasterDataHomePageComponent } from "../lms-master-data-home-page/lms-master-data-home-page.component";

const routes:Routes=[
    {
        path:"lms-module-home-page",
        component:LmsModuleHomePageComponent
    },
    {
        path:"lms-master-data-home-page",
        component:LmsMasterDataHomePageComponent
       }
]
@NgModule({
    imports :[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
 })



export class LMSRoutingModule {

}