import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // Vérifiez si l'utilisateur est connecté
    if (this.authService.isAuthenticated()) {
      const userId = this.authService.getUserId(); // Méthode pour obtenir l'ID de l'utilisateur connecté
      const routeUserId = Number(next.paramMap.get('id')); // Récupère l'ID utilisateur depuis l'URL

      if (userId === routeUserId) {
        return true; // Autorise l'accès si les IDs correspondent
      } else {
        this.router.navigate(['/']); // Redirige vers une page d'accès refusé
        return false; // Bloque l'accès si les IDs ne correspondent pas
      }
    } else {
      // Redirection vers la page de connexion si non authentifié
      this.router.navigate(['/login']);
      return false;
    }
  }
}
