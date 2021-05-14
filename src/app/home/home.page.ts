import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router : Router, private loadingController : LoadingController) {}

  CosasLindas(){
    this.presentLoading();
    setTimeout(() => {
      this.router.navigateByUrl('lindas');
    }, 3000);
  }
  CosasFeas(){
    this.presentLoading();
    setTimeout(() => {
      this.router.navigateByUrl('feas');
    }, 3000);
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
