import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router, NavigationEnd, NavigationError, NavigationStart, NavigationCancel } from '@angular/router'; // Importer Router et NavigationEnd
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from './services/loading.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { LoadingComponent } from './loading/loading.component'; // Vérifie le chemin correct


@Component({
  selector: 'app-root',
  imports: [HttpClientModule,LoadingComponent  , RouterModule, RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule], // Ajouter RouterModule pour le routage
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  message: string = ''; // Variable pour afficher le message de l'API
  currentRoute: string = ''; 
  isLoading = false;
  constructor(private apiService: ApiService, private router: Router, 
    public loadingService: LoadingService) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.loadingService.show();
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.loadingService.hide();
        }
      });
    }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.isLoading = false;
      }
    });
  
   // this.isLoading= true;

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
  
  isappPage(): boolean {
    return this.currentRoute === '';
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
    return this.currentRoute === '/community/:id';
  }
  isProgramPage(): boolean {
    return this.currentRoute === '/programs/:id';

  }
  isDashPage(): boolean {
    return this.currentRoute === 'dashboard/:id';
  }
  isSettingPage(): boolean {
    return this.currentRoute === '/settings/:id';
  }
  isMessagesPage(): boolean {
    return this.currentRoute === '/messages/:id';
  }
}
 