import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Upload } from '../models/upload.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class UploadService {

  private basePath: string = '/uploads'

  constructor ( private AFire: AngularFireModule, private storage: AngularFireStorage, private db: AngularFireDatabase ) { }
  
  uploadFile ( upload: Upload ): void {

    const filePath: string = `${ this.basePath }/${ upload.file.name }`
    const storageRef: AngularFireStorageReference = this.storage.ref( filePath )
    const uploadTask: AngularFireUploadTask = this.storage.upload( filePath, upload.file )
    
    uploadTask.snapshotChanges().pipe(
      finalize( (): void => {
        storageRef.getDownloadURL().subscribe( ( url: string ): void => {
          upload.name = upload.file.name
          upload.url = url
          this.saveFileData( upload );
        } )
      } )
    ).subscribe();
  }
  
  private saveFileData ( upload: Upload ): void {
    this.db.list(this.basePath).push( upload )
    console.log( `File - ${ upload.name } to : ` + upload.url )
 }
}
