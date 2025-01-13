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
        localStorage.setItem('token', response.token);
        window.location.href = response.redirect_url;
      },
      error => {
        console.error('Login error:', error);
        // Affichage du message d'erreur en anglais
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
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
  isDashPage(): boolean {
    return this.router.url === 'dashboard/:id';
  }
}