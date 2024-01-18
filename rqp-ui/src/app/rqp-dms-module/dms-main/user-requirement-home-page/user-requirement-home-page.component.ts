import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-requirement-home-page',
  templateUrl: './user-requirement-home-page.component.html',
  styleUrls: ['./user-requirement-home-page.component.scss']
})
export class UserRequirementHomePageComponent implements OnInit{

pageData:any;
UserRequirementForm:FormGroup;
isLoading:boolean;
constructor(private fb:FormBuilder){
 this.UserRequirementForm=this.fb.group({
  comments:['']
 })
}
ngOnInit(): void {
  this.pageData={
    pageName:'homePage',
   } 
}
selectedDataList={
  documentType:'',
  attachement:File,
}
testfile:any
selectedFiles:any;
attachmentName:any;
fileToUpload:File|null=null;
handleFileInput(event:any){
this.selectedFiles=event.target.files;
console.log(this.selectedFiles[0].name);
this.attachmentName=this.selectedFiles[0].name
const target =event.target as HTMLInputElement;
this.fileToUpload=(target.files as FileList)[0]
this.testfile=this.selectedFiles.item(0)
}
onCreateSelectedDataList(){
  
}
getHeaderData(event:any){
 console.log(event)
}
onSaveConfirmation(value:any){

}
onSubmit(value:any){

}
}
