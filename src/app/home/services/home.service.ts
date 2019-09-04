import { Injectable } from '@angular/core';
import { ConnectorService } from 'src/app/core/http/connector.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthStorageService } from 'src/app/core/auth/auth.storage.service';

@Injectable()
export class HomeService {

  constructor(
    private auth: AuthStorageService,
    private connector: ConnectorService) { }

  login(request: LoginRequest): Observable<AuthenticationResponse> {
    return this.connector
      .publicPost<LoginRequest, AuthenticationResponse>('login', request)
      .pipe(tap(
        response => this.setCredentials(request, response),
        _ => { },
        () => { }
      ));
  }

  register(request: RegistrationRequest): Observable<AuthenticationResponse> {
    return this.connector
      .publicPost<LoginRequest, AuthenticationResponse>('register', request)
      .pipe(tap(
        response => this.setCredentials(request, response),
        _ => { },
        () => { }
      ));
  }

  private setCredentials({ username, password }, response: AuthenticationResponse): void {
    const credentials = `Basic ${btoa(`${username}:${password}`)}`;
    console.log(credentials);
    this.auth.setCredentials(credentials, response.id);
  }

}
