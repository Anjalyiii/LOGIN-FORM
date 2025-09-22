import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import * as countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';


countries.registerLocale(enLocale)

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userForm: FormGroup;
  submitted:boolean=false
  submittedUsers:any[]=[]
  editIndex:number |null=null;
  countrylist:{code:string,name:string}[]=[];

  constructor(private fb: FormBuilder) {
    
    this.countrylist=Object.entries(countries.getNames("en",{select:"official"})).map(([code ,name])=>({code,name:name as string}));
    
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      
      address: this.fb.group({
        city: ['', Validators.required],
        country: ['', Validators.required]
      }),

      phoneNumbers: this.fb.array([this.createPhoneField()])
    });
  }


  get phoneNumbers(): FormArray {
    return this.userForm.get('phoneNumbers') as FormArray;
  }

  
  createPhoneField() {
    return this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')]);
  }

  addPhone() {
    this.phoneNumbers.push(this.createPhoneField());
  }

  removePhone(index: number) {
    this.phoneNumbers.removeAt(index);
  }
  

  onSubmit() {
    
    this.submitted=true

    if (this.userForm.invalid) {
     this.userForm.markAllAsTouched();
      alert('Form is invalid. Please check the fields.'); 
      console.log('Form Invalid');
      return;}
      //this.submittedUsers.push(this.userForm.value);
      
    //alert('Form Submitted!');
    //console.log('Form Data:', this.userForm.value);
    const formValue=this.userForm.value;
    if(this.editIndex!==null){
      this.submittedUsers[this.editIndex]=formValue;
      this.editIndex=null
    }
    else{
      this.submittedUsers.push(formValue)
    }

    this.userForm.reset();

    this.phoneNumbers.clear();
    
    this.addPhone();
    this.submitted=false
    }
    getCountryName(code:string):string{
      return countries.getName(code,"en")||code;

    } 
    
    onEdit(index:number){
      const user=this.submittedUsers[index];

      this.userForm.reset();

      this.phoneNumbers.clear();

      this.userForm.patchValue({
        name:user.name,
        email:user.email,
        address:{
          city:user.address.city,
          country:user.address.country
        }
      });
        user.phoneNumbers.forEach((phone:string) => {this.phoneNumbers.push(this.fb.control(phone,[Validators.required,Validators.pattern('^[0-9]{10}$')]))

        });
        this.editIndex=index;
      
    }
    onDelete(index:number){
      const confirmDelete=window.confirm('are you sure you want to delete this?')
      if (!confirmDelete){return}
      this.submittedUsers.splice(index,1);

      this.userForm.reset();

      this.phoneNumbers.clear();
      
      this.addPhone();
      this.submitted=false
    }
    
  }


