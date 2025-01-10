import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  currentRoute: string = ''; // Variable pour suivre la route actuelle

  isappPage(): boolean {
    return this.currentRoute === '/';
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
