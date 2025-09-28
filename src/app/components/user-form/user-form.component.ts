import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import * as countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { TranslateModule } from '@ngx-translate/core';


countries.registerLocale(enLocale)

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,AuthLayoutComponent,TranslateModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userForm: FormGroup;                                      //main FormGroup that holds all form fields
  submitted:boolean=false                                  //track if form was submitted
  submittedUsers:any[]=[]                                  //stores successfully submitted users
  editIndex:number |null=null;                                //distinguish between edit and add mode
  countrylist:{code:string,name:string}[]=[];                  //dropdown from i18n-iso-countries          

  constructor(private fb: FormBuilder) {
    //mapping country codes to names
    this.countrylist=Object.entries(countries.getNames("en",{select:"official"})).map(([code ,name])=>({code,name:name as string}));
    
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      
      address: this.fb.group({                                            //nested formgroup
        city: ['', Validators.required],
        country: ['', Validators.required]
      }),

      phoneNumbers: this.fb.array([this.createPhoneField()])                        //form array
    });
  }


  get phoneNumbers(): FormArray {                                        //to get this.phoneNumbers instead of casting every time
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
      this.submittedUsers[this.editIndex]=formValue;           //update existing user
      this.editIndex=null
    }
    else{
      this.submittedUsers.push(formValue)                       //add new user
    }

    this.userForm.reset();

    this.phoneNumbers.clear();
    
    this.addPhone();
    this.submitted=false
    }
    getCountryName(code:string):string{                                //change country code into display name
      return countries.getName(code,"en")||code;

    } 
    
    //Loads the selected user into the form
    //Clears form & phone fields before patching
    //Switches form into edit mode by setting editIndex
    onEdit(index:number){
      const user=this.submittedUsers[index];

      this.userForm.reset();

      this.phoneNumbers.clear();

      this.userForm.patchValue({                                       //updates only the specified fields in the form without touching the others.
        name:user.name,
        email:user.email,
        address:{
          city:user.address.city,
          country:user.address.country
        }
      });
        user.phoneNumbers.forEach((phone:string) => {this.phoneNumbers.push(this.fb.control(phone,[Validators.required,Validators.pattern('^[0-9]{10}$')]))    //handle separately because of form array

        });
        this.editIndex=index;
      
    }


    onDelete(index:number){
      const confirmDelete=window.confirm('are you sure you want to delete this?')
      if (!confirmDelete){return}
      this.submittedUsers.splice(index,1);                    //removes  specific user from submitted users

      this.userForm.reset();

      this.phoneNumbers.clear();
      
      this.addPhone();
      this.submitted=false
    }
    
  }


