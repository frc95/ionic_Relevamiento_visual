import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { PhotoService } from 'src/app/services/photo.service';
import { StorageService } from 'src/app/services/storage.service';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-feas',
  templateUrl: './feas.page.html',
  styleUrls: ['./feas.page.scss'],
})
export class FeasPage implements OnInit {

  public photos: any[]=[];

  constructor(public router : Router,
    private photoSvc: PhotoService,
    private login: LoginService,
    private storage: StorageService,
    private loadingController : LoadingController) { }

  ngOnInit() {
    this.photoSvc.getPhotos("feas").subscribe(doc =>{
      this.photos = doc;
      this.photos.forEach(photo => {

          if(this.login.getCurrentUser()!=null)
          {
            this.storage.TraerUsuarioDePublicacion
            (photo['filePath'],this.login.getCurrentUser(),"feas").subscribe( ref =>{
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
      this.storage.addLike(photo.filePath, photo.likes, this.login.getCurrentUser(),"feas");
    }
    else{
      this.storage.removeLike(photo.filePath, photo.likes, this.login.getCurrentUser(),"feas");
    }
  }

  public newPhoto(): void{
    this.photoSvc.addNewToGallery("feas");
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
