import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router'; // Importer Router et NavigationEnd
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,  // Déclare ce composant comme autonome
  imports: [RouterModule, RouterOutlet,CommonModule], // Ajouter RouterModule pour le routage
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
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
    // Méthode pour vérifier si nous sommes sur la page de login
    isLoginPage(): boolean {
      return this.currentRoute === '/login';
    }
    isQstonePage(): boolean {
      return this.currentRoute === '/qst1';
    }
}
