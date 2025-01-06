
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router'; // Importer Router et NavigationEnd
import { AuthService } from '../services/authService/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-qst1',
  imports: [RouterModule, RouterOutlet,CommonModule,FormsModule], 
  templateUrl: './qst1.component.html',
  styleUrl: './qst1.component.css'
})

export class Qst1Component {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
    currentRoute: string = ''; // Variable pour suivre la route actuelle
  
    constructor(private authService:AuthService, private router: Router) {}
  
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
  isSidebarPage(): boolean {
    return this.currentRoute === '/sidebar';
  }
}
