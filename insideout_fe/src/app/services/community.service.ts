// community.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // L'URL de votre backend

  constructor(private http: HttpClient) {}

  // Récupérer les amis et leurs posts
  getFriends(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/community/friends`);
  }
}
