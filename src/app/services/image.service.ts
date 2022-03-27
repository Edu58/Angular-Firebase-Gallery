import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FirebaseApp } from '@angular/fire/app';
import firebase from 'firebase/compat';
import 'firebase/storage'
import { Observable } from 'rxjs';
import { GalleryImage } from '../models/galleryImage.model';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  private uid!: string;

  constructor ( private afAuth: AngularFireAuth, private db: AngularFireDatabase ) { 
    this.afAuth.authState.subscribe( auth => {
      if(auth !== undefined && auth !== null) {
        this.uid = auth.uid
      }
    })
  }
  
  getAllImages ():  AngularFireList<GalleryImage[]> {
    return this.db.list('uploads')
  }

  // getAllImages (): Observable<GalleryImage[]> {
  //   throw new Error( 'Method not implemented.' );
  // }

}
