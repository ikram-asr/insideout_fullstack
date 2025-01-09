import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';  // Importation pour récupérer l'ID de l'URL
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EtatService } from '../../services/etat.service';
import { Chart, ChartConfiguration, ChartOptions, ChartType, registerables } from 'chart.js';

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
  
  qualityMap: { [key: string]: number } = {
    "terrible": 1,
    "poor": 2,
    "fair": 3,
    "good": 4,
    "excellent": 5
  };
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    
  ) {Chart.register(...registerables);
  }

 /* createChart(): void {
    const ctx = document.getElementById('sleep') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', // Type de graphique (bar, line, pie, etc.)
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'], // Étiquettes de l'axe X
        datasets: [
          {
            label: 'Qualité du sommeil',
            data: [8, 7, 6, 9, 8], // Données de l'axe Y
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }*/
 /*chart(){
  
  new Chart("sleep", {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
 }
  createSleepChart(data: any): void {
    // Étape 1 : Extraire les dates et les qualités de sommeil
    const dates = data.etats.map((etat: { date: string }) => etat.date);
    const qualities = data.etats.map((etat: { sleep_quality: string }) => etat.sleep_quality);
  
    // Étape 2 : Mapper les qualités de sommeil sur des valeurs numériques
    const qualityMap: { [key: string]: number } = {
      "terrible": 1,
      "poor": 2,
      "fair": 3,
      "good": 4,
      "excellent": 5
    };
  
    const qualityValues = qualities.map((quality: string) => qualityMap[quality.toLowerCase()]);
  
    // Étape 3 : Créer le graphique
    new Chart("sleep", {
      type: 'bar',
      data: {
        labels: dates, // Abscisses (dates)
        datasets: [{
          label: 'Sleep Quality',
          data: qualityValues, // Valeurs des barres
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              callback: function(tickValue: string | number) {
                // Remap des valeurs pour afficher les labels textuels
                if (typeof tickValue === 'number') {
                  return Object.keys(qualityMap).find(key => qualityMap[key] === tickValue);
                }
                return tickValue;  // En cas de string, retourne directement le tick
              }
            }
          },
          x: {
            ticks: {
              autoSkip: false, // Afficher toutes les dates
            }
          }
        }
      }
    });
  }
  createChart(userData: any[]): void {
    // Vérifie si les données sont correctement récupérées
    console.log('Données utilisées pour le graphique :', userData);
  
    if (!userData || userData.length === 0) {
      console.error('Aucune donnée à afficher pour le graphique.');
      return;
    }
  
    // Labels pour l'axe X (dates ou autre identification)
    const labels = userData.map((etat) => etat.date);
  
    // Données pour la qualité du sommeil
    const data = userData.map((etat) => etat.sleep_hours);
  
    // Récupération de l'élément canvas
    const canvas = document.getElementById('sleep') as HTMLCanvasElement;
  
    if (!canvas) {
      console.error('Canvas avec l\'ID "sleep" introuvable.');
      return;
    }
  
    // Création du graphique (ligne au lieu de bar)
    new Chart(canvas, {
      type: 'line', // Changer ici de 'bar' à 'line' pour un graphique en ligne
      data: {
        labels, // Étiquettes de l'axe X
        datasets: [
          {
            label: 'Qualité du sommeil',
            data, // Données de l'axe Y
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond sous la ligne
            borderColor: 'rgba(75, 192, 192, 1)', // Couleur de la ligne
            borderWidth: 2, // Épaisseur de la ligne
            fill: true, // Remplir sous la ligne
            tension: 0.4, // Courbure de la ligne
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Couleur des points sur la ligne
            pointBorderColor: 'rgba(75, 192, 192, 1)', // Bord des points
            pointRadius: 5, // Taille des points
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: any) => {
                // Remplacer les valeurs numériques par des étiquettes personnalisées
                switch (value) {
                  case 'Excellent':
                    return 'Excellent';
                  case 'Good':
                    return 'Good';
                  case 'Fair':
                    return 'Fair';
                  case 'Poor':
                    return 'Poor';
                  case 'Terrible':
                    return 'Terrible';
                  default:
                    return value; // Retourne la valeur par défaut si aucune correspondance
                }
              }
            }
          }
        }
      }
    });
  
    console.log('Graphique en ligne créé avec succès.');
  }*/
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
  
  
    createGraphWhenDataLoaded(): void {
      if (this.user && this.user.etats) {
        let etats = this.user.etats; // Récupérer les états de sommeil de l'utilisateur
        // Limiter aux 7 derniers jours
etats = etats.slice(-7); // Prendre les 7 derniers éléments

// Extraire les dates et les valeurs de qualité de sommeil
const sleepQualities = etats.map((etat: { sleep_quality: string }) => etat.sleep_quality);
const dates = etats.map((etat: { date: string }) => etat.date);
// Dernier mood
const moodColorMap: { [key: string]: string } = {
  excellent: 'rgba(75, 192, 192, 1)', // Vert
  fair: 'rgba(255, 206, 86, 1)',      // Jaune
  poor: 'rgba(255, 99, 132, 1)'       // Rouge
};
const lastMood = etats[etats.length - 1]?.sleep_quality.toLowerCase();
const lineColor = moodColorMap[lastMood] || 'rgba(75, 192, 192, 1)'; // Couleur par défaut

// Mapper la qualité de sommeil à un score numérique pour le graphique
const qualityValues = sleepQualities.map((quality: string) => this.qualityMap[quality.toLowerCase()]);

this.createSleepChart(dates, qualityValues,lineColor);
      }
    }
  
    createSleepChart(dates: string[], qualityValues: number[],lineColor: string): void {
      new Chart("sleep", {
        type: 'line',  // Changement du type de graphique pour "line"
        data: {
          labels: dates, // Abscisses (dates)
          datasets: [{
            label: 'Sleep Quality',
            data: qualityValues, // Valeurs des lignes
            fill: false, 
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond sous la ligne
            // Ne pas remplir sous la ligne
            borderColor:lineColor,
            borderWidth: 2,
            tension: 0.4  // Courbe douce entre les points
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              min: 0,  // Fixer une valeur minimale pour l'axe Y
              max: 5,  // Fixer une valeur maximale pour l'axe Y
            },
            x: {
              ticks: {
                autoSkip: false, // Afficher toutes les dates
              }
            }
          }
        }
      });
    }

  getUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        console.log('Données utilisateur récupérées :', response);
        this.user = response;  
        this.createGraphWhenDataLoaded(); // Créer le graphique une fois les données utilisateur récupérées
        // Affecter les données de l'utilisateur récupéré
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
            return '/assets/images/stress-removebg-preview.png';
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
        return '#080959C9'; // Couleur pour "bored"
      case 'shy':
        return '#ED2469'; // Couleur pour "shy"
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
      return 'text-figma-blue '; // Couleur du texte clair pour certains moods
    case 'happy':
    case 'bored':
      return '#080959C9';
      case 'shy':
        return '#F2E9EC'
        // Couleur du texte sombre pour d'autres moods
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