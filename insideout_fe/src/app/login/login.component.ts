import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router'; // Importer Router et NavigationEnd
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',

  standalone: true,  // Déclare ce composant comme autonome
  imports: [RouterModule, RouterOutlet,CommonModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    currentRoute: string = ''; // Variable pour suivre la route actuelle
  
    constructor( private router: Router) {}
  
    ngOnInit() {
      // Suivre les événements de navigation
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url; // Mettre à jour la route active
        }
      });
    }
  // Méthode pour vérifier si nous sommes sur la page d'inscription
  isSignupPage(): boolean {
    return this.currentRoute === '/signup';
  }
  isQstonePage(): boolean {
    return this.currentRoute === '/qst1';
  }
  isHomePage(): boolean {
    return this.currentRoute === '/';
  }
}
