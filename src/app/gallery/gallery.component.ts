import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { GalleryImage } from '../models/galleryImage.model';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {

  images!: any

  constructor(private imageService: ImageService) { }

  ngOnInit (): void {
    this.images = this.imageService.getAllImages();
  }

  ngOnChanges (): void {
    this.images = this.imageService.getAllImages();
  }

}
