import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router'; // Importer Router et NavigationEnd
import { AuthService } from '../services/authService/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,  // Déclare ce composant comme autonome
  imports: [RouterModule, RouterOutlet,CommonModule,FormsModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
    currentRoute: string = ''; // Variable pour suivre la route actuelle
  
    constructor(private authService:AuthService, private router: Router) {}
  
    onSubmit(): void {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Connexion réussie', response);
          // Par exemple, rediriger l'utilisateur après la connexion
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Erreur de connexion:', error);
          this.errorMessage = 'Identifiants incorrects';
        }
      );
    }

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
