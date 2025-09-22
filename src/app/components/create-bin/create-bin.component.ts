import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';

@Component({
  selector: 'app-create-bin',
  standalone: true,
  imports: [AuthLayoutComponent,ReactiveFormsModule],
  templateUrl: './create-bin.component.html',
  styleUrl: './create-bin.component.css'
})
export class CreateBinComponent {
  title=new FormControl("",[Validators.required])
  code=new FormControl("",[Validators.required])
  binform= new FormGroup({title:this.title,code:this.code})
  save(){
    console.log(this.binform.value)
  }
 

}
