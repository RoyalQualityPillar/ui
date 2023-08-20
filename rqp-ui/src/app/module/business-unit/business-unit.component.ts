import { Component,OnInit,AfterViewInit  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-business-unit',
  templateUrl: './business-unit.component.html',
  styleUrls: ['./business-unit.component.scss']
})
export class BusinessUnitComponent implements OnInit  {

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
