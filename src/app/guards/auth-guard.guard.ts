import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { map } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class AuthGuardGuard implements CanActivate {

  user: Observable<firebase.User | null>

  constructor ( private afAuth: AngularFireAuth, private route: Router ) {
    this.user = afAuth.authState
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.user.pipe( take(1), map( ( auth: any ) => {
      if ( !auth )
      {
        this.route.navigateByUrl( '/login' )
      }

      return true;
    } ) );
      
  }
  
}
