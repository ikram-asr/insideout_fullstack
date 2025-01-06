import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api'; // L'URL de ton backend Laravel

  constructor(private http: HttpClient) {}

  // Récupérer le token CSRF depuis la page HTML (meta tag)
 private getCSRFToken(): string {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  }
  /* getCrsfToken(){
    return this.http.get<any>('${apiUl}sanctum/csrf-cookie',{withCredentials:true, observe: 'reponse'})

  }*/
  // Inscription
  signup(nom: string, prenom: string, email: string, password: string): Observable<any> {
    const token = this.getCSRFToken();  // Récupère le token CSRF

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token  // Ajouter le token CSRF aux en-têtes
    });

    const body = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
    };

    return this.http.post(`${this.apiUrl}/signup`, body, { headers });
  }

  // Connexion
  login(email: string, password: string): Observable<any> {
    const token = this.getCSRFToken();  // Récupère le token CSRF

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token  // Ajouter le token CSRF aux en-têtes
    });

    const body = {
      email: email,
      password: password
    };

    return this.http.post(`${this.apiUrl}/login`, body, { headers });
  }
}
