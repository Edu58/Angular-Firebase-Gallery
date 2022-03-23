import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user!: Observable<firebase.User | null>

  constructor ( private afAuth: AngularFireAuth ) { 
    this.user = afAuth.authState
  }
  
  login (user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
  }

  logout (): Promise<void> {
    return this.afAuth.signOut()
  }

  authUser () {
    return this.user
  }

}
