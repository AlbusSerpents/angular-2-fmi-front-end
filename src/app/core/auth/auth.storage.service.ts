import { Injectable } from '@angular/core';

@Injectable()
export class AuthStorageService {
  public static readonly USER_ID_KEY = 'user_id';
  public static readonly CREDENTIALS_KEY = 'credentials';

  constructor() { }

  public setCredentials(credentials: string, userId: string) {
    localStorage.setItem(AuthStorageService.USER_ID_KEY, userId);
    localStorage.setItem(AuthStorageService.CREDENTIALS_KEY, credentials);
  }

  public clearCredentials() {
    localStorage.removeItem(AuthStorageService.USER_ID_KEY);
    localStorage.removeItem(AuthStorageService.CREDENTIALS_KEY);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(AuthStorageService.CREDENTIALS_KEY) && true;
  }

  public getCredentials(): string {
    return localStorage.getItem(AuthStorageService.CREDENTIALS_KEY);
  }

  public getUserId(): string {
    return localStorage.getItem(AuthStorageService.USER_ID_KEY);
  }
}
