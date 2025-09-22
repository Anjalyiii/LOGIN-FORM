import { Injectable } from '@angular/core';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db?:any

  constructor(private authService:AuthService) { 
    this.db=getFirestore()
  }
  async createSnippet(snippet:{title:string,code:string}){
   

  try {
    const docRef = await addDoc(collection(this.db, "snippets"), {
      ...snippet,
      by:this.authService.getUid()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  }
}
