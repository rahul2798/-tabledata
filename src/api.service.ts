import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'https://mocki.io/v1/072f4309-6b86-4ecc-b055-e16192d9f76a';

  constructor(private http: HttpClient) {}

  getData(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }
}
