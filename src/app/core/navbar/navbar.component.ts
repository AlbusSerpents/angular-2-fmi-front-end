import { Component, OnInit } from '@angular/core';
import { AuthStorageService } from '../auth/auth.storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;
  userId: string;

  constructor(
    private router: Router,
    public auth: AuthStorageService) { }

  ngOnInit() {
    this.loggedIn = this.auth.isLoggedIn();
    this.userId = this.loggedIn ? this.auth.getUserId() : null;
  }

  home() {
    this.router.navigateByUrl('/');
  }

  myProfile() {
    this.router.navigateByUrl('/my-profile');
  }

  logout() {
    this.auth.clearCredentials();
    this.router.navigateByUrl('/');
  }

}
