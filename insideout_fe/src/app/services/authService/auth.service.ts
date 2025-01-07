import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de l'API Laravel
  private user: any;

  constructor(private http: HttpClient) {
    this.user = JSON.parse(sessionStorage.getItem('user') || 'null'); // Chargement de l'utilisateur au démarrage
  }

  // Inscription
  signup(nom: string, prenom: string, email: string, password: string): Observable<any> {
    const body = { nom, prenom, email, password };
    return this.http.post(`${this.apiUrl}/signup`, body, this.getHttpOptions());
  }

  // Connexion
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body, this.getHttpOptions()).pipe(
      tap((response: any) => {
        if (response?.user) {
          this.saveUser(response.user);
        }
      })
    );
  }

  // Déconnexion
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, this.getHttpOptions()).subscribe(() => {
      this.clearSession();
    });
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.user;
  }

  // Récupère l'utilisateur actuel
  getUser(): any {
    return this.user;
  }

  // Nouvelle méthode pour obtenir l'ID de l'utilisateur
  getUserId(): string {
    return this.user?.id || ''; // Retourne l'ID de l'utilisateur ou une chaîne vide
  }

  // Enregistre l'utilisateur dans sessionStorage
  private saveUser(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  // Supprime les données utilisateur de la session
  private clearSession(): void {
    sessionStorage.removeItem('user');
    this.user = null;
  }

  // Options HTTP standard
  private getHttpOptions(): { headers: HttpHeaders } {
    const csrfToken = this.getCSRFToken();

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {})
      })
    };
  }

  // Récupère le token CSRF depuis le meta tag
  private getCSRFToken(): string | null {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || null;
  }
}
