import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';  // Importation pour récupérer l'ID de l'URL
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EtatService } from '../../services/etat.service';
import { Chart, ChartConfiguration, ChartOptions, ChartType, registerables } from 'chart.js';
import { AuthService } from '../../services/authService/auth.service';
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
    private authService: AuthService,
    private router: Router
  ) {Chart.register(...registerables);
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
    }
    onLogout(): void {
      this.authService.logout().subscribe(() => {
        // Redirigez l'utilisateur vers la page de connexion ou une autre page
        this.router.navigate(['/']);
      }, error => {
        console.error('Erreur lors de la déconnexion', error);
      });
    }

    createGraphBar(): void {
      if (this.user && this.user.etats) {
        let etats = this.user.etats.slice(-7); // Prendre les 7 derniers états
    
        // Préparer les données pour le graphique
        const data = {
          etats: etats.map((etat: { date: string; sleep_hours: number; mood: string }) => ({
            date: etat.date,
            sleep_hours: etat.sleep_hours,
            mood: etat.mood
          }))
        };
    
        // Appeler la fonction pour créer le graphique
        this.createStudyChart(data);
      }
    }
    
    createStudyChart(data: any): void {
      // Étape 1 : Extraire les dates et les heures de sommeil
      const dates = data.etats.map((etat: { date: string }) => {
        const date = new Date(etat.date); // Convertir en objet Date
        return date.toLocaleDateString('en-US', { weekday: 'short' }); // Récupérer le nom abrégé du jour
      });
    
      const sleepHours = data.etats.map((etat: { sleep_hours: number }) => etat.sleep_hours); // Heures de sommeil
    
      // Étape 2 : Couleur pour les barres (selon le dernier mood)
      const lastMood = data.etats[data.etats.length - 1]?.mood.toLowerCase();
      const moodColorMap: { [key: string]: string } = {
        happy: '#BAC018', // Vert
        sad: '#003059',      // Jaune
        anxious: '#9D2008' ,
        afraid:'#936ABA',
        bored :    '#080959C9', 
        angry :    '#FF4639',
        shy :    '#ED2469'// Rouge
      };
      const moodbackroundmap: { [key: string]: string } = {
        happy: '#FAFCD7', // Vert
        sad: '#3971FF7D',      // Jaune
        anxious: '#F4A84CA1' ,
        afraid:'#DBD5FD',
        bored :    '#d0d1f199', 
        angry :    '#FF46397D',
        shy :    '#EED7DF'// Rouge
      };
      const barColor = moodColorMap[lastMood] || 'rgba(75, 192, 192, 1)'; // Couleur par défaut
      const bgolor = moodbackroundmap[lastMood] || 'rgba(75, 192, 192, 1)';
      // Étape 3 : Créer le graphique
      new Chart("study", {
        type: 'bar',
        data: {
          labels: dates, // Abscisses (jours)
          datasets: [{
            label: 'Sleep Hours',
            data: sleepHours, // Valeurs des heures de sommeil
            backgroundColor: bgolor,
            borderColor: barColor,
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            y: {
              grid: {
                display: false // Désactiver les lignes de grille de l'axe Y
              },
              beginAtZero: true,
              title: {
                display: false,
                text: 'Hours of Study'
              },
              ticks: {
                stepSize: 1
              }
            },
            x: {
              grid: {
                display: false // Désactiver les lignes de grille de l'axe Y
              },
              title: {
                display: true,
              }
            }
          }
        }
      });
    }
    
    createGraphWhenDataLoaded(): void {
      if (this.user && this.user.etats) {
        let etats = this.user.etats; // Récupérer les états de sommeil de l'utilisateur
        // Limiter aux 7 derniers jours
etats = etats.slice(-7); // Prendre les 7 derniers éléments
const moodColorMap: { [key: string]: string } = {
  happy: '#BAC018', // Vert
  sad: '#003059',      // Jaune
  anxious: '#9D2008' ,
  afraid:'#936ABA',
  bored :    '#080959C9', 
  angry :    '#FF4639',
  shy :    '#ED2469'// Rouge
};
const moodbackroundmap: { [key: string]: string } = {
  happy: '#FAFCD7', // Vert
  sad: '#3971FF7D',      // Jaune
  anxious: '#F4A84CA1' ,
  afraid:'#DBD5FD',
  bored :    '#d0d1f199', 
  angry :    '#FF46397D',
  shy :    '#EED7DF'// Rouge
};
// Dernier mood
const lastMood = etats[etats.length - 1]?.mood.toLowerCase();
console.log("Dernier mood :", lastMood);

const lineColor = moodColorMap[lastMood] || 'rgba(75, 192, 192, 1)';
console.log("Couleur de la ligne :", lineColor);
const bgolor = moodbackroundmap[lastMood] || 'rgba(75, 192, 192, 1)';
console.log("Couleur de la ligne :", lineColor);
// Extraire les dates et les valeurs de qualité de sommeil
const sleepQualities = etats.map((etat: { sleep_quality: string }) => etat.sleep_quality);
const dates = etats.map((etat: { date: string }) => {const date = new Date(etat.date); // Convertir la chaîne en objet Date
return date.toLocaleDateString('en-US', { weekday: 'short' }); // Récupérer le nom du jour
});
// Couleur par défaut

// Mapper la qualité de sommeil à un score numérique pour le graphique
const qualityValues = sleepQualities.map((quality: string) => this.qualityMap[quality.toLowerCase()]);

this.createSleepChart(dates, qualityValues,lineColor,bgolor);
      }
    }
  
    createSleepChart(dates: string[], qualityValues: number[],lineColor:string,bgolor:string): void {
      new Chart("sleep", {
        type: 'line',  // Changement du type de graphique pour "line"
        data: {
          labels: dates, // Abscisses (dates)
          datasets: [{
            label: 'Sleep Quality',
            data: qualityValues, // Valeurs des lignes
            fill: true, 
            backgroundColor: bgolor, // Couleur de fond sous la ligne
            // Ne pas remplir sous la ligne
            borderColor:lineColor,
            borderWidth: 2,
            tension: 0.4  // Courbe douce entre les points
          }]
        },
        options: {
          scales: {
            y: {
              grid: {
                display: false // Désactiver les lignes de grille de l'axe Y
              },
              title: {
                display: false,
                
                text: 'Hours of Sleep'

              },
              ticks: {
                callback: function(value: string | number) {
                  const qualityLabels = ['0','Terrible','Poor', 'Fair', 'Good', 'Excellent'];
                  // Vérifier si 'value' est un nombre avant d'accéder à 'qualityLabels'
                  if (typeof value === 'number') {
                    return qualityLabels[value] || '';
                  }
                  return ''; // Retourner une chaîne vide si ce n'est pas un nombre
                }
              },              
              min: 0,  // Correspond à "Poor"
              max: 5   // Correspond à "Excellent"
            },
            x: {
              grid: {
                display: false // Désactiver les lignes de grille de l'axe Y
              },
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
        this.createGraphWhenDataLoaded();
        this.createGraphBar(); // Créer le graphique une fois les données utilisateur récupérées
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
            return '/assets/images/afraid.png';
      default:
        return '/assets/images/Nostalgia_Transparent.webp'; // Image par défaut
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
        return '/assets/images/Nostalgia_Transparent.webp'; // Image par défaut
    }
  }
  
  
  getMoodColor(mood: string): string {
    switch (mood) {
      case 'sad':
        return '#003059'; // Couleur pour "sad"
      case 'angry':
        return '#FF4639'; // Couleur pour "angry"
      case 'afraid':
        return '#9F86BA'; // Couleur pour "afraid"
      case 'anxious':
        return '#9D2008'; // Couleur pour "anxious"
      case 'happy':
        return '#BAC018'; // Couleur pour "happy"
      case 'bored':
        return '#080959C9'; // Couleur pour "bored"
      case 'shy':
        return '#ED2469'; // Couleur pour "shy"
      default:
        return '#4D3435'; // Couleur par défaut
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
      return '#EED7DF'; // Couleur pour "shy"
    default:
      return '#4D3435'; // Couleur par défaut
  }
}

// Fonction pour obtenir la couleur du texte du bouton
getMoodButtonTextColor(mood: string): string {
  switch (mood) {
    case 'sad':
    case 'angry':
    case 'afraid':
      return 'text-figma-blue '; // Couleur du texte clair pour certains moods
    case 'happy':
      return'#FAFCD7';
    case 'bored':
      return '#FFFFF';
      case 'shy':
        return '#F2E9EC';
        case 'anxious':
      return '#9D2008'; 
        // Couleur du texte sombre pour d'autres moods
    default:
      return '#FFFFFF'; // Couleur par défaut
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