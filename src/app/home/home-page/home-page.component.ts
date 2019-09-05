import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStorageService } from 'src/app/core/auth/auth.storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  loggedIn: boolean;

  constructor(
    private router: Router,
    public auth: AuthStorageService) { }

  problems(): void {
    this.router.navigateByUrl('/problems');
  }

  competitions(): void {
    this.router.navigateByUrl('/competitions');
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  registration(): void {
    this.router.navigateByUrl('/register');
  }

}
