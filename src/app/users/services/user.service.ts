import { Injectable } from '@angular/core';
import { ConnectorService } from 'src/app/core/http/connector.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private connector: ConnectorService) { }

  getMyProfile(): Observable<MyProfile> {
    return this.connector.get('users/my-profile');
  }

  updateProfile(id: string, request: UpdateProfileRequest): Observable<void> {
    return this.connector.put(`users/${id}`, request);
  }

  getProfile(id: string): Observable<UserProile> {
    return this.connector.get(`users/profile/${id}`);
  }

}
