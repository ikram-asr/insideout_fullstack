
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
 /* signup(nom: string, prenom: string, email: string, password: string): Observable<any> {
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

    return this.http.post(`${this.apiUrl}/signup`, body, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'inscription:', error);
        return throwError(error);
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.user = JSON.parse(sessionStorage.getItem('user') || 'null');

    return this.http.post(`${this.apiUrl}/login`, credentials, { headers })
      .pipe(
        tap((response: any) => {
          sessionStorage.setItem('user', JSON.stringify(response.user));
          this.user = response.user;
        }),
        // Vous pouvez ajouter un traitement d'erreurs ici si nécessaire
        catchError(error => {
          console.error('Error during login:', error);
          throw error;
        })
      );
  }
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('user');
  }
  
  getUserId(): number {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return user.id;
  }
  

  /*logout(): Observable<any> {
    const token = localStorage.getItem('token');  // Assurez-vous que le token est bien dans le localStorage
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }
    logout(): Observable<any> {
      const token = localStorage.getItem('token');  // Récupérer le token depuis localStorage
      return this.http.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      }).pipe(
        tap(response => {
          console.log('Déconnexion réussie :');  // Afficher un message si la déconnexion est réussie
          localStorage.removeItem('token');  // Supprimer le token du localStorage
        }),
        catchError(error => {
          console.error('Erreur de déconnexion:', error.message);  // Afficher un message d'erreur si la déconnexion échoue
          return throwError(error);  // Propager l'erreur
        })
      );
    }
    */
    logout(): Observable<any> {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('Token non trouvé, déconnexion impossible');
        return throwError('No token found, cannot log out');
      }
    
      return this.http.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      }).pipe(
        tap(response => {
          console.log('Déconnexion réussie');
          localStorage.removeItem('token');  // Supprimer le token du localStorage
        }),
        catchError(error => {
          console.error('Erreur de déconnexion:', error.message);
          return throwError(error);
        })
      );
    }
    
  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.user !== null;
  }

  // Récupérer les informations de l'utilisateur connecté
  getUser(): any {
    return this.user;
  }
  getToken(): string | null {
    return this.user ? this.user.token : null;
}

}