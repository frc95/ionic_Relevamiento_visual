import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private db : AngularFirestore, private auth : LoginService) { }

  public TraerDatosDelUsuario()
  { 
      return this.db.collection('usuarios', ref => ref.where('correo','==' ,this.auth.getCurrentUser())).valueChanges();
  }

  public publicar(nombre : string, urlString : string, tipo: string)
  {
    
    let id = nombre + "."+ tipo;
    
    this.db.collection(tipo).doc(id).set({
      filePath: nombre,
      webviewPath: urlString,
      name: nombre.split('_')[0],
      time: Number(nombre.split('_')[1]),
      likes: 0,
      liked: false
    });

    
    this.db.collection(tipo).doc(id).collection("users").doc(id+".admin@admin.com").set({
        id:id,
        email: "admin@admin.com",
        liked: false
    });
    this.db.collection(tipo).doc(id).collection("users").doc(id+".invitado@invitado.com").set({
      id:id,
      email: "invitado@invitado.com",
      liked: false
    });
    this.db.collection(tipo).doc(id).collection("users").doc(id+".usuario@usuario.com").set({
      id:id,
      email: "usuario@usuario.com",
      liked: false
    });
    this.db.collection(tipo).doc(id).collection("users").doc(id+".anonimo@anonimo.com").set({
      id:id,
      email: "anonimo@anonimo.com",
      liked: false
    });
    this.db.collection(tipo).doc(id).collection("users").doc(id+".tester@tester.com").set({
      id:id,
      email: "tester@tester.com",
      liked: false
    });
  }

  public addLike(filePath : string, likesNew : number, email : string, tipo: string)
  {
    
    this.db.collection(tipo).doc(filePath+"."+tipo).update({
      likes: likesNew+1
    });

    this.db.collection(tipo).doc(filePath+"."+tipo).collection('users').doc(filePath+"."+tipo+"."+email).update({
      liked: true
    });

  }

  public removeLike(filePath : string, likesNew : number, email : string, tipo: string)
  {
    this.db.collection(tipo).doc(filePath+"."+tipo).update({
      likes: likesNew-1
    });

    this.db.collection(tipo).doc(filePath+"."+tipo).collection('users').doc(filePath+"."+tipo+"."+email).update({
      liked: false
    });
  }

  public TraerPublicaciones(tipo: string)
  {
    return this.db.collection(tipo).valueChanges();
  }
  public TraerUsuarioDePublicacion(doc : string, email: string, tipo: string){

    return this.db.collection(tipo).doc(doc+"."+tipo).collection('users').doc(doc+"."+tipo+"."+email).valueChanges();

  }
}
