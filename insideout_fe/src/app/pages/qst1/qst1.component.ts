import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';  
import { EtatService } from '../../services/etat.service';
import { Router } from '@angular/router';  // Importation du Router

@Component({
  selector: 'app-qst1',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './qst1.component.html',
  styleUrls: ['./qst1.component.css']
})
export class Qst1Component implements AfterViewInit, OnInit {
  barBackgrounds: { [key: string]: string } = {
    excellent: '#F4F3AC',
    good: '#524C84',
    fair: '#3971FF',
    poor: '#F4A84C',
    terrible: '#FF4639',
  };

  mainBackgrounds: { [key: string]: string } = {
    excellent: 'lightyellow',
    good: '#C0B0C4',
    fair: 'lightblue',
    poor: '#FFE4BC',
    terrible: 'lightpink',
  };

  activeOption: HTMLElement | null = null;
  user: any = {};  // Utilisateur individuel
  errorMessage: string = '';
  userId: string = '';  // ID de l'utilisateur récupéré depuis l'URL
  users: any[] = [];
  sleepQuality: string = '';

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2, 
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,  
    private etatService: EtatService,

    private authService: AuthService
  ) {}
  // Fonction pour sélectionner la qualité
  selectQuality(quality: string): void {
    if (this.activeOption) {
      this.renderer.removeClass(this.activeOption, 'active');
    }
  
    this.activeOption = this.el.nativeElement.querySelector(`[data-quality="${quality}"]`);
    if (this.activeOption) {
      this.renderer.addClass(this.activeOption, 'active');
    }
  
    // Enregistrer la qualité sélectionnée dans `this.sleepQuality`
    this.sleepQuality = quality;
  }
  
  next(): void {
    if (!this.sleepQuality) {
      this.errorMessage = 'Please select your sleep quality before proceeding.';
      return;  // Empêche de continuer si la réponse n'est pas sélectionnée
    }
  
    // Sauvegarde la réponse dans le localStorage en utilisant la clé 'sleep_quality'
    this.etatService.saveToLocalStorage('sleep_quality', this.sleepQuality);
  
    // Naviguer vers la question suivante
    this.router.navigate([`/qst2/${this.user.id}`]);
  }
  
ngOnInit(): void {
  // Vérifie que l'ID est bien récupéré
  this.userId = this.route.snapshot.paramMap.get('id')!;
  console.log('ID utilisateur récupéré :', this.userId);  // Devrait afficher "7"
  
  // Si l'ID est valide, on peut continuer à récupérer les données
  if (this.userId) {
    this.getUserData(this.userId);
  } else {
    this.errorMessage = 'ID utilisateur non valide';
  }
}

  // Fonction pour récupérer les données utilisateur via l'ID
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

  // Méthode de gestion du clic sur les options de qualité
  switchActiveOption(event: Event, slidingParts: HTMLElement[], gaps: HTMLElement[], main: HTMLElement): void {
    const target = event.currentTarget as HTMLElement;
  
    // Retirer la classe active de l'option précédente
    if (this.activeOption) {
      this.renderer.removeClass(this.activeOption, 'active');
    }
  
    // Définir la nouvelle option active
    this.activeOption = target;
    this.renderer.addClass(this.activeOption, 'active');
  
    const quality = this.activeOption.dataset['quality'] || '';
    const barColor = this.barBackgrounds[quality as keyof typeof this.barBackgrounds];
    const mainColor = this.mainBackgrounds[quality as keyof typeof this.mainBackgrounds];
    const activeId = Number(this.activeOption.dataset['id']);
  
    // Remplir la barre en fonction de la position du cercle (du bas vers le haut)
    slidingParts.forEach((part, index) => {
      this.renderer.setStyle(part, 'background', index <= activeId ? 'white' : barColor);
    });
  
    gaps.forEach((gap, index) => {
      this.renderer.setStyle(gap, 'backgroundColor', index < activeId ? 'white' : barColor);
    });
  
    // Calculer la position du cercle en pourcentage (en haut vers le bas)
    const positionPercentage = (activeId / (slidingParts.length - 1 )) * 100;
  
    // Appliquer le gradient inversé à la barre pour que la couleur soit au-dessus du cercle
    this.renderer.setStyle(this.activeOption, 'background', 
      `linear-gradient(to bottom, white ${positionPercentage}%, ${barColor} ${positionPercentage}%)`);
  
    // Appliquer la couleur au cercle
    const marker = this.activeOption.querySelector('.circle') as HTMLElement;
    if (marker) {
      this.renderer.setStyle(marker, 'background', barColor);
      this.renderer.setStyle(marker, 'filter', `drop-shadow(0px 4px 4px ${barColor})`);
    }
  
    // Appliquer la couleur principale au fond
    this.renderer.setStyle(main, 'background', mainColor);
  }
  
  
  ngAfterViewInit(): void {
    const slidingParts = Array.from(this.el.nativeElement.querySelectorAll('.sliding-part')) as HTMLElement[];
    const gaps = Array.from(this.el.nativeElement.querySelectorAll('.faux-gap')) as HTMLElement[];
    const main = this.el.nativeElement.querySelector('main') as HTMLElement;

    slidingParts.forEach((part) => {
      this.renderer.listen(part, 'click', (e) => this.switchActiveOption(e, slidingParts, gaps, main));
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      // Redirigez l'utilisateur vers la page de connexion ou une autre page
      this.router.navigate(['/']);
    }, error => {
      console.error('Erreur lors de la déconnexion', error);
    });
  }

}
