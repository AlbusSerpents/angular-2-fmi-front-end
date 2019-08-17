import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { AuthStorageService } from '../auth/auth.storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInChildGuard implements CanActivateChild {
  constructor(
    private authStorage: AuthStorageService,
    private router: Router
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authStorage.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['public']);
      return false;
    }
  }
}
