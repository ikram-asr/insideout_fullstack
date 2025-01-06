import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importer Router et NavigationEnd
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule,FormsModule,CommonModule], // Ajouter RouterModule pour le routage
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentRoute: string = ''; // Déclaration de la propriété currentRoute

    constructor( private router: Router) {}
  
  ngOnInit() {
    // Suivre les événements de navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Mettre à jour la route active
      }
    });}
    isLoginPage(): boolean {
      return this.currentRoute === '/login';
    }
    isQstonePage(): boolean {
      return this.currentRoute === '/qst1';
    }
    // Méthode pour vérifier si nous sommes sur la page d'inscription
    isSignupPage(): boolean {
      return this.currentRoute === '/signup';
    }
    isSidebarPage(): boolean {
      return this.currentRoute === '/sidebar';
    }
    isDashPage(): boolean {
      return this.currentRoute === '/dashboard';
    }

}
