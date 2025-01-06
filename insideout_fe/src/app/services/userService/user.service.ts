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
    return this.http.get<any[]>(`http://127.0.0.1:8000/api/listusers`);
  }
    // Récupérer un utilisateur par ID
    getUserById(userId: string): Observable<any> {
      const token = localStorage.getItem('auth_token');
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.get(`${this.apiUrl}/user/${userId}`, { headers });
    }
}
