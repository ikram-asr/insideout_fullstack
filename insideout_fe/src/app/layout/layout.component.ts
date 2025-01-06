import { Component } from '@angular/core';

import { Router,RouterOutlet,RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [ RouterModule, RouterOutlet,FormsModule,CommonModule], // Ajouter RouterModule pour le routage
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private router: Router) {}

  // Méthodes pour vérifier l'URL actuelle
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isSignupPage(): boolean {
    return this.router.url === '/signup';
  }

  isQstonePage(): boolean {
    return this.router.url.includes('qst1') || this.router.url.includes('qst2') || this.router.url.includes('qst3');
  }

  isDashPage(): boolean {
    return this.router.url === '/dashboard';
  }

  isProgramPage(): boolean {
    return this.router.url === '/programs';
  }

  isCommunityPage(): boolean {
    return this.router.url === '/community';
  }

  isQsttreePage(): boolean {
    return this.router.url === '/qst3';
  }

  isQsttowPage(): boolean {
    return this.router.url === '/qst2';
  }
}
