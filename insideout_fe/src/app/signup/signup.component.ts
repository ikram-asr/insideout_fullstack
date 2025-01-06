import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router'; // Importer Router et NavigationEnd
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms'; 
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  standalone: true,  // Déclare ce composant comme autonome
  imports: [RouterModule, RouterOutlet,CommonModule,FormsModule,ReactiveFormsModule], // Ajouter RouterModule pour le routage
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  nom:string='';
  prenom: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  currentRoute: string = ''; // Variable pour suivre la route actuelle
  signupForm!: FormGroup;
  constructor(private http: HttpClient, private authService:AuthService, private router: Router,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Mettre à jour la route active
      }
    });
  }
  

  onSubmit(): void {
    // Vérifier si le formulaire est valide
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { nom, prenom, email, password } = this.signupForm.value;

    // Envoi des données à l'API via le service AuthService
    this.authService.signup(nom, prenom, email, password).subscribe({
      next: (response) => {
        console.log('User signed up successfully', response);
        this.router.navigate(['/qst1']); // Redirection après inscription réussie
      },
      error: (error) => {
        console.error('Error during signup', error);
        this.errorMessage = 'Failed to sign up. Please try again.';
      },
    });
  }
/*onSubmit() {
  // Appelez votre service pour envoyer les données à l'API
  this.authService.signup(this.nom, this.prenom, this.email, this.password).subscribe({
    next: (response) => {
      // Si la réponse est correcte, vous pouvez afficher un message de succès
      console.log('User signed up successfully', response);
      
      // Redirigez l'utilisateur vers un autre composant après l'inscription réussie
      this.router.navigate(['/qst1']); // Remplacez '/qst1' par le chemin vers le composant de votre choix
    },
    error: (error) => {
      // Si une erreur se produit, vous pouvez gérer l'erreur et afficher un message
      console.error('Error during signup', error);
      this.errorMessage = 'Failed to sign up. Please try again.';
    },
  });
}

 onSubmit(form:NgForm){
  const nom=form.value.nom;
  const prenom=form.value.prenom;
  const email=form.value.email;
  const password=form.value.password;
  console.log(nom,prenom,email,password)

 }

  ngOnInit() {
    // Suivre les événements de navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Mettre à jour la route active
      }
    });
  }*/

    // Méthode pour vérifier si nous sommes sur la page de login
    isLoginPage(): boolean {
      return this.currentRoute === '/login';
    }
    isQstonePage(): boolean {
      return this.currentRoute === '/qst1';
    }
}