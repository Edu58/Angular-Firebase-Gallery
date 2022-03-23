import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuardGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuardGuard] },
  { path: 'image/:id', component: ImageDetailComponent, canActivate: [AuthGuardGuard] },
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
