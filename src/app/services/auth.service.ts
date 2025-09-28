import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from './language.service';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut,onAuthStateChanged } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uid?:string

  constructor(private router:Router, @Inject(PLATFORM_ID) private platformId:Object,
    private languageService:LanguageService) { 

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.uid = user.uid
      console.log("user logged in",user.email)
      // ...
    } else {
      this.uid=undefined
      console.log("user logged out")
      // User is signed out
      // ...
    }
});
  }
  isauthenticated(){
    return this.uid ? true:false
  }
  getUid(){
    return this.uid
  }
  registerUser(email:string,password:string){
    

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log({user})
      this.router.navigate(['/login'])
      // ...
    })
    .catch((error) => {
      //const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      alert("something went wrong while signup please try again later")
      // ..
    });
  }
  loginUser(email:string,password:string){
    //import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log({user})
      this.router.navigate(['/user-form'])
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage)
      alert("something went wrong while logging please try again later")
    });
    }
  logout(){
    //eort { getAuth, signOut } from "firebase/auth";
  if(isPlatformBrowser(this.platformId)) {
  const auth = getAuth();
  const currentLanguage=this.languageService.getCurrentLanguage();
  
  signOut(auth)
  .then(()=>{
    let keysToRemove=["token","rl","url","data"];
    keysToRemove.forEach(k=>localStorage.removeItem(k));
    this.router.navigate(['/'],{queryParams:{lang:currentLanguage}});

  })
  .catch((error) => {
  alert("something went wrong while logging out try again later")
    // An error happened.
  });
    }
  }
}
