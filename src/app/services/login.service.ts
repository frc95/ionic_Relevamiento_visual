import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //public userData: Observable<firebase.User>;
  authState=null;

  constructor(private auth : AngularFireAuth) {
    
    this.auth.onAuthStateChanged(user => {
      console.log(user);
      this.authState = this.auth.currentUser;
      if (user!=null) {
        this.authState=user;
      }
    });
  }

  Login(form){
    return new Promise((resolve, rejected) =>{
      this.auth.signInWithEmailAndPassword(form.value.email, form.value.password)
      .then(user => {
        resolve(user);
      })
      .catch(error => rejected(error));
    })
  }
  
  Logout(){
    this.auth.signOut();
  }

  ObtenerEmail()
  {
    return this.auth.authState.pipe(map(auth=>auth));
  }

  getCurrentUser()
  {
    return this.authState.email;
  }
}
