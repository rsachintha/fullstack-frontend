import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  createUser(data: any) {
    return this.httpClient.post(this.url + '/api/users/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
