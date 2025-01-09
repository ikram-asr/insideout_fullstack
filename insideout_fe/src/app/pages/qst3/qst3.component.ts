import { Component,OnInit } from '@angular/core';

import { Router,RouterOutlet,RouterModule } from '@angular/router';
import { EtatService } from '../../services/etat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';  

@Component({
  selector: 'app-qst3',
  imports: [ RouterModule,FormsModule,CommonModule], 
  templateUrl: './qst3.component.html',
  styleUrl: './qst3.component.css'
})
export class Qst3Component implements OnInit {
  user: any = {};  // Utilisateur individuel
  errorMessage: string = '';
  userId: string = '';  // ID de l'utilisateur récupéré depuis l'URL
  users: any[] = [];
  hours: number = 6;
  minutes: number = 0;

  constructor(
    private userService: UserService,
    private etatService: EtatService,
    private router: Router,

    private route: ActivatedRoute  // Service pour récupérer les paramètres d'URL
  ) {}




  increaseHours(): void {
    if (this.hours < 23) {
      this.hours++;
    }
  }

  decreaseHours(): void {
    if (this.hours > 0) {
      this.hours--;
    }
  }

  increaseMinutes(): void {
    if (this.minutes < 59) {
      this.minutes++;
    }
  }

  decreaseMinutes(): void {
    if (this.minutes > 0) {
      this.minutes--;
    }
  }

  submit(): void {
    // Assurez-vous que l'ID utilisateur est bien un nombre
    const userId = Number(this.userId);  // Conversion de userId en nombre
  
    // Vérifier si l'ID est valide
    if (isNaN(userId) || userId <= 0) {
      console.error('Invalid user ID');
      return; // Arrêter si l'ID est invalide
    }
  
    // Sauvegarde des valeurs des heures et minutes dans localStorage
    this.etatService.saveToLocalStorage('sleep_hours', this.hours);
    this.etatService.saveToLocalStorage('sleep_minutes', this.minutes);
  
    // Récupérer les données de localStorage
    const etatData = this.etatService.getFromLocalStorage();
  
    // Ajouter l'ID utilisateur aux données
    etatData.userId = userId;  // Ajouter l'ID utilisateur dans les données
  
    // Envoyer les données à l'API Laravel
    this.etatService.saveEtat(userId, etatData).subscribe({
      next: (response) => {
        console.log('Data saved successfully:', response);
        // Optionnel : vider le localStorage après envoi
        this.etatService.clearLocalStorage();
        // Redirection après envoi si nécessaire
        this.router.navigate(['/dashboard', userId]);
      },
      error: (error) => {
        console.error('Error saving data', error);
      }
    });
  }
  
  
  
  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur depuis l'URL
    this.userId = this.route.snapshot.paramMap.get('id')!;
    console.log('ID utilisateur récupéré :', this.userId);

    // Vérifier que l'ID est valide avant de récupérer les données
    if (this.userId) {
      this.getUserData(this.userId); // Appeler la fonction pour récupérer les données utilisateur
    } else {
      this.errorMessage = 'ID utilisateur non valide';
    }
      // Vérifier que l'ID est valide avant de récupérer les données
  const userId = parseInt(this.userId, 10);
  if (isNaN(userId) || userId <= 0) {
    this.errorMessage = 'ID utilisateur non valide';
    return;
  }
  }

  getUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        console.log('Données utilisateur récupérées :', response);
        this.user = response;  // Affecter les données de l'utilisateur récupéré
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données utilisateur', error);
        this.errorMessage = 'Erreur lors de la récupération des données utilisateur.';
      }
    });
  }
}
