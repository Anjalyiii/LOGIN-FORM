/*Template driven*/
import { Component } from '@angular/core';
import { AuthLayoutComponent } from "../auth-layout/auth-layout.component";
import { FormsModule, NgForm, NgModel, ɵInternalFormsSharedModule } from "@angular/forms";
import { HeaderComponent } from '../header/header.component';
import {  Router, Routes } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AuthLayoutComponent,HeaderComponent, ɵInternalFormsSharedModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService:AuthService ,private router:Router){}    /*used for default navigation to login page*/
  register(regForm:NgForm){               /*register,ngForm is used for template driven*/
    console.log(regForm.value)
    this.authService.registerUser(regForm.value.email,regForm.value.password)
    //this.router.navigate(['/login'])
  }
  reset(regForm:NgForm){
    regForm.reset()
  }

}
