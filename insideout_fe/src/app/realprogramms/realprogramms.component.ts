import { Component } from '@angular/core';
import { UserService } from '../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';  // Importation pour récupérer l'ID de l'URL
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartOptions, ChartType, registerables } from 'chart.js';
import { AuthService } from '../services/authService/auth.service';
import { ArticleService } from '../services/article.service';
@Component({
  selector: 'app-realprogramms',
  imports: [RouterModule,FormsModule, CommonModule],
  templateUrl: './realprogramms.component.html',
  styleUrl: './realprogramms.component.css'
})
export class RealprogrammsComponent {
 user: any = {};  // Utilisateur individuel
  errorMessage: string = '';
  userId: string = '';  // ID de l'utilisateur récupéré depuis l'URL
  users: any[] = [];
  articles: any[] = [];

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
    private router: Router,
    private articleService: ArticleService
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

    getMoodImagelifjenb(mood: string): string {
      switch (mood) {
        case 'sad':
          return '/assets/images/sad-cry.png';
        case 'angry':
          return '/assets/images/anger-removebg-preview.png';
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
            return '#ED2469';
            case 'anxious':
          return '#9D2008'; 
            // Couleur du texte sombre pour d'autres moods
        default:
          return '#B39B99'; // Couleur par défaut
      }
    }
    getMoodButtonTextCol(mood: string): string {
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
          return '#B39B99'; // Couleur par défaut
      }
    }
    
    getUserData(userId: string): void {
      this.userService.getUserById(userId).subscribe({
        next: (response) => {
          console.log('Données utilisateur récupérées :', response);
          this.user = response; 
    
          if (this.user.etats && this.user.etats.length > 0) {
            const latestEtat = this.user.etats[this.user.etats.length - 1]; 
            const mood = latestEtat ? latestEtat.mood : null;
            this.getArticlesByMood(mood);
          } else {
            console.warn('Aucun état disponible pour cet utilisateur.');
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données utilisateur', error);
          this.errorMessage = 'Erreur lors de la récupération des données utilisateur.';
        }
      });
    }
    isModalOpen = false;
    selectedArticle: any = null;
  
    // Fonction pour ouvrir la modale avec l'article sélectionné
    openModal(article: any) {
      this.selectedArticle = article;
      this.isModalOpen = true;
    }
  
    // Fonction pour fermer la modale
    closeModal() {
      this.isModalOpen = false;
      this.selectedArticle = null;
    }
  getArticlesByMood(mood: string): void {

    
    this.articleService.getArticlesByMood(mood).subscribe({
      next: (articles) => {
        console.log('Articles récupérés :', articles);
        this.articles = articles;  // Assigner les articles récupérés à une propriété
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des articles', error);
        this.errorMessage = 'Erreur lors de la récupération des articles.';
      }
    });
  }
}
