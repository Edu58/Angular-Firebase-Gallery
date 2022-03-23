import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import firebase from 'firebase/compat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!: Observable<firebase.User | null>

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit (): void {
    this.user = this.auth.authUser();
  }

  logOut (): void {
    this.auth.logout()
    .then((resolve: void): Promise<boolean> => this.router.navigateByUrl('/'))
  }

}
