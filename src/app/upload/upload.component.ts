import { Component, OnInit } from '@angular/core';
import { Upload } from '../models/upload.model';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  files!: FileList;
  upload!: Upload;

  constructor ( private uploadService: UploadService ) { }
  
  handleFiles ( event:any ): void {
    this.files = event.target.files
  }

  uploadFiles (): void {
    const filesToUpload: FileList = this.files
    
    // console.log(filesToUpload)
    for ( let i: number = 0; i < filesToUpload.length; i++) {
      let file: any = filesToUpload.item( i )
      this.upload = new Upload( file )
      this.uploadService.uploadFile(this.upload)
    }

  }

  ngOnInit (): void {
    
  }

}
