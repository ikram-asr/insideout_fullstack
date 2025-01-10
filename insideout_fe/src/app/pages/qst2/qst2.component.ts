import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { EtatService } from '../../services/etat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-qst2',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './qst2.component.html',
  styleUrls: ['./qst2.component.css']  // Corrected to styleUrls (plural)
})
export class Qst2Component implements OnInit {
  user: any = {};  // Utilisateur individuel
  errorMessage: string = '';
  userId: string = '';  // ID de l'utilisateur récupéré depuis l'URL
  users: any[] = [];
  activeOption: any;  // Ajout d'une propriété pour l'option active
  mood: string = '';

  constructor(
    private userService: UserService,
    private etatService: EtatService,
    private route: ActivatedRoute,
    private router: Router,  // Service pour récupérer les paramètres d'URL
    private renderer: Renderer2,      // Ajout de Renderer2 pour manipuler le DOM
    private el: ElementRef           // Ajout de ElementRef pour l'accès aux éléments du DOM
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
  changeBackgroundColor(bgColor: string): void {
    document.body.style.backgroundColor = bgColor;
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


  // Fonction pour sélectionner l'humeur
  selectMood(mood: string): void {
    if (this.activeOption) {
      this.renderer.removeClass(this.activeOption, 'active');
    }

    this.activeOption = this.el.nativeElement.querySelector(`[data-mood="${mood}"]`);
    if (this.activeOption) {
      this.renderer.addClass(this.activeOption, 'active');
    }
    this.mood = mood;
  }
  next(): void {
    if (!this.mood) {
      this.errorMessage = 'Please select your mood before proceeding.';
      return;  // Empêche de continuer si la réponse n'est pas sélectionnée
    }
  
    // Sauvegarde la réponse dans le localStorage en utilisant la clé 'sleep_quality'
    this.etatService.saveToLocalStorage('mood', this.mood);
  
    // Naviguer vers la question suivante
    this.router.navigate([`/qst3/${this.user.id}`]);
  }


  
  selectEmotionAndMood(emotion: string, bgColor: string, imgSrc: string, mood: string, event: MouseEvent): void {
    // Appeler la fonction selectEmotion
    this.selectEmotion(emotion, bgColor, imgSrc, event);
  
    // Appeler la fonction selectMood
    this.selectMood(mood);
  }
  

   selectEmotion(emotion: string, bgColor: string, imgSrc: string, event: MouseEvent): void {
    // Remove 'scale-selected' class from all emotion containers
    document.querySelectorAll('.feeling').forEach((el) => {
      el.classList.remove('scale-selected');
    });
  
    // Change background color of the body
    document.body.style.backgroundColor = bgColor;
  
    // Update the displayed emotion text
    const emotionText = document.getElementById("emotionText") as HTMLElement;
    if (emotionText) {
      emotionText.textContent = `I'm feeling ${emotion} today!!`;
    }
  
    // Update the displayed emotion image
    const emotionImage = document.getElementById("emotionImage") as HTMLImageElement;
    if (emotionImage) {
      emotionImage.src = imgSrc;
      emotionImage.classList.remove("hidden"); // Show the image
    }
  
    // Add the 'scale-selected' class to the selected emotion container
    const targetElement = event.currentTarget as HTMLElement;
    targetElement.classList.add('scale-selected');
  }
  
}
