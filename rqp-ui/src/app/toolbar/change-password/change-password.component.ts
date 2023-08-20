import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {ToolbarService} from '../../service/toolbar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  hide = true;
  LoginForm: FormGroup;
  constructor(public fb: FormBuilder,private route:Router,private toolbarService:ToolbarService){
    this.LoginForm = this.fb.group({
      email:[''],
    }); 
  }
  ngOnInit(): void {
  }
}
