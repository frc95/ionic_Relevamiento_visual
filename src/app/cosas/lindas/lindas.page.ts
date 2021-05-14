import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { PhotoService } from 'src/app/services/photo.service';
import { StorageService } from 'src/app/services/storage.service';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-lindas',
  templateUrl: './lindas.page.html',
  styleUrls: ['./lindas.page.scss'],
})
export class LindasPage implements OnInit {


  public photos: any[]=[];
  /*public photos: Photo[]=[
    {
      filePath: 'soon...',
      webviewPath: "./assets/lindas/garage.jpg",
      name: "Maria",
      time: "21/4/2021 18:30",
      likes: 2,
      liked: false
    },
    {
      filePath: 'soon...',
      webviewPath: "./assets/lindas/ascensor.png",
      name: "Juan",
      time: "21/4/2021 18:30",
      likes: 3,
      liked: false
    },
    {
      filePath: 'soon...',
      webviewPath: "./assets/lindas/escaleras.jpg",
      name: "Luis",
      time: "21/4/2021 18:30",
      likes: 7,
      liked: false
    },
    {
      filePath: 'soon...',
      webviewPath: "./assets/lindas/pasillo.png",
      name: "Ale",
      time: "21/4/2021 18:30",
      likes: 10,
      liked: false
    }

  ];*/

  constructor(public router : Router,
    private photoSvc: PhotoService,
    private login: LoginService,
    private storage: StorageService,
    public loadingController: LoadingController) {
  }


  ngOnInit() {
    this.photoSvc.getPhotos("lindas").subscribe(doc =>{
      this.photos = doc;
      this.photos.forEach(photo => {

          if(this.login.getCurrentUser()!=null)
          {
            this.storage.TraerUsuarioDePublicacion
            (photo['filePath'],this.login.getCurrentUser(),"lindas").subscribe( ref =>{
              photo['liked']=ref['liked'];
            })
          }
      });  
    });
  }

  Logout(){
    let sound = new Howl({
      src: ['assets/logout/logout.mp3']
    });
    sound.play();

    this.presentLoading();
    setTimeout(() => {
      this.login.Logout();
      this.router.navigateByUrl('login');
    }, 3000);
  }

  Like(photo){
    if(!photo.liked){
      this.storage.addLike(photo.filePath, photo.likes, this.login.getCurrentUser(),"lindas");
    }
    else{
      this.storage.removeLike(photo.filePath, photo.likes, this.login.getCurrentUser(),"lindas");
    }
  }

  public newPhoto(): void{
    this.photoSvc.addNewToGallery("lindas");
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Saliendo',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


}
