import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router'; // Importer Router et NavigationEnd
import { AuthService } from '../services/authService/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,  // Déclare ce composant comme autonome
  imports: [RouterModule, RouterOutlet,CommonModule,FormsModule,ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
    currentRoute: string = ''; // Variable pour suivre la route actuelle
    prenom: string = '';  // Stocker le prénom de l'utilisateur

  
    constructor(private fb: FormBuilder,private authService:AuthService, private router: Router) {}
  

    onSubmit() {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log(this.loginForm.value);  // Vérifiez ce qui est envoyé

          // Enregistrer le token et le prénom de l'utilisateur dans le localStorage
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('prenom', response.user.prenom);
  
          // Rediriger vers la page /qst1
          this.router.navigate(['/qst1']);
        },
        error: (err) => {
          // Gérer l'erreur si l'authentification échoue
          this.errorMessage = err.error.message || 'Erreur de connexion. Veuillez réessayer.';
        }
      });
    }

    ngOnInit(): void {
      // Initialisation du FormGroup avec les contrôles
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],  // Contrôle email avec validation
        password: ['', Validators.required]  // Contrôle password avec validation
      });
    
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
