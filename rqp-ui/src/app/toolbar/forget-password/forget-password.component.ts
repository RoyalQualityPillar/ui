import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {ToolbarService} from '../../service/toolbar.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit{
  hide = true;
  LoginForm: FormGroup;
  constructor(public fb: FormBuilder,private route:Router,private toolbarService:ToolbarService){
    this.LoginForm = this.fb.group({
      email:[''],
    }); 
  }
  ngOnInit(): void {
    console.log('working forget')
  }
}
