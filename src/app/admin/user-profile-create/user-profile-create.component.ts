import { Component,OnInit,AfterViewInit  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-user-profile-create',
  templateUrl: './user-profile-create.component.html',
  styleUrls: ['./user-profile-create.component.scss']
})
export class UserProfileCreateComponent implements OnInit  {

  BusinessUnit: FormGroup;
  constructor(public fb: FormBuilder,
              private route:Router){
    this.BusinessUnit = this.fb.group({
      userid:[''],
      password:[''],
    }); 
  }

  ngOnInit(): void {
  }
}
