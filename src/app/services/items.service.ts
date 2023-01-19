import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(this.url + '/api/items', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  update(data: any) {
    return this.httpClient.put(this.url + '/api/items', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  get() {
    return this.httpClient.get(this.url + '/api/items');
  }

  delete(id: any) {
    return this.httpClient.delete(this.url + '/api/items/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
