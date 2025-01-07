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
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false; // Ajout d'une indication de chargement

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      (response) => {
        this.isLoading = false;

        // Récupération de l'ID de l'utilisateur depuis la réponse
        const userId = response?.user?.id;
        if (userId) {
          // Navigation vers la route contenant l'ID utilisateur
          this.router.navigate([`/dashboard/${userId}`]);
        } else {
          this.errorMessage = 'User ID not found in response.';
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'Invalid credentials. Please try again.';
      }
    );
  }
  // Vérifie si la page actuelle est une page de type Signup
  isSignupPage(): boolean {
    return this.router.url.includes('/signup');
  }

  // Vérifie si la page actuelle est la page Qstone
  isQstonePage(): boolean {
    return this.router.url.includes('/qstone');
  }

  // Vérifie si la page actuelle est la page d'accueil
  isHomePage(): boolean {
    return this.router.url === '/';
  }
}