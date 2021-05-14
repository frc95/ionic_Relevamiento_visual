import { compileFactoryFunction } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory
, CameraPhoto, CameraSource } from "@capacitor/core";
import { Photo } from '../models/photo.interface';

import { AngularFireStorage } from '@angular/fire/storage';
import { StorageService } from './storage.service';
import { LoginService } from './login.service';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  //private photos: Photo[] = [];
  constructor(private storage: AngularFireStorage, 
    private storageSvc : StorageService,
    private auth : LoginService) { }

  public async addNewToGallery(tipo : string){
    
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      webUseInput: true
    });

    /*const dataUrl = capturedPhoto.dataUrl;
    const fileName = new Date().getTime();
    const ref = this.storage.ref(`images/${fileName}`);
    const result = await ref.putString(dataUrl, 'data_url', {
      contentType: 'image/jpeg',
    });*/

      const dataUrl = capturedPhoto.dataUrl;
      const fileName = new Date().getTime();
      const perfil = this.auth.getCurrentUser().split('@')[0];
      const ref = this.storage.ref(`images/${tipo}/${perfil}_${fileName}`);
      const result = await ref.putString(dataUrl, 'data_url', {
      contentType: 'image/jpeg',
      });

      ref.getDownloadURL().subscribe(url=>{
            this.storageSvc.publicar(`${perfil}_${fileName}`,url, tipo);   
      })

  }

  public getPhotos(tipo : string){

    /*let photos:Photo[] = [];

    this.storageSvc.TraerPublicaciones().subscribe( doc =>{
      doc.forEach(async doc => {
          photos.push({
          filePath: doc['name'],
          webviewPath: await doc['url'],
          name: doc['name'].split('_')[0],
          time: Number(doc['name'].split('_')[1]),
          likes: doc['likes'],
          liked: false
        });
      });
    });*/

    //return photos;
    return this.storageSvc.TraerPublicaciones(tipo);
  }

}
