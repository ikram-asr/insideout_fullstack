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
  credentials = { email: '', password: '' };

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
  
    this.authService.login(loginData).subscribe(
      response => {
        console.log('Login success:', response);
        // Sauvegarder le token dans localStorage ou dans un service si nécessaire
        localStorage.setItem('token', response.token);  // Exemple
  
        // Redirection vers la page de dashboard avec l'ID de l'utilisateur
        const redirectUrl = response.redirect_url;  // URL de redirection fournie par Laravel
        window.location.href = redirectUrl;  // Redirige l'utilisateur vers la page de son dashboard
      },
      error => {
        console.error('Login error:', error);
        // Afficher un message d'erreur si nécessaire
      }
    );
  }
  
  

  isSignupPage() {
    return this.router.url.includes('/signup');
  }

  isQstonePage() {
    return this.router.url.includes('/qstone');
  }

  isHomePage() {
    return this.router.url === '/';
  }
}