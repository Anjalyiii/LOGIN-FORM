/*reactive template
formcontrol(control single input),formgroup(control multiple input) is used with validators
*/

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HeaderComponent,AuthLayoutComponent,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService:AuthService){}
  email=new FormControl("",[
    Validators.required,
    Validators.email
  ])
  password=new FormControl("",[
    Validators.required,
    Validators.minLength(6)
  ])
  loginform= new FormGroup({                  /*will track overall state(valid/invalid,touched/untouched)*/
    email:this.email,
    password:this.password
  })
  login(){                                     /*when user submit the form,it calls authservice loginuser*/
    
    this.authService.loginUser(this.loginform.value.email!,this.loginform.value.password!)
  }
  reset(){
    this.loginform.reset()
  }

}
