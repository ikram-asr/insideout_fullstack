import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api'; // L'URL de ton backend Laravel
  private user: any;

  constructor(private http: HttpClient) {
    // Récupère les informations de l'utilisateur dans sessionStorage au démarrage
    this.user = JSON.parse(sessionStorage.getItem('user') || 'null');
  }

  // Récupérer le token CSRF depuis la page HTML (meta tag)
  private getCSRFToken(): string {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  }

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

    // Effectuer la requête de connexion et sauvegarder l'utilisateur en session
    return this.http.post(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap((response: any) => {
        // Enregistrer les informations de l'utilisateur dans sessionStorage
        if (response && response.user) {
          sessionStorage.setItem('user', JSON.stringify(response.user));
          this.user = response.user; // Mettre à jour l'utilisateur en cours
        }
      })
    );
  }

  // Déconnexion
  logout(): void {
    sessionStorage.removeItem('user');
    this.user = null;
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.user !== null;
  }

  // Récupérer les informations de l'utilisateur connecté
  getUser(): any {
    return this.user;
  }
}