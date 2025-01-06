import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/users'; // Vérifiez cette URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    console.log('Calling API:', this.apiUrl);
    return this.http.get<any[]>(this.apiUrl);
  }
  
}
