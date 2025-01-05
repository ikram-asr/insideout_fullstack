import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router, NavigationEnd } from '@angular/router'; // Importer Router et NavigationEnd
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [HttpClientModule, RouterModule, RouterOutlet,CommonModule], // Ajouter RouterModule pour le routage
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  message: string = ''; // Variable pour afficher le message de l'API
  currentRoute: string = ''; // Variable pour suivre la route actuelle

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    // Suivre les événements de navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Mettre à jour la route active
      }
    });

    // Appel de l'API pour récupérer un message
    this.apiService.getHello().subscribe({
      next: (response) => {
        this.message = response.message; // Stocker le message retourné
      },
      error: (error) => {
        console.error('Error during API call:', error);
      },
    });
  }

  // Méthode pour vérifier si nous sommes sur la page de login
  isLoginPage(): boolean {
    return this.currentRoute === '/login';
  }

  // Méthode pour vérifier si nous sommes sur la page d'inscription
  isSignupPage(): boolean {
    return this.currentRoute === '/signup';
  }
}
