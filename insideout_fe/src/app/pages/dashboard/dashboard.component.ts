import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';  // Importation pour récupérer l'ID de l'URL
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';  
@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = {};  // Utilisateur individuel
  errorMessage: string = '';
  userId: string = '';  // ID de l'utilisateur récupéré depuis l'URL
  users: any[] = [];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute  // Service pour récupérer les paramètres d'URL
  ) {}

  

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
  getMoodImage(mood: string): string {
    switch (mood) {
      case 'sad':
        return '/assets/images/sad.png';
      case 'angry':
        return '/assets/images/angry.png';
      case 'happy':
        return '/assets/images/happy.png';
      case 'anxious':
        return '/assets/images/anxious.png';
      case 'bored':
        return '/assets/images/ennui9sir.png';
        case 'shy':
          return '/assets/images/shy.png';
          case 'afraid':
            return '/assets/images/stressed.png';
      default:
        return '/assets/images/default.png'; // Image par défaut
    }
  }
  getMoodImagelifjenb(mood: string): string {
    switch (mood) {
      case 'sad':
        return '/assets/images/sad-cry.png';
      case 'angry':
        return '/assets/images/angry-1.png';
      case 'happy':
        return '/assets/images/image-removebg-preview.png';
      case 'anxious':
        return '/assets/images/anxiety-removebg-preview.png';
      case 'bored':
        return '/assets/images/ennui9sir.png';
        case 'shy':
          return '/assets/images/shy.png';
          case 'afraid':
            return '/assets/images/fear.png';
      default:
        return '/assets/images/default.png'; // Image par défaut
    }
  }
  
  
  getMoodColor(mood: string): string {
    switch (mood) {
      case 'sad':
        return '#3971FF'; // Couleur pour "sad"
      case 'angry':
        return '#FF4639'; // Couleur pour "angry"
      case 'afraid':
        return '#9F86BA'; // Couleur pour "afraid"
      case 'anxious':
        return '#F4A84C'; // Couleur pour "anxious"
      case 'happy':
        return '#BAC018'; // Couleur pour "happy"
      case 'bored':
        return '#d0d1f1'; // Couleur pour "bored"
      case 'shy':
        return '#F2E9EC'; // Couleur pour "shy"
      default:
        return '#BE1C0A'; // Couleur par défaut
    }
  }
  // Fonction pour obtenir la couleur de fond du bouton
getMoodButtonColor(mood: string): string {
  switch (mood) {
    case 'sad':
      return '#3971FF'; // Couleur pour "sad"
    case 'angry':
      return '#FF4639'; // Couleur pour "angry"
    case 'afraid':
      return '#9F86BA'; // Couleur pour "afraid"
    case 'anxious':
      return '#F4A84C'; // Couleur pour "anxious"
    case 'happy':
      return '#FAFCD7'; // Couleur pour "happy"
    case 'bored':
      return '#d0d1f1'; // Couleur pour "bored"
    case 'shy':
      return '#F2E9EC'; // Couleur pour "shy"
    default:
      return '#BE1C0A'; // Couleur par défaut
  }
}

// Fonction pour obtenir la couleur du texte du bouton
getMoodButtonTextColor(mood: string): string {
  switch (mood) {
    case 'sad':
    case 'angry':
    case 'afraid':
    case 'anxious':
      return '#FFFFFF'; // Couleur du texte clair pour certains moods
    case 'happy':
    case 'bored':
    case 'shy':
      return '#000000'; // Couleur du texte sombre pour d'autres moods
    default:
      return '#000000'; // Couleur par défaut
  }
}

// Fonction pour obtenir le texte du bouton
getMoodButtonText(mood: string): string {
  switch (mood) {
    case 'sad':
      return 'Feeling Sad';
    case 'angry':
      return 'Feeling Angry';
    case 'afraid':
      return 'Feeling Afraid';
    case 'anxious':
      return 'Feeling Anxious';
    case 'happy':
      return 'Feeling Happy';
    case 'bored':
      return 'Feeling Bored';
    case 'shy':
      return 'Feeling Shy';
    default:
      return 'Feeling Neutral';
  }
}

  
}