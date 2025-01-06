import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost/api/users';  // L'URL de l'API Laravel

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer tous les utilisateurs
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
