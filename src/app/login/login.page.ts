import { Component, OnInit } from '@angular/core';
import { LoginService } from "../services/login.service";
import { FormGroup ,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailPattern : string="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern(this.emailPattern)]),
    password: new FormControl('',  [Validators.required,Validators.minLength(3)])
  });

  email='';
  password='';
  

  constructor(
    private service : LoginService, 
    private route : Router, 
    public toastController: ToastController,
    public platform : Platform,
    public loadingController : LoadingController ) {
      /*this.platform.ready().then(()=>{
        this.loadingController.create({
          message: 'Cargando'

        }).then((loadingElement)=>{
          loadingElement.present();
          var ref = this;
          setTimeout(function(){
            ref.loadingController.dismiss();
          },5000);
        });
      });*/   
  }

  ngOnInit() {
  }

  Login(form){
    this.service.Login(form).then(res =>{
      this.presentLoading();
      setTimeout(() => {
        this.route.navigateByUrl('home');
      }, 3000);
    }).catch(err => {

      if(err.code == "auth/wrong-password")
      {
        this.mostrarModal("Error en la contraseña");
      }
      else if(err.code == "auth/user-not-found")
      {
        this.mostrarModal("El usuario no existe");
      }
      else if(err.code == "auth/invalid-email")
      {
        this.mostrarModal("Error en el email");
      }
      else
      {
        this.mostrarModal(err.message);
      }

        
    });
  }

  LoginAdmin(){
    this.email="admin@admin.com";
    this.password="111111";
  }
  LoginInvitado(){
    this.email="invitado@invitado.com";
    this.password="222222";
  }
  LoginUsuario(){
    this.email="usuario@usuario.com";
    this.password="333333";
  }
  LoginAnonimo(){
    this.email="anonimo@anonimo.com";
    this.password="444444";
  }
  LoginTester(){
    this.email="tester@tester.com";
    this.password="555555";
  }

  async mostrarModal(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Cargando',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }





}
