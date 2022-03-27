import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Upload } from '../models/upload.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable( {
  providedIn: 'root'
} )
export class UploadService {

  private basePath: string = '/uploads'

  constructor ( private AFire: AngularFireModule, private db: AngularFireDatabase ) { }
  
  uploadFile ( upload: Upload ): void {
    const storageRef = firebase.storage().ref()
    const uploadTask = storageRef.child( `${ this.basePath }/${ upload }` ).put(upload.file)

    //monitor task as it is uploaded
    uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED ,
      // 3 Observers
      // 1. Allow to monitor upload progress
      ( snapshot ): void => {
        upload.progress = ( uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes ) * 100

      },

      //2. check error
      ( error: Error ): void => {
        console.log( error )
        alert(error)
      },

      // Success Observer
      (): void => {
        upload.url = uploadTask.snapshot.ref.getDownloadURL()
        upload.name = upload.file.name
        this.saveFileData(upload)
      }
    )
  }
  private saveFileData ( upload: Upload ): void {
    this.db.list( `${ this.basePath }` ).push( upload )
    console.log( `File - ${ upload.name } to : ` + upload.url )
  }
}