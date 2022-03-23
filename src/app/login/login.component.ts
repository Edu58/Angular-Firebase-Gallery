import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { resolve } from 'path';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email!: string
  password!: string
  errorMsg!: string

  constructor(private loginAuth: AuthenticationService, private router: Router) { }

  signIn (): void {
    this.loginAuth.login( { email: this.email, password: this.password } )
      .then( (resolve: any): Promise<boolean> => this.router.navigateByUrl( 'gallery' ) )
      .catch((error: { message: string; }): string => this.errorMsg = error.message)
  }

}
