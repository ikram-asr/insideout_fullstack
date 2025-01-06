import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router, NavigationEnd } from '@angular/router'; // Importer Router et NavigationEnd
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-root',
  imports: [HttpClientModule, RouterModule, RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule], // Ajouter RouterModule pour le routage
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
  isQstonePage(): boolean {
    return this.currentRoute === '/qst1';
  }
  isQsttowPage(): boolean {
    return this.currentRoute === '/qst2';
  }
  isQsttreePage(): boolean {
    return this.currentRoute === '/qst3';
  }
  // Méthode pour vérifier si nous sommes sur la page d'inscription
  isSignupPage(): boolean {
    return this.currentRoute === '/signup';
  }

  isSidebarPage(): boolean {
    return this.currentRoute === '/sidebar';}

  isCommunityPage(): boolean {
    return this.currentRoute === '/community';
  }
  isProgramPage(): boolean {
    return this.currentRoute === '/programs';

  }
  isDashPage(): boolean {
    return this.currentRoute === '/dashboard';
  }
  isSettingPage(): boolean {
    return this.currentRoute === '/settings';
  }
}
